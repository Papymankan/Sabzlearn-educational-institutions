import React, { useEffect, useState } from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import './Articles.css'
import ArticlesCard from './ArticlesCard/ArticlesCard'

export default function Articles() {

    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/v1/articles')
            .then(res => res.json())
            .then(data => {
                setArticles(data)
                console.log(data);
            })
    }, [])

    return (
        <section class="articles">
            <div class="container">
                <SectionHeader btn_title={"تمامی مقاله ها"} primary_title="پیش به سوی ارتقای دانش" main_title={"جدیدترین مقاله ها"} btnHref={'/articles/1'} />
                <div class="articles__content">
                    <div class="row">
                        {
                            articles.length >= 1 && [...articles].sort(() => 0.5 - Math.random()).filter(a => a.publish == 1).slice(0,3).map(article => (<ArticlesCard {...article} />))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
