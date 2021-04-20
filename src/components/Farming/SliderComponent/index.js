import React, { useState } from 'react'
import { GU, Slider } from '@1hive/1hive-ui'

const SliderComponent = props => {
  const [progress, setProgress] = useState(1)
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
            <></>
          )}
        </div>
        <Slider
          value={progress}
          css={`
            width: 85%;
            margin-left: ${!props.imgObj ? 3 * GU : 0}px;
          `}
          onUpdate={value => {
            props.onUpdate({
              type: props.type,
              amount: (value * props.tokenAmount).toFixed(10),
            })
            setProgress(value.toFixed(10))
          }}
        />
        <span>{(progress * props.tokenAmount).toFixed(2)}</span>
      </div>
    </React.Fragment>
  )
}

export default SliderComponent
