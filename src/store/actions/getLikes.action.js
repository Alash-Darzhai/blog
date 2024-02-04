import { GET_LIKE } from '../reducers/getLikes.reducer'

export const getLikesAction = (isLiked) => {
  return {
    type: GET_LIKE,
    isLiked,
  }
}
