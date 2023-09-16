import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './Pagination.css'

export default function Pagination({courses , coursesCount , pathname , setShowCourses}) {

  const {page} = useParams()
  const [pageCount , setPageCount] = useState(null)
  
  useEffect(()=>{
    console.log(courses);
    let endIndex = coursesCount * page
    let startIndex = endIndex - coursesCount
    let showCourses = courses.slice(startIndex , endIndex)
    console.log(showCourses);
    setShowCourses(showCourses)
  },[page , courses])

  return (
    <div class="courses-pagination">
    <ul class="courses__pagination-list">
      <li class="courses__pagination-item">
        <a href="#" class="courses__pagination-link">
          <i class="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
        </a>
      </li>
      <li class="courses__pagination-item">
        <a href="#" class="courses__pagination-link">
          1
        </a>
      </li>
      <li class="courses__pagination-item">
        <a href="#" class="courses__pagination-link">
          2
        </a>
      </li>
      <li class="courses__pagination-item">
        <a href="#" class="courses__pagination-link courses__pagination-link--active">
          3
        </a>
      </li>
      <li class="courses__pagination-item">
        <a href="#" class="courses__pagination-link">
          <i class="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
        </a>
      </li>
    </ul>
  </div>
  )
}
