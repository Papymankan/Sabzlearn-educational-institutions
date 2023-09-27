import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../Context/authContext'
export default function AdminTopBar() {
    const authContext = useContext(AuthContext)

    const [adminInfo, setAdminInfo] = useState({})
    const [adminNotif, setAdminNotif] = useState([])
    const [notifShow, setNotifShow] = useState(true)

    useEffect(() => {
        setAdminInfo(authContext.userInfos)
        setAdminNotif(authContext.userInfos.notifications)
    }, [authContext])


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
                                    adminNotif && adminNotif.map(notif => (
                                        <li class="home-notification-modal-item">
                                            <span class="home-notification-modal-text">{notif.msg}</span>
                                            <label class="switch">
                                                <a href="#">دیدم</a>
                                            </label>
                                        </li>
                                    ))
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
