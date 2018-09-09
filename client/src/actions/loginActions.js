/* global fetch */


export function buildGetFormList (dispatch) {
  return (token) => {
    dispatch({type: 'FORM_LIST_PENDING'})

    fetch('/api/formList').then(response => {
      const formList = JSON.parse(response)
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

    // Start submit
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({username, password})
    }).then(response => {
      const authRes = JSON.parse(response)
      dispatch({
        type: 'LOGIN_SUCCESS',
        token: authRes.token,
        uid: authRes.uid
      })

      buildGetFormList(dispatch)(authRes.token)
    }).catch(error => {
      dispatch({
        type: 'LOGIN_FAILED',
        error
      })
    })

    //
  }
}
