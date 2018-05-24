// Config
import React from 'react'
import { CipherContext } from './CipherProvider'

function getCipherFragment(context, name, type) {
  let element = null
  switch(type) {
    case 'text':
      element = <input type={type} name={name} value={context.state.isDemo ? context.state.cipher[name].demoValue : context.state.cipher[name].value} onChange={context.state.handleInputChange} />
    break;
    
    case 'textarea':
      element = <textarea name={name} value={context.state.isDemo ? context.state.cipher[name].demoValue : context.state.cipher[name].value} onChange={context.state.handleInputChange}>{context.state.cipher[name].value}</textarea>
    break;
      
    case 'results':
      element = <textarea name="results" value={context.state.cipher.decryptedString}></textarea>
    break;
      
    default:
    break;
  }
  
  return (
    <label data-type={type}>
      <p>{context.state.cipher[name].label}</p>
      {element}
    </label>
  )
}

export const Results = () => {
  return (
    <CipherContext.Consumer>
      {(context) => (
        <React.Fragment>
          {getCipherFragment(context, 'results', 'results')}
        </React.Fragment>
      )}
    </CipherContext.Consumer>
  )
}

export const String = () => {
  return (
    <CipherContext.Consumer>
      {(context) => (
        <React.Fragment>
          {getCipherFragment(context, 'string', 'textarea')}
        </React.Fragment>
      )}
    </CipherContext.Consumer>
  )
}

export const Key = () => {
  return (
    <CipherContext.Consumer>
      {(context) => (
        <React.Fragment>
          {getCipherFragment(context, 'key', 'text')}
        </React.Fragment>
      )}
    </CipherContext.Consumer>
  )
}

export const Alphabet = (props) => {
  return (
    <CipherContext.Consumer>
      {(context) => (
        <React.Fragment>
          {getCipherFragment(context, 'alphabet', 'text')}
        </React.Fragment>
      )}
    </CipherContext.Consumer>
  )
}

export default Alphabet
