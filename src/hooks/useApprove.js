import { useContract } from '../web3-contracts'
import { getNetworkConfig } from '../networks'
import { serializeError } from 'eth-rpc-errors'

import erc20 from '../abi/ERC20.json'

export function useApprove(tokenAddress, amount, chainId) {
  const contract = useContract(tokenAddress, erc20)
  const network = getNetworkConfig(chainId)

  return () => {
    return new Promise((resolve, reject) => {
      contract
        .approve(network.honeyfarm, amount)
        .then(x => {
          resolve(x)
        })
        .catch(err => reject(serializeError(err)))
    })
  }
}
