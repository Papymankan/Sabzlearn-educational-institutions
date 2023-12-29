import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Ticket({ title, departmentSubID, answer, createdAt , user , _id}) {

    const dateMaker = () => {
        let date1 = new Date()
        // let date1 = new Date(`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`)
        let date2 = new Date(`${createdAt.slice(5, 7)}/${createdAt.slice(8, 10)}/${createdAt.slice(0, 4)}`)
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return [diffDays , date2]
    }

    return (
        <>
            <div class="ticket-content__box">
                <div class="ticket-content__right">
                    <div class="ticket-content__right-right">
                        <span class="ticket-content__category">
                            {departmentSubID}
                        </span>
                        <Link class="ticket-content__link" to={`/user-panel/tickets/answer/${_id}`}>
                            {title}
                        </Link>
                    </div>
                    <div class="ticket-content__right-left">
                        <span class="ticket-content__name">{user}</span>
                    </div>
                </div>
                <div class="ticket-content__left">
                    <div class="ticket-content__left-right">
                        <div class={answer ? 'ticket-content__condition-true' : 'ticket-content__condition-false'}>
                            <span class="ticket-content__condition-text">
                                {answer ? ' پاسخ داده شده' : 'پاسخ داده نشده'}
                            </span>
                        </div>
                    </div>
                    <div class="ticket-content__left-left">
                        <span class="ticket-content__time">{dateMaker()[1].toLocaleDateString('fa-IR')}</span>
                        <span class="ticket-content__time-month">{dateMaker()[0] <= 30 ? `${dateMaker()[0]} روز قبل` : `${Math.ceil(dateMaker()[0]/30)} ماه قبل`}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
