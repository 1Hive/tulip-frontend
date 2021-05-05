import { useEffect, useMemo, useState } from 'react'
import { useWallet } from 'use-wallet'
import { utils } from 'ethers'
import StreamedAirdropper from '../abi/StreamedAirdropper.json'
import { useContract } from '../web3-contracts'
import { addresses } from '../constants/addresses'

// export function usePendingTokens() {
//   const [tokens, setTokens] = useState(0)
//   const [claimed, setClaimed] = useState(0)
//   // const [balance, setBalance] = useState(0)
//   const { account, status } = useWallet()
//   const contract = getContract(addresses.StreamedAirdropper, StreamedAirdropper)
//   const tokenb = useGetTokenBalance(addresses.xCombToken, ERC20)
//   console.log('Balance', tokenb)

//   useEffect(() => {
//     let cancelled = false

//     if (!account || status === 'disconnected') {
//       setTokens(0)
//       return
//     }

//     const fetchPendingTokens = async () => {
//       try {
//         const tokens = await contract.pendingTokens(account)
//         if (!cancelled && tokens) {
//           setTokens(utils.formatUnits(tokens).substring(0, 9))
//         }

//         return tokens
//       } catch (err) {
//         console.error(`Could not fetch airdrop data `, err)
//       }
//     }

//     const fetchClaimedData = async () => {
//       try {
//         const result = await contract.vestingUsers(account)
//         if (result.length > 0) {
//           const ds = await contract.distributionStart()
//           const lw = result[1]
//           const de = await contract.distributionEnd()
//           const remainingTokens = result[0]

//           const totalTokens = utils.formatUnits(
//             de
//               .sub(ds)
//               .mul(remainingTokens)
//               .div(de.sub(lw))
//           )
//           if (totalTokens) {
//             const rTokens = utils.formatUnits(remainingTokens)
//             if (rTokens) {
//               const cTokens = parseFloat(totalTokens - rTokens).toFixed(4)
//               setClaimed(cTokens)
//             }
//           }
//         }
//       } catch (err) {
//         console.log(err)
//       }
//     }

//     fetchPendingTokens()
//     fetchClaimedData()
//     return () => {
//       cancelled = true
//     }
//   }, [account, status])

//   return [tokens, claimed]
// }

export function useClaim() {
  const [working, setWorking] = useState(false)
  const [txHash, setTxHash] = useState('')
  const { account, status } = useWallet()
  const [tokens, setTokens] = useState(0)
  const [claimed, setClaimed] = useState(0)
  const contract = useContract(addresses.StreamedAirdropper, StreamedAirdropper)

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
    let cancelled = false

    if (!account || status === 'disconnected') {
      setTokens(0)
      return
    }

    const fetchPendingTokens = async () => {
      try {
        const tokens = await contract.pendingTokens(account)
        if (!cancelled && tokens) {
          setTokens(utils.formatUnits(tokens).substring(0, 9))
        }

        return tokens
      } catch (err) {
        console.error(`Could not fetch airdrop data `, err)
      }
    }

    const fetchClaimedData = async () => {
      try {
        const result = await contract.vestingUsers(account)
        if (result.length > 0) {
          const ds = await contract.distributionStart()
          const lw = result[1]
          const de = await contract.distributionEnd()
          const remainingTokens = result[0]

          const totalTokens = utils.formatUnits(
            de
              .sub(ds)
              .mul(remainingTokens)
              .div(de.sub(lw))
          )
          if (totalTokens) {
            const rTokens = utils.formatUnits(remainingTokens)
            if (rTokens) {
              const cTokens = parseFloat(totalTokens - rTokens).toFixed(4)
              setClaimed(cTokens)
            }
          }
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchPendingTokens()
    fetchClaimedData()
    return () => {
      cancelled = true
    }
  }, [account, status, working])

  return [claim, claimed, tokens, txHash, working]
}
