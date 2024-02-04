import { CHANGE_PAGE } from '../reducers/pagination.reducer'

export const changePageAction = (page) => {
  return {
    type: CHANGE_PAGE,
    page,
  }
}
