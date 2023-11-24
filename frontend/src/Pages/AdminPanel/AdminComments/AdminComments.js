import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

export default function AdminComments() {

    const [comments, setComments] = useState([])

    const fetchComments = () => {
        fetch('http://localhost:4000/v1/comments').then(res => res.json()).then(data => setComments(data))
    }

    useEffect(() => {
        fetchComments()
    }, [])

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

// 65323e19fbcbc14c89d1b653
// 65323eedfbcbc14c89d1b689
// 65323f57fbcbc14c89d1b69d
// 65323df3fbcbc14c89d1b649
// 65323eedfbcbc14c89d1b689