import React, { useContext, useEffect, useState } from 'react'
import './NavBar.css'
import AuthContext from '../../../Context/authContext'
import { Link } from 'react-router-dom'

export default function NavBar() {

    const [allMenus, setAllMenus] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/v1/menus')
            .then(res => res.json())
            .then(data => {
                setAllMenus(data)
            })
    }, [])

    const authContext = useContext(AuthContext)
    return (
        <div class="main-header">
            <div class="container-fluid">
                <div class="main-header__content">
                    <div class="main-header__right">
                        <img src="/images/logo/Logo.png" class="main-header__logo" alt="لوگوی سبزلرن" />

                        <ul class="main-header__menu">
                            <li class="main-header__item">
                                <Link to={'/'} class="main-header__link">صفحه اصلی</Link>
                            </li>
                            {
                                allMenus.map(headlink => (
                                    <li class="main-header__item">
                                        <Link to={`${headlink.href}/1`}>
                                            {headlink.title}
                                            {
                                                headlink.submenus.length != 0 ? (
                                                    <>
                                                        <i class="fas fa-angle-down main-header__link-icon"></i>
                                                        <ul class="main-header__dropdown">
                                                            {
                                                                headlink.submenus.map(sublink => (
                                                                    <li class="main-header__dropdown-item">
                                                                        <Link to={sublink.href} className="main-header__dropdown-link">{sublink.title}</Link>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </>
                                                ) : null
                                            }

                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div class="main-header__left">
                        <a href="#" class="main-header__search-btn">
                            <i class="fas fa-search main-header__search-icon"></i>
                        </a>
                        <a href="#" class="main-header__cart-btn">
                            <i class="fas fa-shopping-cart main-header__cart-icon"></i>
                        </a>

                        {
                            authContext.isloggedIn ? (
                                <Link to={'/user-panel'} class="main-header__profile">
                                    <span class="main-header__profile-text">{authContext.userInfos.name}</span>
                                </Link>
                            ) : (
                                <Link to={'/login'} class="main-header__profile">
                                    <span class="main-header__profile-text">ورود / ثبت نام</span>
                                </Link>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
