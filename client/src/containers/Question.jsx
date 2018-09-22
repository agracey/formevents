import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Input from 'presentational/Input.jsx'


const QuestionContainer = styled.section`
  margin-bottom: 16px;
  width: 100%;
  height: max-content;

  display: grid;
  grid-template-areas: "title info" "input input";

  grid-template-rows: 1fr 1fr;
  grid-template-columns: auto max-content;
`

const QuestionTitle = styled.div`
  grid-area: title;
  padding-left: 8px;
  font-style: 'sans-serif';

`
const QuestionInfo = styled.div`
  grid-area: info;
  padding-right: 8px;
`
const InputArea = styled.div`
  grid-area: input;
`

class Question extends Component {
  render () {
    return (
      <QuestionContainer>
        <QuestionTitle>{this.props.question.title}</QuestionTitle>
        {this.renderInfo()}
        {this.renderInput()}
      </QuestionContainer>
    )
  }

  renderInfo () {
    return (
      <QuestionInfo>Info</QuestionInfo>
    )
  }


  renderInput () {
    return (
      <InputArea>
        <Input
          schema={this.props.question}
          value={this.props.answer}
          onChange={this.handleChange.bind(this)}
        />
      </InputArea>
    )
  }

  handleChange (event) {
    event.preventDefault()
    this.props.updateValue(buildQuestionKey(this.props), event.target.value)
  }
}

function buildQuestionKey (props) {
  const key = [props.section.title, props.question.title]
    .map(a => a.split(' ').join('_')).join('.')

  return key
}


const mapStateToProps = (state, ownProps) => ({
  answer: state.formData[buildQuestionKey(ownProps)]
})

const mapDispatchToProps = dispatch => ({
  updateValue: (key, value) => (dispatch({ type: 'UPDATE_VALUE', key, value}))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question)
