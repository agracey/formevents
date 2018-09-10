/* global fetch */


export function buildGetFormList (dispatch) {
  return (token) => {
    dispatch({type: 'FORM_LIST_PENDING'})

    fetch('/api/formList').then(r => (r.json())).then(formList => {
      console.log('formList ', formList)
      dispatch({
        type: 'FORM_LIST_LOADED',
        formList
      })
    }).catch(error => {
      dispatch({
        type: 'FORM_LIST_FAILED',
        error
      })
    })
  }
}

export function buildLoginHandler (dispatch) {
  return (username, password) => {
    // Change to pending
    dispatch({type: 'LOGIN_PENDING'})
    console.log('Logging in', username, password)

    // Start submit
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accepts': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({username, password})
    }).then(r => (r.json())).then(authRes => {
      console.log('Logged in', authRes)

      dispatch({
        type: 'LOGIN_SUCCESS',
        token: authRes.token,
        uid: authRes.uid
      })

      buildGetFormList(dispatch)(authRes.token)
    }).catch(error => {
      console.log('not Logged in', error)
      dispatch({
        type: 'LOGIN_FAILED',
        error
      })
    })

    //
  }
}
