import React from 'react'
import { useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n';
import { ToastHub, Toast, Button } from '@aragon/ui';

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <div>
      <Button onClick={onPresentConnectModal} {...props}>
        {TranslateString(292, 'Unlock Wallet')}
      </Button>
      <ToastHub>
        <Toast>
          {toast => (<Button onClick={() => toast("hello world")}>Click me</Button>)}
        </Toast>
      </ToastHub>
    </div>
     
  )
}

export default UnlockButton
