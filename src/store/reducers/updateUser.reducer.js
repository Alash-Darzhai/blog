/* eslint-disable prettier/prettier */
/* eslint-disable indent */
export const USERS_AUTHORIZATION = 'USERS_AUTHORIZATION'
export const UPDATE_USERNAME = 'UPDATE_USERNAME'
export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_AVATAR_IMAGE = 'UPDATE_AVATAR_IMAGE'

const userInfo = localStorage.user ? JSON.parse(localStorage.user) : false

const initialState = {
  token: userInfo ? userInfo.token : '',
  username: userInfo ? userInfo.username : '',
  email: userInfo ? userInfo.email : '',
  newPassword: '',
  avatarImage: userInfo ? userInfo.image : '',
}

export const updateUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_AUTHORIZATION:
      return {
        ...state,
        token: action.token,
        username: action.username,
        email: action.email,
      }
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.username,
      }
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.email,
      }
    case UPDATE_PASSWORD:
      return {
        ...state,
        newPassword: action.password,
      }
    case UPDATE_AVATAR_IMAGE:
      return {
        ...state,
        avatarImage: action.avatarImage,
      }

    default:
      return state
  }
}
