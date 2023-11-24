import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'


export default function AdminMenus() {

    const [menus, setMenus] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/v1/menus/all').then(res => res.json()).then(data => setMenus(data))
    }, [])

    return (
        <>
            <DataTable title={'منو ها'}>
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>فرزند</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menus.map((menu, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Link to={menu.href} target='_blank'>
                                            {menu.title}
                                        </Link>
                                    </td>
                                    <td>
                                        {menu.parent ? menu.parent.title : (<i className='fa fa-home'></i>)}
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-primary edit-btn">
                                            ویرایش
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-danger delete-btn">
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
