import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ArticlesCard from '../../Components/Articles/ArticlesCard/ArticlesCard'
import CourseBox from '../../Components/CourseBox/CourseBox'
import Footer from '../../Components/Footer/Footer'
import NavBar from '../../Components/Header/NavBar/NavBar'
import TopBar from '../../Components/Header/TopBar/TopBar'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'

export default function Search() {

    const { value } = useParams()

    const [courses, setCourses] = useState([])
    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/v1/search/${value}`)
            .then(res => res.json())
            .then(data => {
                if (data.allResultArticles) {
                    setArticles(data.allResultArticles)
                }
                if (data.allResultCourses) {
                    setCourses(data.allResultCourses)
                }
                console.log(data);
            })
    }, [value])

    return (
        <>
            <TopBar />
            <NavBar />
            <section class="courses">
                <div class="container">
                    <SectionHeader main_title="نتایج جستجو برای دوره ها " />
                    <div class="courses-content">
                        <div class="container">
                            <div class="row">
                                {
                                    courses.length == 0 ? (<div className='alert alert-warning mt-4'>دوره ای یافت نشد</div>)
                                        : (
                                            <>
                                                {
                                                    courses.map(course => (<CourseBox cover={course.cover} name={course.name} price={course.price} shortname={course.shortName} />))
                                                }
                                            </>
                                        )
                                }

                            </div>
                        </div>
                    </div>
                    <SectionHeader main_title="نتایج جستجو برای مقاله ها " />
                    <div class="courses-content">
                        <div class="container">
                            <div class="row">
                                {
                                    articles.length == 0 ? (<div className='alert alert-warning mt-4'>مقاله ای یافت نشد</div>)
                                        : (
                                            <>
                                                {
                                                    articles.map(article => (<ArticlesCard cover={article.cover} description={article.description} shortName={article.shortName} title={article.title} />))
                                                }
                                            </>
                                        )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
