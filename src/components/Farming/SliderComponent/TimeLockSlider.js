import React, { useState, useEffect } from 'react'
import { GU, Slider } from '@1hive/1hive-ui'
import Styled from './slidercomponent.style'

const TimeLockSlider = props => {
  const [progress, setProgress] = useState(0)
  const [days, setDays] = useState(0) // timelock in days Math.floor
  const [multiplier, setMultiplier] = useState(1) // multiplier - derived from days toFixed(2)

  const { timeLockMultiplier, timeLockConstant, maxDays } = props

  const calculateDays = progress => {
    return Math.floor(progress * maxDays)
  }

  const calculateMultiplier = days => {
    return (
      (days * 3600 * 24 * timeLockMultiplier + timeLockConstant) / 1e18 / 1e18 +
      1
    ).toFixed(2)
  }

  useEffect(() => {
    props.onUpdate({
      amount: 0,
      multiplier: 1,
    })
  }, [])
  return (
    <React.Fragment>
      <div
        css={`
          margin: 0 auto;
        `}
      >
        {props.pairTitle}
      </div>
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
          <Styled.Multiplier>
            {multiplier}
            {' x'}
          </Styled.Multiplier>
        </div>
        <Slider
          value={progress}
          css={`
            width: 70%;
            margin-left: ${!props.imgObj ? 3 * GU : 0}px;
            padding-left: 0px;
          `}
          onUpdate={value => {
            setProgress(value)

            const currentDays = calculateDays(value)
            setDays(currentDays)

            const currentMultiplier = calculateMultiplier(currentDays)
            setMultiplier(currentMultiplier)

            props.onUpdate({
              days: currentDays,
              multiplier: currentMultiplier,
            })
          }}
        />
        <span
          css={`
            min-width: 15%;
          `}
        >
          {days}
        </span>
      </div>
    </React.Fragment>
  )
}

export default TimeLockSlider
