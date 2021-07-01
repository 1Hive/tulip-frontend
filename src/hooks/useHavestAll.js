import { useContract } from '../web3-contracts'
import honeyFarm from '../abi/honeyfarm.json'
import multiWithdrawer from '../abi/multiwithdrawer.json'
import { getNetworkConfig } from '../networks'
import { serializeError } from 'eth-rpc-errors'

export function useHarvestAll(ids, chainId) {
  const network = getNetworkConfig(chainId)
  const contract = useContract(network.honeyfarm, honeyFarm)
  const multiWithdrawerContract = useContract(
    network.multiWithdrawer,
    multiWithdrawer
  )
  return () => {
    return new Promise((resolve, reject) => {
      contract
        .setApprovalForAll(network.multiWithdrawer, true)
        .then(() => {
          multiWithdrawerContract
            .withdrawRewardsFrom(ids)
            .then(x => {
              return resolve(x)
            })
            .catch(err => reject(serializeError(err)))
        })
        .catch(err => reject(serializeError(err)))
    })
  }
}
