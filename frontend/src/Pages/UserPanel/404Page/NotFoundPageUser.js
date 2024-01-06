import React from "react";
import Footer from "../../../Components/Footer/Footer";
import NavBar from "../../../Components/Header/NavBar/NavBar";
import TopBar from "../../../Components/Header/TopBar/TopBar";
import LastCourses from "../../../Components/LastCourses/LastCourses";
import IndexBox from "../../../Components/UserPanel/IndexBox/IndexBox";

export default function NotFoundPageUser() {
    return (
        <>

            <div className="col-9 notFound-main">
                <h1>گشتیم نبود ، نگرد نیست !!</h1>
                <p>
                    صفحه مورد نظر شما یافت نشد
                </p>
                <div class="main__links">
                    <div class="row">
                        <IndexBox title="سفارش" href="orders" />
                        <IndexBox title="دوره های خریداری شده" href="courses" />
                        <IndexBox title="کیف پول من" href="money" />
                        <IndexBox title="جزئیات حساب کاربری" href="edit-account" />
                        <IndexBox title="تیکت های پشتیبانی" href="tickets" />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
