import React, { useEffect, useState } from 'react'
import './LastCourses.css'
import SectionHeader from '../SectionHeader/SectionHeader'
import CourseBox from '../CourseBox/CourseBox'

export default function LastCourses() {

    const [allCourses, setAllCourses] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/v1/courses')
            .then(res => res.json())
            .then(data => {
                setAllCourses(data.reverse().slice(0, 6))
            })
    }, [])


    return (
        <div className="courses">
            <div className="container">
                <SectionHeader main_title="جدیدترین دوره ها" primary_title="سکوی پرتاب شما به سمت موفقیت" btn_title="تمامی دوره ها" btnHref={'/courses/1'} />
                <div class="courses-content">
                    <div class="container">
                        <div class="row">
                            {
                                allCourses.map(course => {
                                    return <CourseBox {...course}/>
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
