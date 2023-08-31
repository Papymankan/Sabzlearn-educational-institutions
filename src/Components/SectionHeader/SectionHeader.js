import React from 'react'
import './SectionHeader.css'

export default function SectionHeader({ main_title, primary_title, btn_title }) {
    return (
        <div class="courses-header">
            <div class="courses-header__right">
                <span class="courses-header__title title">{main_title}</span>
                <span class="courses-header__text">{primary_title}</span>
            </div>
            <div class="courses-header__left">
                {btn_title && (
                    <a href="#" class="courses-header__link">
                        {btn_title}
                        <i class="fas fa-arrow-left courses-header__icon"></i>
                    </a>)}

            </div>
        </div>
    )
}
