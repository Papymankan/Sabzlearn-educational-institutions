import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

export default function AdminComments() {

    const [comments, setComments] = useState([])

    const fetchComments = () => {
        fetch('http://localhost:4000/v1/comments').then(res => res.json()).then(data => setComments(data))
    }

    useEffect(() => {
        fetchComments()
    }, [])

    const DeleteComment = (id) => {
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
                fetch(`http://localhost:4000/v1/comments/${id}`, {
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
                        fetchComments()
                    }
                })
            }
        })
    }

    return (
        <>
            <DataTable title={'کامنت ها'}>
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>ثبت کننده</th>
                            <th>دوره</th>
                            <th>پیام</th>
                            <th>نمایش</th>
                            <th>پاسخ</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            comments.map((comment, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{comment.creator.name}</td>
                                    <td>{comment.course}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary delete-btn">
                                            مشاهده
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-primary delete-btn">
                                            ویرایش
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-danger delete-btn" onClick={() => DeleteComment(comment._id)}>
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

// 65323e19fbcbc14c89d1b653
// 65323eedfbcbc14c89d1b689
// 65323f57fbcbc14c89d1b69d
// 65323df3fbcbc14c89d1b649
// 65323eedfbcbc14c89d1b689