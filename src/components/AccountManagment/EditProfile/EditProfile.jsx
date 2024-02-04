import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { updateUser } from '../../../services/updateUser'
import { updateUsername, updateEmail, updatePassword, updateImage } from '../../../store/actions/updateUser.action'

import classes from './EditProfile.module.scss'

const EditProfile = () => {
  const username = useSelector((store) => store.updateUserReducer.username)
  const email = useSelector((store) => store.updateUserReducer.email)
  const avatarImage = useSelector((store) => store.updateUserReducer.avatarImage)
  const token = useSelector((store) => store.updateUserReducer.token)

  const dispatch = useDispatch()
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })

  const [hasErrors, setHasErrors] = useState(false)

  const checkErrors = (data) => {
    const hasFormErrors = data.keys(errors).length > 0
    setHasErrors(hasFormErrors)
  }

  const handleUpdateUser = (e) => {
    checkErrors
    e.preventDefault()
    localStorage.user = JSON.stringify({
      username: username,
      email: email,
      token: token,
      image: avatarImage,
    })
    dispatch(updateUser(token, username, email, avatarImage))
    window.location.reload()
  }

  return (
    <div className={classes.EditProfile}>
      <div className={classes.EditProfile__wrapper}>
        <span className={classes.EditProfile__caption}>Edit Profile</span>
        <form className={classes.EditProfile__form}>
          <div className={classes.EditProfile__container}>
            <label htmlFor="username">
              <span className={classes.EditProfile__label}>Username</span>
            </label>
            <input
              placeholder="Username"
              className={classes.EditProfile__input}
              type="text"
              id="username"
              name="username"
              {...register('username', {
                required: 'Username address is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Username must be at most 20 characters',
                },
              })}
              onChange={(e) => dispatch(updateUsername(e.target.value))}
              defaultValue={username}
            />
            {errors.username && <p className={classes.EditProfile__errorText}>{errors.username.message}</p>}
          </div>
          <div className={classes.EditProfile__container}>
            <label htmlFor="email">
              <span className={classes.EditProfile__label}>Email address</span>
            </label>
            <input
              placeholder="Email address"
              className={classes.EditProfile__input}
              type="text"
              id="email"
              name="email"
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              })}
              onChange={(e) => dispatch(updateEmail(e.target.value))}
              defaultValue={email}
            />
            {errors.email && <p className={classes.EditProfile__errorText}>{errors.email.message}</p>}
          </div>
          <div className={classes.EditProfile__container}>
            <label htmlFor="password">
              <span className={classes.EditProfile__label}>New password</span>
            </label>
            <input
              className={classes.EditProfile__input}
              placeholder="Password"
              type="text"
              id="password"
              name="password"
              {...register('password', {
                minLength: {
                  value: 6,
                  message:
                    'Password must be between 6 and 40 characters and contain at least one digit and one special character (!.@#$%^&*)',
                },
                maxLength: {
                  value: 40,
                  message:
                    'Password must be between 6 and 40 characters and contain at least one digit and one special character (!.@#$%^&*)',
                },
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{6,40}$/,
                  message:
                    'Password must be between 6 and 40 characters and contain at least one digit and one special character (!.@#$%^&*)',
                },
              })}
              onChange={(e) => dispatch(updatePassword(e.target.value))}
            />
            {errors.password && <p className={classes.EditProfile__errorText}>{errors.password.message}</p>}
          </div>
          <div className={classes.EditProfile__container}>
            <label htmlFor="avatar-image">
              <span className={classes.EditProfile__label}>Avatar image (url)</span>
            </label>
            <input
              className={classes.EditProfile__input}
              placeholder="Avatar image"
              type="text"
              id="avatar-image"
              name="avatar-image"
              {...register('avatar-image', {
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: 'Invalid URL format',
                },
              })}
              onChange={(e) => dispatch(updateImage(e.target.value))}
              defaultValue={avatarImage}
            />
            {errors['avatar-image'] && (
              <p className={classes.EditProfile__errorText}>{errors['avatar-image'].message}</p>
            )}
          </div>
          <button className={classes.EditProfile__button} onClick={handleUpdateUser} disabled={hasErrors} type="submit">
            <span className={classes.EditProfile__buttonText}>Save</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
