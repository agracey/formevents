/* global fetch */

export function buildSubmitHandle (dispatch) {
  return (values) => {
    // Change to pending
    dispatch({type: 'SUBMIT_PENDING'})

    // Start submit
    fetch('/api/answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(values)
    }).then(response => {
      dispatch({
        type: 'SUBMIT_SUCCESS',
        last_submit: JSON.parse(response).submit_id
      })
    }).catch(error => {
      dispatch({
        type: 'SUBMIT_FAILED',
        error
      })
    })

    //
  }
}

export function buildFormSelectionHandler (dispatch) {
  return (formId) => {
    dispatch({type: 'FORM_LOAD_PENDING'})

    fetch(`/api/form?formId=${formId}`).then(response => {
      const form = JSON.parse(response)
      dispatch({
        type: 'FORM_LOADED',
        form
      })
    }).catch(error => {
      dispatch({
        type: 'FORM_LOAD_FAILED',
        error
      })
    })
  }
}
