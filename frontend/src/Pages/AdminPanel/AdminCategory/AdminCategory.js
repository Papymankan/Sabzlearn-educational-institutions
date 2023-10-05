import React, { useEffect, useState } from 'react'
import './AdminCategory.css'
import { Link } from 'react-router-dom'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import Input from '../../../Components/Input/Input'
import { useForm } from '../../../hooks/useForm'
import { emailValidator, maxValidator, minValidator, requiredValidator } from '../../../Validators/rules'
import Swal from 'sweetalert2'

export default function AdminCategory() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchCats()
    }, [])

    const [formState, onInputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        shortname: {
            value: '',
            isValid: false
        },
    }, false)

    const fetchCats = () => {
        fetch('http://localhost:4000/v1/category').then(res => res.json()).then(data => {
            setCategories(data)
            console.log(data);
        })
    }


    const createCategory = (e) => {
        e.preventDefault();
        const localData = JSON.parse(localStorage.getItem('user'))
        const newCat = {
            title: formState.inputs.title.value,
            name: formState.inputs.shortname.value
        }

        fetch('http://localhost:4000/v1/category', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localData.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCat)
        }).then(res => {
            console.log(res)
            if (res.ok) {
                Swal.fire({
                    title: '<p style="font-size: 30px ; margin-bottom: 10px;">دسته جدید اضافه شد</p>',
                    icon: 'success',
                    padding: '20px',
                    didOpen: () => {
                        Swal.showLoading()
                    },
                    width: '380px',
                    timer: 1500,
                })
            }
            fetchCats()
        })
    }

    const delCat = (id)=>{
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
                fetch(`http://localhost:4000/v1/category/${id}` , {
                    method:'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localData.token}`,
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
                    fetchCats()
                })
            }
          })
        }

    return (
        <>
            <div class="container-fluid" id="home-content">
                <div class="container">
                    <div class="home-title">
                        <span>افزودن دسته‌بندی جدید</span>
                    </div>
                    <form class="form">
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">عنوان</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="title"
                                    placeholder="لطفا عنوان را وارد کنید..."
                                    validation={[
                                        requiredValidator(),
                                        minValidator(3),
                                        maxValidator(20),
                                    ]} />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">اسم کوتاه</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="shortname"
                                    placeholder="لطفا اسم کوتاه را وارد کنید..."
                                    validation={[
                                        requiredValidator(),
                                        minValidator(4),
                                        maxValidator(20),
                                    ]}
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="bottom-form">
                                <div class="submit-btn">
                                    <input
                                        type="submit"
                                        value="افزودن"
                                        disabled={!formState.isFormValid}
                                        onClick={createCategory}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
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
                                        <button type="button" class="btn btn-danger delete-btn" onClick={()=>delCat(category._id)}>
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
