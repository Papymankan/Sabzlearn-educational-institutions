import React from "react";
import NavBar from '../../Components/Header/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import TopBar from '../../Components/Header/TopBar/TopBar'
import LastCourses from '../../Components/LastCourses/LastCourses';
import './NotFoundPage.css'


export default function NotFoundPage() {
  return (
    <>
      <TopBar />
      <NavBar />

      <div className="container notFound-main">
        <h1>گشتیم نبود ، نگرد نیست !!</h1>
        <p>
          صفحه مورد نظر شما یافت نشد
        </p>
        <LastCourses/>
      </div>

      <Footer />
    </>
  );
}
