import { useEffect, useState } from 'react'
import { addressesEqual } from '@1hive/1hive-ui'
import tulipData from 'tulip-backend'
import { useWallet } from '../providers/Wallet'
import { getContract } from '../web3-contracts'
import { getNetworkConfig } from '../networks'
import honeyFarm from '../abi/honeyfarm.json'
import ERC20 from '../abi/ERC20.json'

export const useFetchDeposits = () => {
  const [deposits, setDeposits] = useState(null)
  const {
    account,
    _web3ReactContext: { chainId },
  } = useWallet()
  useEffect(() => {
    const network = getNetworkConfig(chainId)
    const contract = getContract(network.honeyfarm, honeyFarm)
    const loadDepositData = async () => {
      const deposits = []
      if (account) {
        const tulipF = await tulipData.farm.deposits({
          user_address: account,
          chain_id: chainId,
        })
        if (tulipF.length > 0) {
          for (const d of tulipF) {
            const rewardBalance = await contract.functions.pendingHsf(d.id)
            deposits.push({
              ...d,
              // symbol,
              rewardBalance,
            })
          }
          setDeposits(deposits)
        } else {
          setDeposits([])
        }
      }
    }
    loadDepositData()

    if (account && contract) {
      contract.on('Transfer', (from, to, value, event) => {
        if (addressesEqual(to, account) || addressesEqual(from, account)) {
          loadDepositData()
        }
      })
    }

    const combContract = getContract(network.xCombToken, ERC20)
    if (account && combContract) {
      combContract.on('Transfer', (from, to, value, event) => {
        if (addressesEqual(to, account)) {
          loadDepositData()
        }
      })
    }

    return () => {
      if (contract) {
        contract.off('Transfer')
        combContract.off('Transfer')
      }
    }
  }, [account, chainId])

  return deposits
}
