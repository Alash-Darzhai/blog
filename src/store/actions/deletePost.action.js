import { DELETE_POST, DELETE_POST_ERROR } from '../reducers/deletePost.reducer'

export const deletePostAction = (slug) => {
  return {
    type: DELETE_POST,
    slug,
  }
}

export const deletePostErrorAction = () => {
  return {
    type: DELETE_POST_ERROR,
    error: true,
  }
}
