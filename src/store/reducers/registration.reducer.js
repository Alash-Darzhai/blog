/* eslint-disable indent */
/* eslint-disable prettier/prettier */
export const REGISTRATION_DATA = 'REGISTRATION_DATA'
export const ALREADY_USED_EMAIL = 'ALREADY_USED_EMAIL'
export const ALREADY_USED_USERNAME = 'ALREADY_USED_USERNAME'

const initialState = {
  fromData: null,
  alreadyUsedEmail: false,
  alreadyUsedUsername: false,
}

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTRATION_DATA':
      return {
        ...state,
        fromData: action.payload,
      }
    case 'ALREADY_USED_EMAIL':
      return {
        ...state,
        alreadyUsedEmail: true,
      }
    case 'ALREADY_USED_USERNAME':
      return {
        ...state,
        alreadyUsedUsername: true,
      }
    default:
      return state
  }
}

export { formReducer }
