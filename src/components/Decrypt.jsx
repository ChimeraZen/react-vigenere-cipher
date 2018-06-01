import React, { Component } from 'react'
import { CipherContext } from './CipherProvider'

export default class Decrypt extends Component {
  render() {
    return (
      <CipherContext.Consumer>
        {(context) => (
          <React.Fragment>
            <form onSubmit={context.state.handleResults}>
              <label data-type='text'>
                <p>{context.state.cipher.key.label}</p>
                <input 
                  type='text' 
                  name='key' 
                  value={context.state.isDemo ? context.state.demo.key.value : context.state.cipher.key.value} 
                  onChange={context.state.handleInputChange} 
                  placeholder=" "
                  required 
                />
              </label>
              <label data-type='text'>
                <p>{context.state.cipher.alphabet.label}</p>
                <input 
                  type='text' 
                  name='alphabet' 
                  value={context.state.isDemo ? context.state.demo.alphabet.value : context.state.cipher.alphabet.value} 
                  onChange={context.state.handleInputChange} 
                  placeholder=" "
                  required 
                />
              </label>
              <label data-type='textarea'>
                <p>{context.state.cipher.string.decryptLabel}</p>
                <textarea 
                  name='string' 
                  value={context.state.isDemo ? context.state.demo.string.decryptValue : context.state.cipher.string.value} 
                  onChange={context.state.handleInputChange} 
                  required 
                />
              </label>
              <label data-type='textarea'>
                <p>{context.state.cipher.results.label}</p>
                <textarea 
                  name='results' 
                  value={context.state.cipher.results.value} 
                />
              </label>
              <div className="submit">
                <button type="reset" onClick={context.state.handleReset}>Reset</button>
                <button type="submit">Decrypt</button>
              </div>
            </form>
          </React.Fragment>
        )}
      </CipherContext.Consumer>
    )
  }
}
