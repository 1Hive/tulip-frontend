import { useContract } from '../web3-contracts'
import honeyFarm from '../abi/honeyfarm.json'
import { addresses } from '../constants/addresses'

export function useHarvest(id) {
  const contract = useContract(addresses.honeyfarm, honeyFarm)
  return () => {
    return contract
      .withdrawRewards(id)
      .then(x => {
        return x
      })
      .catch(err => console.log(err))
  }
}
