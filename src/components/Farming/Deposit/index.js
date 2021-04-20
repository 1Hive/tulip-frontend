import React from 'react'
import { Button } from '@1hive/1hive-ui'
import { useCreateDeposit } from '../../../providers/Poolprovider'

const Deposit = props => {
  const { token } = props
  const { tokenAmount } = props.depositInfo
  const deposit = useCreateDeposit(token, tokenAmount.toString())
  return (
    <Button
      css={`
        background: linear-gradient(90deg, #aaf5d4, #7ce0d6);
      `}
      label="Deposit"
      onClick={deposit}
      wide
    />
  )
}

export default Deposit
