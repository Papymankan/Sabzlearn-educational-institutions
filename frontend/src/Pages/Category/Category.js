import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CourseBox from '../../Components/CourseBox/CourseBox'
import Footer from '../../Components/Footer/Footer'
import NavBar from '../../Components/Header/NavBar/NavBar'
import TopBar from '../../Components/Header/TopBar/TopBar'
import Pagination from '../../Components/Pagination/Pagination'
import './Category.css'

export default function Category() {

  const { categoryName } = useParams()

  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then(res => res.json())
      .then(data => setCourses(data))
  }, [categoryName])

  return (
    <>
      <section class="courses">
        <div class="container">

          {
            courses.length >= 1 ? (
              <div class="courses-top-bar">

                <div class="courses-top-bar__right">
                  <div class="courses-top-bar__row-btn courses-top-bar__icon--active">
                    <i class="fas fa-border-all courses-top-bar__icon"></i>
                  </div>
                  <div class="courses-top-bar__column-btn">
                    <i class="fas fa-align-left courses-top-bar__icon"></i>
                  </div>

                  <div class="courses-top-bar__selection">
                    <span class="courses-top-bar__selection-title">
                      مرتب سازی پیش فرض
                      <i class="fas fa-angle-down courses-top-bar__selection-icon"></i>
                    </span>
                    <ul class="courses-top-bar__selection-list">
                      <li class="courses-top-bar__selection-item courses-top-bar__selection-item--active">مرتب سازی پیش فرض</li>
                      <li class="courses-top-bar__selection-item">مربت سازی بر اساس محبوبیت</li>
                      <li class="courses-top-bar__selection-item">مربت سازی بر اساس امتیاز</li>
                      <li class="courses-top-bar__selection-item">مربت سازی بر اساس آخرین</li>
                      <li class="courses-top-bar__selection-item">مربت سازی بر اساس ارزان ترین</li>
                      <li class="courses-top-bar__selection-item">مربت سازی بر اساس گران ترین</li>
                    </ul>
                  </div>
                </div>

                <div class="courses-top-bar__left">
                  <form action="#" class="courses-top-bar__form">
                    <input type="text" class="courses-top-bar__input" placeholder="جستجوی دوره ..." />
                    <i class="fas fa-search courses-top-bar__search-icon"></i>
                  </form>
                </div>

              </div>

            ) : null
          }

          <div class="courses-content">
            <div class="container">
              <div className="row">
                {
                  courses.length >= 1 ?
                    courses.map(course => {
                      return <CourseBox name={course.name} cover={course.cover} price={course.price} creator={course.creator} shortname={course.shortName} />
                    }) : <div className="alert alert-info">فعلا برای این بخش دوره ای در نظر گرفته نشده است</div>
                }
              </div>
            </div>
          </div>
          {
            courses.length >= 1 ? (
              <Pagination />
            ) : null
          }
        </div>
      </section>
      <Footer />
    </>
  )
}
