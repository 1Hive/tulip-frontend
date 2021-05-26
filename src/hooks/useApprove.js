import { useContract } from '../web3-contracts'
import { networkConfigs } from '../networks'
import { serializeError } from 'eth-rpc-errors'

import erc20 from '../abi/ERC20.json'

export function useApprove(tokenAddress, amount) {
  const contract = useContract(tokenAddress, erc20)
  return () => {
    return new Promise((resolve, reject) => {
      contract
        .approve(networkConfigs.rinkeby.honeyfarm, amount)
        .then(x => {
          resolve(x)
        })
        .catch(err => reject(serializeError(err)))
    })
  }
}
