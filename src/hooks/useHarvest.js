import { useContract } from '../web3-contracts'
import honeyFarm from '../abi/honeyfarm.json'
import { networkConfigs } from '../networks'

export function useHarvest(id) {
  const contract = useContract(networkConfigs.rinkeby.honeyfarm, honeyFarm)
  return () => {
    return new Promise((resolve, reject) => {
      contract
        .withdrawRewards(id)
        .then(x => {
          return resolve(x)
        })
        .catch(err => reject(err))
    })
  }
}
