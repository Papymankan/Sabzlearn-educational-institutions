import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import Input from '../../../Components/Input/Input'
import { useForm } from '../../../hooks/useForm'
import { emailValidator, maxValidator, minValidator, requiredValidator } from '../../../Validators/rules'
import TextEditor from '../../../Components/AdminPanel/TextEditor/TextEditor'

export default function AdminArticles() {
    const [formState, onInputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            shortName: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const [categories, setCategories] = useState([]);
    const [articleCategory, setArticleCategory] = useState("");
    const [articleCover, setArticleCover] = useState({});
    const [articles, setArticles] = useState([])
    const [articleBody, setArticleBody] = useState('')

    const fetchArticles = () => {
        fetch('http://localhost:4000/v1/articles')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setArticles(data)
            })
    }

    useEffect(() => {
        fetchArticles()
    }, [])

    useEffect(() => {
        fetch('http://localhost:4000/v1/category')
            .then(res => res.json())
            .then(data => {
                setCategories(data)
                console.log(data);
            })
    }, [])

    const DeleteArticle = (id) => {
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
                fetch(`http://localhost:4000/v1/articles/${id}`, {
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
                        fetchArticles()
                    }
                })
            }
        })
    }

    const createArticle = (event) => {
        event.preventDefault()
        console.log('create');
        let formData = new FormData()

        formData.append('title', formState.inputs.title.value)
        formData.append('shortName', formState.inputs.shortName.value)
        formData.append('description', formState.inputs.description.value)
        formData.append('categoryID', articleCategory)
        formData.append('cover', articleCover)
        formData.append('body', articleBody)

        const localData = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:4000/v1/articles', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localData.token}`
            },
            body: formData
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
                    willClose: () => {
                        fetchArticles()
                    }
                })
            }
        })

    }

    const saveArticle = (event) => {
        event.preventDefault()
        console.log('create');
        let formData = new FormData()

        formData.append('title', formState.inputs.title.value)
        formData.append('shortName', formState.inputs.shortName.value)
        formData.append('description', formState.inputs.description.value)
        formData.append('categoryID', articleCategory)
        formData.append('cover', articleCover)
        formData.append('body', articleBody)

        const localData = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:4000/v1/articles/draft', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localData.token}`
            },
            body: formData
        }).then(res => {
            if (res.ok) {
                Swal.fire({
                    title: '<p style="font-size: 30px ; margin-bottom: 10px;">با موفقیت سیو شد</p>',
                    icon: 'success',
                    padding: '20px',
                    didOpen: () => {
                        Swal.showLoading()
                    },
                    width: '380px',
                    timer: 1500,
                    willClose: () => {
                        fetchArticles()
                    }
                })
            }
        })

    }

    return (

        <>



            <div class="container-fluid" id="home-content">
                <div class="container">
                    <div class="home-title">
                        <span>افزودن مقاله جدید</span>
                    </div>
                    <form class="form">
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title" style={{ display: "block" }}>
                                    عنوان
                                </label>
                                <Input
                                    element="input"
                                    type="text"
                                    id="title"
                                    onInputHandler={onInputHandler}
                                    validation={[minValidator(8)]}
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title" style={{ display: "block" }}>
                                    لینک
                                </label>
                                <Input
                                    element="input"
                                    type="text"
                                    id="shortName"
                                    onInputHandler={onInputHandler}
                                    validation={[minValidator(5)]}
                                />

                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title" style={{ display: "block" }}>
                                    چکیده
                                </label>
                                {/* <textarea style={{ width: "100%", height: "200px" }}></textarea> */}

                                <Input
                                    element="textarea"
                                    type="text"
                                    id="description"
                                    onInputHandler={onInputHandler}
                                    validation={[minValidator(5)]}
                                    classname="article-textarea"
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title" style={{ display: "block" }}>
                                    کاور
                                </label>
                                <input
                                    type="file"
                                    onChange={(event) => {
                                        setArticleCover(event.target.files[0]);
                                    }}
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="name input">
                                <label class="input-title" style={{ display: "block" }}>
                                    مقاله
                                </label>
                                <TextEditor setBody={setArticleBody} />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title" style={{ display: "block" }}>
                                    دسته بندی
                                </label>
                                <select
                                    onChange={(event) => setArticleCategory(event.target.value)}
                                >
                                    <option value='none' disabled selected hidden >انتخاب دسته‌بندی</option>
                                    {categories.map((category) => (
                                        <option value={category._id}>{category.title}</option>
                                    ))}
                                </select>
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="bottom-form">
                                <div class="submit-btn">
                                    <input type="submit" value="افزودن" disabled={!formState.isFormValid || articleCategory == '' || articleBody == ''} onClick={createArticle} />
                                    <input type="submit" style={{marginRight:'20px'}} value="پیش نویس" disabled={!formState.isFormValid || articleCategory == '' || articleBody == ''} onClick={saveArticle} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

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
                                        {article.creator.name}
                                    </td>
                                    <td style={article.publish ? {color : 'blue'} : {color : 'red'}}>
                                        {article.publish ? 'منتشر شده' : 'پیش نویس'}
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
