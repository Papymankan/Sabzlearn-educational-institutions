import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function TextEditor({setBody , data}) {
    const [articleData , setArticleData] = useState('')

    useEffect(()=>{
        setArticleData(data)
    } , [data])

    return (
        <CKEditor
            editor={ClassicEditor}
            data={articleData}
            onChange={(event, editor) => {
                const data = editor.getData();
                console.log(data);
                setBody(data)
            }}
        />
    )
}
