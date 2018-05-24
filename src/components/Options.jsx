import React, { Component } from 'react'

export default class Options extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: false
    }
  }
  
  handleOptions() {
    const isOpen = !this.state.isOpen
    this.setState({
      isOpen: isOpen
    })
  }
  
  render() {
    return (
      <div className={this.state.isOpen ? "app-options expand" : "app-options"}>
        <i className="fas fa-ellipsis-v" onClick={this.handleOptions.bind(this)}></i>
        <div className="panel">{this.props.children}</div>
      </div>
    )
  }
}
