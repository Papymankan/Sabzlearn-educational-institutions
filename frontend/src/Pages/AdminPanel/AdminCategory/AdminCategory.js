import React from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

export default function AdminCategory() {
    return (
        <>
            <DataTable title={'دسته بندی ها'}>
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>مبلغ</th>
                            <th>وضعیت</th>
                            <th>مدرس</th>
                            <th>دسته بندی</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </DataTable>
        </>
    )
}
