import React, { Component } from 'react'
import styled from 'styled-components'
import FormSection from 'presentational/FormSection.jsx'

const PageTitle = styled.header`
`

const FormPageContainer = styled.header``

export default class FormPage extends Component {
  render () {
    const sections = this.props.page.sections
      .map(this.renderSection.bind(this))

    return (
      <FormPageContainer>
        <PageTitle>{this.props.page.title}</PageTitle>
        {sections}
      </FormPageContainer>
    )
  }

  renderSection (section, idx) {
    return (
      <FormSection page={this.props.page} section={section} key={'section' + idx}/>
    )
  }
}
