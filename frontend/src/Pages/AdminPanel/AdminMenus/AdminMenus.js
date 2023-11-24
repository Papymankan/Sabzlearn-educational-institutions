import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'


export default function AdminMenus() {

    const [menus, setMenus] = useState([])

    const fetchMenus= ()=>{
        fetch('http://localhost:4000/v1/menus/all').then(res => res.json()).then(data => setMenus(data))
    }

    useEffect(() => {
        fetchMenus()
    }, [])

    const deleteMenu = (id) => {
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
                const localData = JSON.parse(localStorage.getItem('user'))
                fetch(`http://localhost:4000/v1/menus/${id}`, {
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
                    fetchMenus()
                })
            }
        })



    }

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
                                        <button type="button" class="btn btn-danger delete-btn" onClick={() => deleteMenu(menu._id)}>
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
