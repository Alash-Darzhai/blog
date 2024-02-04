import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
const Post = () => {
  const [articles, setArticles] = useState([])
  useEffect(() => {
    fetch('https://blog.kata.academy/api/articles')
      .then((res) => res.json())
      .then((data) => setArticles(data.articles))
  }, [])
  return (
    <div>
      {articles.map((post) => (
        <Link key={post.slug} to={`/articles/${post.slug}`}>
          <li>{post.title}</li>
        </Link>
      ))}
    </div>
  )
}
export default Post
