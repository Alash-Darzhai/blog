import { getPostAction } from '../store/actions/getPostAction.action'

export const fetchGetPost = (slug, token) => {
  return (dispatch) => {
    fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'get',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Ошибка API')
        }
        return res.json()
      })
      .then((data) => {
        dispatch(getPostAction(data))
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
