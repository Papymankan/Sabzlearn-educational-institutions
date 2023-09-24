import React from "react";
import './AdminSideBar.css'
import { Link } from 'react-router-dom'

export default function AdminSideBar() {
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
            <Link to={'/admin-panel/offs'}>
              <span>کدهای تخفیف</span>
            </Link>
          </li>
          <li>
            <Link to={'/admin-panel/categories'}>
              <span>دسته‌بندی‌ها</span>
            </Link>

          </li>
        </ul>
      </div>
    </div>
  );
}
