import React, { Component } from 'react'

import CipherProvider from './components/CipherProvider'
import Header from './components/Header'
import Decrypt from './components/Decrypt'
import Encrypt from './components/Encrypt'
import Mode from './components/Mode'

import './components/assets/default.css'

export default class VigenereCipher extends Component {
  constructor() {
    super()
    this.state = {
      header: 'React Vigenère Cipher',
      options: {
        isDemo: false,
        isDecrypt: true,
        isThemeLight: true
      },
      cipher: {
        alphabet: {
          label: 'Alphabet',
          value: ''
        },
        key: {
          label: 'Key',
          value: ''
        },
        string: {
          decryptLabel: 'Encrypted Text',
          encryptLabel: 'Plain Text',
          label: '',
          value: ''
        },
        results: {
          label: 'Results',
          value: ''
        },
        decryptedString: ''
      },
      demo: {
        alphabet: {
          value: 'KRYPTOSABCDEFGHIJLMNQUVWXZ'
        },
        key: {
          value: 'PALIMPSEST'
        },
        string: {
          decryptValue: 'EMUFPHZLRFAXYUSDJKZLDKRNSHGNFIVJYQTQUXQBQVYUVLLTREVJYQTMKYRDMFD',
          encryptValue: 'BETWEENSUBTLESHADINGANDTHEABSENCEOFLIGHTLIESTHENUANCEOFIQLUSION'
        }
      },
      
      // Cipher functions
      handleResults: this.handleResults.bind(this),
      handleInputChange: this.handleInputChange.bind(this),
      handleMode: this.handleMode.bind(this),
      handleReset: this.handleReset.bind(this),
      
      // Options-related functions
      handleOptions: this.handleOptions.bind(this),
      handleDemo: this.handleDemo.bind(this),
      handleTheme: this.handleTheme.bind(this)
    }
  }
  
  handleResults(e) {
    e.preventDefault()
  
    // Create and return an array of keyed alphabets
    const keyedAlphabets = []
    for(let i = 0; i < this.state.cipher.key.value.length; i++) {
      const cipherKeyChar = this.state.cipher.key.value.substr(i, 1)
      for(let ii = 0; ii < 26; ii++) {
        const cipherAlphabet = this.state.cipher.alphabet.value
        const cipherAlphabetChar = cipherAlphabet.substr(ii, 1)
        if (cipherKeyChar === cipherAlphabetChar) {
          keyedAlphabets.push(cipherAlphabet.substring(cipherAlphabet.indexOf(cipherKeyChar)) + cipherAlphabet.substring(parseInt('-' + cipherAlphabet.indexOf(cipherKeyChar), 10), ii))
        }
      }
    }
    
    // Begin decrypting using encrypted alphabet keys
    let currentKeyCharIndex = 0
    let decryptedString = ''
    
    // For the length of the encrypted text
    for (let i = 0; i < this.state.cipher.string.value.length; i++) {
      
      // If the current character index is greater than the length of the key; return to 0
      currentKeyCharIndex = currentKeyCharIndex >= this.state.cipher.key.value.length ? 0 : currentKeyCharIndex
        
      // Current character in the plaintext
      const currentStringChar = this.state.cipher.string.value.substring(i + 1, i)
      
      
      // The index of currentStringChar in the current keyed alphabet
      const encryptedCharIndex = this.state.options.isDecrypt 
        ? /* Decryption */ keyedAlphabets[currentKeyCharIndex].toString().indexOf(currentStringChar) 
        : /* Encryption */ this.state.cipher.alphabet.value.indexOf(currentStringChar)
      
      // Encryption works fine. Breaks on Decryption

      // Add the new character to the final results and increase currentKeyCharIndex
      const stringToUse = this.state.options.isDecrypt 
        ? this.state.cipher.alphabet.value 
        : keyedAlphabets[currentKeyCharIndex].toString()
      
      decryptedString += stringToUse.substring(encryptedCharIndex + 1, encryptedCharIndex)
      currentKeyCharIndex++
    }
    
    const cipher = this.state.cipher
    cipher.results.value = decryptedString
    
    this.setState({
      cipher: cipher
    })
  }
  
  handleDemo() {
    const isDemo = !this.state.options.isDemo
    const cipher = this.state.cipher
    cipher.alphabet.value = ''
    cipher.key.value = ''
    cipher.string.value = ''
    cipher.decryptedString = ''
    
    if(isDemo) {
      cipher.alphabet.value = this.state.demo.alphabet.value
      cipher.key.value = this.state.demo.key.value
      cipher.string.value = this.state.options.isDecrypt ? this.state.demo.string.decryptValue : this.state.demo.string.encryptValue
    }
    
    this.setState(prevState => {
      return {
        options: {
          ...prevState.options,
          isDemo: isDemo
        },
        cipher:cipher
      }
    })
  }
  
  handleInputChange(e) {
    const name = e.target.name
    const value = this.sanitizeString(e.target.value) // Allow only alphanumerics
    const cipher = this.state.cipher
    cipher[name].value = value
    
    this.setState({
      cipher: cipher
    })
  }
  
  handleMode(e) {
    const isDemo = this.state.options.isDemo
    const isDecrypt = e.target.getAttribute('data-type') === 'decrypt' ? true : false
    const cipher = this.state.cipher
    cipher.alphabet.value = isDemo ? this.state.demo.alphabet.value : ''
    cipher.key.value = isDemo ? this.state.demo.key.value : ''
    cipher.string.value = isDemo 
      ? isDecrypt 
        ? this.state.demo.string.decryptValue 
        : this.state.demo.string.encryptValue 
      : ''
    
    cipher.results.value = ''
    
    this.setState(prevState => {
      return {
        options: {
          ...prevState.options,
          isDecrypt: isDecrypt
        },
        cipher: cipher
      }
    })
  }
  
  handleOptions() {
    const isOpen = !this.state.options.isOpen
    this.setState(prevState => {
      return {
        options: {
          ...prevState.options,
          isOpen: isOpen
        }
      }
    })
  }
  
  handleReset() {
    const cipher = this.state.cipher
    cipher.alphabet.value = this.state.options.isDemo ? this.state.cipher.alphabet.demoValue : ''
    cipher.key.value = this.state.options.isDemo ? this.state.cipher.key.demoValue : ''
    cipher.string.value = this.state.options.isDemo ? this.state.cipher.string.demoValue : ''
    cipher.decryptedString = ''
    
    this.setState({
      cipher: cipher
    })
  }
  
  handleTheme() {
    const isThemeLight = !this.state.options.isThemeLight
    
    this.setState(prevState => {
      return {
        options: {
          ...prevState.options,
          isThemeLight: isThemeLight
        }
      }
    })
  }
  
  sanitizeString(str) {
	 return str.replace(/([^A-Za-z])|(?:\r\n|\r|\n)/gi, "");
  }
  
  render() {
    return (
      <CipherProvider state={this.state}>
        <div id="react-vigenere-cipher" className={this.state.options.isThemeLight ? "light" : "dark"}>
          <Header />
          <Mode />
          {
            this.state.options.isDecrypt 
            ? <Decrypt /> 
            : <Encrypt />
          }
        </div>
      </CipherProvider>
    )
  }
}
