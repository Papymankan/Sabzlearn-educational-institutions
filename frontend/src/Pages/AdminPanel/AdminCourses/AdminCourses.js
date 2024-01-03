import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Input from '../../../Components/Input/Input'
import { useForm } from '../../../hooks/useForm'
import { emailValidator, maxValidator, minValidator, requiredValidator } from '../../../Validators/rules'

export default function AdminCourses() {

    const [courses, setCourses] = useState([])
    const [categories, setCategories] = useState([])
    const [catId, setCatId] = useState('')
    const [CourseStatus, setCourseStatus] = useState('presell')
    const [CourseCover, setCourseCover] = useState({})


    const [formState, onInputHandler, onInputSubmit] = useForm({
        name: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        shortName: {
            value: '',
            isValid: false
        },
        price: {
            value: '',
            isValid: false
        },
        support: {
            value: '',
            isValid: false
        },
    }, false)

    const fetchCourses = () => {
        const localData = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:4000/v1/courses', {
            headers: {
                'Authorization': `Bearer ${localData.token}`
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setCourses(data)
            })
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    useEffect(() => {
        fetch('http://localhost:4000/v1/category')
            .then(res => res.json())
            .then(data => {
                setCategories(data)
                console.log(data);
            })
    }, [])

    const deleteCourse = (id) => {
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
                fetch(`http://localhost:4000/v1/courses/${id}`, {
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
                    fetchCourses()
                })
            }


        })

    }

    const catChange = (e) => {
        setCatId(e.target.value)
    }

    const addNewCourse = (event) => {
        event.preventDefault()
        let formData = new FormData()
        formData.append('name', formState.inputs.name.value)
        formData.append('description', formState.inputs.description.value)
        formData.append('shortName', formState.inputs.shortName.value)
        formData.append('price', formState.inputs.price.value)
        formData.append('support', formState.inputs.support.value)
        formData.append('categoryID', catId)
        formData.append('status', CourseStatus)
        formData.append('cover', CourseCover)

        const localData = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:4000/v1/courses', {
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
                        fetchCourses()
                        onInputSubmit()
                        setCatId('')
                    }
                })
            }
        })
    }

    return (
        <>


            <div class="container-fluid" id="home-content">
                <div class="container">
                    <div class="home-title">
                        <span>افزودن دوره جدید</span>
                    </div>
                    <form class="form">
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">نام دوره</label>
                                <Input
                                    type="text"
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    id='name'

                                    placeholder="لطفا نام دوره را وارد کنید..."
                                    validation={[
                                        requiredValidator(),
                                        minValidator(3),
                                        maxValidator(20),
                                    ]}
                                    state={formState.inputs}

                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">قیمت دوره</label>
                                <Input
                                    type="text"
                                    onInputHandler={onInputHandler}
                                    element="input"
                                    id='price'
                                    placeholder="لطفا قیمت دوره را وارد کنید..."
                                    validation={[
                                        requiredValidator(),
                                        minValidator(3),
                                        maxValidator(20),
                                    ]}
                                    state={formState.inputs}

                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="number input">
                                <label class="input-title">توضیحات دوره</label>
                                <Input
                                    type="text"
                                    onInputHandler={onInputHandler}
                                    element="input"
                                    id='description'
                                    placeholder="لطفا توضیحات دوره را وارد کنید..."
                                    validation={[
                                        requiredValidator(),
                                        minValidator(3),
                                    ]}
                                    state={formState.inputs}

                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="number input">
                                <label class="input-title">نام کوتاه دوره</label>
                                <Input
                                    type="text"
                                    onInputHandler={onInputHandler}
                                    element="input"
                                    id='shortName'
                                    placeholder="لطفا نام کوتاه دوره را وارد کنید..."
                                    validation={[
                                        requiredValidator(),
                                        minValidator(3),
                                        maxValidator(20),
                                    ]}
                                    state={formState.inputs}

                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="number input">
                                <label class="input-title">پشتیبانی دوره</label>
                                <Input
                                    type="text"
                                    onInputHandler={onInputHandler}
                                    element="input"
                                    id='support'
                                    placeholder="لطفا پشتیبانی دوره را وارد کنید..."
                                    validation={[
                                        requiredValidator(),
                                        minValidator(3),
                                        maxValidator(20),
                                    ]}
                                    state={formState.inputs}

                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="number input">
                                <label class="input-title">دسته‌بندی دوره</label>
                                <select onChange={(e) => catChange(e)} className={'selectBox'} value={catId}>
                                    <option value='' disabled selected hidden >انتخاب دسته‌بندی</option>
                                    {
                                        categories.map(cat => (
                                            <option value={cat._id}>{cat.title}</option>
                                        ))
                                    }
                                </select>
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6 " id='fileBox'>
                            <div class="file input">
                                <label class="input-title">عکس دوره</label>
                                <input type="file" id="file" onChange={event => {
                                    setCourseCover(event.target.files[0])
                                }} />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="presell input">
                                <label class="input-title">وضعیت دوره</label>
                                <div class="radios" id='statusRadio'>
                                    <div class="presell-true">
                                        <span>پیش فروش</span>
                                        <input
                                            type="radio"
                                            value="presell"
                                            name="presell"
                                            className='radioInput'
                                            checked onInput={event => setCourseStatus(event.target.value)

                                            }
                                        />
                                    </div>
                                    <div class="presell-false">
                                        <span>در حال برگزاری</span>
                                        <input type="radio" value="start" name="presell" onInput={event => setCourseStatus(event.target.value)}
                                            className='radioInput'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="bottom-form">
                                <div class="submit-btn">
                                    <input type="submit" value="افزودن" onClick={addNewCourse}
                                        disabled={!formState.isFormValid || catId == ''}
                                    />
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>




            <DataTable title={'دوره ها'}>
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>مبلغ</th>
                            <th>وضعیت</th>
                            <th>مدرس</th>
                            <th>دسته بندی</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            courses.map((course, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Link to={`/course-info/${course.shortName}`} target='_blank'>
                                            {course.name}
                                        </Link>
                                    </td>
                                    <td>{course.price == 0 ? 'رایگان' : course.price.toLocaleString()}</td>
                                    <td>{course.status == 'start' ? 'در حال برگزاری' : 'پیش فروش'}</td>
                                    <td>{course.creator}</td>
                                    <td>{course.categoryID.title}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary edit-btn">
                                            ویرایش
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-danger delete-btn" onClick={() => deleteCourse(course._id)}>
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
