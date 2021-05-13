import { useContract } from '../web3-contracts'
import honeyFarm from '../abi/honeyfarm.json'
import { ethers } from 'ethers'
import { addresses } from '../constants/addresses'

export function useCreateDeposit(
  tokenAddress,
  amount,
  unlockTime = 0,
  referrer = '0x0000000000000000000000000000000000000000'
) {
  amount = amount !== '' ? ethers.utils.parseEther(amount) : amount
  const contract = useContract(addresses.honeyfarm, honeyFarm)
  return () => {
    return contract
      .createDeposit(tokenAddress, amount, unlockTime, referrer)
      .then(x => {
        return x
      })
      .catch(err => console.log(err))
  }
}
