import React, { Component } from 'react'

export default class LoginForm extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      submitted: false
    }
  }


  render () {
    return (
      <div>
        <input
          type="email"
          value={this.state.username}
          onChange={this.handleUsernameChange}
          placeholder="Email Address"
        />
        <input
          type="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          placeholder="Password"
        />
        <button onClick={this.handleSubmit}>Sign in</button>
      </div>
    )
  }

  handleUsernameChange = (event) => {
    event.preventDefault()
    this.setState({
      username: event.target.value
    })
  }

  handlePasswordChange = (event) => {
    event.preventDefault()
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      submitted: true
    })

    this.props.handleSubmit(this.state.username, this.state.password)
  }
}
