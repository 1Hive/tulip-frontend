import { useContract } from '../web3-contracts'
import honeyFarm from '../abi/honeyfarm.json'
import { ethers } from 'ethers'
import { getNetworkConfig } from '../networks'
import { serializeError } from 'eth-rpc-errors'

export function useCreateDeposit(
  tokenAddress,
  amount,
  unlockTime = 0,
  referrer = '0x0000000000000000000000000000000000000000',
  chainId
) {
  amount = amount !== '' ? ethers.utils.parseEther(amount) : amount
  const network = getNetworkConfig(chainId)

  const contract = useContract(network.honeyfarm, honeyFarm)
  return () => {
    return new Promise((resolve, reject) => {
      contract
        .createDeposit(tokenAddress, amount, unlockTime, referrer)
        .then(x => {
          resolve(x)
        })
        .catch(err => reject(serializeError(err)))
    })
  }
}
