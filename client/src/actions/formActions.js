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
