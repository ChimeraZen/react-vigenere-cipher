import React from 'react'
import { CipherContext } from './CipherProvider'

export const Submit = (props) => {
  return (
    <CipherContext.Consumer>
      {(context) => (
        <React.Fragment>
          <div className="submit">
            <button onClick={context.state.handleReset}>{context.state.buttons.reset.label}</button>
            <button onClick={context.state.handleDecrypt}>{context.state.buttons.decrypt.label}</button>
          </div>
        </React.Fragment>
      )}
    </CipherContext.Consumer>
  )
}

export default Submit
