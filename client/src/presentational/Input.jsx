import React, { Component } from 'react'
// import styled from 'styled-components'


export default class Input extends Component {
  render () {
    switch (this.props.schema.type) {
    default:
      return this.renderTextInput()
    }
  }

  renderTextInput () {
    return (
      <input
        type="text"
        value={this.props.value || ''}
        onChange={this.props.onChange}
      />
    )
  }
}
