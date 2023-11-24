import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import Input from '../../../Components/Input/Input'
import { useForm } from '../../../hooks/useForm'
import { minValidator } from '../../../Validators/rules'


export default function AdminMenus() {

    const [menus, setMenus] = useState([])
    const [parentMenu , setParentMenu] = useState('')

    const [formState, onInputHandler] = useForm({
        title : {
            value:'',
            isValid:''
        },
        href : {
            value:'',
            isValid:''
        },
    })

    const fetchMenus = () => {
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
                    fetchMenus()
                })
            }
        })



    }

    return (
        <>
            <div class="container">
                <div class="home-title">
                    <span>افزودن کاربر جدید</span>
                </div>
                <form class="form">
                    <div class="col-6">
                        <div class="name input">
                            <label class="input-title">عنوان</label>
                            <Input
                                element="input"
                                onInputHandler={onInputHandler}
                                id="title"
                                placeholder="لطفا عنوان را وارد کنید..."
                                validation={[minValidator(5)]}
                            />
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="name input">
                            <label class="input-title">روت</label>
                            <Input
                                element="input"
                                onInputHandler={onInputHandler}
                                id="href"
                                validation={[minValidator(5)]}
                                placeholder="لطفا عنوان را وارد کنید..."
                            />
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="name input">
                            <label class="input-title">زیر منو</label>
                            <select
                                class="select"
                                style={{display : 'block'}}
                                onChange={(event) => setParentMenu(event.target.value)}
                            >
                                <option value="none" disabled hidden selected>منوی اصلی را انتخاب کنید</option>
                                {menus.map((menu) => (
                                    <>
                                        {!Boolean(menu.parent) && (
                                            <option value={menu._id}>{menu.title}</option>
                                        )}
                                    </>
                                ))}
                            </select>
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="bottom-form">
                            <div class="submit-btn">
                                <input type="submit" value="افزودن" disabled={!formState.isFormValid || parentMenu == ''} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

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
