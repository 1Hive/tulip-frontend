import { useContract } from '../web3-contracts'
import honeyFarm from '../abi/honeyfarm.json'
import { networkConfigs } from '../networks'

export function useWithdraw(id) {
  const contract = useContract(networkConfigs.rinkeby.honeyfarm, honeyFarm)
  return () => {
    return contract
      .closeDeposit(id)
      .then(x => {
        return x
      })
      .catch(err => console.log(err))
  }
}
