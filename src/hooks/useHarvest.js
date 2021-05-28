import { useContract } from '../web3-contracts'
import honeyFarm from '../abi/honeyfarm.json'
import { getNetworkConfig } from '../networks'
import { serializeError } from 'eth-rpc-errors'

export function useHarvest(id, chainId) {
  const network = getNetworkConfig(chainId)
  const contract = useContract(network.honeyfarm, honeyFarm)
  return () => {
    return new Promise((resolve, reject) => {
      contract
        .withdrawRewards(id)
        .then(x => {
          return resolve(x)
        })
        .catch(err => reject(serializeError(err)))
    })
  }
}
