import React from 'react'
import { Modal } from '@1hive/1hive-ui'
import styled from 'styled-components'

const UserErrorScreen = props => {
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
      visible={props.isVisible}
      onClose={() => {
        props.onClose()
      }}
    >
      <ModalBody>{props.children}</ModalBody>
    </Modal>
  )
}

export default UserErrorScreen
