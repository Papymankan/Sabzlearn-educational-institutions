import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import Swal from 'sweetalert2'
export default function AdminUsers() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    const localData = JSON.parse(localStorage.getItem('user'))
    fetch('http://localhost:4000/v1/users', {
      headers: {
        'Authorization': `Bearer ${localData.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUsers(data)
      })
  }

  const deleteUser = (id) => {
    const localData = JSON.parse(localStorage.getItem('user'))
    Swal.fire({
      title: '<p style="font-size: 30px ; margin-bottom: 10px;">آیا از حذف مطمئن هستید؟</p>',
      icon: 'warning',
      padding: '30px 0',
      width: '400px',
      showCancelButton: true,
      cancelButtonText: 'نه',
      confirmButtonText: 'بله'
    }).then(res => {
      if (res.isConfirmed) {
        fetch(`http://localhost:4000/v1/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localData.token}`
          }
        }).then(res => {
          if (res.ok) {
            Swal.fire({
              title: '<p style="font-size: 30px ; margin-bottom: 10px;">با موفقیت حذف شد</p>',
              icon: 'success',
              padding: '20px',
              didOpen: () => {
                Swal.showLoading()
              },
              width: '380px',
              timer: 1500,
              willClose: () => {
                fetchUsers()
              }
            })
          }
        })
      }
    })
  }

  const BanUser = (id) => {
    const localData = JSON.parse(localStorage.getItem('user'))
    Swal.fire({
      title: '<p style="font-size: 30px ; margin-bottom: 10px;">آیا از بن مطمئن هستید؟</p>',
      icon: 'warning',
      padding: '30px 0',
      width: '400px',
      showCancelButton: true,
      cancelButtonText: 'نه',
      confirmButtonText: 'بله'
    }).then(res => {
      if (res.isConfirmed) {
        fetch(`http://localhost:4000/v1/users/ban/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localData.token}`
          }
        }).then(res => {
          console.log(res);
          if (res.ok) {
            Swal.fire({
              title: '<p style="font-size: 30px ; margin-bottom: 10px;">با موفقیت بن شد</p>',
              icon: 'success',
              padding: '20px',
              didOpen: () => {
                Swal.showLoading()
              },
              width: '380px',
              timer: 1500,
            })
          }
        })
      }
    })
  }



  return (
    <>
      <DataTable title="کاربران">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>نام کاربری</th>
              <th>ایمیل</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button type="button" class="btn btn-primary edit-btn">
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger delete-btn" onClick={() => deleteUser(user._id)}>
                      حذف
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger delete-btn" onClick={() => BanUser(user._id)}>
                      بن
                    </button>
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </DataTable>
    </>
  )
}
