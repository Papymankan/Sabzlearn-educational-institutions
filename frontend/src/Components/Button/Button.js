import React from 'react'
import { Link } from 'react-router-dom'

export default function Button(props) {

    if (props.to) {
        return (
            <Link to={props.to} className={props.classname}>
                {props.children}
            </Link>
        )
    } else if (props.href) {
        return (
            <a href={props.href} className={props.classname}>
                [props.children]
            </a>
        )
    } else {
        return (
            <button className={props.classname} type={props.type} disabled={props.disabled} onClick={props.onclick}>
                {props.children}
            </button>
        )
    }
}
