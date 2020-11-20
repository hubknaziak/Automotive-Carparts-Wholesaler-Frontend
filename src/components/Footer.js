import React from 'react'
import '../styles/App.css'
import {Link} from 'react-router-dom';

const navStyle = {
    color: 'black',
    textDecoration: 'none'
};

function Footer() {
    return (
        <footer className="Footer">
            &copy; Copyright 2020
            <Link style={navStyle} to="/About">
                <h5 to="/About">About</h5>
            </Link>
            <Link style={navStyle} to="/Contact">
                <h5 to="/Contact">Contact</h5>
            </Link>
            <Link style={navStyle} to="/WhyUs">
                <h5 to="/WhyUs">Why us?</h5>
            </Link>
            <Link style={navStyle} to="/WorkWithUs">
                <h5 to="/WorkWithUs">Work with us!</h5>
            </Link>
        </footer>
    )
}

export default Footer