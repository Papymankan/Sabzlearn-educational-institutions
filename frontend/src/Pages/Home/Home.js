import React from 'react'
import AboutUs from '../../Components/AboutUs/AboutUs';
import Articles from '../../Components/Articles/Articles';
import Header from '../../Components/Header/Header';
import LastCourses from '../../Components/LastCourses/LastCourses';
import Popular from '../../Components/Popular/Popular';
import Presell from '../../Components/Presell/Presell';
import Footer from '../../Components/Footer/Footer';
import TopBar from '../../Components/Header/TopBar/TopBar';
import NavBar from '../../Components/Header/NavBar/NavBar';
import Landing from '../../Components/Header/Landing/Landing';

export default function Home() {
  return (
    <>
      <TopBar/>
      <NavBar/>
      <Landing/>
      <LastCourses/>
      <AboutUs/>
      <Popular/>
      <Presell/>
      <Articles/>
      <Footer/>
    </>
  )
}
