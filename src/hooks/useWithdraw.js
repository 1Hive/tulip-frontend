import { useContract } from '../web3-contracts'
import honeyFarm from '../abi/honeyfarm.json'
import { networkConfigs } from '../networks'
import { serializeError } from 'eth-rpc-errors'

export function useWithdraw(id, chainId) {
  const contract = useContract(networkConfigs[chainId].honeyfarm, honeyFarm)
  return () => {
    return new Promise((resolve, reject) => {
      contract
        .closeDeposit(id)
        .then(x => {
          resolve(x)
        })
        .catch(err => reject(serializeError(err)))
    })
  }
}
