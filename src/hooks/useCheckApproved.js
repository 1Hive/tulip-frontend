import { getContract } from '../web3-contracts'
import { getNetworkConfig } from '../networks'
import erc20 from '../abi/ERC20.json'

export async function useCheckApprovedToken(
  tokenAddress,
  account,
  balance,
  chainId
) {
  if (tokenAddress !== undefined && account !== undefined && balance) {
    const contract = getContract(tokenAddress, erc20)
    const networkConfig = getNetworkConfig(chainId)
    const allowance = await contract.allowance(account, networkConfig.honeyfarm)
    if (allowance.lt(balance)) {
      return false
    }
    return true
  }
}
