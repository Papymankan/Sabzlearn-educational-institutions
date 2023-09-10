import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import Footer from "../../Components/Footer/Footer";
import TopBar from "../../Components/Header/TopBar/TopBar";
import NavBar from "../../Components/Header/NavBar/NavBar";
import "./Login.css";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { requiredValidator, minValidator, maxValidator, emailValidator } from "../../Validators/rules";
import { useForm } from "../../hooks/useForm";
import AuthContext from "../../Context/authContext";

export default function Login() {


  const authContext = useContext(AuthContext)

  const [formState, onInputHandler] = useForm({
    username: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    },
  }, false)

  const userLogin = () => {
    const userData = {
      identifier: formState.inputs.username.value,
      password: formState.inputs.password.value,
    }
    fetch(`http://localhost:4000/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then(res => {
      if (!res.ok) {
        return res.text().then(text => {
          throw new Error(text)
        })
      } else {
        return res.json()
      }
    })
      .then(data => {
        authContext.login({}, data.accessToken)
      })
      .catch(err => {

      })
  }

  return (
    <>
      <TopBar />
      <NavBar />

      <section class="login-register">
        <div class="login">
          <span class="login__title">ورود به حساب کاربری</span>
          <span class="login__subtitle">
            خوشحالیم دوباره میبینیمت دوست عزیز :)
          </span>
          <div class="login__new-member">
            <span class="login__new-member-text">کاربر جدید هستید؟</span>
            <Link class="login__new-member-link" to="/register">
              ثبت نام
            </Link>
          </div>
          <form action="#" class="login-form">
            <div class="login-form__username">
              <Input
                classname="login-form__username-input"
                id="username"
                type="text"
                placeholder="نام کاربری یا آدرس ایمیل"
                element='input'
                validation={[
                  requiredValidator(),
                  minValidator(7),
                ]}
                onInputHandler={onInputHandler}
              />
              <i class="login-form__username-icon fa fa-user"></i>
            </div>
            <div class="login-form__password">
              <Input
                classname="login-form__password-input"
                id="password"
                type="password"
                placeholder="رمز عبور"
                element='input'
                validation={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(18)
                ]}
                onInputHandler={onInputHandler}
              />
              <i class="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <Button classname={`login-form__btn ${formState.isFormValid
              ? "login-form__btn-success"
              : "login-form__btn-error"
              }`} type="button" disabled={!formState.isFormValid}
              onclick={userLogin}>
              <i class="login-form__btn-icon fas fa-sign-out-alt"></i>
              <span class="login-form__btn-text">ورود</span>
            </Button>
            <div class="login-form__password-setting">
              <label class="login-form__password-remember">
                <input class="login-form__password-checkbox" type="checkbox" />
                <span class="login-form__password-text">
                  مرا به خاطر داشته باش
                </span>
              </label>
              <label class="login-form__password-forget">
                <a class="login-form__password-forget-link" href="#">
                  رمز عبور را فراموش کرده اید؟
                </a>
              </label>
            </div>
          </form>
          <div class="login__des">
            <span class="login__des-title">سلام کاربر محترم:</span>
            <ul class="login__des-list">
              <li class="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li class="login__des-item">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li class="login__des-item">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
