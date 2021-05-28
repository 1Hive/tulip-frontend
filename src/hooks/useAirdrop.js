import { useEffect, useMemo, useState } from 'react'
import { useWallet } from 'use-wallet'
import { utils } from 'ethers'
import StreamedAirdropper from '../abi/StreamedAirdropper.json'
import ERC20 from '../abi/ERC20.json'
import { useContract } from '../web3-contracts'
import { getNetworkConfig } from '../networks'

export function useClaim() {
  const [working, setWorking] = useState(false)
  const [txHash, setTxHash] = useState('')
  const {
    account,
    status,
    _web3ReactContext: { chainId },
  } = useWallet()
  const [unclaimed, setUnclaimed] = useState(0)
  const [available, setAvailable] = useState(0)
  const [balance, setBalance] = useState(0)
  const networks = getNetworkConfig(chainId)
  const contract = useContract(networks.StreamedAirdropper, StreamedAirdropper)
  const tokenb = useContract(networks.xCombToken, ERC20)

  const claim = useMemo(() => {
    if (!account || status === 'disconnected') {
      return
    }

    return async () => {
      const trnHash = await contract.withdrawTo(account)
      if (trnHash) {
        setTxHash(trnHash)
        setWorking(true)
        await trnHash.wait()
      }
      setWorking(false)
    }
  }, [account, contract, status])

  useEffect(() => {
    if (!account || status === 'disconnected') {
      setAvailable(0)
      return
    }
    let cancelled = false
    const fetchAvailable = async () => {
      try {
        const tokens = await contract.pendingTokens(account)
        if (!cancelled && tokens) {
          setAvailable(utils.formatUnits(tokens).substring(0, 9))
        }

        return tokens
      } catch (err) {
        console.error(`Could not fetch airdrop data `, err)
      }
    }

    const fetchUnclaimedData = async () => {
      try {
        const result = await contract.vestingUsers(account)
        if (result.length > 0) {
          const remainingTokens = result[0]
          const tokenBalance = await tokenb.balanceOf(account)
          setBalance(utils.formatUnits(tokenBalance).substring(0, 9))

          const rTokens = utils.formatUnits(remainingTokens)
          if (rTokens) {
            setUnclaimed(parseFloat(rTokens).toFixed(4))
          }
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchAvailable()
    fetchUnclaimedData()
    return () => {
      cancelled = true
    }
  }, [account, status, working])

  return [balance, claim, available, unclaimed, txHash, working]
}
