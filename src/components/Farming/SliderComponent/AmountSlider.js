import React, { useState, useEffect } from 'react'
import { GU, Slider } from '@1hive/1hive-ui'
import { toFixed } from '../../../lib/math-utils'
// import Styled from './slidercomponent.style'

const AmountSlider = props => {
  const [progress, setProgress] = useState(0)
  const [amount, setAmount] = useState(0) // amount toFixed(3)

  const calculateAmount = progress => {
    const amount = progress * Number(props.tokenAmount)
    // cut of trailing numbers but make sure amount is not rounded up
    // const test = Number(amount.toString().match(/^-?\d+(?:\.\d{0,17})?/)[0])
    const fixedResult = toFixed(amount)
    // const test2 = test.toString()
    // const test2 = test.toString().match(/.(0+)?[1-9]{3}/g)
    const result = fixedResult
      .toString()
      .match(/[0-9]\.(0+)?[1-9]{1}[0-9]{1}[0-9]{1}/g)
      ? fixedResult.toString().match(/[0-9]\.(0+)?[1-9]{1}[0-9]{1}[0-9]{1}/g)[0]
      : 0
    // const test = amount.toString()
    return result
  }

  useEffect(() => {
    props.onUpdate({
      amount: calculateAmount(progress),
    })
  }, [])
  return (
    <React.Fragment>
      {props.pairTitle ? (
        <div
          css={`
            margin: 0 auto;
          `}
        >
          {props.pairTitle}
        </div>
      ) : (
        <></>
      )}

      <div
        css={`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding-top: ${2 * GU}px;
        `}
      >
        <div
          css={`
            display: flex;
            max-width: 15%;
          `}
        >
          <>
            <img
              src={props.imgObj.pair1}
              css={`
                height: ${3 * GU}px;
                width: ${props.type === 'timeLock' ? '75%' : 'unset'};
                transform: translateX(${!props.imgObj.pair2 ? '50' : '0'}%);
              `}
            />
            <img
              src={props.imgObj.pair2}
              css={`
                height: ${3 * GU}px;
                transform: translateX(
                  ${!props.imgObj.pair1 ? 1 * GU : -0.75 * GU}px
                );
              `}
            />{' '}
          </>
        </div>
        <Slider
          value={progress}
          css={`
            width: 70%;
            margin-left: ${!props.imgObj ? 3 * GU : 0}px;
            padding-left: ${props.type === 'tokenAmount' ? '5px' : '0px'};
          `}
          onUpdate={value => {
            const currentAmount = calculateAmount(value)
            setProgress(value)
            setAmount(currentAmount)
            props.onUpdate({
              amount: currentAmount,
            })
          }}
        />
        <span
          css={`
            min-width: 15%;
          `}
        >
          {amount}
        </span>
      </div>
    </React.Fragment>
  )
}

export default AmountSlider
