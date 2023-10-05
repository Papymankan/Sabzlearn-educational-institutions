import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

export default function AdminCategory() {
    const [categories , setCategories] = useState([])
    useEffect( ()=>{
        fetch('http://localhost:4000/v1/category').then(res => res.json()).then(data =>{
            setCategories(data)
            console.log(data);
        } )
    }, [])

    return (
        <>
            <DataTable title={'دسته بندی ها'}>
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                categories.map((category, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link to={`/category/${category.name}/1`} target='_blank'>
                                                {category.title}
                                            </Link>
                                        </td>
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
