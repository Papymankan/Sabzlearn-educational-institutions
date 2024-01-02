import React from "react";
import Swal from "sweetalert2";
import Input from '../../../Components/Input/Input'
import { useForm } from "../../../hooks/useForm";
import { minValidator } from "../../../Validators/rules";

export default function AdminEvents() {

    const [formState, onInputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
    }, false)

    const setEvent = (e) => {
        e.preventDefault()
        if (+formState.inputs.title.value) {
            const localData = JSON.parse(localStorage.getItem('user'))
            let body = {
                discount: formState.inputs.title.value
            }
            fetch('http://localhost:4000/v1/offs/all', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localData.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(res => {
                if (res.ok) {
                    Swal.fire({
                        title: '<p style="font-size: 30px ; margin-bottom: 10px;">با موفقیت ایجاد شد</p>',
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
        }else{
            Swal.fire({
                title: '<p style="font-size: 30px ; margin-bottom: 10px;">درصد تخفیف نامعتبر است</p>',
                icon: 'error',
                padding: '20px',
                didOpen: () => {
                    Swal.showLoading()
                },
                width: '380px',
                timer: 1500,
            })
        }
    }

    return (
        <>
            <div class="container">
                <div class="home-title">
                    <span>ایجاد کمپین جدید</span>
                </div>
                <form class="form">
                    <div class="col-12">
                        <div class="name input">
                            <label class="input-title">درصد تخفیف</label>
                            <Input
                                element="input"
                                onInputHandler={onInputHandler}
                                id="title"
                                placeholder="لطفا درصد را وارد کنید..."
                                validation={[minValidator(1)]}
                            />
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="bottom-form">
                            <div class="submit-btn">
                                <input type="submit" value="ایجاد کمپین" disabled={!formState.isFormValid} onClick={setEvent} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
