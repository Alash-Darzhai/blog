/* eslint-disable indent */

export const SET_TITLE = 'SET_TITLE'
export const SET_DESCRIPTION = 'SET_DESCRIPTION'
export const SET_TEXT = 'SET_TEXT'
export const SET_TAG = 'SET_TAG'
export const ADD_TAG = 'ADD_TAG'
export const CLEAR_FORM_POST = 'CLEAR_FORM_POST'
export const ERROR = 'ERROR'

const initialState = {
  title: '',
  description: '',
  text: '',
  tag: '',
  tagList: [],
  error: false,
}

export const createPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TITLE:
      return { ...state, title: action.title }
    case SET_DESCRIPTION:
      return { ...state, description: action.description }
    case SET_TEXT:
      return { ...state, text: action.text }
    case SET_TAG:
      return { ...state, tag: action.tag }
    case CLEAR_FORM_POST:
      return { initialState }
    case ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}
