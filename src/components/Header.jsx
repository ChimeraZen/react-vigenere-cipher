import React from 'react'
import { CipherContext } from './CipherProvider'

import Options from './Options'
import Slider from './Toggles'

export const Header = (props) => {
  return (
    <CipherContext.Consumer>
      {(context) => (
        <React.Fragment>
          <div className="header">
            <h2>{context.state.header}</h2>
            <Options>
              <ul>
                <li onClick={context.state.handleDemo}>
                  <span>Demo</span>
                  <Slider isOn={context.state.options.isDemo} true="On" false="Off" />
                </li>
                <li onClick={context.state.handleTheme}>
                  <span>Theme</span>
                  <Slider isOn={context.state.options.isThemeLight} true="Light" false="Dark"/>
                </li>
              </ul>
            </Options>
          </div>
        </React.Fragment>
      )}
    </CipherContext.Consumer>
  )
}

export default Header
