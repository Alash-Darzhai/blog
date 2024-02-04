import React from 'react'
import { Alert } from 'antd'

import classes from './NotFoundPage.module.scss'

const NotFoundPage = () => {
  return <Alert className={classes.NotFoundPage} message="Not existing page" type="error" />
}

export default NotFoundPage
