import React, { useState } from 'react'
import { Slider } from '@1hive/1hive-ui'

const SliderComponent = props => {
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
        `}
      >
        <div>
          <img src={props.image1} />
          <img src={props.image2} />
        </div>
        <Slider
          value={progress}
          css={`
            width: 90%;
          `}
          onUpdate={value => setProgress(value)}
        />
        <span>100</span>
      </div>
    </React.Fragment>
  )
}

export default SliderComponent
