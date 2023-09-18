import React from 'react'
import './Contact.css'
import Footer from '../../Components/Footer/Footer'
import { useForm } from '../../hooks/useForm'
import Button from '../../Components/Button/Button'
import { requiredValidator, minValidator, maxValidator, emailValidator } from "../../Validators/rules";
import Input from '../../Components/Input/Input'


export default function Contact() {

    const [formState, onInputHandler] = useForm(
        {
            name: {
                value: "",
                isValid: false,
            },
            email: {
                value: "",
                isValid: false,
            },
            phone: {
                value: "",
                isValid: false,
            },
            body: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const addNewContact = () => {
        console.log("درخواست شما برای مدیران سایت ارسال شد");
      };

    return (
        <>
            <section className="login-register">
                <div className="login register-form">
                    <span className="login__title">ارتباط با ما</span>
                    <span className="login__subtitle">
                        نظر یا انتقادتو بنویس برامون :)
                    </span>
                    <form action="#" className="login-form">
                        <div className="login-form__username login-form__parent">
                            <Input
                                onInputHandler={onInputHandler}
                                element="input"
                                id="name"
                                classname="login-form__username-input"
                                type="text"
                                placeholder="نام و نام خانوادگی"
                                validation={[requiredValidator(), minValidator(6), maxValidator(20)]}
                            />
                            <i className="login-form__username-icon fa fa-user"></i>
                        </div>
                        <div className="login-form__password login-form__parent">
                            <Input
                                onInputHandler={onInputHandler}
                                element="input"
                                id="email"
                                classname="login-form__password-input"
                                type="text"
                                placeholder="آدرس ایمیل"
                                validation={[requiredValidator(), minValidator(8), maxValidator(40), emailValidator()]}
                            />
                            <i className="login-form__password-icon fa fa-envelope"></i>
                        </div>
                        <div className="login-form__phone-number login-form__parent">
                            <Input
                                onInputHandler={onInputHandler}
                                element="input"
                                id="phone"
                                classname="login-form__password-input"
                                type="text"
                                placeholder="شماره تماس"
                                validation={[requiredValidator(), minValidator(10), maxValidator(11)]}
                            />
                            <i className="login-form__password-icon fa fa-phone"></i>
                        </div>
                        <div className="login-form__text login-form__parent">
                            <Input
                                onInputHandler={onInputHandler}
                                element="textarea"
                                id="body"
                                classname="login-form__text-input"
                                placeholder="متن خود را وارد کنید"
                                validation={[requiredValidator(), minValidator(10)]}
                            />
                        </div>
                        <Button
                            classname={`login-form__btn ${formState.isFormValid === true
                                    ? "login-form__btn-success"
                                    : "login-form__btn-error"
                                }`}
                            type="submit"
                            onClick={addNewContact}
                            disabled={!formState.isFormValid}
                        >
                            <span className="login-form__btn-text">ارسال</span>
                        </Button>
                    </form>
                </div>
            </section>

            <Footer />
        </>
    )
}
