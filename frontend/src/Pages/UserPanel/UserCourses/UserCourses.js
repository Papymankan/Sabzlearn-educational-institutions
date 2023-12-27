import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './UserCourses.css'

export default function UserCourses() {
    const [courses, setCourses] = useState([])
    const [showCourses, setShowCourses] = useState([])
    const [tab, setTab] = useState('all')

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('user'))
        fetch(`http://localhost:4000/v1/users/courses`, {
            headers: {
                'Authorization': `Bearer ${localData.token}`
            },
        }).then(res => res.json()).then(data => {
            setCourses(data)
            setShowCourses(data)
        })
    }, [])

    const FilterCourses = () => {
        if (tab == 'all') {
            setShowCourses(courses)
        } else if (tab == 'free') {
            let arr = courses.filter(course => course.course.price == 0)
            setShowCourses(arr)
        } else if (tab == 'notFree') {
            let arr = courses.filter(course => course.course.price != 0)
            setShowCourses(arr)
        }
    }

    useEffect(FilterCourses, [tab])

    return (
        <div class="col-9">
            <div class="courses">
                <div class="Usercourses-header">
                    <span class="courses-header__title">دوره های ثبت نام شده</span>
                    <ul class="courses-header__list">
                        <li class="courses-header__item">
                            <a class={`Usercourses-header__link  ${tab == 'all' ? 'Usercourses-header__link-active' : ''}`}
                                href="#" onClick={(e) => {
                                    e.preventDefault()
                                    setTab('all')
                                }}
                            >
                                همه دوره ها
                            </a>
                        </li>
                        <li class="courses-header__item">
                            <a class={`Usercourses-header__link  ${tab == 'free' ? 'Usercourses-header__link-active' : ''}`} href="#" onClick={(e) => {
                                e.preventDefault()
                                setTab('free')
                            }}>
                                دوره های رایگان
                            </a>
                        </li>
                        <li class="courses-header__item">
                            <a class={`Usercourses-header__link  ${tab == 'notFree' ? 'Usercourses-header__link-active' : ''}`} href="#" onClick={(e) => {
                                e.preventDefault()
                                setTab('notFree')
                            }}>
                                دوره های پولی
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="UserCourses-main">
                    <div class="row">
                        <div class="col-12">
                            {showCourses.length ? showCourses.map((course) => (
                                <div class="main__box">
                                    <div class="main__box-right">
                                        <a class="main__box-img-link" href="#">
                                            <img
                                                class="main__box-img img-fluid"
                                                src={`http://localhost:4000/courses/covers/${course.course.cover}`}
                                            />
                                        </a>
                                    </div>
                                    <div class="main__box-left">
                                        <Link to={`/course-info/${course.course.shortName}`} class="main__box-title">
                                            {course.course.name}
                                        </Link>
                                        <div class="main__box-bottom">
                                            <div class="main__box-all">
                                                <span class="main__box-all-text">وضعیت:</span>
                                                <span class="main__box-all-value">{course.course.isComplete ? 'تکمیل شده' : ' در حال برگزاری'}</span>
                                            </div>
                                            <div class="main__box-completed">
                                                <span class="main__box-completed-text">
                                                    قیمت:{' '}
                                                </span>
                                                <span class="main__box-completed-value">{course.course.price ? course.course.price.toLocaleString() : 'رایگان'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : <div className="alert alert-info">برای این قسمت دوره ای وجود ندارد</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
