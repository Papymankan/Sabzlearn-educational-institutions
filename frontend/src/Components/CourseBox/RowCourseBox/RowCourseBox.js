import React from 'react'
import { Link } from 'react-router-dom'
import './RowCourseBox.css'

export default function RowCourseBox({ name, description, price, creator, cover, shortName, discount }) {
    return (
        <div class="col-12">
            <div class="course-box">
                <div class="course__box-header">
                    <div class="course__box-right">
                        <Link to={`/course-info/${shortName}`}
                            class="course__box-right-link"
                            href="#"
                        >
                            <img
                                src={`http://localhost:4000/courses/covers/${cover}`}
                                class="course__box-right-img"
                            />
                        </Link>
                    </div>
                    <div class="course__box-left">
                        <div class="course__box-left-top">
                            <Link to={`/course-info/${shortName}`}
                                href="#"
                                class="course__box-left-link"
                            >
                                {name}
                            </Link>
                        </div>
                        <div class="course__box-left-center">
                            <div class="course__box-left-teacher">
                                <i class="course__box-left-icon fa fa-chalkboard-teacher"></i>
                                <span class="course__box-left-name">
                                    {creator}
                                </span>
                            </div>
                            <div class="course__box-left-stars">
                                <span class="course__box-left-star">
                                    <img src="/images/svgs/star_fill.svg" />
                                </span>
                                <span class="course__box-left-star">
                                    <img src="/images/svgs/star_fill.svg" />
                                </span>
                                <span class="course__box-left-star">
                                    <img src="/images/svgs/star_fill.svg" />
                                </span>
                                <span class="course__box-left-star">
                                    <img src="/images/svgs/star_fill.svg" />
                                </span>
                                <span class="course__box-left-star">
                                    <img src="/images/svgs/star_fill.svg" />
                                </span>
                            </div>
                        </div>
                        <div class="course__box-left-bottom">
                            <div class="course__box-left-des">
                                <p>{description}</p>
                            </div>
                        </div>
                        <div class="course__box-footer">
                            <div class="course__box-footer-right">
                                <i class="course__box-footer-icon fa fa-users"></i>
                                <span class="course__box-footer-count">
                                    202
                                </span>
                            </div>
                            <span class="course__box-footer-left">
                                {price === 0
                                    ? "رایگان"
                                    : price.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
                {
                    discount && price != 0 && <span class="courses-box__discount">%{discount}</span>
                }
            </div>
        </div>
    )
}
