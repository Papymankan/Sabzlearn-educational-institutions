import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

export default function AdminContact() {

    const [contacts, setContacts] = useState([])


    const fetchContacts = () => {
        fetch('http://localhost:4000/v1/contact')
            .then(res => res.json())
            .then(data => setContacts(data))
    }

    useEffect(() => {
        fetchContacts()
    }, [])

    const showContact = (body) => {
        Swal.fire({
            title: `<p style="font-size: 18px ; margin-bottom: 10px;">${body}</p>`,
            // icon: 'warning',
            padding: '30px 0',
            width: '400px',
            confirmButtonText: 'بستن'
        })
    }

    const AnswerContact = (email) => {
        Swal.fire({
            title: '<p style="font-size: 30px ; margin-bottom: 10px;">پاسخ را وارد کنید</p>',
            html:
                '<textArea id="swal-input1" class="swal2-input" placeholder="پاسخ">',
            padding: '5px',
            width: '380px',
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                ]
            },
            confirmButtonText: 'تایید',
        }).then(res => {
            if (res.isConfirmed && res.value[0]) {

                let answer = {
                    email: email,
                    answer: res.value[0]
                }
                const localData = JSON.parse(localStorage.getItem('user'))
                fetch('http://localhost:4000/v1/contact/answer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localData.token}`,
                    },
                    body: JSON.stringify(answer)
                }).then(res => {
                    console.log('res.ok1');
                    if (res.ok) {
                        console.log('res.ok2');
                        Swal.fire({
                            title: '<p style="font-size: 30px ; margin-bottom: 10px;">با موفقیت پاسخ داده شد</p>',
                            icon: 'success',
                            padding: '20px',
                            didOpen: () => {
                                Swal.showLoading()
                            },
                            width: '380px',
                            timer: 1500,
                        })
                        fetchContacts()
                    } else {
                        Swal.fire({
                            title: '<p style="font-size: 30px ; margin-bottom: 10px;">با موفقیت پاسخ داده نشد</p>',
                            icon: 'error',
                            padding: '20px',
                            didOpen: () => {
                                Swal.showLoading()
                            },
                            width: '380px',
                            timer: 1500,
                        })
                    }
                })
            }
        })
    }

    const DeleteContact = (id) => {
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
                fetch(`http://localhost:4000/v1/contact/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localData.token}`,
                    },
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
                        fetchContacts()
                    }
                })
            }
        })
    }

    return (
        <>
            <DataTable title={'ارتباط ها'}>
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>نام و نام خانوادگی</th>
                            <th>ایمیل</th>
                            <th>شماره تماس</th>
                            <th>مشاهده</th>
                            <th>حذف</th>
                            <th>پاسخ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contacts.map((contact, index) => (
                                <>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.phone}</td>
                                        <td>
                                            <button type="button" class="btn btn-primary edit-btn" onClick={() => showContact(contact.body)}>
                                                مشاهده
                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-danger delete-btn" onClick={() => DeleteContact(contact._id)}>
                                                حذف
                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-success delete-btn" onClick={() => AnswerContact(contact.email)} disabled={contact.answer}>
                                                {contact.answer ? 'پاسخ داده شده' : 'پاسخ'}
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            ))
                        }
                    </tbody>
                </table>
            </DataTable>
        </>
    )
}
