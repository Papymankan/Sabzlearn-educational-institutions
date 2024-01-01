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
            let filterArr = []

            filterArr = data.filter(ticket => {
                return ticket.answer == 0 && ticket.priority == 1
            })
            arr = arr.concat(filterArr)

            filterArr = data.filter(ticket => {
                return ticket.answer == 0 && ticket.priority == 2
            })
            arr = arr.concat(filterArr)

            filterArr = data.filter(ticket => {
                return ticket.answer == 0 && ticket.priority == 3
            })
            arr = arr.concat(filterArr)

            filterArr = data.filter(ticket => {
                return ticket.answer == 1
            })
            arr = arr.concat(filterArr)

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
                                    <td className={ticket.priority == 1 ? 'high-priority' : (ticket.priority == 2 ? 'mid-priority' : 'low-priority')} >{index + 1}</td>
                                    <td>{ticket.priority == 1 ? 'بالا' : (ticket.priority == 2 ? 'متوسط' : 'پایین')}</td>
                                    <td>{ticket.departmentSubID}</td>
                                    <td>{ticket.title}</td>
                                    <td>{ticket.user}</td>
                                    <td>
                                        <button className="btn btn-primary delete-btn" onClick={()=>ShowTicket(ticket.body)}>مشاهده</button>
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
