import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function AdminCourses() {

    const [courses, setCourses] = useState([])
    const [categories, setCategories] = useState([])
    const [catId, setCatId] = useState('')

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

    const catChange = (e)=>{
        setCatId(e.target.value)
    }

    return (
        <>


            <div class="container-fluid" id="home-content">
                <div class="container">
                    <div class="home-title">
                        <span>افزودن محصول جدید</span>
                    </div>
                    <form class="form">
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">نام محصول</label>
                                <input
                                    type="text"
                                    isValid="false"
                                    placeholder="لطفا نام محصول را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">قیمت محصول</label>
                                <input
                                    type="text"
                                    isValid="false"
                                    placeholder="لطفا قیمت محصول را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="number input">
                                <label class="input-title">تعداد محصول</label>
                                <input
                                    type="text"
                                    isValid="false"
                                    placeholder="لطفا تعداد محصول را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">قیمت محصول</label>
                                <input
                                    type="text"
                                    isValid="false"
                                    placeholder="لطفا قیمت محصول را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="number input">
                                <label class="input-title">دسته‌بندی دوره</label>
                                <select  onChange={(e)=>catChange(e)}>
                                    {
                                        categories.map(cat => (
                                            <option value={cat._id}>{cat.title}</option>
                                        ))
                                    }
                                </select>
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="file">
                                <label class="input-title">عکس محصول</label>
                                <input type="file" id="file" />
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="bottom-form">
                                <div class="condition">
                                    <label class="input-title">موجودی</label>
                                    <div class="radios">
                                        <div class="available">
                                            <label>
                                                <span>موجود</span>
                                                <input
                                                    type="radio"
                                                    value="avalibe"
                                                    name="condition"
                                                    checked
                                                />
                                            </label>
                                        </div>
                                        <div class="unavailable">
                                            <label>
                                                <span>ناموجود</span>
                                                <input
                                                    type="radio"
                                                    value="unavailable"
                                                    name="condition"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="submit-btn">
                                    <input type="submit" value="افزودن" />
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="presell">
                                <label class="input-title">وضعیت دوره</label>
                                <div class="radios">
                                    <div class="presell-true">
                                        <label>
                                            <span>پیش فروش</span>
                                            <input
                                                type="radio"
                                                value="presell"
                                                name="presell"
                                                checked
                                            />
                                        </label>
                                    </div>
                                    <div class="presell-false">
                                        <label>
                                            <span>در حال برگزاری</span>
                                            <input type="radio" value="onperforming" name="presell" />
                                        </label>
                                    </div>
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
                                    <td>{course.isComplete == 0 ? 'تکمیل شده' : 'در حال برگزاری'}</td>
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
