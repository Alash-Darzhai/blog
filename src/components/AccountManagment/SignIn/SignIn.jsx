/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { authorizationUsers } from '../../../services/authorizationUser'
import { buttonEnabledAction } from '../../../store/actions/usersData.action'

import classes from './SignIn.module.scss'

const SignIn = () => {
  const serverAnswer = useSelector((state) => state.usersData.serverAnswer)
  const [isClicked, setClick] = useState(false)
  const navigate = useNavigate()
  const usersDataError = useSelector((state) => {
    return state.usersData.error
  })
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })

  useEffect(() => {
    if (serverAnswer) {
      setClick((prevIsClicked) => !prevIsClicked)
    }
  }, [serverAnswer])

  const onSubmit = (data) => {
    setClick(true)
    dispatch(buttonEnabledAction())
    dispatch(authorizationUsers(data))
  }

  useEffect(() => {
    if (usersDataError === false) {
      navigate('/')
    }
  }, [usersDataError, navigate])

  return (
    <div className={classes.SignIn}>
      <div className={classes.SignIn__wrapper}>
        <span className={classes.SignIn__caption}>Sign In</span>
        <form className={classes.SignIn__form} onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.SignIn__container}>
            <label htmlFor="email">
              <span className={classes.SignIn__label}>Email address</span>
            </label>
            <input
              placeholder="Email address"
              className={classes.SignIn__input}
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
            />
            <p className={classes.SignIn__errorText}>{errors.email?.message}</p>
          </div>
          <div className={classes.SignIn__container}>
            <label htmlFor="password">
              <span className={classes.SignIn__label}>Password</span>
            </label>
            <input
              className={classes.SignIn__input}
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              {...register('password', {
                required: 'Password is required',
              })}
            />
            <p className={classes.SignIn__errorText}>{errors.password?.message}</p>
            {usersDataError === true ? (
              <p className={classes.SignIn__errorText}>
                Authentication failed. Please check your credentials and try again.
              </p>
            ) : null}
          </div>
          <button className={classes.SignIn__button} disabled={isClicked} type="submit">
            <span className={classes.SignIn__buttonText}>Login</span>
          </button>
          <div className={classes.SignIn__footer}>
            <p>
              Already have an account?{' '}
              <Link to="/sign-up">
                <span className={classes.SignIn__linkText}>Sign Up</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
