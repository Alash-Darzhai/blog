/* eslint-disable no-unused-vars, no-unneeded-ternary, react/no-array-index-key */
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Popconfirm } from 'antd'

import likeButton from '../../assets/img/LIkeButton.svg'
import coloredLikeButton from '../../assets/img/LikeButtonColored.svg'
import { fetchLikePost } from '../../services/fetchLikePost'

import classes from './ArticleInfo.module.scss'

const ArticleInfo = ({ data }) => {
  const dispatch = useDispatch()

  const token = useSelector((state) => state.usersData.token)
  const authorization = useSelector((state) => state.usersData.authorization)

  const { description, title, author, tagList, favorited, favoritesCount, slug, updatedAt } = data
  const [like, setLike] = useState(favorited ? true : false)
  const [localFavoritesCount, setFavoritesCount] = useState(favoritesCount)

  const renderTags = () => {
    return tagList
      .filter((tag) => tag !== null && tag.trim() !== '')
      .map((tag, index) => (
        <li key={index} className={classes.ArticleInfo__tagItem}>
          {tag}
        </li>
      ))
  }
  const formatDate = (isoDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = new Date(isoDate).toLocaleDateString(undefined, options)
    return formattedDate
  }

  const addLike = () => {
    if (authorization) {
      dispatch(fetchLikePost(slug, token, favorited))
      setLike(!like)
      if (like) {
        setFavoritesCount(localFavoritesCount - 1)
      } else {
        setFavoritesCount(localFavoritesCount + 1)
      }
    }
  }
  return (
    <div className={classes.ArticleInfo}>
      <div className={classes.ArticleInfo__info}>
        <div className={classes.ArticleInfo__wrapper}>
          <Link className={classes.ArticleInfo__title} to={`/${slug}`}>
            {title}
          </Link>
          {authorization ? (
            <>
              <button className={classes.ArticleInfo__likes} type="button" onClick={addLike}>
                <img src={like ? coloredLikeButton : likeButton} alt="Likes" />
              </button>
              <span className={classes.ArticleInfo__likesAmount}>{localFavoritesCount}</span>
            </>
          ) : (
            <>
              <Popconfirm
                placement="right"
                title="Need authentication"
                cancelButtonProps={{ style: { display: 'none' } }}
              >
                <button className={classes.ArticleInfo__likes} type="button">
                  <img src={likeButton} alt="like" />
                </button>
              </Popconfirm>
              <span className={classes.ArticleInfo__likesAmount}>{favoritesCount}</span>
            </>
          )}
        </div>
        <ul className={classes.ArticleInfo__tags}>{renderTags()}</ul>
        <p className={classes.ArticleInfo__text}>{description}</p>
      </div>
      <div className={classes.ArticleInfo__account}>
        <div className={classes.ArticleInfo__accountTextInfo}>
          <div className={classes.ArticleInfo__autorsLogin}>{author.username}</div>
          <div className={classes.ArticleInfo__date}>{formatDate(updatedAt)}</div>
        </div>
        <img className={classes.ArticleInfo__image} src={author.image} alt="ProfileImage" />
      </div>
    </div>
  )
}

export default ArticleInfo
