import React, { useEffect, useState } from "react";

export default function SendTicket() {

    const [deps, setDeps] = useState([])
    const [departmentSubs, setDepartmentSubs] = useState([])
    const [subId, setSubId] = useState('')
    const [courses, setCourses] = useState([])

    const fetchDeps = () => {
        const localData = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:4000/v1/tickets/departments', {
            headers: {
                'Authorization': `Bearer ${localData.token}`
            }
        }).then(res => res.json()).then(data => setDeps(data))
    }

    const fetchDepartmentsSubs = (id) => {
        const localData = JSON.parse(localStorage.getItem('user'))
        fetch(`http://localhost:4000/v1/tickets/departments-subs/${id}`, {
            headers: {
                'Authorization': `Bearer ${localData.token}`
            }
        }).then(res => res.json()).then(data => setDepartmentSubs(data))
    }

    useEffect(() => {
        fetchDeps()

        const localData = JSON.parse(localStorage.getItem('user'))
        fetch(`http://localhost:4000/v1/users/courses`, {
            headers: {
                'Authorization': `Bearer ${localData.token}`
            },
        }).then(res => res.json()).then(data => {
            setCourses(data)
        })
    }, [])

    return (
        <div class="col-9">
            <div class="ticket">
                <div class="ticket-header">
                    <span class="ticket-header__title">ارسال تیکت جدید</span>
                    <a class="ticket-header__link" href="#">
                        همه تیکت ها
                    </a>
                </div>
                <form class="ticket-form" action="#">
                    <div class="row">
                        <div class="col-6">
                            <label class="ticket-form__label">دپارتمان را انتخاب کنید:</label>
                            <select
                                class="ticket-form__select"
                                onChange={e => {
                                    setSubId('')
                                    fetchDepartmentsSubs(e.target.value)}}
                            >
                                <option class="ticket-form__option" disabled selected value={''}>
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                {deps.map((department) => (
                                    <option value={department._id}>{department.title}</option>
                                ))}
                            </select>
                        </div>
                        <div class="col-6">
                            <label class="ticket-form__label">نوع تیکت را انتخاب کنید:</label>
                            <select class="ticket-form__select" onChange={(e) => setSubId(e.target.value)} value={subId}>
                                <option class="ticket-form__option" disabled selected value={''}>
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                {departmentSubs.map((sub) => (
                                    <option value={sub._id}>{sub.title}</option>
                                ))}
                            </select>
                        </div>
                        <div class="col-6">
                            <label class="ticket-form__label">عنوان تیکت را وارد کنید:</label>
                            <input class="ticket-form__input" type="text" />
                        </div>
                        <div class="col-6">
                            <label class="ticket-form__label">دپارتمان را انتخاب کنید:</label>
                            <select class="ticket-form__select">
                                <option class="ticket-form__option">
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                <option class="ticket-form__option">پشتیبانی</option>
                                <option class="ticket-form__option">مشاوره</option>
                                <option class="ticket-form__option">مالی</option>
                                <option class="ticket-form__option">ارتباط با مدیریت</option>
                            </select>
                        </div>
                        {
                            subId == '63b688c5516a30a651e98156' && <div class="col-6">
                                <label class="ticket-form__label">دوره را انتخاب کنید:</label>
                                <select class="ticket-form__select">
                                    <option class="ticket-form__option">
                                        لطفا یک مورد را انتخاب نمایید.
                                    </option>
                                    {
                                        courses.map(course => (
                                            <option class="ticket-form__option" value={course._id}>{course.course.name}</option>
                                        ))
                                    }
                                </select>
                            </div>}
                        <div class="col-12">
                            <label class="ticket-form__label">
                                محتوای تیکت را وارد نمایید:
                            </label>
                            <textarea class="ticket-form__textarea"></textarea>
                        </div>
                        <div class="col-12">
                            <div class="ticket-form__file">
                                <span class="ticket-form__file-max">
                                    حداکثر اندازه: 6 مگابایت
                                </span>
                                <span class="ticket-form__file-format">
                                    فرمت‌های مجاز: jpg, png.jpeg, rar, zip
                                </span>
                                <input class="ticket-form__file-input" type="file" />
                            </div>
                        </div>
                        <div class="col-12">
                            <button class="ticket-form__btn">
                                <i class="ticket-form__btn-icon fa fa-paper-plane"></i>
                                ارسال تیکت
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}
