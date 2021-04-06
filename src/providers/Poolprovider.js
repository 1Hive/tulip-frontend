import React, { useContext } from 'react'
import { useQuery } from 'react-query'
// import { getNetworkConfig } from '../networks'
import { getContract } from '../web3-contracts'
import { addresses } from '../constants/addresses'
import honeyFarm from '../abi/honeyfarm.json'
import erc20 from '../abi/ERC20.json'
// import { ethers } from 'ethers'

const PoolContext = React.createContext()

const loadPoolData = async () => {
  const contract = getContract(addresses.honeyfarm, honeyFarm)
  // const SCALE = await contract.functions.SCALE()

  const poolLength = await contract.functions.poolLength()
  const poolLengthToNumber = poolLength[0].toNumber()
  const poolData = []
  for (let i = 0; i < poolLengthToNumber; i++) {
    const data = await contract.functions.getPoolByIndex(i)
    const c = getContract(data.poolToken, erc20)
    console.log(c)
    poolData.push({
      ...data,
      name: await c.name(),
      symbol: await c.symbol(),
    })
  }
  return poolData
}
export function PoolProvider({ children }) {
  const { data, status } = useQuery('loadPoolData', loadPoolData)
  const r = {
    data,
    status,
  }
  return <PoolContext.Provider value={r}>{children}</PoolContext.Provider>
}

export function usePoolProvider() {
  return useContext(PoolContext)
}
