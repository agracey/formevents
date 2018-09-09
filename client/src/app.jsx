import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginActions } from './actions/loginActions.js'
import { formActions } from './actions/loginActions.js'

import styled, {ThemeProvider} from 'styled-components'

import Form from 'containers/Form.jsx'
import defaultTheme from 'presentational/defaultTheme.js'

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
  constructor () {
    super()
    this.state = {
      pageIdx: 0
    }
  }

  render () {
    let comp = null
    if (!this.props.session.token) comp = this.renderLogin()
    if (!this.props.form) comp = this.renderFormSelect()

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
      <button onClick={this.handleLogin.bind(this)}>Click here to login</button>
    )
  }

  renderForm () {
    return <Form form={this.props.form} values={this.props.values}/>
  }

  renderFormSelect () {
    return <div>LocationSelect</div>
  }

  handleLogin () {
    this.props.setToken('blah', 'password')
  }
}

const mapStateToProps = state => ({
  form: state.currentForm,
  values: state.formData,
  session: state.session
})

const mapDispatchToProps = dispatch => ({
  setToken: loginActions.buildLoginHandler(dispatch),
  selectForm: formActions.buildFormSelectionHandler(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
