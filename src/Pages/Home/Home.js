import React from 'react'
import AboutUs from '../../Components/AboutUs/AboutUs';
import Header from '../../Components/Header/Header';
import LastCourses from '../../Components/LastCourses/LastCourses';

export default function Home() {
  return (
    <>
      <Header />
      <LastCourses/>
      <AboutUs/>
    </>
  )
}
