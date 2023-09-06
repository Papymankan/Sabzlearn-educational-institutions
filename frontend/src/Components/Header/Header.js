import React from 'react'
import TopBar from './TopBar/TopBar'
import './Header.css'
import NavBar from './NavBar/NavBar'
import Landing from './Landing/Landing'

export default function Header() {
    return (
        <header class="header">
            <TopBar/>
            <NavBar/>
            <Landing/>
        </header>
    )
}