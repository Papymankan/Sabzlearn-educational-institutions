import React, { useEffect, useReducer } from 'react'
import Validator from '../../Validators/Validator'
import './Input.css'

const inputReducer = (state, action) => {
  switch (action.type) {
    case ('CHANGE'): {
      console.log(state, action);
      return { ...state, value: action.value, isValid: Validator(action.value, action.validation) }
    }
    case ('CLEAR'): {
      console.log(state, action);
      return { ...state, value: '', isValid: false }
    }
    default: {
      return state
    }
  }
}

export default function Input(props) {

  const [mainInput, dispatch] = useReducer(inputReducer, { value: '', isValid: false })

  const InputOnChange = (e) => {
    dispatch({ type: 'CHANGE', value: e.target.value, validation: props.validation })
  }

  useEffect(() => {
    props.onInputHandler(props.id, mainInput.value, mainInput.isValid)
  }, [mainInput.value])

  useEffect(() => {
    if (props.state) {
      let stateStatus = Object.keys(props.state).every(key => props.state[key].value == '')
      if (stateStatus) {
        dispatch({ type: 'CLEAR' })
      }
    }
  }, [props.state])

  useEffect(() => {
    if(props.Value){
      dispatch({ type: 'CHANGE', value: props.Value, validation: props.validation })
    }
  }, [props.Value])

  const element = props.element == 'input' ? (
    <input placeholder={props.placeholder} type={props.type} className={`${props.classname} ${mainInput.isValid ? 'success' : 'error'}`} onChange={InputOnChange} value={mainInput.value} />
  ) : (
    <textarea placeholder={props.placeholder} className={`${props.classname} ${mainInput.isValid ? 'success' : 'error'}`} onChange={InputOnChange} value={mainInput.value} />
  )

  return (
    <>
      {element}
    </>
  )
}
