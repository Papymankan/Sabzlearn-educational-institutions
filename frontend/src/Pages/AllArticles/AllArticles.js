import React, { useEffect, useState } from 'react'
import ArticlesCard from '../../Components/Articles/ArticlesCard/ArticlesCard'
import Footer from '../../Components/Footer/Footer'
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import Pagination from '../../Components/Pagination/Pagination'

export default function AllArticles() {

    const [articles, setArticles] = useState([])
    const [showArticles, setShowArticles] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/v1/articles')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setArticles(data)
            })
    }, [])

    return (
        <>
            <BreadCrumb links={[
                { id: 1, to: '/', title: "خانه" },
                { id: 2, to: '/articles/1', title: 'تمامی مقاله ها' }
            ]} />
            <section class="courses">
                <div class="container">
                    <div class="courses-content">
                        <div class="container">
                            <div class="row">
                                {
                                    showArticles.length >= 1 ? (
                                        showArticles.map(article => (<ArticlesCard cover={article.cover} description={article.description} shortName={article.shortName} title={article.title} />))
                                    ): <div className='alert alert-info'>فعلا مفاله ای در نظز گرفته نشده</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Pagination
                courses={articles}
                coursesCount={5}
                pathname={'articles'}
                setShowCourses={setShowArticles}
            />
            <Footer />
        </>
    )
}
