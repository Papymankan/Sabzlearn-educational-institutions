import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import Swal from 'sweetalert2'
import { emailValidator, maxValidator, minValidator, requiredValidator } from '../../../Validators/rules'
import { useForm } from '../../../hooks/useForm'
import Input from '../../../Components/Input/Input'
export default function AdminUsers() {

  const [users, setUsers] = useState([])

  const [formState, onInputHandler] = useForm({
    name: {
      value: '',
      isValid: false
    },
    username: {
      value: '',
      isValid: false
    },
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    },
    phone: {
      value: '',
      isValid: false
    }
  }
    , false)


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

  const registerNewUser = (event) => {
    event.preventDefault();
    let newUser = {
      name: formState.inputs.name.value,
      username: formState.inputs.username.value,
      phone: formState.inputs.phone.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value
    }
    fetch('http://localhost:4000/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then(res => {
      console.log(res);
      if (res.ok) {
        Swal.fire({
          title: '<p style="font-size: 30px ; margin-bottom: 10px;">کاربر جدید اضافه شد</p>',
          icon: 'success',
          padding: '20px',
          didOpen: () => {
            Swal.showLoading()
          },
          width: '380px',
          timer: 1500,
        })
      }
      res.json()
    }).then(result => {
      console.log(result);
      fetchUsers()
    })
  }

  const changeRole = (id, role) => {
    let body = {
      id,
      role: role == 'USER' ? 'ADMIN' : 'USER',
    }
    console.log(body);
    const localData = JSON.parse(localStorage.getItem('user'))
    Swal.fire({
      title: '<p style="font-size: 30px ; margin-bottom: 10px;">آیا از تغییر نقش مطمئن هستید؟</p>',
      icon: 'warning',
      padding: '30px 0',
      width: '400px',
      showCancelButton: true,
      cancelButtonText: 'نه',
      confirmButtonText: 'بله'
    }).then(res => {
      if (res.isConfirmed) {
        fetch(`http://localhost:4000/v1/users/role`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localData.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify()
        }).then(res => {
          if (res.ok) {
            Swal.fire({
              title: '<p style="font-size: 30px ; margin-bottom: 10px;">با موفقیت نقش تغییر داده شد</p>',
              icon: 'success',
              padding: '20px',
              didOpen: () => {
                Swal.showLoading()
              },
              width: '380px',
              timer: 1500,
            })
            fetchUsers()
          }
        })
      }
    })

  }

  return (
    <>
      <div class="home-content-edit">
        <div class="back-btn">
          <i class="fas fa-arrow-right"></i>
        </div>
        <form class="form">
          <div class="col-6">
            <div class="name input">
              <label class="input-title">نام و نام خانوادگی</label>
              <Input
                type="text"
                className=""
                id="name"
                element="input"
                validation={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="family input">
              <label class="input-title">نام کاربری</label>
              <Input
                type="text"
                className=""
                id="username"
                element="input"
                validation={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام کاربری را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="email input">
              <label class="input-title">ایمیل</label>
              <Input
                type="text"
                className=""
                id="email"
                element="input"
                validation={[
                  requiredValidator(),
                  minValidator(8),
                  emailValidator(),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا ایمیل کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="password input">
              <label class="input-title">رمز عبور</label>
              <Input
                type="text"
                className=""
                id="password"
                element="input"
                validation={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="phone input">
              <label class="input-title">شماره تلفن</label>
              <Input
                type="text"
                className=""
                id="phone"
                element="input"
                validation={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-12">
            <div class="bottom-form">
              <div class="submit-btn">
                <input type="submit" value="افزودن" onClick={registerNewUser} disabled={!formState.isFormValid} />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title="کاربران">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>نام کاربری</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر نقش</th>
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
                  <td>{user.role == 'ADMIN' ? 'مدیر' : 'کاربر'}</td>
                  <td>
                    <button type="button" class="btn btn-primary edit-btn">
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-primary edit-btn" onClick={() => changeRole(user._id, user.role)}>
                      ارتقا
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
