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

    const showContact = (body)=>{
        Swal.fire({
            title: `<p style="font-size: 18px ; margin-bottom: 10px;">${body}</p>`,
            // icon: 'warning',
            padding: '30px 0',
            width: '400px',
            confirmButtonText: 'بستن'
        })
    }

    return (
        <>
            <DataTable title={'دوره ها'}>
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
                                            <button type="button" class="btn btn-primary edit-btn" onClick={()=>showContact(contact.body)}>
                                                مشاهده
                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-danger delete-btn">
                                                حذف
                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-success delete-btn">
                                                پاسخ
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
