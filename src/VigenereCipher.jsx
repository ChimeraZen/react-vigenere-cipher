import React, { Component } from 'react'

import CipherProvider from './components/CipherProvider'
import Header from './components/Header'
import Interface from './components/Interface'

import './components/assets/default.css'

export default class VigenereCipher extends Component {
  constructor() {
    super()
    this.state = {
      header: 'React Vigenère Cipher',
      options: {
        isDemo: false,
        isThemeLight: true
      },
      buttons: {
        reset: {
          label: 'Reset'
        },
        decrypt: {
          label: 'Decrypt'
        },
        encrypt: {
          label: 'Encrypt'
        }
      },
      cipher: {
        alphabet: {
          demoValue: 'KRYPTOSABCDEFGHIJLMNQUVWXZ',
          label: 'Alphabet',
          value: ''
        },
        key: {
          demoValue:  'PALIMPSEST',
          label:      'Key',
          value:      ''
        },
        string: {
          demoValue:  'EMUFPHZLRFAXYUSDJKZLDKRNSHGNFIVJYQTQUXQBQVYUVLLTREVJYQTMKYRDMFD',
          label:      'Encrypted Text',
          value:      ''
        },
        results: {
          label:  'Results',
          value:  ''
        },
        decryptedString:  ''
      },
      
      // Cipher functions
      handleDecrypt: this.handleDecrypt.bind(this),
      handleEncrypt: this.handleEncrypt.bind(this),
      handleInputChange: this.handleInputChange.bind(this),
      handleReset: this.handleReset.bind(this),
      
      // Options-related functions
      handleOptions: this.handleOptions.bind(this),
      handleDemo: this.handleDemo.bind(this),
      handleTheme: this.handleTheme.bind(this)
    }
  }
  
  handleDecrypt() {
    // Create encrypted alphabet
    const encryptedAlphabet = []
    for(let i = 0; i < this.state.cipher.key.value.length; i++) {
      const cipherKeyChar = this.state.cipher.key.value.substr(i, 1)
      for(let ii = 0; ii < 26; ii++) {
        const cipherAlphabet = this.state.cipher.alphabet.value
        const cipherAlphabetChar = cipherAlphabet.substr(ii, 1)
        if (cipherKeyChar === cipherAlphabetChar) {
          encryptedAlphabet.push(cipherAlphabet.substring(cipherAlphabet.indexOf(cipherKeyChar)) + cipherAlphabet.substring(parseInt('-' + cipherAlphabet.indexOf(cipherKeyChar), 10), ii))
        }
      }
    }
    
    // Begin decrypting using encrypted alphabet keys
    let charCount = 0
    let encryptedStringChar = ''
    let decryptedAlphabet = ''
    let decryptedString = ''
    for (let i = 0; i < this.state.cipher.string.value.length; i++) {
      if (charCount < this.state.cipher.key.value.length) {
        encryptedStringChar = this.state.cipher.string.value.substring(i + 1, i)
        decryptedAlphabet = encryptedAlphabet[charCount].toString().indexOf(encryptedStringChar)
        decryptedString += this.state.cipher.alphabet.value.substring(decryptedAlphabet + 1, decryptedAlphabet)
        charCount++
      } else {
        charCount = 0
        encryptedStringChar = this.state.cipher.string.value.substring(i + 1, i)
        decryptedAlphabet = encryptedAlphabet[charCount].toString().indexOf(encryptedStringChar)
        decryptedString += this.state.cipher.alphabet.value.substring(decryptedAlphabet + 1, decryptedAlphabet)
        charCount++
      }
    }
    this.setState(prevState => {
      return {
        cipher: {
          ...prevState.cipher,
          decryptedString: decryptedString
        }
      }
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
      cipher.alphabet.value = this.state.cipher.alphabet.demoValue
      cipher.key.value = this.state.cipher.key.demoValue
      cipher.string.value = this.state.cipher.string.demoValue
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
  
  handleEncrypt() {
    
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
          <Interface />
        </div>
      </CipherProvider>
    )
  }
}
