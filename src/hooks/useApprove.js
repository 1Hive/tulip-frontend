import { useContract } from '../web3-contracts'
import { networkConfigs } from '../networks'

import erc20 from '../abi/ERC20.json'

export function useApprove(tokenAddress, amount) {
  const contract = useContract(tokenAddress, erc20)
  return () => {
    return contract
      .approve(networkConfigs.rinkeby.honeyfarm, amount)
      .then(x => {
        return x
      })
      .catch(err => console.log(err))
  }
}
