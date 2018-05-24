// Config
import React from 'react'

// Components
import { Alphabet, Key, String, Results } from './Cipher'
import Submit from './Submit'

export const Interface = () => {
  return (
    <div className="interface">
      <Key />
      <Alphabet />
      <String />
      <Submit />
      <Results />
    </div>
  )
}

export default Interface
