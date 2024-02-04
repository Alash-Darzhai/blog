/* eslint-disable no-unused-vars */
import { alreadyUsedEmail, alreadyUsedUsername } from '../store/actions/registration.action'

export const registerUser = (userData) => {
  return (dispatch) => {
    fetch('https://blog.kata.academy/api/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.errors) {
          const { errors } = responseData
          if (errors.username === 'is already taken.') {
            console.log('username error')
            dispatch(alreadyUsedUsername())
          }
          if (errors.email === 'is already taken.') {
            console.log('email error')
            dispatch(alreadyUsedEmail())
          }
        } else {
          console.log(responseData)
        }
      })
  }
}
