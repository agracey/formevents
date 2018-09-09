import React, { Component } from 'react'
import styled from 'styled-components'

const FormPaginationContainer = styled.section`
  &:after {
    content: '';
    display: table;
    clear: both;
  }
`

const Button = styled.button`
  float: ${props => props.side};

`

export default class FormPage extends Component {
  render () {
    return (
      <FormPaginationContainer>
        {this.renderLeftBtn()}
        {this.renderRightBtn()}
      </FormPaginationContainer>
    )
  }

  renderLeftBtn () {
    if (!this.props.leftText) return
    return (
      <Button onClick={this.props.onLeft} side="left">
        {this.props.leftText}
      </Button>
    )
  }

  renderRightBtn () {
    if (!this.props.rightText) return
    return (
      <Button onClick={this.props.onRight} side="right">
        {this.props.rightText}
      </Button>
    )
  }
}
