export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_ERROR = 'GET_POSTS_ERROR'

export function fetchGetPostsList(limit = 5, offset = 0, token) {
  return (dispatch) => {
    fetch(`https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}`, {
      method: 'get',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((jsonData) => {
        dispatch({
          type: GET_POSTS,
          data: jsonData,
        })
      })
      .catch((error) => {
        dispatch({
          type: GET_POSTS_ERROR,
          error: true,
        })
        console.log('api error:', error)
      })
  }
}
