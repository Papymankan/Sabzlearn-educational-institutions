import React, { useContext, useEffect, useState } from "react";
import './EditAccount.css'
import AuthContext from "../../../Context/authContext";

export default function EditAccount() {

    const authContext = useContext(AuthContext)
    console.log(authContext);

    const [phone , setPhone] = useState()
    const [name , setName] = useState()
    const [userName , setUserName] = useState()
    const [email , setEmail] = useState()


    useEffect(()=>{
        setPhone(authContext.userInfos.phone)
        setName(authContext.userInfos.name)
        setUserName(authContext.userInfos.username)
        setEmail(authContext.userInfos.email)
    } , [authContext])

    return (
        <>
            <div class="col-9">
                <div class="edit">
                    <form class="edit__form" action="#">
                        <div class="edit__personal">
                            <div class="row">
                                <div class="col-12">
                                    <label class="edit__label">شماره موبایل *</label>
                                    <input
                                        class="edit__input"
                                        type="text"
                                        value={phone}
                                        onChange={event => setPhone(event.target.value)}
                                        placeholder="لطفا شماره موبایل خود را وارد کنید"
                                    />
                                </div>

                                <div class="col-12">
                                    <label class="edit__label">نام و نام خانوادگی *</label>
                                    <input
                                        class="edit__input"
                                        type="text"
                                        value={name}
                                        onChange={event => setName(event.target.value)}
                                        placeholder="لطفا نام نمایشی خود را وارد کنید"
                                    />
                                </div>
                                <div class="col-12">
                                    <label class="edit__label">نام کاربری (نمایشی) *</label>
                                    <input
                                        class="edit__input"
                                        type="text"
                                        value={userName}
                                        onChange={event => setUserName(event.target.value)}
                                        placeholder="لطفا نام نمایشی خود را وارد کنید"
                                    />
                                    <span class="edit__help">
                                        اسم شما به این صورت در حساب کاربری و نظرات دیده خواهد شد.
                                    </span>
                                </div>
                                <div class="col-12">
                                    <label class="edit__label">آدرس ایمیل *</label>
                                    <input
                                        class="edit__input"
                                        type="text"
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                        placeholder="لطفا نام نمایشی خود را وارد کنید"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="edit__password">
                            <span class="edit__password-title">تغییر گذرواژه</span>
                            <div class="row">
                                <div class="col-12">
                                    <label class="edit__label">
                                        گذرواژه پیشین (در صورتی که قصد تغییر ندارید خالی بگذارید)
                                    </label>
                                    <input
                                        class="edit__input"
                                        type="text"
                                        placeholder="گذرواژه پیشین"
                                    />
                                </div>
                                <div class="col-12">
                                    <label class="edit__label">
                                        گذرواژه جدید (در صورتی که قصد تغییر ندارید خالی بگذارید)
                                    </label>
                                    <input
                                        class="edit__input"
                                        type="text"
                                        placeholder="گذرواژه جدید"
                                    />
                                </div>
                                <div class="col-12">
                                    <label class="edit__label">تکرار گذرواژه جدید</label>
                                    <input
                                        class="edit__input"
                                        type="text"
                                        placeholder="تکرار گذرواژه جدید"
                                    />
                                </div>
                            </div>
                        </div>
                        <button class="edit__btn" type="submit">
                            ذخیره تغییرات
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
