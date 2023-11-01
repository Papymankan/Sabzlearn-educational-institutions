import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function TextEditor({setBody}) {
    return (
        <CKEditor
            editor={ClassicEditor}
            data=""
            onChange={(event, editor) => {
                const data = editor.getData();
                console.log(data);
                setBody(data)
            }}
        />
    )
}
