import React, { useState } from 'react'
import { GU, Slider } from '@1hive/1hive-ui'

const SliderComponent = props => {
  console.log(props)
  const [progress, setProgress] = useState(0)
  return (
    <React.Fragment>
      <span>How many {props.pairTitle} tokens do you want to deposit?</span>
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
          <img
            src={props.imgObj.pair1}
            css={`
              max-height: ${3 * GU}px;
              transform: translateX(${!props.imgObj.pair2 ? '50' : '0'}%);
            `}
          />
          <img
            src={props.imgObj.pair2}
            css={`
              max-height: ${3 * GU}px;
              transform: translateX(
                ${!props.imgObj.pair1 ? 1 * GU : -0.75 * GU}px
              );
            `}
          />
        </div>
        <Slider
          value={progress}
          css={`
            width: 85%;
          `}
          onUpdate={value => setProgress(value.toFixed(2))}
        />
        <span>{progress}</span>
      </div>
    </React.Fragment>
  )
}

export default SliderComponent
