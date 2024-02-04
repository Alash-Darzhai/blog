/* eslint-disable no-unused-vars */
import { getLikesAction } from '../store/actions/getLikes.action'

export const fetchLikePost = (slug, token, favorited) => {
  return (dispatch) => {
    fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: favorited ? 'DELETE' : 'POST',
      body: JSON.stringify({ slug }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        dispatch(getLikesAction(r.article.favorited))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
