import React, { useContext } from 'react'
import PropTypes from 'prop-types'
// import { useHoneyCombConfigSubscription } from '../hooks/subscription-hooks'
// import { getNetworkConfig } from '../networks'

const HoneyCombConfigContext = React.createContext()

function HCFarmConfigProvider({ children }) {
  // const honeyCombAddress = getNetworkConfig().farm
  // const courtConfig = useHoneyCombConfigSubscription(honeyCombAddress)

  // Here will be exposed the farming configuration to be used as a value in the context.
  const farmConfig = ''
  return (
    <HoneyCombConfigContext.Provider value={farmConfig}>
      {children}
    </HoneyCombConfigContext.Provider>
  )
}

HCFarmConfigProvider.propTypes = {
  children: PropTypes.node,
}

function useHCFarmConfig() {
  return useContext(HoneyCombConfigContext)
}

export { HCFarmConfigProvider, useHCFarmConfig }
