import React, { useContext } from 'react'
import './NavBar.css'
import AuthContext from '../../../Context/authContext'
import { Link } from 'react-router-dom'

export default function NavBar() {

    const authContext = useContext(AuthContext)
    return (
        <div class="main-header">
            <div class="container-fluid">
                <div class="main-header__content">
                    <div class="main-header__right">
                        <img src="/images/logo/Logo.png" class="main-header__logo" alt="لوگوی سبزلرن" />

                        <ul class="main-header__menu">
                            <li class="main-header__item">
                                <a href="#" class="main-header__link">صفحه اصلی</a>
                            </li>

                            <li class="main-header__item">
                                <a href="#" class="main-header__link">فرانت اند
                                    <i class="fas fa-angle-down main-header__link-icon"></i>
                                    <ul class="main-header__dropdown">
                                        <li class="main-header__dropdown-item">
                                            <a href="#" class="main-header__dropdown-link">آموزش Html</a>
                                        </li>
                                        <li class="main-header__dropdown-item">
                                            <a href="#" class="main-header__dropdown-link">آموزش Css</a>
                                        </li>
                                        <li class="main-header__dropdown-item">
                                            <a href="#" class="main-header__dropdown-link">آموزش جاوا اسکریپت</a>
                                        </li>
                                        <li class="main-header__dropdown-item">
                                            <a href="#" class="main-header__dropdown-link">آموزش FlexBox</a>
                                        </li>
                                        <li class="main-header__dropdown-item">
                                            <a href="#" class="main-header__dropdown-link">آموزش جامع ری‌اکت</a>
                                        </li>
                                    </ul>
                                </a>
                            </li>
                            <li class="main-header__item">
                                <a href="#" class="main-header__link">امنیت
                                    <i class="fas fa-angle-down main-header__link-icon"></i>
                                    <ul class="main-header__dropdown">
                                        <li class="main-header__dropdown-item">
                                            <a href="#" class="main-header__dropdown-link">آموزش کالی لینوکس</a>
                                        </li>
                                        <li class="main-header__dropdown-item">
                                            <a href="#" class="main-header__dropdown-link">آموزش پایتون سیاه</a>
                                        </li>
                                        <li class="main-header__dropdown-item">
                                            <a href="#" class="main-header__dropdown-link">آموزش جاوا اسکریپت سیاه</a>
                                        </li>
                                        <li class="main-header__dropdown-item">
                                            <a href="#" class="main-header__dropdown-link">آموزش شبکه</a>
                                        </li>
                                    </ul>
                                </a>
                            </li>
                            <li class="main-header__item">
                                <a href="#" class="main-header__link">مقالات
                                    <i class="fas fa-angle-down main-header__link-icon"></i>
                                    <ul class="main-header__dropdown">
                                        <li class="main-header__dropdown-item">
                                            <a href="#" class="main-header__dropdown-link">توسعه وب</a>
                                        </li>
                                        <li class="main-header__dropdown-item">
                                            <a href="#" class="main-header__dropdown-link">جاوا اسکریپت</a>
                                        </li>
                                        <li class="main-header__dropdown-item">
                                            <a href="#" class="main-header__dropdown-link">فرانت اند</a>
                                        </li>
                                    </ul>
                                </a>
                            </li>
                            <li class="main-header__item">
                                <a href="#" class="main-header__link">پایتون
                                    <i class="fas fa-angle-down main-header__link-icon"></i>
                                    <ul class="main-header__dropdown">
                                        <li class="main-header__dropdown-item">
                                            <a href="#" class="main-header__dropdown-link">دوره متخصص پایتون</a>
                                        </li>
                                        <li class="main-header__dropdown-item">
                                            <a href="#" class="main-header__dropdown-link">دوره هوش مصنوعی با پایتون</a>
                                        </li>
                                        <li class="main-header__dropdown-item">
                                            <a href="#" class="main-header__dropdown-link">دوره متخصص جنگو</a>
                                        </li>
                                    </ul>
                                </a>
                            </li>
                            <li class="main-header__item">
                                <a href="#" class="main-header__link">مهارت های نرم</a>
                            </li>
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
                                <a href="#" class="main-header__profile">
                                    <span class="main-header__profile-text">{authContext.userInfos.name}</span>
                                </a>
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
