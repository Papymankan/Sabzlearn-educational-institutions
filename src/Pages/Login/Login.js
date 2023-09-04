import React from "react";
import { Link } from 'react-router-dom'
import Footer from "../../Components/Footer/Footer";
import TopBar from "../../Components/Header/TopBar/TopBar";
import NavBar from "../../Components/Header/NavBar/NavBar";

import "./Login.css";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { requiredValidator, minValidator, maxValidator, emailValidator } from "../../Validators/rules";

export default function Login() {
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
                type="text"
                placeholder="نام کاربری یا آدرس ایمیل"
                element='input'
                validation={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  emailValidator()
                ]}
              />
              <i class="login-form__username-icon fa fa-user"></i>
            </div>
            <div class="login-form__password">
              <Input
                classname="login-form__password-input"
                type="password"
                placeholder="رمز عبور"
                element='input'
                validation={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(18)
                ]}
              />
              <i class="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <Button classname="login-form__btn" type="submit" disabled={false} onclick={() => { }}>
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
