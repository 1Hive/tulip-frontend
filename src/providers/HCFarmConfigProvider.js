import React, { useContext } from 'react'
import PropTypes from 'prop-types'
// import { useHoneyCombConfigSubscription } from '../hooks/subscription-hooks'
// import { getNetworkConfig } from '../networks'

const HoneycombConfigContext = React.createContext()

function HCFarmConfigProvider({ children }) {
  // const honeyCombAddress = getNetworkConfig().farm
  // const courtConfig = useHoneyCombConfigSubscription(honeyCombAddress)

  // Here will be exposed the farming configuration to be used as a value in the context.
  const farmConfig = ''
  return (
    <HoneycombConfigContext.Provider value={farmConfig}>
      {children}
    </HoneycombConfigContext.Provider>
  )
}

HCFarmConfigProvider.propTypes = {
  children: PropTypes.node,
}

function useHCFarmConfig() {
  return useContext(HoneycombConfigContext)
}

export { HCFarmConfigProvider, useHCFarmConfig }
