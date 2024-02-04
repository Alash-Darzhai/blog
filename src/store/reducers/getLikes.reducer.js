/* eslint-disable indent */

export const GET_LIKE = 'GET_LIKE'

const initialState = {
  isLiked: false,
}

export const getLikesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIKE:
      return { ...state, isLiked: action.isLiked }
    default:
      return state
  }
}
