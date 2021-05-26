import React, { useState, useEffect } from 'react'
import { Modal } from '@1hive/1hive-ui'
import error from '../../assets/error.svg'
import styled from 'styled-components'

const UserErrorScreen = props => {
  const [visible, setVisible] = useState()

  useEffect(() => {
    setVisible(props.isVisible)
  }, [props.isVisible])
  console.log(visible)

  const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > * {
      margin: 20px 0;
    }
  `
  return (
    <Modal
      visible={visible}
      onClose={() => {
        setVisible(false)
        props.onClose()
      }}
    >
      <ModalBody>
        <img src={error} />
        {props.children}
      </ModalBody>
    </Modal>
  )
}

export default UserErrorScreen
