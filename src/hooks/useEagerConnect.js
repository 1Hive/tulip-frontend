import { useState, useEffect } from 'react'
import { useWallet } from 'use-wallet'

const useEagerConnect = () => {
  const {
    _web3ReactContext,
    connectors,
    _web3ReactContext: { chainId },
  } = useWallet()
  const { activate, active } = _web3ReactContext
  const injected = connectors.injected.web3ReactConnector({ chainId: chainId })
  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then(isAuthorized => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    })
  }, []) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return tried
}

export { useEagerConnect }
