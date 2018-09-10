import { combineReducers } from 'redux'

// Handle browser refresh
const sessionOnLoad = {
  token: window.localStorage.getItem('token') || null,
  uid: window.localStorage.getItem('uid') || ''
}

function session (state = sessionOnLoad, action) {
  if (action.type === 'LOGIN_SUCCESS') {
    // Save for browser refresh
    window.localStorage.setItem('token', action.token)
    window.localStorage.setItem('uid', action.uid)

    return Object.assign({}, state, {
      token: action.token,
      uid: action.uid
    })
  }

  if (action.type === 'LOGIN_CLEARED') {
    // Save for browser refresh
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('uid')

    return Object.assign({}, state, {token: '', name: ''})
  }

  if (action.type === 'FORM_LIST_LOADED') {
    return Object.assign({}, state, {formList: action.formList})
  }

  return state
}


const initialForm = JSON.parse(window.localStorage.getItem('form') || 'null')

function currentForm (state = initialForm, action) {
  if (action.type === 'FORM_LOADED') {
    return action.form
  }

  if (action.type === 'FORM_UNLOADED') {
    return null
  }

  return state
}

function formData (state = {}, action) {
  if (action.type === 'UPDATE_VALUE') {
    const changes = {}
    changes[action.key] = action.value
    state = Object.assign({}, state, changes)
  }

  if (action.type === 'RESET_VALUES' || action.type === 'FORM_SUBMITTED') {
    return {}
  }

  return state
}

export default combineReducers({session, currentForm, formData})
