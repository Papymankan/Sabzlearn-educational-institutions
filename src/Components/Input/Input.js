import React from 'react'

export default function Input(props) {

    const InputOnChange = ()=>{

    }

    const element = props.element == 'input' ? (
        <input placeholder={props.placeholder} type={props.type} className={props.classname} onChange={InputOnChange} />
    ) : (
        <textarea placeholder={props.placeholder} className={props.classname} onChange={InputOnChange}/>
    )

  return (
    <div>
        {element}
    </div>
  )
}
