import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import NavBar from '../../Components/Header/NavBar/NavBar'
import TopBar from '../../Components/Header/TopBar/TopBar'
import './Session.css'

export default function Session() {

  const { courseName, sessionID } = useParams()
  const [session, setSession] = useState({})
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('user'))
    fetch(`http://localhost:4000/v1/courses/${courseName}/${sessionID}`, {
      headers: {
        'Authorization': `Bearer ${localData.token}`
      }
    }).then(res => res.json()).then(data => {
      setSession(data.session)
      setSessions(data.sessions)
    })
  }, [])

  return (
    <>
      <TopBar />
      <NavBar />

      <section class="content">
        <div class="col-4">
          <div class="sidebar">
            <div class="sidebar__header">
              <a class="sidebar__header-link" href="#">
                <i class="sidebar__haeder-icon fa fa-book-open"></i>
                لیست جلسات
              </a>
            </div>
            <div class="sidebar-topics">
              <div class="sidebar-topics__item">
                <ul class="sidebar-topics__list">
                  {
                    sessions.map(session => (
                      <Link to={`/${courseName}/${session._id}`}>
                        <li class="sidebar-topics__list-item">
                          <div class="sidebar-topics__list-right">
                            <i class="sidebar-topics__list-item-icon fa fa-play-circle"></i>
                            <span class="sidebar-topics__list-item-link">
                              {
                                session.title
                              }
                            </span>
                          </div>
                          <div class="sidebar-topics__list-left">
                            <span class="sidebar-topics__list-item-time">
                              {session.time}
                            </span>
                          </div>
                        </li>
                      </Link>
                    ))
                  }

                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="episode">
            <div class="episode-haeder">
              <div class="episode-header__right">
                <a class="episode-header__right-back-link" href="#">
                  <div class="episode-header__right-home">
                  <i class="episode-header__right-back-icon fa fa-angle-right"></i>
                    <Link class="episode-header__right-home-link" to={`/course-info/${courseName}`}>
                      به دوره خانه بروید
                      {' '}
                      <i class="episode-header__right-home-icon fa fa-home"></i>
                    </Link>
                  </div>
                </a>
              </div>
              <div class="episode-header__left">
                <i class="episode-header__left-icon fa fa-play-circle"></i>
                <span class="episode-header__left-text">
                  {" "}
                  {session.title}
                </span>
              </div>
            </div>
            <div class="episode-content">
              <video
                class="episode-content__video"
                src={`http://localhost:4000/courses/covers/${session.video}`}
                controls
              ></video>
              <a class="episode-content__video-link" href="#">
                دانلود ویدئو
              </a>
              <div class="episode-content__bottom">
                <a class="episode-content__backward" href="#">
                  <i class="episode-content__backward-icon fa fa-arrow-right"></i>
                  قبلی
                </a>
                <a class="episode-content__forward" href="#">
                  بعدی
                  <i class="episode-content__backward-icon fa fa-arrow-left"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
