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
                }else {
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
                                        <button className="btn btn-primary delete-btn" onClick={() => answerTicket(ticket._id)}>پاسخ</button>
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
