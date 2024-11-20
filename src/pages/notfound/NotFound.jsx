import React from 'react'
import TopBar from '../../components/topbar/TopBar'
import Navbar from '../../components/navbar/Navbar'
import "./NotFound.css"
import { Link } from 'react-router-dom'
import Footer from '../../components/footer/Footer'

function NotFound() {
    return (
        <div>
            <TopBar />
            <Navbar />

            <div className='notFoundContainer'>
                <h1>404 Not Found</h1>
                <p>Your visited page not found. You may go home page.</p>
                <Link to="/"><button className='btn btn-danger btn-lg'>Back to home page</button></Link>
            </div>

            <Footer />
        </div>
    )
}

export default NotFound