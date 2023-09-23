import React from 'react'
import { Outlet } from 'react-router'
import AdminSideBar from '../../Components/AdminPanel/AdminSideBar/AdminSideBar'

export default function AdminPanel() {
  return (
    <>
      <div id="content">
        <AdminSideBar />
        <Outlet />
      </div>
    </>
  )
}
