import { GET_POST } from '../reducers/getPost.reducer'

export const getPostAction = (article) => {
  return {
    type: GET_POST,
    article,
  }
}
