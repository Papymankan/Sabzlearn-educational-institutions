import React from 'react'
import './AdminPanel.css'
import { Outlet } from 'react-router'
import AdminSideBar from '../../Components/AdminPanel/AdminSideBar/AdminSideBar'
import AdminTopBar from '../../Components/AdminPanel/AdminTopBar/AdminTopBar'


export default function AdminPanel() {

  return (
    <>
      <div id="content">
        <AdminSideBar />
        <div className="col-10" id='home'>
          <AdminTopBar />
          <div class="container-fluid" id="home-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
