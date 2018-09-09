import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    if (!this.props.session.location) comp = this.renderLocationSelect()


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

  renderLocationSelect () {
    return <div>LocationSelect</div>
  }

  renderForm () {
    return <Form form={this.props.form} values={this.props.values}/>
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
  setToken: (uname, pass) => {
    dispatch({type: 'LOGIN_SUCCEEDED', token: 'SOME_TOKEN', name: 'Andrew', uname, pass})
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
