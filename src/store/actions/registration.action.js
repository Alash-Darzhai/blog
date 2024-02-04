import { REGISTRATION_DATA, ALREADY_USED_EMAIL, ALREADY_USED_USERNAME } from '../reducers/registration.reducer'

export const signUpInfo = (payload) => {
  return {
    type: REGISTRATION_DATA,
    payload,
  }
}

export const alreadyUsedEmail = () => {
  return {
    type: ALREADY_USED_EMAIL,
  }
}

export const alreadyUsedUsername = () => {
  return {
    type: ALREADY_USED_USERNAME,
  }
}
