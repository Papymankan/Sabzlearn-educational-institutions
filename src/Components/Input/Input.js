import React, { useReducer } from 'react'
import './Input.css'

const inputReducer = (state , action) => {
    switch (action.type){
      case ('CHANGE') : {
        return {...state , value:action.value , isValid:action.isValid}
      }
      default : {
        return state
      }
    }
}

export default function Input(props) {
  const [mainInput, dispatch] = useReducer(inputReducer, { value: '', isValid: false })

  const InputOnChange = (e) => {
    if(e.target.value){
      dispatch({type:'CHANGE' , value : e.target.value , isValid:true})
    }else{
      dispatch({type:'CHANGE' , value : e.target.value , isValid:false})
    }
  }

  const element = props.element == 'input' ? (
    <input placeholder={props.placeholder} type={props.type} className={`${props.classname} ${mainInput.isValid ? 'success' : 'error'}`} onChange={InputOnChange} value={mainInput.value}/>
  ) : (
    <textarea placeholder={props.placeholder} className={`${props.classname} ${mainInput.isValid ? 'success' : 'error'}`} onChange={InputOnChange} value={mainInput.value}/>
  )

  return (
    <div>
      {element}
    </div>
  )
}
