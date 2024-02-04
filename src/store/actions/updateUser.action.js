import {
  USERS_AUTHORIZATION,
  UPDATE_USERNAME,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_AVATAR_IMAGE,
} from '../reducers/updateUser.reducer'

export const usersAuthorizationUpdate = (token, username, email, password) => {
  return {
    type: USERS_AUTHORIZATION,
    token,
    username,
    email,
    password,
  }
}

export const updateUsername = (username) => {
  return {
    type: UPDATE_USERNAME,
    username,
  }
}

export const updateEmail = (email) => {
  return {
    type: UPDATE_EMAIL,
    email,
  }
}

export const updatePassword = (password) => {
  return {
    type: UPDATE_PASSWORD,
    password,
  }
}

export const updateImage = (avatarImage) => {
  return {
    type: UPDATE_AVATAR_IMAGE,
    avatarImage,
  }
}
