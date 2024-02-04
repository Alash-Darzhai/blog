import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import ArticleList from '../ArticleList/ArticleList'
import Header from '../Header/AnonimHeader'
import SingleArticle from '../SingleArticle'
import SignUp from '../AccountManagment/SignUp'
import SignIn from '../AccountManagment/SignIn'
import EditProfile from '../AccountManagment/EditProfile'
import CreateArticle from '../CreateArticle'
import UsersHeader from '../Header/UsersHeader'
import NotFoundPage from '../NotFoundPage'

import classes from './App.module.scss'

function App() {
  const usersData = useSelector((state) => {
    return state.usersData.error
  })
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) {
      return
    }
  }, [])

  return (
    <div className={classes.App}>
      <header className={classes.App__header}>
        {usersData === false || localStorage.getItem('user') ? <UsersHeader /> : <Header />}
      </header>

      <main className={classes.App__main}>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/:slug" element={<SingleArticle />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/new-article" element={<CreateArticle />} />
          <Route path="/article/:slug/edit" element={<CreateArticle />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
