import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='Home'>
        <div className='title'>
        <h1>PROJECT MANAGEMENT</h1>
        </div>
        <section className='links'>
            <Link to="/login">Login</Link>
            <Link to="/singin">Register</Link>
        </section>
    </div>
  )
}
