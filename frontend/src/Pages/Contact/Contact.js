import React from 'react'
import './Contact.css'
import Footer from '../../Components/Footer/Footer'
import { useForm } from '../../hooks/useForm'
import Button from '../../Components/Button/Button'
import { requiredValidator, minValidator, maxValidator, emailValidator } from "../../Validators/rules";
import Input from '../../Components/Input/Input'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router'



export default function Contact() {

    const navigate = useNavigate()


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

    const addNewContact = (event) => {
        event.preventDefault()

        const newContact = {
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            phone: formState.inputs.phone.value,
            body: formState.inputs.body.value
        }

        fetch('http://localhost:4000/v1/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
        }).then(res => {
            if(res.ok){
                Swal.fire({
                    title: '<p style="font-size: 30px ; margin-bottom: 10px;">با موفقیت ارسال شد</p>',
                    icon: 'success',
                    padding: '20px',
                    didOpen: () => {
                      Swal.showLoading()
                    },
                    width: '380px',
                    timer: 1500,
                    willClose: () => {
                      navigate('/', { replace: true })
                      window.location.reload()
                    }
                  })
            }else{
                Swal.fire({
                    title: '<p style="font-size: 30px ; margin-bottom: 10px;">پیام با موفقیت ارسال نشد</p>',
                    icon: 'error',
                    padding: '20px',
                    width: '400px',
                    confirmButtonText: 'تلاش دوباره'
                  })
            }
            return res.json()
        })
        .then(data => console.log(data))
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
                                classname="login-form__password-input number"
                                type="number"
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
                            onclick={addNewContact}
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
