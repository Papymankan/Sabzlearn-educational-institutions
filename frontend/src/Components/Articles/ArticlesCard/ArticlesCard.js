import React from 'react'
import { Link } from 'react-router-dom'
import './ArticlesCard.css'

export default function ArticlesCard({ cover, title, shortName , description}) {
  return (
    <div class="col-4">
      <div class="article-card">
        <div class="article-card__header">
          <Link to={`/articleInfo/${shortName}`} class="article-card__link-img">
            <img src={`http://localhost:4000/courses/covers/${cover}`} class="article-card__img" alt="Article Cover" />
          </Link>
        </div>
        <div class="article-card__content">
          <Link to={`/articleInfo/${shortName}`} class="article-card__link">
            {title}
          </Link>
          <p class="article-card__text">
            {description}
          </p>
          <Link to={`/articleInfo/${shortName}`} class="article-card__btn">بیشتر بخوانید</Link>
        </div>
      </div>
    </div>
  )
}
