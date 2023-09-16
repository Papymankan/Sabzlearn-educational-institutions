import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import './Pagination.css'

export default function Pagination({ courses, coursesCount, pathname, setShowCourses }) {

  const { page } = useParams()
  const [pageCount, setPageCount] = useState(0)
  const pageArr = []

  useEffect(() => {
    let endIndex = coursesCount * page
    let startIndex = endIndex - coursesCount
    let showCourses = courses.slice(startIndex, endIndex)
    setShowCourses(showCourses)
    let pageNumbers = Math.ceil(courses.length / coursesCount)
    setPageCount(pageNumbers)
  }, [page, courses])

  for (let i = 1; i<= pageCount; i++) {
    pageArr.push(i)
  }

  return (
    <div class="courses-pagination">
      <ul class="courses__pagination-list">
        {
          page >= 2 && (
            <li class="courses__pagination-item">
              <Link to={`/${pathname}/${page-1}`}class="courses__pagination-link">
                <i class="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
              </Link>
            </li>
          )
        }
        {
          pageArr.map((pageNum) => (
            <li class="courses__pagination-item">
              <Link to={`/${pathname}/${pageNum}`} className={pageNum == page ? 'courses__pagination-link--active courses__pagination-link' : 'courses__pagination-link'}>
                {pageNum}
              </Link>
            </li>
          ))
        }
        {
          page < pageCount && (
            <li class="courses__pagination-item">
              <Link to={`/${pathname}/${Number(page)+1}`} class="courses__pagination-link">
                <i class="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
              </Link>
            </li>
          )
        }



      </ul>
    </div>
  )
}
