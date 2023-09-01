import React from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import './AboutUs.css'
import AboutUsCard from './AboutUsCard/AboutUsCard'
export default function AboutUs() {
    return (
        <div class="about-us">
            <div class="container">
                <SectionHeader btn_title="" main_title="ما چه کمکی بهتون میکنیم؟" primary_title="از اونجایی که آکادمی آموزشی سبزلرن یک آکادمی خصوصی هست" />
                <div class="container">
                    <div class="row">
                        <AboutUsCard desc="با پشتیبانی و کیفیت بالا ارائه میده !" icon="copyright" title="دوره های اختصاصی"/>

                        <AboutUsCard title="اجازه تدریس" icon="leaf" desc="به هر مدرسی رو نمیده. چون کیفیت براش مهمه !"/>

                        <AboutUsCard desc="براش مهم نیست. به مدرسینش حقوق میده تا نهایت کیفیت رو در پشتیبانی و اپدیت دوره ارائه بده" icon="copyright" title="دوره پولی و رایگان"/>

                        <AboutUsCard desc="اولویت اول و آخر آکادمی آموزش برنامه نویسی سبزلرن اهمیت به کاربرها و رفع نیاز های آموزشی و رسوندن اونها به بازار کار هست" icon="copyright" title="اهمیت به کاربر"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
