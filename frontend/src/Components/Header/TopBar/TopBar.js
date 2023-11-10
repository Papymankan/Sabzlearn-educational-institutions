import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './TopBar.css'

export default memo(function TopBar({}) {
    const [topBarLinks, setTopBarLinks] = useState([])
    const [info, setInfo] = useState({})

    const getRandomLinks = (links, ranNum) => {
        const shuffled = [...links].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, ranNum)
    }

    useEffect(() => {
        fetch('http://localhost:4000/v1/menus/topbar')
            .then(res => res.json())
            .then(data => {
                setTopBarLinks(data)
            })
    }, [])

    useEffect(() => {
        fetch('http://localhost:4000/v1/infos/index')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setInfo(data)})
    }, [])

    return (
        <div class="top-bar">
            <div class="container-fluid">
                <div class="top-bar__content">
                    <div class="top-bar__right">
                        <ul class="top-bar__menu">
                            {
                                getRandomLinks(topBarLinks, 6).map(link => (
                                    <li class="top-bar__item">
                                        <Link className='top-bar__link' to={link.href}>
                                            {link.title}
                                        </Link>
                                    </li>
                                ))
                            }
                            <li class="top-bar__item">
                                <a href="#" class="top-bar__link">20,000 تومان</a>
                            </li>
                        </ul>
                    </div>
                    <div class="top-bar__left">
                        <div class="top-bar__email">
                            <a href="#" class="top-bar__email-text top-bar__link">
                                {info.email}
                            </a>
                            <i class="fas fa-envelope top-bar__email-icon"></i>
                        </div>
                        <div class="top-bar__phone">
                            <a href="#" class="top-bar__phone-text top-bar__link">
                                {info.phone}
                            </a>
                            <i class="fas fa-phone top-bar__phone-icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
)