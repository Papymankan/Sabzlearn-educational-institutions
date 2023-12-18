import React from "react";
import { Outlet } from "react-router";
import './UserPanel.css'
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/Header/NavBar/NavBar";
import TopBar from "../../Components/Header/TopBar/TopBar";
import UserSideBar from "../../Components/UserPanel/UserSideBar/UserSideBar";

export default function UserPanel() {
  return (
    <>
        <TopBar/>
        <NavBar/>
        <section class="content">
        <div class="content-header">
            <div class="container">
                <span class="content-header__title">حساب کاربری من</span>
                <span class="content-header__subtitle">پیشخوان</span>
            </div>
        </div>
        <div class="content-main">
            <div class="container">
                <div class="row">
                    <UserSideBar/>
                    <Outlet />

                </div>
            </div>
        </div>
    </section>
        <Footer/>
    </>
  );
}
