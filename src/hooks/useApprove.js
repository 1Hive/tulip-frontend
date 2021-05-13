import { useContract } from '../web3-contracts'
import { addresses } from '../constants/addresses'
import erc20 from '../abi/ERC20.json'

export function useApprove(tokenAddress, amount) {
  const contract = useContract(tokenAddress, erc20)
  return () => {
    return contract
      .approve(addresses.honeyfarm, amount)
      .then(async x => {
        return await x.wait()
      })
      .catch(err => console.log(err))
  }
}
