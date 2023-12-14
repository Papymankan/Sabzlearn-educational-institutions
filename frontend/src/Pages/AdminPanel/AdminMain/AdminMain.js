import React, { useEffect, useState } from "react";
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import AdminItems from "../../../Components/AdminPanel/AdminItems/AdminItems";
import './AdminMain.css'


export default function AdminMain() {

  const [infos, setInfos] = useState({})

  const fetchInfos = () => {
    const localData = JSON.parse(localStorage.getItem('user'))
    fetch('http://localhost:4000/v1/infos/p-admin', {
      headers: {
        'Authorization': `Bearer ${localData.token}`
      }
    }).then(res => res.json()).then(data => setInfos(data))
  }

  useEffect(fetchInfos, [])

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-content-title">
            <span class="welcome">
              <span class="name">{infos.adminName}</span> خوش آمدید
            </span>
          </div>
          <div class="home-content-boxes">
            <div class="row">
              {infos.infos && infos.infos.map(info => (<AdminItems title={info.title} count={info.count} />))}
            </div>
          </div>

          <div class="home-content-latset-users">
            <DataTable title="افراد اخیرا ثبت نام شده">

              <table class="table">
                <thead>
                  <tr>
                    <th>شناسه</th>
                    <th>نام و نام خانوادگی</th>
                    <th>ایمیل</th>
                  </tr>
                </thead>
                <tbody>
                  {infos.lastUsers && infos.lastUsers.map((user, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
}
