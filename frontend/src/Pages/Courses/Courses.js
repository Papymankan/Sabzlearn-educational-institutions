import React from 'react'
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import Footer from '../../Components/Footer/Footer'
import NavBar from '../../Components/Header/NavBar/NavBar'
import TopBar from '../../Components/Header/TopBar/TopBar'
import Pagination from '../../Components/Pagination/Pagination'
import CourseBox from '../../Components/CourseBox/CourseBox'
import './Courses.css'

export default function Courses() {
    return (
        <>
            <TopBar />
            <NavBar />
            <BreadCrumb links={[
                { id: 1, to: '/', title: "خانه" },
                { id: 2, to: '/courses', title: 'تمامی دوره ها' }
            ]} />
            <section class="courses">
                <div class="container">
                    <div class="courses-content">
                        <div class="container">
                            <div class="row">
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Pagination />
            <Footer />
        </>
    )
}
