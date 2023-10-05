import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import { Link } from 'react-router-dom'

export default function AdminCourses() {

    const [courses, setCourses] = useState([])

    useEffect(() => {
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
    }, [])

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
                                        <button type="button" class="btn btn-danger delete-btn" >
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
