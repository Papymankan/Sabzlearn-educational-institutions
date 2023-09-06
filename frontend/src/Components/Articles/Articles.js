import React from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import './Articles.css'
import ArticlesCard from './ArticlesCard/ArticlesCard'

export default function Articles() {
    return (
        <section class="articles">
            <div class="container">
                <SectionHeader btn_title={"تمامی مقاله ها"} primary_title="پیش به سوی ارتقای دانش" main_title={"جدیدترین مقاله ها"} />
                <div class="articles__content">
                    <div class="row">
                        <ArticlesCard />
                        <ArticlesCard />
                        <ArticlesCard />
                    </div>
                </div>
            </div>
        </section>
    )
}
