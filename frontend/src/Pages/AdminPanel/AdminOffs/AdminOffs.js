import React, { useEffect, useState } from "react";
import Input from "../../../Components/Input/Input";
import { minValidator } from "../../../Validators/rules";
import { useForm } from "../../../hooks/useForm";
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import Swal from "sweetalert2";

export default function AdminOffs() {
    const [formData, onInputHandler] = useForm({
        code: {
            value: '',
            isValid: false
        },
        percent: {
            value: '',
            isValid: false
        },
        max: {
            value: '',
            isValid: false
        }
    }, false)

    const [courses, setCourses] = useState([])
    const [offCourse, setOffCourse] = useState('')
    const [allOffs, setAllOffs] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/v1/courses', {
        }).then(res => res.json())
            .then(data => {
                setCourses(data)
            })
        fetchOffs()
    }, [])

    const fetchOffs = () => {
        const localData = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:4000/v1/offs', {
            headers: {
                'Authorization': `Bearer ${localData.token}`
            },
        }).then(res => res.json()).then(data => setAllOffs(data))
    }

    const createOff = (e) => {
        e.preventDefault()

        let newOff = {
            code: formData.inputs.code.value,
            percent: formData.inputs.percent.value,
            max: Number(formData.inputs.max.value),
            course: offCourse,
        }
        const localData = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:4000/v1/offs', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localData.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOff)
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
                })
                fetchOffs()
            }
        })

    }

    const DeleteOff = (id) => {
        const localData = JSON.parse(localStorage.getItem('user'))
        Swal.fire({
            title: '<p style="font-size: 30px ; margin-bottom: 10px;">آیا از حذف مطمئن هستید؟</p>',
            icon: 'warning',
            padding: '30px 0',
            width: '400px',
            showCancelButton: true,
            cancelButtonText: 'نه',
            confirmButtonText: 'بله'
        }).then(res=>{
            if (res.isConfirmed) {
                fetch(`http://localhost:4000/v1/offs/${id}`, {
                    method:'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localData.token}`
                    }
                }).then(res=>{
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
                    fetchOffs()
                })
            }
        })
    }

    return (
        <>
            <div class="container-fluid" id="home-content">
                <div class="container">
                    <div class="home-title">
                        <span>کد تخفیف جدید</span>
                    </div>
                    <form class="form">
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">کد تخفیف</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="code"
                                    validation={[minValidator(4)]}
                                    placeholder="لطفا کد تخفیف را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">درصد تخفیف</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="percent"
                                    validation={[minValidator(1)]}
                                    placeholder="لطفا درصد تخفیف را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">تعداد</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="number"
                                    id="max"
                                    validation={[minValidator(1)]}
                                    placeholder="لطفا تعداد را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title" style={{ display: "block" }}>
                                    دوره
                                </label>
                                <select class="select" onChange={event => setOffCourse(event.target.value)}>
                                    <option value="none" disabled hidden selected>دوره مدنظر را انتخاب کنید</option>
                                    {
                                        courses.map(course => (<option value={course._id}>{course.name}</option>))
                                    }
                                </select>
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="bottom-form">
                                <div class="submit-btn">
                                    <input type="submit" value="افزودن" disabled={!formData.isFormValid || offCourse == ''} onClick={createOff} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <DataTable title={'تخفیف ها'}>
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>کد</th>
                            <th>درصد</th>
                            <th>سازنده</th>
                            <th>تعداد</th>
                            <th>تعداد باقی مانده</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allOffs.map((off, index) => (
                                <tr>
                                    <td style={off.max - off.uses == 0 ? { background: 'red' } : { background: 'rgb(95, 189, 0)' }}>{index + 1}</td>
                                    <td>{off.code}</td>
                                    <td>{off.percent}</td>
                                    <td>{off.creator}</td>
                                    <td>{off.max}</td>
                                    <td>{off.max - off.uses}</td>
                                    <td>
                                        <button type="button" class="btn btn-danger delete-btn" onClick={() => DeleteOff(off._id)}>
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
    );
}
