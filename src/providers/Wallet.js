import React, { useContext, useMemo } from 'react'
import { providers as EthersProviders } from 'ethers'
import {
  UseWalletProvider,
  useWallet,
  ConnectionRejectedError,
} from 'use-wallet'
// import { getUseWalletConnectors } from '../lib/web3-utils'
import env from '../environment'
import { getSupportedChains } from '../lib/web3-utils'

import {
  InjectedConnector,
  // NoEthereumProviderError as InjectedNoEthereumProviderError,
  UserRejectedRequestError as InjectedUserRejectedRequestError,
} from '@web3-react/injected-connector'

const WalletAugmentedContext = React.createContext()

function useWalletAugmented() {
  return useContext(WalletAugmentedContext)
}

// Adds Ethers.js to the useWallet() object
function WalletAugmented({ children }) {
  const wallet = useWallet()
  const { ethereum } = wallet
  const ethers = useMemo(() => {
    if (ethereum) {
      return new EthersProviders.Web3Provider(ethereum)
    } else {
      return null
    }
  }, [ethereum])
  const contextValue = useMemo(() => ({ ...wallet, ethers }), [wallet, ethers])
  if (window.ethereum) {
    window.ethereum.on('networkChanged', () => {
      window.location.reload()
    })
  }
  return (
    <WalletAugmentedContext.Provider value={contextValue}>
      {children}
    </WalletAugmentedContext.Provider>
  )
}

function WalletProvider({ children }) {
  return (
    <UseWalletProvider
      chainId={env('CHAIN_ID')}
      connectors={{
        injected: {
          web3ReactConnector({ chainId }) {
            return new InjectedConnector({
              supportedChainIds: getSupportedChains(),
            })
          },
          handleActivationError(err) {
            if (err instanceof InjectedUserRejectedRequestError) {
              return new ConnectionRejectedError()
            }
          },
        },
      }}
    >
      <WalletAugmented>{children}</WalletAugmented>
    </UseWalletProvider>
  )
}

export { useWalletAugmented as useWallet, WalletProvider }
