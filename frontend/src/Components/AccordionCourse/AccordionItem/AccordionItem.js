import React from 'react'
import { Link } from 'react-router-dom'

export default function AccordionItem({ session, index, IsRegistered , courseName}) {
    return (
        <>
            {session.free == 1 || IsRegistered ? (
                <div class="accordion-body introduction__accordion-body">
                    <div class="introduction__accordion-right">
                        <span class="introduction__accordion-count">{index + 1}</span>
                        <i class="fab fa-youtube introduction__accordion-icon"></i>
                        <Link to={`/${courseName}/${session._id}`} class="introduction__accordion-link">
                            {session.title}
                        </Link>
                    </div>
                    <div class="introduction__accordion-left">
                        <span class="introduction__accordion-time">
                            {`${session.time}:00`}
                        </span>
                    </div>
                </div>
            ) : (
                <div class="accordion-body introduction__accordion-body">
                    <div class="introduction__accordion-right">
                        <span class="introduction__accordion-count">{index + 1}</span>
                        <i class="fab fa-youtube introduction__accordion-icon"></i>
                        <span class="introduction__accordion-link">
                            {session.title}
                        </span>
                    </div>
                    <div class="introduction__accordion-left">
                        <span class="introduction__accordion-time">
                            {`${session.time}:00`}   
                        </span>
                        <i className="fa fa-lock"></i>
                    </div>
                </div>
            )}

        </>

    )
}
