import { usersDataAction, wrongUsersDataAction } from '../store/actions/usersData.action'
import { usersAuthorizationUpdate } from '../store/actions/updateUser.action'

export const authorizationUsers = (userData) => {
  return (dispatch) => {
    fetch('https://blog.kata.academy/api/users/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: userData.email,
          password: userData.password,
        },
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.user) {
          const { user } = responseData
          localStorage.user = JSON.stringify(user)
          dispatch(usersDataAction(user.token, user.username, user.email, user.password))
          dispatch(usersAuthorizationUpdate(user.token, user.username, user.email))
        } else {
          dispatch(wrongUsersDataAction())
        }
      })
  }
}
