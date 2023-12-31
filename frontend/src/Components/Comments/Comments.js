import React, { useContext, useEffect, useState } from 'react'
import './Comments.css'
import AuthContext from '../../Context/authContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function CommentsTextArea({ comments, courseName }) {

	const authContext = useContext(AuthContext)
	const [inputValue, setInputValue] = useState('')
	const [score , setScore]= useState('')

	const setCommentHandler = () => {
		const localData = JSON.parse(localStorage.getItem('user'))

		fetch(`http://localhost:4000/v1/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localData.token}`
			},
			body: JSON.stringify({
				body: inputValue,
				courseShortName: `${courseName}`,
				score: Number(score)
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
		<>
			<div class="comments">
				<div class="comments__header">
					<div class="comments__header-icon-content">
						<i class="comments__header-icon far fa-comment"></i>
					</div>
					<span class="comments__header-title">نظرات</span>
				</div>
				<div class="comments__content">
					{comments.length == 0 ? (<div className="alert alert-warning">کامنتی ثبت نشده است</div>) : (
						<>
							{
								comments.map(comment => (
									<div class="comments__item">
										<div class="comments__question">
											<div class="comments__question-header">
												<div class="comments__question-header-right">
													<span class="comments__question-name comment-name">
														{comment.creator ? comment.creator.name : 'ناشناس'}
													</span>
													<span class="comments__question-status comment-status">
														{comment.creator ? (comment.creator.role == 'ADMIN' ? 'ادمین' : 'خریدار محصول') : 'ناشناس'}
													</span>
													<span class="comments__question-date comment-date">
														{comment.creator ? comment.creator.createdAt.slice(0, 10) : 'ناشناس'}
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
												{comment.answerContent && (
													<div class="comments__item" style={{ 'marginTop': '20px' }}>
														<div class="comments__question">
															<div class="comments__question-header">
																<div class="comments__question-header-right">
																	<span class="comments__question-name comment-name">
																		{comment.answerContent.creator ? comment.answerContent.creator.name : 'ناشناس'}
																	</span>
																	<span class="comments__question-status comment-status">
																		{comment.answerContent.creator ? (comment.answerContent.creator.role == 'ADMIN' ? 'ادمین' : 'خریدار محصول') : 'ناشناس'}
																	</span>
																	<span class="comments__question-date comment-date">
																		{comment.answerContent.creator ? comment.answerContent.creator.createdAt.slice(0, 10) : 'ناشناس'}
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
																	{comment.answerContent.body}
																</p>
															</div>
														</div>
													</div>
												)}
											</div>
										</div>
									</div>
								))
							}
						</>
					)}

				</div>
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
										<select class="comments__score-input-text" name='stars' onChange={(e)=> setScore(e.target.value)}>
											<option value="" name='stars' hidden disabled selected>امتیاز خود را وارد کنید</option>
											<option value="5" name='stars'>بسیار عالی</option>
											<option value="4" name='stars'>عالی</option>
											<option value="3" name='stars'>خوب</option>
											<option value="2" name='stars'>متوسط</option>
											<option value="1" name='stars'>ضعیف</option>
										</select>
									</div>
								</div>
								<div class="comments__respond-content">
									<div class="comments__respond-title">دیدگاه شما *</div>
									<textarea class="comments__score-input-respond" onChange={(e) => textAreaChange(e)}>{inputValue}</textarea>
								</div>
								<button type="submit" class="comments__respond-btn" onClick={setCommentHandler} disabled={!inputValue || !score}>
									ارسال
								</button>
							</div>
						</>
					) : <div className="alert alert-warning">برای ثبت کامنت ابتدا <Link to={'/login'} style={{ color: 'blue' }}>وارد</Link> شوید</div>
				}


			</div>
		</>
	);
}