import React from 'react'
import TopBar from './../../Components/Header/TopBar/TopBar'
import NavBar from './../../Components/Header/NavBar/NavBar'
import Footer from './../../Components/Footer/Footer'
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import './CourseInfo.css'
import CourseInfoBox from '../../Components/CourseInfoBox/CourseInfoBox'

export default function CourseInfo() {
  return (
    <>
      <TopBar />
      <NavBar />
      <BreadCrumb
        links={[
          { id: 1, title: 'خانه', to: '/' },
          { id: 2, title: 'آموزش برنامه نویسی فرانت اند', to: '/category/frontend' },
          { id: 3, title: 'دوره متخصص جاوا اسکریپت', to: '/courseInfo/javascript' },
        ]}
      />
      <section class="course-info">
        <div class="container">
          <div class="row">
            <div class="col-6">
              <a href="#" class="course-info__link">
                آموزش برنامه نویسی فرانت اند
              </a>
              <h1 class="course-info__title">
                آموزش 20 کتابخانه جاوااسکریپت برای بازار کار
              </h1>
              <p class="course-info__text">
                امروزه کتابخانه‌ها کد نویسی را خیلی آسان و لذت بخش تر کرده اند. به قدری که حتی امروزه هیچ شرکت برنامه نویسی پروژه های خود را با Vanilla Js پیاده سازی نمی کند و همیشه از کتابخانه ها و فریمورک های موجود استفاده می کند. پس شما هم اگه میخواید یک برنامه نویس عالی فرانت اند باشید، باید کتابخانه های کاربردی که در بازار کار استفاده می شوند را به خوبی بلد باشید
              </p>
              <div class="course-info__social-media">
                <a href="#" class="course-info__social-media-item">
                  <i class="fab fa-telegram-plane course-info__icon"></i>
                </a>
                <a href="#" class="course-info__social-media-item">
                  <i class="fab fa-twitter course-info__icon"></i>
                </a>
                <a href="#" class="course-info__social-media-item">
                  <i class="fab fa-facebook-f course-info__icon"></i>
                </a>
              </div>
            </div>

            <div class="col-6">
              <video src="" poster="/images/courses/js_project.png" class="course-info__video" controls></video>
            </div>
          </div>
        </div>
      </section>

      <main class="main">
        <div class="container">
          <div class="row">
            <div class="col-8">
              <div className="course">
                <div class="course-boxes">
                  <div className="row">

                    <CourseInfoBox icon="fa-graduation-cap" title="وضعیت دوره:" status="به اتمام رسیده" />


                    <CourseInfoBox icon="fa-clock" title="مدت زمان دوره:" status="19 ساعت" />
                    

                    <CourseInfoBox icon="fa-calendar-alt" title="آخرین بروزرسانی:" status="1401/03/02" />


                    <CourseInfoBox icon="fa-user-alt" title="روش پشتیبانی" status="آنلاین" />


                    <CourseInfoBox icon="fa-info-circle" title="پیش نیاز:" status="HTML CSS" />


                    <CourseInfoBox icon="fa-play" title="نوع مشاهده:" status="ضبط شده / آنلاین" />



                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
