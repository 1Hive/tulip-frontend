import React from 'react'
import { GU } from '@1hive/1hive-ui'
import WalletCard from './WalletCard'

import Borrowed from '../../assets/tulip/borrowed.svg'
import Farming from '../../assets/tulip/farming.svg'
import Lent from '../../assets/tulip/lent.svg'
import Pools from '../../assets/tulip/pools.svg'
import Staked from '../../assets/tulip/staked.svg'
import Wallet from '../../assets/tulip/wallet.svg'

function AssetCardList({ wallet }) {
  return (
    <div
      css={`
        display: inline-flex;
        flex-direction: row;
        padding: ${2 * GU}px;
        justify-content: space-between;
        width: 100%;
        flex-flow: row wrap;
      `}
    >
      <WalletCard icon={Wallet} title="Wallet" value={'$ ' + wallet} />
      <WalletCard icon={Staked} title="Staked" value="$ 0" />
      <WalletCard icon={Lent} title="Lent" value="$ 0" />
      <WalletCard icon={Pools} title="Pools" value="$ 0" />
      <WalletCard icon={Farming} title="Farming" value="$ 0" />
      <WalletCard icon={Borrowed} title="Borrowed" value="$ 0" isBorrow />
    </div>
  )
}

export default AssetCardList
