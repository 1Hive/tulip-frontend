import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import WalletLoader from './components/MyWallet/WalletLoader'
import Airdrop from './components/Airdrop/Airdrop'
import AirdropMerkle from './components/Airdrop/AirdropMerkle'
import Farm from './components/Farming/Farm'
import Swap from './components/Swap/Swap'
import Pool from './components/Pool/Pool'
import Lend from './components/Lend/Lend'
import { useEagerConnect } from './hooks/useEagerConnect'
import { useWallet } from './providers/Wallet'
import ComingSoon from './components/ComingSoon'

// Preferences
const GLOBAL_PREFERENCES_QUERY_PARAM = '?preferences=/'

export default function Routes() {
  useEagerConnect()

  const {
    account,
    _web3ReactContext: { chainId },
  } = useWallet()

  if (account && chainId === 137) {
    return (
      <Switch>
        <Redirect exact from="/" to="/wallet" />
        <Route path="/wallet" component={WalletLoader} />
        <Route exact path="/airdrop" component={ComingSoon} />
        <Route exact path="/farm" component={Farm} />
        <Route exact path="/swap" component={Swap} />
        <Route exact path="/pool" component={Pool} />
        <Route exact path="/lend" component={Lend} />
        <Redirect to="/wallet" />
      </Switch>
    )
  } else if (account && chainId === 4) {
    return (
      <Switch>
        <Redirect exact from="/" to="/wallet" />
        <Route path="/wallet" component={WalletLoader} />
        <Route exact path="/airdrop" component={AirdropMerkle} />
        <Route exact path="/farm" component={ComingSoon} />
        <Route exact path="/swap" component={Swap} />
        <Route exact path="/pool" component={Pool} />
        <Route exact path="/lend" component={Lend} />
        <Redirect to="/wallet" />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Redirect exact from="/" to="/wallet" />
        <Route path="/wallet" component={WalletLoader} />
        <Route exact path="/airdrop" component={Airdrop} />
        <Route exact path="/farm" component={Farm} />
        <Route exact path="/swap" component={Swap} />
        <Route exact path="/pool" component={Pool} />
        <Route exact path="/lend" component={Lend} />
        <Redirect to="/wallet" />
      </Switch>
    )
  }
}

export function getPreferencesSearch(screen) {
  return `${GLOBAL_PREFERENCES_QUERY_PARAM}${screen}`
}
