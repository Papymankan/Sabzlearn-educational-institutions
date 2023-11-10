import React, { useEffect, useState } from 'react'
import { emailValidator, maxValidator, minValidator, requiredValidator } from '../../../Validators/rules'
import Input from '../../../Components/Input/Input'
import { useForm } from '../../../hooks/useForm'
import Swal from 'sweetalert2'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import { Link } from 'react-router-dom'

export default function AdminSessions() {

    const [courses, setCourses] = useState([])
    const [SessionCourse, setSessionCourse] = useState('')
    const [SessionFile, setSessionFile] = useState({})
    const [sessions, setSessions] = useState([])
    const [formState, onInputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            time: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const fetchSessions = () => {
        fetch('http://localhost:4000/v1/courses/sessions')
            .then(res => res.json())
            .then(data => setSessions(data))
    }

    useEffect(() => {
        fetch('http://localhost:4000/v1/courses', {
        }).then(res => res.json())
            .then(data => {
                setCourses(data)
            })

        fetchSessions()
    }, [])

    const addNewSession = (event) => {
        console.log('upload');
        event.preventDefault()

        let formData = new FormData()

        formData.append('title', formState.inputs.title.value)
        formData.append('time', Number(formState.inputs.time.value))
        formData.append('free', 0)
        formData.append('video', SessionFile)

        const localData = JSON.parse(localStorage.getItem('user'))
        fetch(`http://localhost:4000/v1/courses/${SessionCourse}/sessions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localData.token}`
            },
            body: formData
        }).then(res => {
            if (res.ok) {
                Swal.fire({
                    title: '<p style="font-size: 30px ; margin-bottom: 10px;">با موفقیت اضافه شد</p>',
                    icon: 'success',
                    padding: '20px',
                    didOpen: () => {
                        Swal.showLoading()
                    },
                    width: '380px',
                    timer: 1500,
                    willClose: () => {
                        fetchSessions()
                    }
                })
            }
        })

    }

    const deleteSession = (id) => {
        const localData = JSON.parse(localStorage.getItem('user'))
        Swal.fire({
            title: '<p style="font-size: 30px ; margin-bottom: 10px;">آیا از حذف مطمئن هستید؟</p>',
            icon: 'warning',
            padding: '30px 0',
            width: '400px',
            showCancelButton: true,
            cancelButtonText: 'نه',
            confirmButtonText: 'بله'
        }).then(res => {
            if (res.isConfirmed) {
                fetch(`http://localhost:4000/v1/courses/sessions/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localData.token}`
                    }
                }).then(res => {
                    if (res.ok) {
                        Swal.fire({
                            title: '<p style="font-size: 30px ; margin-bottom: 10px;">با موفقیت حذف شد</p>',
                            icon: 'success',
                            padding: '20px',
                            didOpen: () => {
                                Swal.showLoading()
                            },
                            width: '380px',
                            timer: 1500,
                        })
                    }
                    fetchSessions()
                })
            }


        })
    }

    return (
        <>
            <div class="container-fluid" id="home-content">
                <div class="container">
                    <div class="home-title">
                        <span>افزودن جلسه جدید</span>
                    </div>
                    <form class="form">
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">عنوان جلسه</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="title"
                                    validation={[minValidator(5)]}
                                    placeholder="لطفا نام جلسه را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">مدت زمان جلسه</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="time"
                                    validation={[minValidator(1)]}
                                    placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title" style={{ display: "block" }}>
                                    دوره
                                </label>
                                <select class="select" onChange={event => setSessionCourse(event.target.value)}>
                                    <option value="none" disabled hidden selected>دوره مدنظر را انتخاب کنید</option>
                                    {courses.map((course) => (
                                        <option value={course._id} key={course._id}>{course.name}</option>
                                    ))}
                                </select>
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">آپلود جلسه</label>
                                <input
                                    type="file"
                                    onChange={(event) => {
                                        setSessionFile(event.target.files[0]);
                                    }}
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="bottom-form">
                                <div class="submit-btn">
                                    <input type="submit" value="افزودن" onClick={addNewSession} disabled={!formState.isFormValid || SessionCourse == ''} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <DataTable>
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>دوره</th>
                            <th>تایم</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sessions.map((session, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{session.title}</td>
                                    <td>{session.course.name}</td>
                                    <td>{session.time}</td>
                                    <td>
                                        <button type="button" class="btn btn-danger delete-btn" onClick={() => deleteSession(session._id)}>
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </DataTable>
        </>
    )
}
