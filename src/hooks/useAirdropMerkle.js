import { useEffect, useMemo, useState } from 'react'
import { useWallet } from 'use-wallet'
import { utils } from 'ethers'
import StreamedAirdropper from '../abi/StreamedAirdropper.json'
import Claimer from '../abi/Claimer.json'
import ERC20 from '../abi/ERC20.json'
import { useContract } from '../web3-contracts'
import { getNetworkConfig } from '../networks'
import snapshot from '../components/Airdrop/snapshots/airdrop-snapshot-rinkeby.json'
import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'
import { truncateDecimals } from '../lib/math-utils'

function createTree(leaves) {
  const bufferedLeaves = leaves.map(leaf => Buffer.from(leaf.slice(2), 'hex'))
  return new MerkleTree(bufferedLeaves, keccak256, { sortPairs: true })
}

function createProof(snapshot, addr) {
  const account = snapshot.accounts[addr]
  if (account === undefined) return null
  const tree = createTree(snapshot.leaves)
  return tree.getHexProof(account.leaf)
}

/*
// how to claim (example code):

const addr = < user address >
const claimProof = createProof(snapshot, addr)
const recipient = < claim recipient >
claimerContract.claimTo(recipient, claimProof, snapshot.accounts[addr].amount)

// check if already claimed:
const addr = < claimer address >
const leaf = snapshot.accounts[addr].leaf
const alreadyClaimed = claimerContract.hasAlreadyClaimed(leaf)
*/

export function useAirdropMerkle() {
  const [working, setWorking] = useState(false)
  const [txHash, setTxHash] = useState('')
  const {
    account,
    status,
    _web3ReactContext: { chainId },
  } = useWallet()
  const [unclaimed, setUnclaimed] = useState(0)
  const [available, setAvailable] = useState(0)
  const [initialAmount, setInitialAmount] = useState(0)
  const [isClaimable, setIsClaimable] = useState(false)
  const [balance, setBalance] = useState(0)
  const networks = getNetworkConfig(chainId)

  const contract = useContract(networks.StreamedAirdropper, StreamedAirdropper)
  const claimerContract = useContract(networks.Claimer, Claimer)

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

  const merkleClaim = useMemo(() => {
    if (!account || status === 'disconnected') {
      return
    }

    return async () => {
      const isClaimable = await merkleIsClaimable()
      if (!isClaimable) return

      const claimProof = createProof(snapshot, account)
      claimerContract.claimTo(
        account,
        claimProof,
        snapshot.accounts[account].amount
      )

      const trnHash = await contract.withdrawTo(account)
      if (trnHash) {
        setTxHash(trnHash)
        setWorking(true)
        await trnHash.wait()
      }
      setWorking(false)
    }
  }, [account, contract, status])

  const merkleIsClaimable = useMemo(() => {
    if (!account || status === 'disconnected') {
      return
    }

    return async () => {
      if (!snapshot.accounts[account]) return false

      const leaf = snapshot.accounts[account].leaf
      const alreadyClaimed = claimerContract.hasAlreadyClaimed(leaf)
      return !alreadyClaimed
    }
  }, [account, claimerContract, status])

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

    const fetchIsClaimable = async () => {
      const claimable = true // await merkleIsClaimable()
      setIsClaimable(claimable)
    }

    if (snapshot.accounts['0x4bea4ba49063061123ac8a51796f277cfe2457f4']) {
      setInitialAmount(
        truncateDecimals(
          parseInt(
            snapshot.accounts['0x4bea4ba49063061123ac8a51796f277cfe2457f4']
              .xAmount,
            16
          ) / 1e18
        )
      )
    }

    fetchIsClaimable()
    fetchAvailable()
    fetchUnclaimedData()
    return () => {
      cancelled = true
    }
  }, [account, status, working])

  return [
    balance,
    claim,
    available,
    unclaimed,
    txHash,
    working,
    merkleClaim,
    initialAmount,
    isClaimable,
  ]
}
