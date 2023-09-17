import React, { useEffect, useState } from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import CourseBox from '../CourseBox/CourseBox'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Presell.css'

export default function Presell() { 

    const [courses, setCourses] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/v1/courses/presell')
            .then(res => res.json())
            .then(data => setCourses(data))
    }, [])

    return (
        <div class="presell">
            <div class="container">
                <SectionHeader btn_title={""} primary_title="" main_title={"دوره های در حال پیش فروش"} />
                <div className="course-content">
                    <div className="container">
                        <div className="row">
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={15}
                                pagination={{
                                    clickable: true,
                                }}
                                // modules={[Pagination]}
                                className="mySwiper"
                            >

                                {
                                    courses.map(course => (
                                        <SwiperSlide>
                                            <CourseBox cover={course.cover} creator={course.creator} name={course.name} price={course.price} shortname={course.shortName} isSlider={true} />
                                        </SwiperSlide>
                                    ))
                                }

                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
