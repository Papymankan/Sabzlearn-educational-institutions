import React from 'react'

export default function AccordionItem({ session , index}) {
    return (
        <div class="accordion-body introduction__accordion-body">
            <div class="introduction__accordion-right">
                <span class="introduction__accordion-count">{index+1}</span>
                <i class="fab fa-youtube introduction__accordion-icon"></i>
                <a href="#" class="introduction__accordion-link">
                    {session.title}
                </a>
            </div>
            <div class="introduction__accordion-left">
                <span class="introduction__accordion-time">
                    {session.time}
                </span>
            </div>
        </div>
    )
}
