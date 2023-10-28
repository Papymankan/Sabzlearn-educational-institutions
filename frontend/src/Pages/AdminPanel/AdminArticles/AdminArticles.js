import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

export default function AdminArticles() {

    const [articles, setArticles] = useState([])

    const fetchArticles = () => {
        fetch('http://localhost:4000/v1/articles')
            .then(res => res.json())
            .then(data => setArticles(data))
    }

    useEffect(() => {
        fetchArticles()
    }, [])

    const DeleteArticle = (id)=>{
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
                fetch(`http://localhost:4000/v1/articles/${id}` , {
                    method:'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localData.token}`,
                    },
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
                        fetchArticles()
                    }
                })
            }
        })
    }


    return (

        <>
            <DataTable title={'مقاله ها'}>
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>نویسنده</th>
                            <th>وضعیت</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articles.map((article, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Link to={`/articleinfo/${article.shortName}`} target='_blank'>
                                            {article.title}
                                        </Link>
                                    </td>
                                    <td>
                                        {article.title}
                                    </td>
                                    <td>
                                        {article.creator.name}
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-primary edit-btn">
                                            ویرایش
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-danger delete-btn" onClick={() => DeleteArticle(article._id)}>
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
