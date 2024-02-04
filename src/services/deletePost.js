import { deletePostAction, deletePostErrorAction } from '../store/actions/deletePost.action'

export const fetchDeletePost = (token, slug) => {
  return (dispatch) => {
    fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'delete',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          dispatch(deletePostAction(slug))
        }
      })
      .catch((error) => {
        dispatch(deletePostErrorAction())
        console.error('Произошла ошибка:', error)
      })
  }
}
