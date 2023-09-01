import React from 'react'
import AboutUs from '../../Components/AboutUs/AboutUs';
import Articles from '../../Components/Articles/Articles';
import Header from '../../Components/Header/Header';
import LastCourses from '../../Components/LastCourses/LastCourses';
import Popular from '../../Components/Popular/Popular';
import Presell from '../../Components/Presell/Presell';

export default function Home() {
  return (
    <>
      <Header />
      <LastCourses/>
      <AboutUs/>
      <Popular/>
      <Presell/>
      <Articles/>
    </>
  )
}
