import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import TopBar from "../../Components/Header/TopBar/TopBar";
import NavBar from "../../Components/Header/NavBar/NavBar";
import "./Register.css";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { useForm } from "../../hooks/useForm";
import AuthContext from "../../Context/authContext";


import { requiredValidator, minValidator, maxValidator, emailValidator } from "../../Validators/rules";

export default function Register() {

  const authContext = useContext(AuthContext)

  const [formState, onInputHandler] = useForm(
    {
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
      confirmPassword: {
        value: '',
        isValid: false
      },
    }, false
  )

  const RegisterNewUser = () => {
    // console.log('register');

    const newUser = {
      name: formState.inputs.name.value,
      username: formState.inputs.username.value,
      phone: 0,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.confirmPassword.value
    }

    fetch(`http://localhost:4000/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(res => res.json())
      .then(data => {
        authContext.login(data.user, data.accessToken)
      })

  }
  return (
    <>
      {/* <TopBar />
      <NavBar /> */}

      <section class="login-register">
        <div class="login register-form">
          <span class="login__title">ساخت حساب کاربری</span>
          <span class="login__subtitle">خوشحالیم قراره به جمع ما بپیوندی</span>
          <div class="login__new-member">
            <span class="login__new-member-text">قبلا ثبت‌نام کرده‌اید؟ </span>
            <Link class="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="#" class="login-form">
            <div class="login-form__username">
              <Input
                classname="login-form__username-input"
                id="name"
                type="text"
                placeholder="نام و نام خانوادگی"
                element='input'
                validation={[
                  requiredValidator(),
                  minValidator(6),
                  maxValidator(20)
                ]}
                onInputHandler={onInputHandler}
              />
              <i class="login-form__username-icon fa fa-user"></i>
            </div>
            <div class="login-form__username">
              <Input
                classname="login-form__username-input"
                id="username"
                type="text"
                placeholder="نام کاربری"
                element='input'
                validation={[
                  requiredValidator(),
                  minValidator(6),
                  maxValidator(20)
                ]}
                onInputHandler={onInputHandler}
              />
              <i class="login-form__username-icon fa fa-user"></i>
            </div>
            <div class="login-form__password">
              <Input
                classname="login-form__password-input"
                id="email"
                type="text"
                placeholder="آدرس ایمیل"
                element='input'
                validation={[
                  requiredValidator(),
                  minValidator(6),
                  maxValidator(25),
                  emailValidator()
                ]}
                onInputHandler={onInputHandler}
              />
              <i class="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div class="login-form__password">
              <Input
                id="password"
                classname="login-form__password-input"
                type="text"
                placeholder="رمز عبور"
                element='input'
                validation={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
              />
              <i class="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <div class="login-form__password">
              <Input
                id="confirmPassword"
                classname="login-form__password-input"
                type="text"
                placeholder="تکرار رمز عبور"
                element='input'
                validation={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
              />
              <i class="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <Button classname={`login-form__btn ${formState.isFormValid
              ? "login-form__btn-success"
              : "login-form__btn-error"
              }`} type="button" disabled={!formState.isFormValid} onclick={RegisterNewUser}>
              <i class="login-form__btn-icon fa fa-user-plus"></i>
              <span class="login-form__btn-text">عضویت</span>
            </Button>
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
