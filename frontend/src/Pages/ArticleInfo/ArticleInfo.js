import React, { useEffect, useState } from 'react'
import './ArticleInfo.css'
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import NavBar from '../../Components/Header/NavBar/NavBar'
import TopBar from '../../Components/Header/TopBar/TopBar'
import Footer from '../../Components/Footer/Footer'
import CommentSection from '../../Components/CommentSection/CommentSection'
import { useParams } from 'react-router'
import { Skeleton } from '@mui/material'
import domPurify from 'dompurify'

export default function ArticleInfo() {

  const { articleName } = useParams()
  const [articleInfo, setArticleInfo] = useState({})

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles/${articleName}`)
      .then(res => res.json())
      .then(data => {
        setArticleInfo(data)
        console.log(data);
      })
  }, [articleName])

  return (
    <>
      <TopBar />
      <NavBar />
      {
        articleInfo.categoryID && <BreadCrumb links={[
          { id: 1, title: 'خانه', to: '/' },
          { id: 2, title: 'آموزش برنامه نویسی فرانت اند', to: `/category/${articleInfo.categoryID.name}/1` },
        ]}
        />
      }
      <main class="main">
        <div class="container">
          <div class="row">
            <div className="col-8">
              <div class="article">
                <h1 class="article__title">
                  {articleInfo.title}
                </h1>
                <div class="article__header">
                  <div class="article-header__category article-header__item">
                    <i class="far fa-folder article-header__icon"></i>
                    {articleInfo.categoryID ? <a href="#" class="article-header__text">{articleInfo.categoryID.title}</a> : <Skeleton variant="rectangular" width={100} height={18} className='Skleton-articleTop' />}
                  </div>
                  <div class="article-header__category article-header__item">
                    <i class="far fa-user article-header__icon"></i>
                    {articleInfo.creator ? <span class="article-header__text"> ارسال شده توسط {articleInfo.creator.name}</span> : <Skeleton variant="rectangular" width={100} height={18} className='Skleton-articleTop' />}
                  </div>
                </div>
                {articleInfo.cover ? <img src={`http://localhost:4000/courses/covers/${articleInfo.cover}`} alt="Article Cover" class="article__banner" /> : <Skeleton variant="rectangular" width={"100%"} height={400} className='Skleton-articleIMG' /> }
                <div class="article__score">
                  <div class="article__score-icons">
                    <img src="/images/svgs/star_fill.svg" class="article__score-icon" />
                    <img src="/images/svgs/star_fill.svg" class="article__score-icon" />
                    <img src="/images/svgs/star_fill.svg" class="article__score-icon" />
                    <img src="/images/svgs/star_fill.svg" class="article__score-icon" />
                    <img src="/images/svgs/star.svg" class="article__score-icon" />
                  </div>
                  <span class="article__score-text">4.2/5 - (5 امتیاز)</span>
                </div>

                <p class="article__paragraph paragraph">
                  جاوا اسکریپت یکی از زبان‌های برنامه‌نویسی اصلی حوزه فرانت‌اند است که به واسطه فریم ورک‌های آن می‌توان انواع وب سایت‌ها، اپلیکیشن‌ها و وب اپلیکیشن‌ها را طراحی کرد. به طور کلی بعد از یادگیری html و css معمولاً باید آموزش جاوا اسکریپت را نیز فرا بگیرید. . چرا که این زبان تکمیل‌کننده html و css بوده و در چنین شرایطی موقعیت‌های شغلی بیشتر را در اختیار خواهید داشت و همچنین می‌توانید پروژه‌های گسترده‌تری را انجام دهید. در حال حاضر با وجود منابع رایگان موجود در وب شما به راحتی می‌توانید زبان جاوا اسکریپت را به صورت حرفه‌ای فرا بگیرید. به همین واسطه در ادامه مطلب قصد داریم سایت‌های شاخص آموزش این زبان برنامه‌نویسی در جهان را به شما معرفی کنیم و در آخر بگوییم که بهترین سایت آموزش جاوا اسکریپت کدام است.
                </p>

                <div class="article-read">
                  <span class="article-read__title">آنچه در این مقاله خواهید خواند</span>
                  <ul class="article-read__list">
                    <li class="article-read__item">
                      <a href="#" class="article-read__link">معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:</a>
                    </li>
                    <li class="article-read__item">
                      <a href="#" class="article-read__link">یک راه آسان‌تر، دوره‌ های جاوا اسکریپت آکادمی سبزلرن!</a>
                    </li>
                    <li class="article-read__item">
                      <a href="#" class="article-read__link">ثبت نام در دوره‌ های جاوا اسکریپت سبزلرن:</a>
                    </li>
                  </ul>
                </div>

                <div className="article-section" dangerouslySetInnerHTML={{ __html: domPurify.sanitize(articleInfo.body) }}>

                </div>

                <div class="article-social-media">
                  <span class="article-social-media__text">اشتراک گذاری :</span>
                  <a href="#" class="article-social-media__link">
                    <i class="fab fa-telegram-plane article-social-media__icon"></i>
                  </a>
                  <a href="#" class="article-social-media__link">
                    <i class="fab fa-twitter article-social-media__icon"></i>
                  </a>
                  <a href="#" class="article-social-media__link">
                    <i class="fab fa-facebook-f article-social-media__icon"></i>
                  </a>
                </div>

              </div>
              <div class="suggestion-articles">
                <div class="row">
                  <div class="col-6">
                    <div class="suggestion-articles__right suggestion-articles__content">
                      <a href="#" class="suggestion-articles__icon-link">
                        <i class="fas fa-arrow-right suggestion-articles__icon"></i>
                      </a>
                      <a href="#" class="suggestion-articles__link">
                        سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ | تجربه برنامه نویسان
                      </a>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="suggestion-articles__left suggestion-articles__content">
                      <a href="#" class="suggestion-articles__icon-link">
                        <i class="fas fa-arrow-left suggestion-articles__icon"></i>
                      </a>
                      <a href="#" class="suggestion-articles__link">
                        سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ | تجربه برنامه نویسان
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <CommentSection />
            </div>
            <div className="col-4">

            </div>
          </div>
        </div>
      </main>

      <Footer />

    </>
  )
}
