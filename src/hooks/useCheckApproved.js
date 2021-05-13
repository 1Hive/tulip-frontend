import { getContract } from '../web3-contracts'
import { networkConfigs } from '../networks'
import erc20 from '../abi/ERC20.json'

export async function useCheckApprovedToken(tokenAddress, account, balance) {
  if (tokenAddress !== undefined && account !== undefined) {
    const contract = getContract(tokenAddress, erc20)
    const allowance = await contract.allowance(
      account,
      networkConfigs.rinkeby.honeyfarm
    )
    if (allowance.lt(balance)) {
      return false
    }
    return true
  }
}
