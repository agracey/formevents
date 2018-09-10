/* global fetch */

function attachValuesToQuestions (form, values) {
  return form.pages.reduce((acc, page) => {
    const pageAnswers = page.sections.reduce((ac, section) => {
      const sectionAnswers = section.questions
        .map(q => {
          const value = values[`${section.title.replace(' ', '_')}.${q.title.replace(' ', '_')}`]

          return {
            prompt: q.title,
            type: q.type,
            value,
            default: q.default,
            path: `${(page.title || '').replace(' ', '_')}.${section.title.replace(' ', '_')}.${q.title.replace(' ', '_')}`
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
    console.log('Submitting ', form, values)

    // Change to pending
    dispatch({type: 'SUBMIT_PENDING'})

    const answers = attachValuesToQuestions(form, values)

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
        last_submit: response.submit_id
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
