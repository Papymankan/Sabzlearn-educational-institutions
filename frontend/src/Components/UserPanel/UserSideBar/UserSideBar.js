import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../../../Context/authContext";

export default function UserSideBar() {

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    const logout = () => {
        authContext.logout()
        Swal.fire({
            title: '<p style="font-size: 30px ; margin-bottom: 10px;">با موفقیت خارج شدید</p>',
            icon: 'success',
            padding: '20px',
            html: '<p style="font-size: 20px ; margin-bottom: 20px;">در حال منتقل شدن...</p>',
            didOpen: () => {
                Swal.showLoading()
            }, 
            width: '380px',
            timer: 1500,
            willClose: () => {
                navigate('/', { replace: true })
            }
        })
    }
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
                            <Link class="sidebar__link" to={'orders/1'}>
                                سفارش
                            </Link>
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
                            <a class="sidebar__link" href="javascript:void(0)" onClick={logout}>
                                خروج از سیستم
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
