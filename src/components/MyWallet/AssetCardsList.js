import React from 'react'
import { GU } from '@1hive/1hive-ui'
import WalletCard from './WalletCard'

import Farming from '../../assets/tulip/farm_card.svg'
// import Lent from '../../assets/tulip/lent_card.svg'
import Pools from '../../assets/tulip/pool_card.svg'
// import Staked from '../../assets/tulip/staked_card.svg'
import Wallet from '../../assets/tulip/wallet_card.svg'

function AssetCardList({ walletData }) {
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
      <WalletCard
        icon={Wallet}
        title="Wallet"
        value={'$ ' + walletData.walletBalance}
      />
      {/* <WalletCard icon={Staked} title="Staked" value="$ 0" />
      <WalletCard icon={Lent} title="Lent" value="$ 0" /> */}
      <WalletCard
        icon={Pools}
        title="Pools"
        value={'$ ' + walletData.poolBalance}
      />
      <WalletCard
        icon={Farming}
        title="Farming"
        value={'$ ' + walletData.farmBalance}
      />
      {/* <WalletCard icon={Lent} title="Borrowed" value="$ 0" isBorrow /> */}
    </div>
  )
}

export default AssetCardList
