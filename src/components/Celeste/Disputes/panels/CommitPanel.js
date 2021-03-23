import React, { useCallback, useRef, useState } from 'react'
import {
  Button,
  GU,
  IconCopy,
  IconDownload,
  Info,
  TextInput,
  textStyle,
  useToast,
  useTheme,
} from '@1hive/1hive-ui'
import useOneTimeCode from '../../../hooks/useOneTimeCode'
import { useWallet } from '../../../providers/Wallet'
import IconOneTimeCode from '../../../assets/IconOneTimeCode.svg'

const CommitPanel = React.memo(function CommitPanel({
  dispute,
  onCommit,
  onDone,
  outcome,
}) {
  const [codeSaved, setCodeSaved] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)
  const { account: connectedAccount } = useWallet()
  const { oneTimeCode, download } = useOneTimeCode()
  const toast = useToast()

  const handleCommit = useCallback(
    event => {
      event.preventDefault()

      onDone()
      return onCommit(
        connectedAccount,
        dispute.id,
        dispute.lastRoundId,
        outcome,
        oneTimeCode
      )
    },
    [
      connectedAccount,
      dispute.id,
      dispute.lastRoundId,
      onCommit,
      onDone,
      oneTimeCode,
      outcome,
    ]
  )

  const handleDownloadCode = useCallback(() => {
    download()
    setCodeSaved(true)
  }, [download])

  const handleCopyCode = useCallback(() => {
    setCodeCopied(true)
    toast('One-time-use code copied')
  }, [toast])

  return (
    <form onSubmit={handleCommit}>
      <OneTimeCode
        code={oneTimeCode}
        onDownload={handleDownloadCode}
        onCopy={handleCopyCode}
      />
      <InfoSection
        commitEndTime={dispute.nextTransition}
        copiedOrSaved={codeCopied || codeSaved}
      />
      <Button
        css={`
          margin-top: ${2 * GU}px;
        `}
        disabled={!(codeSaved || codeCopied)}
        onClick={handleCommit}
        type="submit"
        mode="strong"
        wide
      >
        Commit your vote
      </Button>
    </form>
  )
})

const OneTimeCode = React.memo(function OneTimeCode({
  code,
  onDownload,
  onCopy,
}) {
  const theme = useTheme()
  const inputRef = useRef(null)

  const handleInputFocus = useCallback(event => event.target.select(), [])

  const handleCopy = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus()

      try {
        document.execCommand('copy')
        onCopy()
      } catch (err) {
        console.error('Error copying the one-time-use code')
      }
    }
  }, [onCopy])

  return (
    <React.Fragment>
      <div
        css={`
          display: flex;
        `}
      >
        <img height={6 * GU} src={IconOneTimeCode} alt="" />
        <div
          css={`
            margin-left: ${2 * GU}px;
          `}
        >
          <h2
            css={`
              display: block;
              ${textStyle('body2')};
              font-weight: 600;
            `}
          >
            One-time-use code
          </h2>
          <span
            css={`
              display: block;
              ${textStyle('body2')};
              margin-top: ${1 * GU}px;
            `}
          >
            Please save the code displayed below for maximum security.
          </span>
        </div>
      </div>
      <div
        css={`
          margin-top: ${2 * GU}px;
        `}
      >
        <TextInput
          ref={inputRef}
          onFocus={handleInputFocus}
          multiline
          readOnly
          value={code}
          wide
          css={`
            height: ${10 * GU}px;
            padding: ${1.5 * GU}px ${2 * GU}px;
            ${textStyle('body1')};
            font-weight: 600;
            resize: none;
            &:read-only {
              color: ${theme.accent};
            }
          `}
        />
      </div>
      <div
        css={`
          margin-top: ${2 * GU}px;
          display: flex;
        `}
      >
        <Button
          css={`
            margin-right: ${2 * GU}px;
            flex-grow: 1;
          `}
          onClick={onDownload}
          icon={<IconDownload />}
          label="Download"
        />
        <Button
          css={`
            flex-grow: 1;
          `}
          onClick={handleCopy}
          icon={<IconCopy />}
          label="Copy"
        />
      </div>
    </React.Fragment>
  )
})

const InfoSection = React.memo(function InfoSection() {
  return (
    <Info
      css={`
        margin-top: ${2 * GU}px;
      `}
      title="Action requirement"
      mode="warning"
    >
      You must copy or download this code before you can commit your vote. You
      will later be asked to provide this same code to reveal your vote. Failure
      to provide the correct code will result in a monetary penalty to your
      account.
    </Info>
  )
})

export default CommitPanel
