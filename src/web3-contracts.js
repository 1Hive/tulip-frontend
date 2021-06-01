import { useMemo } from 'react'
import { Contract as EthersContract, providers as Providers } from 'ethers'
import { useWallet } from './providers/Wallet'

const CURRENT_PROVIDER = window.web3 ? window.web3.currentProvider : null
const DEFAULT_PROVIDER = CURRENT_PROVIDER
  ? new Providers.Web3Provider(CURRENT_PROVIDER)
  : null

export function useContract(address, abi, signer = true) {
  const { account, ethers } = useWallet()

  return useMemo(() => {
    // Apparently .getSigner() returns a new object every time, so we use the
    // connected account as memo dependency.

    if (!address || !ethers || !account) {
      return null
    }

    return getContract(address, abi, signer ? ethers.getSigner() : ethers)
  }, [abi, account, address, ethers, signer])
}

export function useContractReadOnly(address, abi) {
  return useMemo(() => {
    if (!address) {
      return null
    }
    return getContract(address, abi)
  }, [abi, address])
}

export function getContract(address, abi, provider = DEFAULT_PROVIDER) {
  if (!provider) {
    return null
  }
  return new EthersContract(address, abi, provider)
}

export function useGetTokenBalance(address, abi, provider = DEFAULT_PROVIDER) {
  const { account } = useWallet()
  return useMemo(() => {
    if (!address || !abi) {
      return null
    }

    const contract = new EthersContract(address, abi, provider)
    return contract.balanceOf(account)
  }, [abi, account, address, provider])
}
