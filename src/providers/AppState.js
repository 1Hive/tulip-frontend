import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

const AppStateContext = React.createContext()

function AppStateProvider({ children }) {
  const [connectionBoxOpened, setConnectionBoxOpened] = useState(false)

  return (
    <AppStateContext.Provider
      value={{
        connectionBoxOpened,
        setConnectionBoxOpened,
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

AppStateProvider.propTypes = {
  children: PropTypes.node,
}

function useAppState() {
  return useContext(AppStateContext)
}

export { AppStateProvider, useAppState }
