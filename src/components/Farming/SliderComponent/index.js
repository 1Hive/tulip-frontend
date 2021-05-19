import React, { useState, useEffect } from 'react'
import { GU, Slider } from '@1hive/1hive-ui'
import Styled from './slidercomponent.style'

const SliderComponent = props => {
  const [progress, setProgress] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const { timeLockMultiplier, timeLockConstant } = props
  const mult = (multiplier / 1e18 / 1e18 + 1).toFixed(2)
  useEffect(() => {
    if (props.type === 'tokenAmount') {
      props.onUpdate({
        type: props.type,
        amount: props.tokenAmount,
      })
    } else {
      props.onUpdate({
        type: props.type,
        amount: 0,
        multiplier: 1,
      })
    }
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
          {props.imgObj ? (
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
          ) : (
            <Styled.Multiplier>
              {mult}
              {' x'}
            </Styled.Multiplier>
          )}
        </div>
        <Slider
          value={progress}
          css={`
            width: 70%;
            margin-left: ${!props.imgObj ? 3 * GU : 0}px;
            padding-left: ${props.type === 'tokenAmount' ? '5px' : '0px'};
          `}
          onUpdate={value => {
            props.onUpdate({
              type: props.type,
              amount:
                props.type === 'tokenAmount'
                  ? (value * props.tokenAmount).toFixed(10)
                  : Math.floor(
                      (
                        progress * Math.floor(props.timeLock / 3600 / 24)
                      ).toFixed(0)
                    ),
              multiplier: props.type === 'timeLock' ? mult : null,
            })
            setProgress(value.toFixed(10))
            if (props.type === 'timeLock') {
              setMultiplier(
                Math.floor(progress * props.timeLock) * timeLockMultiplier +
                  timeLockConstant
              )
            }
          }}
        />
        <span
          css={`
            min-width: 15%;
          `}
        >
          {props.type === 'timeLock'
            ? `${Math.floor(
                (progress * Math.floor(props.timeLock / 3600 / 24)).toFixed(0)
              )} days`
            : (progress * props.tokenAmount).toFixed(3)}
        </span>
      </div>
    </React.Fragment>
  )
}

export default SliderComponent
