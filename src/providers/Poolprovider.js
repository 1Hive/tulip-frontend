import React, { useContext } from 'react'
import { useQuery } from 'react-query'
// import { getNetworkConfig } from '../networks'
import { getContract } from '../web3-contracts'
import { addresses } from '../constants/addresses'
import honeyFarm from '../abi/honeyfarm.json'
import { ethers } from 'ethers'

const PoolContext = React.createContext()

const loadData = async () => {
  const contract = getContract(addresses.honeyfarm, honeyFarm)
  const poolInfo = await contract.functions.poolInfo(
    '0xa30ccf67b489d627de8f8c035f5b9676442646e0'
  )
  const lastTimestamp = poolInfo.lastRewardTimestamp.toNumber()
  let currentDate = new Date()
  currentDate = Math.floor(currentDate.getTime() / 1000)
  const dist = await contract.functions.getDist(lastTimestamp, currentDate)
  console.log('format ethers', ethers.utils.formatEther(dist[0].toString()))
  //   const numberOfTokens = dist[0].div(10 ** 10).div(10 ** 8)
  //   console.log('dist function', numberOfTokens.toString())
}
export function PoolProvider({ children }) {
  const { data, status } = useQuery('loadPoolData', loadData)
  console.log(data, status)
  return <PoolContext.Provider value={null}>{children}</PoolContext.Provider>
}

export function usePoolProvider() {
  return useContext(PoolContext)
}
