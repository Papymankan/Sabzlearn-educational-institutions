import React, { useContext, useEffect, useState } from "react";
import './EditAccount.css'
import AuthContext from "../../../Context/authContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function EditAccount() {

    const authContext = useContext(AuthContext)

    const navigate = useNavigate()

    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    useEffect(() => {
        setPhone(authContext.userInfos ? authContext.userInfos.phone : '')
        setName(authContext.userInfos.name)
        setUserName(authContext.userInfos.username)
        setEmail(authContext.userInfos.email)
    }, [authContext])

    const updateUser = (e) => {
        e.preventDefault()
        let user = {
            phone,
            name,
            username,
            email,
            password,
        }
        const localData = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:4000/v1/users', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localData.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => {
            if (res.ok) {
                Swal.fire({
                    title: '<p style="font-size: 30px ; margin-bottom: 10px;">با موفقیت ذخیره شد</p>',
                    icon: 'success',
                    padding: '20px',
                    didOpen: () => {
                        Swal.showLoading()
                    },
                    width: '380px',
                    timer: 1500,
                    willClose: () => {
                        navigate('/user-panel', { replace: true })
                        window.location.reload()
                    }
                })
            }
        })
    }

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
                                        type="number"
                                        value={phone}
                                        onChange={event => setPhone(event.target.value)}
                                        placeholder="لطفا شماره موبایل خود را وارد کنید"
                                    />
                                    {Boolean(phone) && phone.length != 11 && <span class="phone__help">
                                        شماره تماس معتبر نیست
                                    </span>}
                                    {
                                        console.log(typeof (phone))
                                    }
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
                                        value={username}
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
                                        type="email"
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                        placeholder="لطفا نام نمایشی خود را وارد کنید"
                                    />
                                    {
                                        !email.includes('@') && <span class="phone__help">
                                            ایمیل معتبر نیست
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div class="edit__password">
                            <span class="edit__password-title">تغییر گذرواژه</span>
                            <div class="row">
                                <div class="col-12">
                                    <label class="edit__label"> گذرواژه جدید</label>
                                    <input
                                        class="edit__input"
                                        type="text"
                                        value={password}
                                        onChange={event => setPassword(event.target.value)}
                                        placeholder=" گذرواژه جدید"
                                    />
                                    {
                                        password.length < 8 && <span class="phone__help">
                                            حداقل 8 کاراکتر باشد
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>
                        <button class="edit__btn" type="submit" onClick={updateUser} disabled={!name || phone.length != 11 || !email.includes('@') || password.length < 8 || !username}>
                            ذخیره تغییرات
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
