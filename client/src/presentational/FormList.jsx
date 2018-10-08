import React, { Component } from 'react'
import styled from 'styled-components'

const FormListContainer = styled.div`
  & > header {
    padding-top: 24px;
    font-size: 32px;
    font-weight: bold;
    margin-left: auto;
    margin-right: auto;
    width: -moz-fit-content;
    width: fit-content;
    font-family: sans-serif;
    padding-bottom: 24px;
  }
`

const FormOption = styled.div`
  float: left;
  clear: both;
  width:100%;
  border-top: solid 1px rgb(248,248,248);
  border-bottom: solid 1px rgb(248,248,248);

  display: grid;
  grid-template-columns: auto 32px;
  grid-gap: 8px;
  grid-template-areas:
    "title arrow"
    "description arrow";
`
const FormName = styled.div`
  grid-area: title;
  padding: 16px;
  float: left;
  clear: both;
  font-family: sans-serif;
  font-weight: bold;
`
const FormDescription = styled.div`
  grid-area: description;
  padding: 16px;
  padding-top: 0px;
  float: left;
  clear: both;
`

const ArrowRight = styled.i.attrs({
  className: 'fas fa-chevron-circle-right'
})`
  grid-area: arrow;
  width: 24px;
  height: 24px;
  justify-self: center;
  align-self: center;
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
        <ArrowRight />
      </FormOption>
    )
  }

  handleSelect = (formId, event) => {
    event.preventDefault()
    this.props.handleSelect(formId)
  }
}
