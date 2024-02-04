import React from 'react'
import { Link } from 'react-router-dom'

import classes from './Header.module.scss'

const Header = () => {
  return (
    <div className={classes.Header}>
      <div className={classes.Header__name}>
        <Link to="/">
          <span className={classes.Header__nameWrapper}>Realworld Blog</span>
        </Link>
      </div>{' '}
      <div className={classes.Header__signButtons}>
        <Link to="/sign-in">
          <button className={classes.Header__signInButton}>Sign In</button>
        </Link>
        <Link to="/sign-up">
          <button className={classes.Header__signUpButton}>Sign Up</button>
        </Link>
      </div>
    </div>
  )
}

export default Header
