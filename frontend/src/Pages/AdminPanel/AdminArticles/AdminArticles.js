import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

export default function AdminArticles() {

    const [articles , setArticles] = useState([])

    const fetchArticles = ()=>{
        fetch('http://localhost:4000/v1/articles')
        .then(res => res.json())
        .then(data => setArticles(data))
    }

    useEffect(()=>{
        fetchArticles()
    } , [])

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
                            articles.map((article , index)=> (
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
