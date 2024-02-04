import ReactMarkdown from 'react-markdown'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popconfirm, Alert, Spin } from 'antd'

import { fetchGetPost } from '../../services/fetchGetPost'
import { fetchDeletePost } from '../../services/deletePost'
import likeButton from '../../assets/img/LIkeButton.svg'
import coloredLikeButton from '../../assets/img/LikeButtonColored.svg'
import { fetchLikePost } from '../../services/fetchLikePost'

import classes from './SingleArticle.module.scss'
const SingleArticle = () => {
  const delitingError = useSelector((state) => state.deletePostReducer.error)
  console.log('delitingError', delitingError)
  const [isDelete, setDeletePost] = useState(false)
  const [isLiked, setLike] = useState(false)

  const { slug } = useParams()

  const dispatch = useDispatch()

  const authorization = useSelector((state) => state.usersData.authorization)
  const token = useSelector((state) => state.usersData.token)
  const user = useSelector((state) => state.usersData)
  const post = useSelector((store) => store.getPostReducer.article)

  const article = post ? post : null

  useEffect(() => {
    dispatch(fetchGetPost(slug, token))
  }, [slug])

  if (delitingError) {
    return (
      <Alert
        className={classes.SingleArticle__error}
        type="error"
        message="An error occurred while deleting the post. Please refresh the page and try again."
      />
    )
  } else if (!post) {
    return <Spin size="large" className={classes.SingleArticle__spin} />
  } else if (isDelete) {
    return <Alert type="success" message="Post successfully deleted" className={classes.SingleArticle__deleteMessage} />
  } else {
    const { author, title, body, favoritesCount, description, tagList, createdAt, favorited } = article
    const { username, image } = author

    const generateTagList = (tagList) => {
      return tagList.map((tag, index) => (
        <li className={classes.SingleArticle__tagItem} key={index}>
          {tag}
        </li>
      ))
    }
    const formatDate = (isoDate) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      const formattedDate = new Date(isoDate).toLocaleDateString(undefined, options)
      return formattedDate
    }

    const deletePost = (token, slug) => {
      dispatch(fetchDeletePost(slug, token))
      delitingError ? setDeletePost(false) : setDeletePost(true)
    }

    const addLike = () => {
      if (authorization) {
        setLike(!isLiked)
      }

      dispatch(fetchLikePost(slug, token, isLiked))
    }

    const handleEdit = () => {
      dispatch(fetchGetPost(slug, token))
    }

    return (
      <>
        {post && (
          <div className={classes.SingleArticle}>
            <div className={classes.SingleArticle__container}>
              <div className={classes.SingleArticle__info}>
                <div className={classes.SingleArticle__wrapper}>
                  <div className={classes.SingleArticle__title}>{title}</div>
                  {authorization ? (
                    <>
                      {article.favorited ? (
                        <>
                          <button className={classes.SingleArticle__likes} onClick={addLike} type="button">
                            <img src={isLiked ? likeButton : coloredLikeButton} alt="Likes" />
                          </button>
                          <span className={classes.SingleArticle__likesAmount}>
                            {isLiked ? favoritesCount - 1 : favoritesCount}
                          </span>
                        </>
                      ) : (
                        <>
                          <button className={classes.SingleArticle__likes} onClick={addLike} type="button">
                            <img src={favorited || isLiked ? coloredLikeButton : likeButton} alt="Likes" />
                          </button>
                          <span className={classes.SingleArticle__likesAmount}>
                            {isLiked ? favoritesCount + 1 : favoritesCount}
                          </span>
                        </>
                      )}
                    </>
                  ) : (
                    <Popconfirm
                      placement="right"
                      title="Need authentication"
                      cancelButtonProps={{ style: { display: 'none' } }}
                    >
                      <button className={classes.SingleArticle__likes} type="button">
                        <img src={likeButton} alt="Likes" />
                      </button>
                      <span className={classes.SingleArticle__likesAmount}>{favoritesCount}</span>
                    </Popconfirm>
                  )}
                </div>
                <ul className={classes.SingleArticle__tags}>{post && generateTagList(tagList)}</ul>
                <p className={classes.SingleArticle__description}>{description}</p>
              </div>
              <div className={classes.SingleArticle__accaountSection}>
                <div className={classes.SingleArticle__account}>
                  <div className={classes.SingleArticle__accountTextInfo}>
                    <div className={classes.SingleArticle__autorsLogin}>{username}</div>
                    <div className={classes.SingleArticle__date}>{formatDate(createdAt)}</div>
                  </div>
                  <img className={classes.SingleArticle__image} src={image} alt="ProfileImage" />
                </div>
                {user.username == article.author.username ? (
                  <div className={classes.SingleArticle__buttons}>
                    <Popconfirm
                      title="Удаление поста"
                      description="Вы дйствительно хотите удалить пост?"
                      okText="Да"
                      cancelText="Нет"
                      onConfirm={() => deletePost(slug, token)}
                    >
                      <button className={classes.SingleArticle__deleteButton}>Delete</button>
                    </Popconfirm>
                    <Link to={`/article/${slug}/edit`} onClick={handleEdit}>
                      <button className={classes.SingleArticle__editButton}>Edit</button>
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
            <div className={classes.SingleArticle__mainTextContent}>
              <ReactMarkdown>{body}</ReactMarkdown>
            </div>
          </div>
        )}
      </>
    )
  }
}
export default SingleArticle
