import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Main } from '@1hive/1hive-ui'
import theme from './theme-tulip'
import GlobalErrorHandler from './GlobalErrorHandler'
import MainView from './components/MainView'
import Routes from './Routes'
import { WalletProvider } from './providers/Wallet'
import { PoolProvider } from './providers/Poolprovider'
import { QueryClientProvider, QueryClient } from 'react-query'
import './assets/css/overrides.css'

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <PoolProvider>
          <HashRouter>
            <Main
              assetsUrl="./public/aragon-ui"
              layout={false}
              scrollView={false}
              theme={theme}
            >
              <GlobalErrorHandler>
                <MainView>
                  {/* <AppLoader> */}
                  <Routes />
                  {/* </AppLoader> */}
                </MainView>
              </GlobalErrorHandler>
            </Main>
          </HashRouter>
        </PoolProvider>
      </WalletProvider>
    </QueryClientProvider>
  )
}

export default App
