/* eslint-disable indent */
export const GET_POST = 'GET_POST'

const getPostReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_POST:
      return { ...action.article }
    default:
      return state
  }
}

export { getPostReducer }
