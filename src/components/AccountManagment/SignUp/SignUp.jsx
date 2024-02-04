import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { registerUser } from '../../../services/registerUser'

import classes from './SignUp.module.scss'

const SignUp = () => {
  const alreadyUsedEmail = useSelector((state) => {
    return state.formReducer.alreadyUsedEmail
  })
  const alreadyUsedUsername = useSelector((state) => {
    return state.formReducer.alreadyUsedUsername
  })

  console.log(alreadyUsedEmail)

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data))
      reset()
    } catch (error) {
      console.error('Ошибка при регистрации:', error)
    }
  }
  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked)
  }

  const validatePasswordMatch = (value) => {
    const password = getValues('password')
    return value === password || 'Field must match the password field'
  }
  return (
    <div className={classes.SignUp}>
      <div className={classes.SignUp__wrapper}>
        <span className={classes.SignUp__caption}>Create new account</span>
        <form className={classes.SignUp__form} onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.SignUp__container}>
            <label htmlFor="username">
              <span className={classes.SignUp__label}>Username</span>
            </label>
            <input
              className={classes.SignUp__input}
              placeholder="Username"
              type="text"
              id="username"
              {...register('username', {
                required: true,
                minLength: {
                  value: 3,
                  message: 'Username must be between 3 and 20 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Username must be between 3 and 20 characters',
                },
              })}
              required
            />
            {alreadyUsedUsername && (
              <p className={classes.SignUp__errorText}>This username has already been used for registration.</p>
            )}
            <p className={classes.SignUp__errorText}>{errors?.username?.message}</p>
          </div>
          <div className={classes.SignUp__container}>
            <label htmlFor="email">
              <span className={classes.SignUp__label}>Email address</span>
            </label>
            <input
              placeholder="Email address"
              className={classes.SignUp__input}
              type="text"
              id="email"
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              })}
              required
            />
            {alreadyUsedEmail && (
              <p className={classes.SignUp__errorText}>This email has already been used for registration.</p>
            )}
            <p className={classes.SignUp__errorText}>{errors?.email?.message}</p>
          </div>
          <div className={classes.SignUp__container}>
            <label htmlFor="password">
              <span className={classes.SignUp__label}>Password</span>
            </label>
            <input
              className={classes.SignUp__input}
              placeholder="Password"
              type="password"
              id="password"
              {...register('password', {
                required: true,
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{6,40}$/,
                  message:
                    'Password must be between 6 and 40 characters and contain at least one digit and one special character (!.@#$%^&*)',
                },
              })}
              required
            />
            <p className={classes.SignUp__errorText}>{errors.password?.message}</p>
          </div>
          <div className={classes.SignUp__container}>
            <label htmlFor="confirmPassword">
              <span className={classes.SignUp__label}>Repeat Password</span>
            </label>
            <input
              className={classes.SignUp__input}
              placeholder="Repeat Password"
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: true,
                validate: validatePasswordMatch,
              })}
              required
            />
            <p className={classes.SignUp__errorText}>{errors.confirmPassword?.message}</p>
          </div>
          <hr style={{ width: '320px', height: '1px', backgroundColor: '#E8E8E8' }} />
          <div className={classes.SignUp__agreement}>
            <label htmlFor="agreement">
              <input
                className={classes.SignUp__checkbox}
                name="agreement"
                type="checkbox"
                id="agreeCheckbox"
                value="agree"
                onChange={handleCheckboxChange}
              />
            </label>
            <span className={classes.SignUp__agreementText}>I agree to the processing of my personal information</span>
          </div>
          <button className={classes.SignUp__button} type="submit" disabled={!isCheckboxChecked}>
            <span className={classes.SignUp__buttonText}>Create</span>
          </button>
          <div className={classes.SignUp__footer}>
            <p>
              Already have an account?{' '}
              <Link to="/sign-in">
                <span className={classes.SignUp__linkText}>Sign In</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
