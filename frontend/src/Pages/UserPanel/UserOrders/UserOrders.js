import React, { useEffect, useState } from "react";
import './UserOrders.css'
import { Link } from "react-router-dom";

export default function UserOrders() {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:4000/v1/orders', {
            headers: {
                'Authorization': `Bearer ${localData.token}`
            },
        }).then(res => res.json()).then(data => setOrders(data))
    }, [])

    return (
        <div class="col-9">
            <div class="order">
                <table class="order__table">
                    <thead class="order__table-header">
                        <tr class="order__table-header-list">
                            <th class="order__table-header-item">شناسه</th>
                            <th class="order__table-header-item">تاریخ</th>
                            <th class="order__table-header-item">وضعیت</th>
                            <th class="order__table-header-item">دوره</th>
                            <th class="order__table-header-item">مبلغ</th>
                            <th class="order__table-header-item">عملیات ها</th>
                        </tr>
                    </thead>
                    <tbody class="order__table-body">
                        {orders.map((order, index) => (
                            <tr class="order__table-body-list">
                                <td class="order__table-body-item">
                                    <a href="#" class="order__table-body-link">
                                        {index + 1}
                                    </a>
                                </td>
                                <td class="order__table-body-item">{order.createdAt.slice(0, 10)}</td>
                                <td class="order__table-body-item">{order.course.isComplete ? 'تکمیل شده' : 'در حال برگزاری'}</td>
                                <td class="order__table-body-item">
                                    {order.course.name}
                                </td>
                                <td class="order__table-body-item">
                                    {order.price}
                                </td>
                                <td class="order__table-body-item">
                                    <Link class="order__table-body-btn" to={`/course-info/${order.course.shortName}`}>
                                        نمایش
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
