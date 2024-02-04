import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, Alert } from 'antd'

import { fetchGetPostsList } from '../../services/getPostsList'
import ArticleInfo from '../ArticleInfo/ArticleInfo'
import { changePageAction } from '../../store/actions/pagination.action'

import classes from './ArticleList.module.scss'

const ArticleList = () => {
  const error = useSelector((state) => state.getPostsListReducer.error)
  const token = useSelector((state) => state.usersData.token)
  const articlesCount = useSelector((store) => store.getPostsListReducer.articlesCount)
  const articles = useSelector((store) => store.getPostsListReducer.articles)
  const page = useSelector((store) => store.changePageReducer.page)
  const limit = useSelector((store) => store.changePageReducer.limit)
  const offset = useSelector((store) => store.changePageReducer.offset)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchGetPostsList(limit, offset, token))
  }, [page])

  const changePage = (pageNew) => {
    dispatch(changePageAction(pageNew))
  }

  return (
    /* eslint-disable react/jsx-no-useless-fragment */
    <>
      {error ? (
        <Alert
          className={classes.ArticleList__error}
          type="error"
          message="No posts available at the moment. Please try again later."
        />
      ) : (
        <div className={classes.ArticleList}>
          <div className={classes.ArticleList__wrapper}>
            {/* eslint-disable react/no-array-index-key */}
            {articles.map((data, index) => (
              <ArticleInfo key={index} data={data} />
            ))}
            {/* eslint-enable react/no-array-index-key */}
          </div>

          <div className={classes.ArticleList__pagination}>
            <Pagination
              current={page}
              showSizeChanger={false}
              total={articlesCount}
              onChange={changePage}
              pageSize={limit}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ArticleList
