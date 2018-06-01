import React, { Component } from 'react'
import { CipherContext } from './CipherProvider'

export default class Mode extends Component {
  render() {
    return (
      <CipherContext.Consumer>
        {(context) => (
          <React.Fragment>
            <div className="mode">
              <span data-type="decrypt" className={context.state.options.isDecrypt ? "active" : null} onClick={context.state.handleMode}>Decrypt</span>
              <span data-type="encrypt" className={!context.state.options.isDecrypt ? "active" : null} onClick={context.state.handleMode}>Encrypt</span>
            </div>
          </React.Fragment>
        )}
      </CipherContext.Consumer>
    )
  }
}
