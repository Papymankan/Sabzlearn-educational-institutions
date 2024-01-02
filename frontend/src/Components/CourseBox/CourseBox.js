import React, { useState } from 'react'
import './CourseBox.css'
import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'

export default function CourseBox({ name, cover, shortName, creator, price, isSlider, registers, discount }) {

    return (
        <div className={isSlider ? 'col-12 slider-con' : 'col-4 slider-con'}>
            <div class="course-box">
                <Link to={`/course-info/${shortName}`} className='course-box_img_link'>
                    {
                        cover ? (
                            <img src={`http://localhost:4000/courses/covers/${cover}`} class="course-box__img" />
                        ) : (<Skeleton variant="rectangular" width={"100%"} height={200} />)
                    }
                </Link>
                <div class="course-box__main">
                    <Link to={`/course-info/${shortName}`} class="course-box__title">{name ? name : (
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
                            <span class="course-box__users-text">{registers}</span>
                        </div>
                        <div>
                            <span class={(discount && price != 0)? 'course-box__price lineThrough':'discount && price != 0'}>{price >= 1 ? price.toLocaleString() : 'رایگان'}</span> 
                            &nbsp;
                            {discount && price != 0 && <span class="course-box__price">{price >= 1 ? (price - (discount * price / 100)).toLocaleString() : 'رایگان'}</span>}
                        </div>
                    </div>
                </div>

                <div class="course-box__footer">
                    <Link to={`/course-info/${shortName}`} class="course-box__footer-link">
                        مشاهده اطلاعات
                        <i class="fas fa-arrow-left course-box__footer-icon"></i>
                    </Link>
                </div>
                {
                    discount && price != 0 && <span class="courses-box__discount">%{discount}</span>
                }
            </div>
        </div>
    )
}
