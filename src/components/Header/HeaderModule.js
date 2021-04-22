import React from 'react'
import {
  ButtonBase,
  GU,
  IconDown,
  useTheme,
  useViewport,
} from '@1hive/1hive-ui'
function HeaderModule({ icon, content, onClick }) {
  const { above } = useViewport()
  const theme = useTheme()

  return (
    <ButtonBase
      onClick={onClick}
      css={`
        height: 100%;
        padding: 0 ${1 * GU}px;
        &:active {
          background: ${theme.surfacePressed};
        }
      `}
    >
      <div
        css={`
          height: 70%;
          display: flex;
          align-items: center;
          text-align: left;
          padding: 0 ${1 * GU}px;
          background: linear-gradient(268.53deg, #aaf5d4, #7ce0d6);
          border-radius: ${8.3 * GU}px;
        `}
      >
        <>
          {icon}
          {above('medium') && (
            <React.Fragment>
              <div
                css={`
                  padding-left: ${1 * GU}px;
                  padding-right: ${0.5 * GU}px;
                `}
              >
                {content}
              </div>
              <IconDown
                size="small"
                css={`
                  color: ${theme.surfaceIcon};
                `}
              />
            </React.Fragment>
          )}
        </>
      </div>
    </ButtonBase>
  )
}

export default HeaderModule
