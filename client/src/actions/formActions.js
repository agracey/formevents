/* global fetch */

export function attachValuesToQuestions (form, values) {
  return form.pages.reduce((acc, page) => {
    const pageAnswers = page.sections.reduce((ac, section) => {
      const sectionAnswers = section.questions
        .map(q => {
          const value = values[`${section.title.split(' ').join('_')}.${q.title.split(' ').join('_')}`]

          return {
            prompt: q.title,
            type: q.type,
            value,
            default: q.default,
            path: `${(page.title || '').split(' ').join('_')}.${section.title.split(' ').join('_')}.${q.title.split(' ').join('_')}`
          }
        })
        .filter(q => (q.value))
      return ac.concat(sectionAnswers)
    }, [])

    return acc.concat(pageAnswers)
  }, [])
}

export function buildSubmitHandle (dispatch) {
  return (form, values) => {
    // Change to pending then process
    dispatch({type: 'SUBMIT_PENDING'})

    const answers = attachValuesToQuestions(form, values)

    console.log(form, values, answers)

    // Start submit
    fetch('/api/answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({formTitle: form.title, answers})
    }).then(r => (r.json())).then(response => {
      dispatch({
        type: 'SUBMIT_SUCCESS',
        submissionId: response.submissionId
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

    fetch(`/api/form/${encodeURI(formId)}`).then(r => (r.json())).then(form => {
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

export function buildResetFormAfterSuccess (dispatch) {
  return () => {
    dispatch({type: 'RESET_AFTER_SUBMIT'})
  }
}
