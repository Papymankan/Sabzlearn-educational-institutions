import { Skeleton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './BreadCrumb.css'

export default function BreadCrumb({ links }) {
    return (
        <section class="breadcrumb">
            <div class="container">
                <div class="breadcrumb__content">
                    <div class="breadcrumb__home-content-icon">
                        <i class="fas fa-home breadcrumb__home-icon"></i>
                    </div>
                    <ul class="breadcrumb__list">
                        {links.map(link => {
                            if(link.title == 'undefined'){
                                <Skeleton width={'50px'} height='30px' variant='rectangular' />
                            }else{
                                 return <li class="breadcrumb__item">
                                <Link to={link.to} class="breadcrumb__link">
                                    {link.title}
                                    {
                                        link.id == links.length ? null : (
                                            <i class="fas fa-angle-left breadcrumb__icon"></i>
                                        )
                                    }
                                </Link>
                            </li>
                            }
                           
                        }
                        )
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}
