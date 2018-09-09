import { combineReducers } from 'redux'



function session (state = {}, action) {
  // For now, don't handle any actions
  // and just return the state given to us.

  if (action.type === 'LOGIN_SUCCEEDED') {
    return Object.assign({}, state, {
      token: action.token,
      name: action.name
    })
  }

  if (action.type === 'LOGIN_CLEARED') {
    return Object.assign({}, state, {token: '', name: ''})
  }

  if (action.type === 'LOCATION_CHANGED') {
    return Object.assign({}, state, {location: action.location})
  }

  if (action.type === 'LOCATION_CLEARED') {
    window.localStorage.setItem('session', Object.assign({}, state, {location: ''}))
    return Object.assign({}, state, {location: ''})
  }

  return state
}
JSON.parse(window.localStorage.getItem('form') || 'null')
const initialForm = null

function currentForm (state = initialForm, action) {
  if (action.type === 'FORM_LOADED') {
    return action.form
  }

  if (action.type === 'FORM_LOADED') {
    return action.form
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
