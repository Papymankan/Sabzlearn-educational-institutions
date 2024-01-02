import React, { useEffect, useState } from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Popular.css'
import CourseBox from '../CourseBox/CourseBox';

export default function Popular() {

    const [courses, setCourses] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/v1/courses/popular')
            .then(res => res.json())
            .then(data => setCourses(data))
    }, [])

    return (
        <div class="popular">
            <div class="container">
                <SectionHeader main_title="محبوب ترین دوره ها" primary_title={""} btn_title={""} />
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
                                            <CourseBox {...course} isSlider={true}/>
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
