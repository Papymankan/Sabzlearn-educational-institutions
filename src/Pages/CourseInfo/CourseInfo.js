import React from 'react'
import TopBar from './../../Components/Header/TopBar/TopBar'
import NavBar from './../../Components/Header/NavBar/NavBar'
import Footer from './../../Components/Footer/Footer'
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'

export default function CourseInfo() {
  return (
    <>
      <TopBar/>
      <NavBar/>
      <BreadCrumb
        links={[
          {id:1 , title:'خانه' , to:'/'},
          {id:2 , title:'آموزش برنامه نویسی فرانت اند' , to:'/category/frontend'},
          {id:3 , title:'دوره متخصص جاوا اسکریپت' , to:'/courseInfo/javascript'},
        ]}
      />

      <Footer/>
    </>
  )
}
