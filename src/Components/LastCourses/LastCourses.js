import React from 'react'
import './LastCourses.css'
import SectionHeader from '../SectionHeader/SectionHeader'
import CourseBox from '../CourseBox/CourseBox'

export default function LastCourses() {
    return (
        <div className="courses">
            <div className="container">
                <SectionHeader main_title="جدیدترین دوره ها" primary_title="سکوی پرتاب شما به سمت موفقیت" btn_title="تمامی دوره ها" />
                <div class="courses-content">
                    <div class="container">
                        <div class="row">
                            <CourseBox/>
                            <CourseBox/>
                            <CourseBox/>
                            <CourseBox/>
                            <CourseBox/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
