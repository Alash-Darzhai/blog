/* eslint-disable prettier/prettier */
/* eslint-disable indent */
export const CHANGE_PAGE = 'CHANGE_PAGE'

const initialState = {
  limit: 5,
  offset: 0,
  page: 1,
}

export const changePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return { ...state, offset: action.page * state.limit - state.limit, page: action.page }
    default:
      return state
  }
}
