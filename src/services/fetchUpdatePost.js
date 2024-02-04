/* eslint-disable no-unused-vars */
export const fetchUpdatePost = (slug, token, title, description, body) => {
  return (dispatch) => {
    fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'put',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }
}
