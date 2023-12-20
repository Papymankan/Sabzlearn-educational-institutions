import React from "react";
import { Link } from "react-router-dom";

export default function UserSideBar() {
    return (
        <>
            <div class="col-3">
                <div class="sidebar">
                    <span class="sidebar__name">محمدامین سعیدی راد</span>
                    <ul class="sidebar__list">
                        <li class="sidebar__item">
                            <Link class="sidebar__link" to={''}>
                                پیشخوان
                            </Link>
                        </li>
                        <li class="sidebar__item">
                            <a class="sidebar__link" href="#">
                                سفارش
                            </a>
                        </li>
                        <li class="sidebar__item">
                            <a class="sidebar__link" href="#">
                                کیف پول من
                            </a>
                        </li>
                        <li class="sidebar__item">
                            <a class="sidebar__link" href="#">
                                جزئیات حساب کاربری
                            </a>
                        </li>
                        <li class="sidebar__item">
                            <a class="sidebar__link" href="#">
                                دوره های خریداری شده
                            </a>
                        </li>
                        <li class="sidebar__item">
                            <a class="sidebar__link" href="#">
                                تیکت های پشتیبانی
                            </a>
                        </li>
                        <li class="sidebar__item">
                            <a class="sidebar__link" href="#">
                                خروج از سیستم
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
