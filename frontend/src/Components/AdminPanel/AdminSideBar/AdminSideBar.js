import React, { useContext } from "react";
import './AdminSideBar.css'
import { Link } from 'react-router-dom'
import AuthContext from "../../../Context/authContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


export default function AdminSideBar() {

  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const LogOut = () => {
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
    <div id="sidebar" className="col-2">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <a href="#">
            <img src="/images/logo/Logo.png" alt="Logo" />
          </a>
        </div>

        <div class="sidebar-menu-btn">
          <i class="fas fa-bars"></i>
        </div>
      </div>
      <div class="sidebar-menu">
        <ul>
          <li class="active-menu">
            <Link to={'/admin-panel'}>
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <Link to={'/admin-panel/courses'}>
              <span>دوره ها</span>
            </Link>
          </li>
          <li>
            <Link to={'/admin-panel/sessions'}>
              <span>جلسات</span>
            </Link>
          </li>
          <li>
            <Link to={'/admin-panel/menus'}>
              <span>منو ها</span>
            </Link>

          </li>
          <li>
            <Link to={'/admin-panel/articles'}>
              <span>مقاله ها</span>
            </Link>
          </li>
          <li>
            <Link to={'/admin-panel/users'}>
              <span>کاربران</span>
            </Link>
          </li>
          <li>
            <Link to={'/admin-panel/contact'}>
              <span>ارتباط</span>
            </Link>
          </li>
          <li>
            <Link to={'/admin-panel/offs'}>
              <span>کدهای تخفیف</span>
            </Link>
          </li>
          <li>
            <Link to={'/admin-panel/categories'}>
              <span>دسته‌بندی‌ها</span>
            </Link>

          </li>
          <li>
            <a href="javascript:void(0)" onClick={LogOut}>
              <span>خروج</span>
            </a>

          </li>
        </ul>
      </div>
    </div>
  );
}
