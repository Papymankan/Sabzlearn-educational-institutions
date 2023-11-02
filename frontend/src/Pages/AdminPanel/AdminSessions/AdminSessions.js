import React, { useEffect, useState } from 'react'
import { emailValidator, maxValidator, minValidator, requiredValidator } from '../../../Validators/rules'
import Input from '../../../Components/Input/Input'
import { useForm } from '../../../hooks/useForm'

export default function AdminSessions() {

    const [courses, setCourses] = useState([])
    const [SessionCourse, setSessionCourse] = useState('')
    const [SessionFile, setSessionFile] = useState({})
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

    useEffect(()=>{
        fetch('http://localhost:4000/v1/courses', {
        }).then(res => res.json())
            .then(data => {
                setCourses(data)
            })
    } , [])

    return (
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
                                validation={[minValidator(5)]}
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
                                <input type="submit" value="افزودن" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        )
}
