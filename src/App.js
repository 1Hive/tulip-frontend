import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Main } from '@1hive/1hive-ui'
import theme from './theme-tulip'
// import AppLoader from './components/AppLoader'
import GlobalErrorHandler from './GlobalErrorHandler'
import MainView from './components/MainView'
import Routes from './Routes'
import { HCFarmConfigProvider } from './providers/HCFarmConfigProvider'
import { WalletProvider } from './providers/Wallet'
import './assets/css/overrides.css'

function App() {
  return (
    <WalletProvider>
      <HashRouter>
        <Main
          assetsUrl="./public/aragon-ui"
          layout={false}
          scrollView={false}
          theme={theme}
        >
          <GlobalErrorHandler>
            <HCFarmConfigProvider>
              <MainView>
                {/* <AppLoader> */}
                <Routes />
                {/* </AppLoader> */}
              </MainView>
            </HCFarmConfigProvider>
          </GlobalErrorHandler>
        </Main>
      </HashRouter>
    </WalletProvider>
  )
}

export default App
