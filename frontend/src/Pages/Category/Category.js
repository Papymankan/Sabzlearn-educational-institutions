import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import CourseBox from '../../Components/CourseBox/CourseBox'
import Footer from '../../Components/Footer/Footer'
import NavBar from '../../Components/Header/NavBar/NavBar'
import TopBar from '../../Components/Header/TopBar/TopBar'
import Pagination from '../../Components/Pagination/Pagination'
import './Category.css'

export default function Category() {

  const Navigate = useNavigate()

  const { categoryName } = useParams()
  const { page } = useParams()

  const [courses, setCourses] = useState([])
  const [showCourses, setShowCourses] = useState([])
  const [order, setOrder] = useState('default')
  const [orderedCourses, setOrderedCourses] = useState([])
  const [dropDownTitle, setDropDownTitle] = useState('پیش فرض')
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then(res => res.json())
      .then(data => {
        setCourses(data)
        setOrderedCourses(data)
      })
  }, [categoryName])

  const orderChange = (status) => {
    setOrder(status)
    Navigate(`/category/${categoryName}/1`)
  }

  const inputOnChange = (e) => {
    if(page != 1){
      Navigate(`/category/${categoryName}/1`)
    }
    setInputValue(e.target.value)
    const searchCourses = courses.filter(course => course.name.includes(e.target.value))
    setOrderedCourses(searchCourses)
  }


  useEffect(() => {
    switch (order) {
      case 'free': {
        const freeCourses = courses.filter(course => course.price == 0)
        setOrderedCourses(freeCourses)
        setDropDownTitle('دوره های رایگان')
        break
      }
      case 'noFree': {
        const noFreeCourses = courses.filter(course => course.price != 0)
        setDropDownTitle('دوره های غیر رایگان')
        setOrderedCourses(noFreeCourses)
        break
      }
      case 'last': {
        setDropDownTitle('جدید ترین')
        setOrderedCourses(courses)
        break
      }
      case 'first': {
        setDropDownTitle('قدیمی ترین')
        const reversed = courses.slice().reverse()
        console.log(reversed);
        setOrderedCourses(reversed)
        break
      }
      default: {
        setOrderedCourses(courses)
        setDropDownTitle('پیش فرض')
        break
      }
    }
  }, [order])

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
                      {dropDownTitle}
                      <i class="fas fa-angle-down courses-top-bar__selection-icon"></i>
                    </span>
                    <ul class="courses-top-bar__selection-list">

                      <li className={order == 'default' ? 'courses-top-bar__selection-item courses-top-bar__selection-item--active' : 'courses-top-bar__selection-item'} onClick={() => orderChange('default')}> پیش فرض</li>

                      <li className={order == 'free' ? 'courses-top-bar__selection-item courses-top-bar__selection-item--active' : 'courses-top-bar__selection-item'} onClick={() => orderChange('free')}>  دوره های رایگان</li>

                      <li className={order == 'noFree' ? 'courses-top-bar__selection-item courses-top-bar__selection-item--active' : 'courses-top-bar__selection-item'} onClick={() => orderChange('noFree')}>  دوره های غیر رایگان</li>

                      <li className={order == 'last' ? 'courses-top-bar__selection-item courses-top-bar__selection-item--active' : 'courses-top-bar__selection-item'} onClick={() => orderChange('last')}>  جدید ترین</li>

                      <li className={order == 'first' ? 'courses-top-bar__selection-item courses-top-bar__selection-item--active' : 'courses-top-bar__selection-item'} onClick={() => orderChange('first')}>  قدیمی ترین</li>

                    </ul>
                  </div>
                </div>

                <div class="courses-top-bar__left">
                  <form action="#" class="courses-top-bar__form">
                    <input type="text" class="courses-top-bar__input" placeholder="جستجوی دوره ..." onChange={(e) => inputOnChange(e)} value={inputValue} />
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
                  showCourses.length >= 1 ?
                    showCourses.map(course => {
                      return <CourseBox name={course.name} cover={course.cover} price={course.price} creator={course.creator} shortname={course.shortName} />
                    }) : <div className="alert alert-info">فعلا برای این بخش دوره ای در نظر گرفته نشده است</div>
                }
              </div>
            </div>
          </div>

          <Pagination
            courses={orderedCourses}
            coursesCount={5}
            pathname={`category/${categoryName}`}
            setShowCourses={setShowCourses}
          />


        </div>
      </section>
      <Footer />
    </>
  )
}
