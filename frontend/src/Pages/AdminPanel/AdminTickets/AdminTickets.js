import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

export default function AdminTickets() {

    const [tickets, setTickets] = useState([])

    const fetchTickets = () => {
        const localData = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:4000/v1/tickets', {
            headers: {
                'Authorization': `Bearer ${localData.token}`
            },
        }).then(res => res.json()).then(data => {
            let arr = []
            let filterArr1 = []
            let filterArr2 = []
            let filterArr3 = []
            let filterArr4 = []

            data.map(ticket => {
                if (ticket.answer == 0) {
                    if (ticket.priority == 1) {
                        filterArr1.push(ticket)
                    } else if (ticket.priority == 2) {
                        filterArr2.push(ticket)
                    } else if (ticket.priority == 3) {
                        filterArr3.push(ticket)
                    }
                } else {
                    filterArr4.push(ticket)
                }
            })

            arr = filterArr1.concat(filterArr2).concat(filterArr3).concat(filterArr4)

            console.log(filterArr1);
            console.log(filterArr2);
            console.log(filterArr3);
            console.log(arr);
            setTickets(arr)
        })
    }

    const ShowTicket = (text) => {

        Swal.fire({
            title: `
            <p style="font-size: 18px ; margin-bottom: 10px;">${text}</p>
            `,
            padding: '30px 0',
            width: '400px',
            confirmButtonText: 'بستن'
        })
    }

    const answerTicket = (id) => {
        Swal.fire({
            title: '<p style="font-size: 30px ; margin-bottom: 10px;">پاسخ را وارد کنید</p>',
            html:
                '<textArea id="swal-input1" class="swal2-input" placeholder="پاسخ">',
            padding: '5px',
            width: '380px',
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                ]
            },
            confirmButtonText: 'تایید',
        }).then(res => {
            if (res.isConfirmed && res.value[0]) {
                const localData = JSON.parse(localStorage.getItem('user'))

                let body = {
                    body: res.value[0],
                    ticketID: id
                }

                fetch(`http://localhost:4000/v1/tickets/answer`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localData.token}`,
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify(body)
                }).then(res => {
                    if(res.ok){
                        Swal.fire({
                            title: '<p style="font-size: 30px ; margin-bottom: 10px;">با موفقیت پاسخ داده شد</p>',
                            icon: 'success',
                            padding: '20px',
                            didOpen: () => {
                                Swal.showLoading()
                            },
                            width: '380px',
                            timer: 1500,
                        })
                        fetchTickets()
                    }
                })
            }
        })
    }

    useEffect(() => {
        fetchTickets()
    }, [])

    return (
        <>
            <DataTable title='تیکت ها'>
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>سطح اهمیت</th>
                            <th>دپارتمان</th>
                            <th>عنوان</th>
                            <th>کاربر</th>
                            <th>متن تیکت</th>
                            <th>پاسخ</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            tickets.map((ticket, index) => (
                                <tr className={ticket.answer ? 'answered-ticket' : ''}>
                                    <td className={!ticket.answer && (ticket.priority == 1 ? 'high-priority' : (ticket.priority == 2 ? 'mid-priority' : 'low-priority'))} >{index + 1}</td>
                                    <td>{ticket.priority == 1 ? 'بالا' : (ticket.priority == 2 ? 'متوسط' : 'پایین')}</td>
                                    <td>{ticket.departmentSubID}</td>
                                    <td>{ticket.title}</td>
                                    <td>{ticket.user}</td>
                                    <td>
                                        <button className="btn btn-primary delete-btn" onClick={() => ShowTicket(ticket.body)}>مشاهده</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-primary delete-btn" onClick={() => answerTicket(ticket._id)} disabled={ticket.answer}>{ticket.answer ? 'پاسخ داده شد' : 'پاسخ'}</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </DataTable>
        </>
    );
}
