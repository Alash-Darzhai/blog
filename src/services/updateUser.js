/* eslint-disable no-unused-vars */
export const updateUser = (token, username, email, image) => {
  return (dispatch) => {
    fetch('https://blog.kata.academy/api/user', {
      method: 'put',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          username,
          bio: 'smth',
          image,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('update data', data)
      })
  }
}
