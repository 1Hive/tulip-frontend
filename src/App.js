import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Main, ToastHub } from '@1hive/1hive-ui'
import theme from './theme-court'
import AppLoader from './components/AppLoader'
import GlobalErrorHandler from './GlobalErrorHandler'
import MainView from './components/MainView'
import RequestPanel from './components/RequestPanel/RequestPanel'
import Routes from './Routes'
import { ActivityProvider } from './providers/ActivityProvider'
import { CourtClockProvider } from './providers/CourtClock'
import { CourtConfigProvider } from './providers/CourtConfig'
import { RequestQueueProvider } from './providers/RequestQueue'
import { WalletProvider } from './providers/Wallet'

function App() {
  return (
    <WalletProvider>
      <HashRouter>
        <ActivityProvider>
          <Main
            assetsUrl="./public/aragon-ui"
            layout={false}
            scrollView={false}
            theme={theme}
          >
            <GlobalErrorHandler>
              <ToastHub threshold={1} timeout={1500}>
                <CourtConfigProvider>
                  <CourtClockProvider>
                    <RequestQueueProvider>
                      <MainView>
                        <AppLoader>
                          <Routes />
                        </AppLoader>
                        <RequestPanel />
                      </MainView>
                    </RequestQueueProvider>
                  </CourtClockProvider>
                </CourtConfigProvider>
              </ToastHub>
            </GlobalErrorHandler>
          </Main>
        </ActivityProvider>
      </HashRouter>
    </WalletProvider>
  )
}

export default App
