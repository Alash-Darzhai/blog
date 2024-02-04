/* eslint-disable indent */
import { GET_POSTS, GET_POSTS_ERROR } from '../../services/getPostsList'

const initialState = {
  articles: [],
  articlesCount: 0,
  error: false,
}

const getPostsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...action.data }
    case GET_POSTS_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}

export { getPostsListReducer }
