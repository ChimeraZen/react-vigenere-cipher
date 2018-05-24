import React, { Component } from 'react'

export const CipherContext = React.createContext()

export default class CipherProvider extends Component {
	render() {
  	return(
    	<CipherContext.Provider value={{state: this.props.state}}>
        {this.props.children}
      </CipherContext.Provider>
    )
  }
}
