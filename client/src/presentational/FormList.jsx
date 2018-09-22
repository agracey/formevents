import React, { Component } from 'react'
import styled from 'styled-components'

const FormListContainer = styled.div`
  & > header {
    padding-left: 24px;
    padding-top: 24px;
    font-size: 32px;
    font-weight: bold;
  }
`

const FormOption = styled.div`
  padding: 16px;
  float: left;
  clear: both;

`
const FormName = styled.div`
  padding: 16px;
  float: left;
  clear: both;
`
const FormDescription = styled.div`
  padding: 16px;
  float: left;
  clear: both;
`

export default class FormList extends Component {
  render () {
    const formList = this.props.formList.map(this.renderFormOption)
    return (
      <FormListContainer>
        <header>Forms Available:</header>
        {formList}
      </FormListContainer>
    )
  }

  renderFormOption = ({title, description, formId}) => {
    return (
      <FormOption
        onClick={this.handleSelect.bind(this, title)}
      >
        <FormName>{title}</FormName>
        <FormDescription>{description}</FormDescription>
      </FormOption>
    )
  }

  handleSelect = (formId, event) => {
    event.preventDefault()
    this.props.handleSelect(formId)
  }
}
