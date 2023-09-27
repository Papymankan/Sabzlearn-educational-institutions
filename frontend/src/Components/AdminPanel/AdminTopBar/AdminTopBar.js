import React, { useContext, useEffect, useState } from 'react'
export default function AdminTopBar() {

    const [adminInfo, setAdminInfo] = useState({})
    const [adminNotif, setAdminNotif] = useState([])
    const [notifShow, setNotifShow] = useState(false)

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('user'))
        if (localData) {
            fetch('http://localhost:4000/v1/auth/me', {
                headers: {
                    'Authorization': `Bearer ${localData.token}`
                }
            }).then(res => res.json())
                .then(data => {
                    setAdminNotif(data.notifications)
                    setAdminInfo(data)
                })
        }
    }, [seeNotif])

    function seeNotif(id) {
        const localData = JSON.parse(localStorage.getItem('user'))

        fetch(`http://localhost:4000/v1/notifications/see/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localData.token}`
            }
        }).then(res => res.json())
            .then(data => console.log(data))
    }

    return (
        <div class="container-fluid">
            <div class="container">
                <div className={`home-header ${notifShow && 'active-modal-notfication'}`}>
                    <div class="home-right">
                        <div class="home-searchbar">
                            <input type="text" class="search-bar" placeholder="جستجو..." />
                        </div>
                        <div class="home-notification">
                            <button type="button" onMouseEnter={() => setNotifShow(true)}>
                                <i class="far fa-bell"></i>
                            </button>
                        </div>
                        <div class="home-notification-modal" onMouseEnter={() => setNotifShow(true)} onMouseLeave={() => setNotifShow(false)}>
                            <ul class="home-notification-modal-list"  >

                                {
                                    adminNotif.length == 0 ? (
                                    <li class="home-notification-modal-item">
                                        پیغامی وجود ندارد
                                    </li>) : (
                                        adminNotif && adminNotif.map(notif => (
                                        <li class="home-notification-modal-item">
                                            <span class="home-notification-modal-text">{notif.msg}</span>
                                            <label class="switch">
                                                <a href="javascript:void(0)" onClick={() => seeNotif(notif._id)}>دیدم</a>
                                            </label>
                                        </li>
                                    ))
                                    )
                                }


                            </ul>
                        </div>
                    </div>
                    <div class="home-left">
                        <div class="home-profile">
                            <div class="home-profile-image">
                                <a href="#">
                                    <img src={adminInfo.profile} alt="" />
                                </a>
                            </div>
                            <div class="home-profile-name">
                                <a href="#">{adminInfo.name}</a>
                            </div>
                            <div class="home-profile-icon">
                                <i class="fas fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
