import React from "react";
import Input from "../../../Components/Input/Input";
import { minValidator } from "../../../Validators/rules";
import { useForm } from "../../../hooks/useForm";

export default function AdminOffs() {
    const [formData, onInputHandler] = useForm({
        code: {
            value: '',
            isValid: false
        },
        percent: {
            value: '',
            isValid: false
        },
        max: {
            value: '',
            isValid: false
        }
    }, false)
    return (
        <>
            <div class="container-fluid" id="home-content">
                <div class="container">
                    <div class="home-title">
                        <span>کد تخفیف جدید</span>
                    </div>
                    <form class="form">
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">کد تخفیف</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="code"
                                    validation={[minValidator(4)]}
                                    placeholder="لطفا کد تخفیف را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">درصد تخفیف</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="percent"
                                    validation={[minValidator(1)]}
                                    placeholder="لطفا درصد تخفیف را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">تعداد</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="max"
                                    validation={[minValidator(1)]}
                                    placeholder="لطفا تعداد را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title" style={{ display: "block" }}>
                                    دوره
                                </label>
                                <select class="select">
                                    <option value="none" disabled hidden selected>دوره مدنظر را انتخاب کنید</option>

                                </select>
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="bottom-form">
                                <div class="submit-btn">
                                    <input type="submit" value="افزودن" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
