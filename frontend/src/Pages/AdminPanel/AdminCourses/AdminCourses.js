import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function AdminCourses() {

    const [courses, setCourses] = useState([])

    const fetchCourses = ()=>{
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
                    if(res.ok){
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

    return (
        <>
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
