/* eslint-disable indent */

export const DELETE_POST = 'DELETE_POST'
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR'

const initialState = {
  deletePost: false,
  error: false,
}

export const deletePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_POST:
      return {
        ...state,
        deletePost: true,
      }
    case DELETE_POST_ERROR:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}
