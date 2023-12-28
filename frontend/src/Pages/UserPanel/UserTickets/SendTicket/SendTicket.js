import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function SendTicket() {

    const navigate = useNavigate()


    const [deps, setDeps] = useState([])
    const [departmentSubs, setDepartmentSubs] = useState([])
    const [subId, setSubId] = useState('')
    const [courses, setCourses] = useState([])
    const [departmentID, setDepartmentID] = useState('')
    const [ticketTitle, setTicketTitle] = useState('')
    const [Priority, setPriority] = useState(0)
    const [body, setBody] = useState('')
    const [courseID, setCourseID] = useState('')

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

    const sendTicket = (e) => {
        e.preventDefault()
        let ticket = {
            departmentID,
            departmentSubID: subId,
            title: ticketTitle,
            priority: Priority,
            body,
            course: courseID ? courseID : undefined
        }
        Swal.fire({
            title: '<p style="font-size: 30px ; margin-bottom: 10px;">آیا از ارسال تیکت مطمئن هستید؟</p>',
            icon: 'warning',
            padding: '30px 0',
            width: '400px',
            showCancelButton: true,
            cancelButtonText: 'نه',
            confirmButtonText: 'بله'
        }).then(res => {
            if (res.isConfirmed) {
                const localData = JSON.parse(localStorage.getItem('user'))
                fetch('http://localhost:4000/v1/tickets', {
                    method:'POST',
                    headers: {
                        'Authorization': `Bearer ${localData.token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(ticket)
                }).then(res => {
                    console.log(res);
                    if(res.ok){
                        Swal.fire({
                            title: '<p style="font-size: 30px ; margin-bottom: 10px;">با موفقیت ارسال شد</p>',
                            icon: 'success',
                            padding: '20px',
                            didOpen: () => {
                              Swal.showLoading()
                            },
                            width: '380px',
                            timer: 1500,
                            willClose: () => {
                                navigate('/user-panel', { replace: true })
                            }
                          })
                    }
                }) 
            }
        })

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
                                    fetchDepartmentsSubs(e.target.value)
                                    setDepartmentID(e.target.value)
                                }}
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
                            <select class="ticket-form__select" onChange={(e) => {
                                setSubId(e.target.value)
                                setCourseID('')
                            }}
                                value={subId}>
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
                            <input class="ticket-form__input" type="text" value={ticketTitle} onChange={(e) => setTicketTitle(e.target.value)} />
                        </div>
                        <div class="col-6">
                            <label class="ticket-form__label">سطح اهمیت را انتخاب کنید:</label>
                            <select class="ticket-form__select" onChange={(e) => setPriority(e.target.value)} value={Priority}>
                                <option class="ticket-form__option" value={0} disabled selected>
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                <option class="ticket-form__option" value={1}>بالا</option>
                                <option class="ticket-form__option" value={2}>متوسط</option>
                                <option class="ticket-form__option" value={3}>پایین</option>
                            </select>
                        </div>
                        {
                            subId == '63b688c5516a30a651e98156' && <div class="col-6">
                                <label class="ticket-form__label">دوره را انتخاب کنید:</label>
                                <select class="ticket-form__select" onChange={(e) => setCourseID(e.target.value)} value={courseID}>
                                    <option class="ticket-form__option" disabled selected value={''}>
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
                            <textarea class="ticket-form__textarea" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
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
                            {subId == '63b688c5516a30a651e98156' ? <button class="ticket-form__btn" disabled={!departmentID || !subId || !ticketTitle || !Priority || !courseID || !body} onClick={sendTicket}>
                                <i class="ticket-form__btn-icon fa fa-paper-plane"></i> {' '}
                                ارسال تیکت
                            </button> : <button class="ticket-form__btn" disabled={!departmentID || !subId || !ticketTitle || !Priority || !body} onClick={sendTicket}>
                                <i class="ticket-form__btn-icon fa fa-paper-plane"></i> {' '}
                                ارسال تیکت
                            </button>}
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}
