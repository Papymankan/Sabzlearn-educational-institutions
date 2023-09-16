import React, { useContext, useState } from 'react'
import Pagination from '../Pagination/Pagination';
import './Comments.css'
import AuthContext from '../../Context/authContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function CommentsTextArea({ comments, courseName }) {

    const authContext = useContext(AuthContext)

    const [inputValue, setInputValue] = useState('')

    const setCommentHandler = () => {
        const localData = JSON.parse(localStorage.getItem('user'))

        console.log(localData.token);
        console.log(courseName);
        fetch(`http://localhost:4000/v1/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localData.token}`
            },
            body: JSON.stringify({
                body: inputValue,
                courseShortName: `${courseName}`,
                score: 5
            })
        }).then(res => res.json())
            .then(data => {
                Swal.fire({
                    title: '<p style="font-size: 30px ; margin-bottom: 10px;">با موفقیت ثبت شد</p>',
                    icon: 'success',
                    padding: '20px',
                    didOpen: () => {
                        Swal.showLoading()
                    },
                    width: '380px',
                    timer: 1200,
                    willClose: () => {
                        window.location.reload()
                    }
                })
            })
    }

    const textAreaChange = (e) => {
        setInputValue(e.target.value)
    }

    return (
        <div class="comments">
            <div class="comments__header">
                <div class="comments__header-icon-content">
                    <i class="comments__header-icon far fa-comment"></i>
                </div>
                <span class="comments__header-title">نظرات</span>
            </div>
            {comments.length >= 1 ? (<div class="comments__content">
                {
                    comments.map(comment => (
                        <div class="comments__item">
                            <div class="comments__question">
                                <div class="comments__question-header">
                                    <div class="comments__question-header-right">
                                        <span class="comments__question-name comment-name">
                                            {comment.creator.name}
                                        </span>
                                        <span class="comments__question-status comment-status">
                                            {comment.creator.role == 'ADMIN' ? 'ادمین' : 'خریدار محصول'}
                                        </span>
                                        <span class="comments__question-date comment-date">
                                            {comment.creator.createdAt.slice(0, 10)}
                                        </span>
                                    </div>
                                    <div class="comments__question-header-left">
                                        <a class="comments__question-header-link comment-link" href="#">
                                            پاسخ
                                        </a>
                                    </div>
                                </div>
                                <div class="comments__question-text">
                                    <p class="comments__question-paragraph comment-paragraph">
                                        {comment.body}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>) : <div className="alert alert-warning">کامنتی ثبت نشده است</div>
            }
            {
                authContext.isloggedIn ? (
                    <>
                        <div class="comments__rules">
                            <span class="comments__rules-title">قوانین ثبت دیدگاه</span>
                            <span class="comments__rules-item">
                                <i class="fas fa-check comments__rules-icon"></i>
                                اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت نمایش انلاین
                                استفاده نمایید و سوالات مربوط به رفع اشکال تایید نخواهند شد
                            </span>
                            <span class="comments__rules-item">
                                <i class="fas fa-check comments__rules-icon"></i>
                                دیدگاه های نامرتبط به دوره تایید نخواهد شد.
                            </span>
                            <span class="comments__rules-item">
                                <i class="fas fa-check comments__rules-icon"></i>
                                سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد.
                            </span>
                            <span class="comments__rules-item">
                                <i class="fas fa-check comments__rules-icon"></i>
                                از درج دیدگاه های تکراری پرهیز نمایید.
                            </span>
                        </div>
                        <div class="comments__respond">
                            <div class="comments__score">
                                <span class="comments__score-title">امتیاز شما</span>
                                <div class="comments__score-input">
                                    <span class="comments__score-input-text">
                                        امتیاز خود را انتخاب کنید
                                    </span>
                                    <i class="fas fa-angle-down	 comments__input-icon"></i>
                                </div>
                            </div>
                            <div class="comments__respond-content">
                                <div class="comments__respond-title">دیدگاه شما *</div>
                                <textarea class="comments__score-input-respond" onChange={(e) => textAreaChange(e)}>{inputValue}</textarea>
                            </div>
                            <button type="submit" class="comments__respond-btn" onClick={setCommentHandler}>
                                ارسال
                            </button>
                        </div>
                    </>
                ) : <div className="alert alert-warning">برای ثبت کامنت ابتدا <Link to={'/login'} style={{ color: 'blue' }}>وارد</Link> شوید</div>
            }


        </div>
    );
}