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

    const ShowComment = (text) => {
        Swal.fire({
            title: `<p style="font-size: 18px ; margin-bottom: 10px;">${text}</p>`,
            // icon: 'warning',
            padding: '30px 0',
            width: '400px',
            confirmButtonText: 'بستن'
        })
    }

    const BanUser = (id) => {
        Swal.fire({
            title: '<p style="font-size: 30px ; margin-bottom: 10px;">آیا از بن مطمئن هستید؟</p>',
            icon: 'warning',
            padding: '30px 0',
            width: '400px',
            showCancelButton: true,
            cancelButtonText: 'نه',
            confirmButtonText: 'بله'
        }).then(res => {
            if (res.isConfirmed) {
                const localData = JSON.parse(localStorage.getItem('user'))
                fetch(`http://localhost:4000/v1/users/ban/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localData.token}`,
                    }
                }).then(res => {
                    if (res.ok) {
                        Swal.fire({
                            title: '<p style="font-size: 30px ; margin-bottom: 10px;">با موفقیت بن شد</p>',
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

    const AnswerComment = (id) => {
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
            console.log(res);
            if (res.isConfirmed && res.value[0]) {

                let answer = {
                    'body': res.value[0]
                }
                const localData = JSON.parse(localStorage.getItem('user'))
                fetch(`http://localhost:4000/v1/comments/answer/${id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localData.token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(answer)
                }).then(res => {
                    console.log(res)
                    if (res.ok) {
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
                        fetchComments()
                    }
                })
            } else if (!res.isDismissed && !res.value[0]) {
                alert('پاسخ را وارد کنید')
            }
        })
    }

    const AcceptComment = (id) => {
        Swal.fire({
            title: '<p style="font-size: 30px ; margin-bottom: 10px;">آیا از تایید مطمئن هستید؟</p>',
            padding: '30px 0',
            width: '400px',
            showCancelButton: true,
            cancelButtonText: 'نه',
            confirmButtonText: 'بله'
        }).then(res => {
            if (res.isConfirmed) {
                const localData = JSON.parse(localStorage.getItem('user'))
                fetch(`http://localhost:4000/v1/comments/accept/${id}`, {
                    method: 'Put',
                    headers: {
                        'Authorization': `Bearer ${localData.token}`,
                    },
                }).then(res => {
                    if (res.ok) {
                        Swal.fire({
                            title: '<p style="font-size: 30px ; margin-bottom: 10px;">با موفقیت تایید شد</p>',
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
                            <th>تایید</th>
                            <th>پاسخ و تایید</th>
                            <th>حذف</th>
                            <th>بن</th>
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
                                        <button type="button" class="btn btn-primary delete-btn" onClick={() => ShowComment(comment.body)}>
                                            مشاهده
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-primary delete-btn" onClick={() => AcceptComment(comment._id)} disabled={comment.answer}>
                                            {comment.answer ? 'تایید شده' : 'تایید'}
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-primary delete-btn" disabled={comment.answer} onClick={() => AnswerComment(comment._id)}>
                                            {comment.answer ? 'پاسخ داده شد' : 'پاسخ'}
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-danger delete-btn" onClick={() => DeleteComment(comment._id)}>
                                            حذف
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-danger delete-btn" onClick={() => BanUser(comment.creator._id)}>
                                            بن
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