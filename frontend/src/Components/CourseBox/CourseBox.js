import React, { useState } from 'react'
import './CourseBox.css'
import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'

export default function CourseBox({ name, cover, shortname, creator, price , isSlider}) {
    
    return (
        <div className={isSlider ? 'col-12' : 'col-4'}>
            <div class="course-box">
                <Link to={`/course-info/${shortname}`}>
                    {
                        cover ? (
                            <img src={`/images/courses/${cover}`} class="course-box__img" />
                        ) : (<Skeleton variant="rectangular" width={"100%"} height={200} />)
                    }
                </Link>
                <div class="course-box__main">
                    <Link to={`/course-info/${shortname}`} class="course-box__title">{name ? name : (
                        <Skeleton variant="rectangular" width={"40%"} height={30} />
                    )}</Link>

                    <div class="course-box__rating-teacher">
                        <div class="course-box__teacher">
                            <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                            <a href="#" class="course-box__teacher-link">{creator ? creator : (
                                <Skeleton variant="rectangular" width={"80px"} height={20} />
                            )}</a>
                        </div>
                        <div class="course-box__rating">
                            {
                                name ? (
                                    <>
                                        <img src="/images/svgs/star.svg" alt="rating" class="course-box__star" />
                                        <img src="/images/svgs/star_fill.svg" alt="rating" class="course-box__star" />
                                        <img src="/images/svgs/star_fill.svg" alt="rating" class="course-box__star" />
                                        <img src="/images/svgs/star_fill.svg" alt="rating" class="course-box__star" />
                                        <img src="/images/svgs/star_fill.svg" alt="rating" class="course-box__star" />
                                    </>
                                ) : (
                                    <Skeleton variant="rectangular" width={"90px"} height={20} />
                                )
                            }


                        </div>
                    </div>

                    <div class="course-box__status">
                        <div class="course-box__users">
                            <i class="fas fa-users course-box__users-icon"></i>
                            <span class="course-box__users-text">500</span>
                        </div>
                        <span class="course-box__price">{price >= 1 ? price.toLocaleString() : 'رایگان'}</span>
                    </div>
                </div>

                <div class="course-box__footer">
                    <Link to={`/course-info/${shortname}`} class="course-box__footer-link">
                        مشاهده اطلاعات
                        <i class="fas fa-arrow-left course-box__footer-icon"></i>
                    </Link>
                </div>

            </div>
        </div>
    )
}
