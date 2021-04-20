import React from 'react'
import { Button } from '@1hive/1hive-ui'
import { useApprove } from '../../../providers/Poolprovider'
const Approve = props => {
  const balanceToEth = props.amount.balance
  const approve = useApprove(props.token, balanceToEth)
  return (
    <Button
      css={`
        background: linear-gradient(90deg, #aaf5d4, #7ce0d6);
      `}
      label="Approve"
      wide
      onClick={approve}
    />
  )
}

export default Approve
