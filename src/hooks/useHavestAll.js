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
  return async () => {
    try {
      await contract.setApprovalForAll(network.multiWithdrawer, true)
      const res = await multiWithdrawerContract.withdrawRewardsFrom(ids)

      return res
    } catch (err) {
      serializeError(err)
    }
  }
}
