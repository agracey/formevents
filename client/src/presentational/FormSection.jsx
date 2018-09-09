import React, { Component } from 'react'
import styled from 'styled-components'
import Question from 'containers/Question.jsx'

const SectionTitle = styled.header`
  padding-top: 16px;
  padding-left: 16px;
  padding-bottom: 16px;

  font-family: sans-serif;
  font-weight: bold;

`

const FormSectionContainer = styled.header`
  padding-top: 16px;
`

export default class FormSection extends Component {
  render () {
    const questions = this.props.section.questions
      .map(this.renderQuestion.bind(this))

    return (
      <FormSectionContainer>
        <SectionTitle>{this.props.section.title}</SectionTitle>
        {questions}
      </FormSectionContainer>
    )
  }

  renderQuestion (question, idx) {
    return (
      <Question
        page={this.props.page}
        section={this.props.section}
        question={question}
        key={'q' + idx}
      />
    )
  }
}
