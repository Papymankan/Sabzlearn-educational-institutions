import React, { useEffect, useState } from 'react'
import Comments from '../../Components/Comments/Comments'
import Footer from './../../Components/Footer/Footer'
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import './CourseInfo.css'
import CourseInfoBox from '../../Components/CourseInfoBox/CourseInfoBox'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import CommentSection from '../../Components/CommentSection/CommentSection'
import AccordionCourse from '../../Components/AccordionCourse/AccordionCourse'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'


export default function CourseInfo() {

  const { courseName } = useParams()

  const [courseData, setCourseData] = useState({})
  const [comments, setComments] = useState([])
  const [sessions, setSessions] = useState([])
  const [createdAt, setCreatedAt] = useState([])
  const [updatedAt, setUpdatedAt] = useState([])
  const [category, setCategory] = useState({})


  useEffect(() => {

    const localData = JSON.parse(localStorage.getItem('user'))

      fetch(`http://localhost:4000/v1/courses/${courseName}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localData == null ? null : localData.token}`
        }
      }).then(res => res.json())
        .then(data => {
          console.log(data);
          setCourseData(data)
          setComments(data.comments)
          setSessions(data.sessions)
          setCreatedAt(data.createdAt)
          setUpdatedAt(data.updatedAt)
          setCategory(data.categoryID)
        })
  }, [courseName])

  return (
    <>
      {/* <TopBar />
      <NavBar /> */}
      <BreadCrumb
        links={[
          { id: 1, title: 'خانه', to: '/' },
          { id: 2, title: `${category.title}`, to: `/category/${category.name}` },
          { id: 3, title: `${courseData.name}`, to: `/course-info/${courseData.shortName}` },
        ]}
      />
      <section class="course-info">
        <div class="container">
          <div class="row">
            <div class="col-6">
              <Link to={`/category/${category.name}`} class="course-info__link">
                {category.title}
              </Link>
              <h1 class="course-info__title">
                {courseData.name}
              </h1>
              <p class="course-info__text">
                {courseData.description}
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
              <video src="" poster={`/images/courses/${courseData.cover}`} class="course-info__video" controls></video>
            </div>
          </div>
        </div>
      </section>

      <main class="main">
        <div class="container">
          <div class="row">
            <div class="col-8">
              <div className="course">
                {/* Course Detail Boxes start */}
                <div class="course-boxes">
                  <div className="row">
                    <CourseInfoBox icon="fa-graduation-cap" title="وضعیت دوره:" status={courseData.isComplete ? 'تمام شده' : 'در حال برگزاری'} />
                    <CourseInfoBox icon="fa-clock" title="شروع دوره" status={createdAt.slice(0, 10)} />
                    <CourseInfoBox icon="fa-calendar-alt" title="آخرین بروزرسانی:" status={updatedAt.slice(0, 10)} />
                    <CourseInfoBox icon="fa-user-alt" title="روش پشتیبانی" status={courseData.support} />
                    <CourseInfoBox icon="fa-info-circle" title="پیش نیاز:" status="HTML CSS" />
                    <CourseInfoBox icon="fa-play" title="نوع مشاهده:" status="ضبط شده / آنلاین" />
                  </div>
                </div>
                {/* Course Detail Boxes end */}

                {/* Course Progress start */}
                <div class="course-progress">
                  <div class="course-progress__header">
                    <i class="fas fa-chart-line course-progress__icon"></i>
                    <span class="course-progress__title">
                      درصد پیشرفت دوره: 100%
                    </span>
                  </div>
                  <div class="progress course-progress__bar">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: '75%' }}></div>
                  </div>
                </div>
                {/* Course Progress end */}

                {/* Introduction start */}
                <div class="introduction">
                  <div class="introduction__item">
                    <SectionHeader btn_title={""} primary_title="" main_title={"آموزش 20 کتابخانه جاوا اسکریپت مخصوص بازار کار"} />
                    <img src="/images/info/1.gif" alt="course info image" class="introduction__img img-fluid" />
                    <p class="introduction__text">
                      کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد و سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود که در بازار کار به شدت از آن ها استفاده می شود و اگر بدون بلد بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت خواهید شد و حتی ممکن است ناامید شوید!
                    </p>
                    <p class="introduction__text">
                      در این دوره نحوه کار با 20 مورد از پر استفاده ترین کتابخانه های جاوا اسکریپت به صورت پروژه محور به شما عزیزان آموزش داده می شود تا هیچ مشکلی برای ورود به بازار کار نداشته باشید
                    </p>
                  </div>
                  <div class="introduction__item">
                    <SectionHeader btn_title={""} primary_title="" main_title={"هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب درآمد)"} />
                    <img src="/images/info/2.jpg" alt="course info image" class="introduction__img img-fluid" />
                    <p class="introduction__text">
                      وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم، از کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در حالی که من اولین بارم بود اسم Formik را می شنیدم و تا اون موقع از این کتابخانه ها استفاده نکرده بودم.
                    </p>
                    <p class="introduction__text">
                      همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از مهم ترین مباحثی هستند که هر برنامه نویس وب برای ورود به بازار کار و کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار کرده باشد                  </p>
                    <p class="introduction__text">
                      همان طور که از اسم این دوره مشخص است، هدف از این دوره آموزش 20 مورد از کاربردی ترین و پر استفاده ترین کتابخانه های جاوا اسکریپت است تا شما بتوانید بعد از این دوره با قدرت و آمادگی بیشتر ادامه مسیر برنامه نویسی وب را ادامه دهید، ری اکت یا نود یا … را راحت تر یاد بگیرید و در نهایت وارد بازار کار شده و کسب درآمد کنید.
                    </p>
                    <p class="introduction__text">
                      شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی کار نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد. آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                    </p>
                    <p class="introduction__text">
                      در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه، نحوه یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و وب اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
                    </p>
                  </div>
                  <div class="introduction__btns">
                    <a href="#" class="introduction__btns-item">دانلود همگانی ویدیوها</a>
                    <a href="#" class="introduction__btns-item">دانلود همگانی پیوست‌ها</a>
                  </div>
                  <AccordionCourse sessions={sessions} />
                </div>
                {/* Introduction end */}

                {/* Teacher start */}
                <div class="techer-details">
                  <div class="techer-details__header">
                    <div class="techer-details__header-right">
                      <img src="/images/info/teacher.jfif" alt="Teacher Profile" class="techer-details__header-img" />
                      <div class="techer-details__header-titles">
                        <a href="#" class="techer-details__header-link">محمدامین سعیدی راد</a>
                        <span class="techer-details__header-skill">
                          Front End & Back End Developer
                        </span>
                      </div>
                    </div>
                    <div class="techer-details__header-left">
                      <i class="fas fa-chalkboard-teacher techer-details__header-icon"></i>
                      <span class="techer-details__header-name">مدرس</span>
                    </div>
                  </div>
                  <p class="techer-details__footer">
                    اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2 سال با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در زمینه وب فعالیت داشته باشم.و..
                  </p>
                </div>
                {/* Teacher end */}

              </div>

              <Comments comments={comments} courseName={courseName}/>
            </div>
            <div className="col-4">
              <div class="courses-info">
                <div class="course-info">
                  <div class="course-info__register">
                    {
                      courseData.isUserRegisteredToThisCourse ? (
                        <span class="course-info__register-title">
                          <i class="fas fa-graduation-cap course-info__register-icon"></i>
                          &nbsp;
                          دانشجوی دوره هستید
                        </span>
                      ) : (
                        <span class="course-info__register-title">
                          ثبت نام در دوره
                        </span>
                      )
                    }
                  </div>
                </div>
                <div class="course-info">
                  <div class="course-info__total">
                    <div class="course-info__top">
                      <div class="course-info__total-sale">
                        <i class="fas fa-user-graduate course-info__total-sale-icon"></i>
                        <span class="course-info__total-sale-text">
                          تعداد دانشجو :
                        </span>
                        <span class="course-info__total-sale-number">
                          {courseData.courseStudentsCount}
                        </span>
                      </div>
                    </div>
                    <div class="course-info__bottom">
                      <div class="course-info__total-comment">
                        <i class="far fa-comments course-info__total-comment-icon"></i>
                        <span class="course-info__total-comment-text">
                          {comments.length} دیدگاه
                        </span>
                      </div>
                      <div class="course-info__total-view">
                        <i class="far fa-eye course-info__total-view-icon"></i>
                        <span class="course-info__total-view-text">
                          14,234 بازدید
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="course-info">
                  <div class="course-info__header-short-url">
                    <i class="fas fa-link course-info__short-url-icon"></i>
                    <span class="course-info__short-url-text">
                      لینک کوتاه
                    </span>
                  </div>
                  <span class="course-info__short-url">
                    https://sabzlearn.ir/?p=117472
                  </span>
                </div>
                <div class="course-info">
                  <span class="course-info__topic-title">
                    سرفصل های دوره
                  </span>
                  <span class="course-info__topic-text">
                    برای مشاهده و یا دانلود دوره روی کلمه
                    <a href="#" style={{ color: 'blue', fontWeight: 'bold' }}>
                      لینک
                    </a>
                    کلیک کنید
                  </span>
                </div>
                <div class="course-info">
                  <span class="course-info__courses-title">دوره های مرتبط</span>
                  <ul class="course-info__courses-list">
                    <li class="course-info__courses-list-item">
                      <a href="#" class="course-info__courses-link">
                        <img src="/images/courses/js_project.png" alt="Course Cover" class="course-info__courses-img" />
                        <span class="course-info__courses-text">
                          پروژه های تخصصی با جاوا اسکریپت
                        </span>
                      </a>
                    </li>
                    <li class="course-info__courses-list-item">
                      <a href="#" class="course-info__courses-link">
                        <img src="/images/courses/fareelancer.png" alt="Course Cover" class="course-info__courses-img" />
                        <span class="course-info__courses-text">
                          تعیین قیمت پروژه های فریلنسری
                        </span>
                      </a>
                    </li>
                    <li class="course-info__courses-list-item">
                      <a href="#" class="course-info__courses-link">
                        <img src="/images/courses/nodejs.png" alt="Course Cover" class="course-info__courses-img" />
                        <span class="course-info__courses-text">
                          دوره Api نویسی
                        </span>
                      </a>
                    </li>
                    <li class="course-info__courses-list-item">
                      <a href="#" class="course-info__courses-link">
                        <img src="/images/courses/jango.png" alt="Course Cover" class="course-info__courses-img" />
                        <span class="course-info__courses-text">
                          متخصص جنگو
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
