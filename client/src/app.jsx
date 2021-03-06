import React, { Component } from 'react'
import { connect } from 'react-redux'
import { buildLoginHandler, buildGetFormList } from './actions/loginActions.js'
import { buildFormSelectionHandler, buildResetFormAfterSuccess } from './actions/formActions.js'

import styled, {ThemeProvider} from 'styled-components'

import Form from 'containers/Form.jsx'
import LoginForm from 'containers/LoginForm.jsx'
import FormList from 'presentational/FormList.jsx'
import defaultTheme from 'presentational/defaultTheme.js'
import FormSuccess from 'presentational/FormSuccess.jsx'

const PageContainer = styled.div`
  width: 100%
  height: 100%;
  background:  ${props => props.theme.backgroundColor};
`

const AppContainer = styled.div`
  max-width: 525px;
  height: 100%;
  background:  ${props => props.theme.foregroundColor};
  margin:auto
`

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pageIdx: 0
    }
    console.log('constructor: ', this.props)

    if (this.props.session.token && !this.props.form) props.getFormList(this.props.session.token)
  }

  render () {
    let comp = null
    console.log('props: ', this.props)
    if (!this.props.session.token) comp = this.renderLogin()
    else if (!this.props.form) comp = this.renderFormSelect()
    else if (this.props.session.show_success) comp = this.renderFormSuccess()

    const theme = (this.props.form && this.props.form.theme) ? this.props.form.theme : defaultTheme

    return (
      <ThemeProvider theme={theme}>
        <PageContainer>
          <AppContainer>
            {comp || this.renderForm()}
          </AppContainer>
        </PageContainer>
      </ThemeProvider>
    )
  }

  renderLogin () {
    return (
      <LoginForm
        handleSubmit={this.props.handleLogin.bind(this)}
      />
    )
  }

  renderForm () {
    return <Form
      form={this.props.form}
      values={this.props.values}
    />
  }

  renderFormSelect () {
    return (
      <FormList
        formList={this.props.session.formList || []}
        handleSelect={this.props.selectForm}
      />
    )
  }


  renderFormSuccess () {
    return (
      <FormSuccess
        submission_id={this.props.session.show_success}
        form={this.props.form}
        handleReset={() => {
          this.setState({pageIdx: 0})
          this.props.resetFormAfterSuccess()
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  form: state.currentForm,
  values: state.formData,
  session: state.session
})

const mapDispatchToProps = dispatch => ({
  handleLogin: buildLoginHandler(dispatch),
  selectForm: buildFormSelectionHandler(dispatch),
  getFormList: buildGetFormList(dispatch),
  resetFormAfterSuccess: buildResetFormAfterSuccess(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
