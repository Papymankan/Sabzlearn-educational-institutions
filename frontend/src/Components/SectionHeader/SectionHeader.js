import React from 'react'
import './SectionHeader.css'
import { Link } from 'react-router-dom'

export default function SectionHeader({ main_title, primary_title, btn_title , btnHref}) {
    return (
        <div class="courses-header">
            <div class="courses-header__right">
                <span class="courses-header__title title">{main_title}</span>
                <span class="courses-header__text">{primary_title}</span>
            </div>
            <div class="courses-header__left">
                {btn_title && (
                    <Link to={btnHref} class="courses-header__link">
                        {btn_title}
                        <i class="fas fa-arrow-left courses-header__icon"></i>
                    </Link>)}

            </div>
        </div>
    )
}
