import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import MyWallet from './components/MyWallet/MyWallet'
import Farm from './components/Farming/Farm'
import Swap from './components/Swap/Swap'
import Pool from './components/Pool/Pool'
import Lend from './components/Lend/Lend'

// Preferences
const GLOBAL_PREFERENCES_QUERY_PARAM = '?preferences=/'

export default function Routes() {
  return (
    <Switch>
      <Redirect exact from="/" to="/wallet" />
      <Route path="/wallet" component={MyWallet} />
      <Route exact path="/farm" component={Farm} />
      <Route exact path="/swap" component={Swap} />
      <Route exact path="/pool" component={Pool} />
      <Route exact path="/lend" component={Lend} />
      <Redirect to="/wallet" />
    </Switch>
  )
}

export function getPreferencesSearch(screen) {
  return `${GLOBAL_PREFERENCES_QUERY_PARAM}${screen}`
}
