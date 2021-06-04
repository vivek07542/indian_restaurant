import React from 'react';
import "./Footer.css";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className = "foot">
            <footer >
                <nav className="navbar navbar-expand-lg  navbar-dark" style = {{backgroundColor : "rgba(0,0,0,0.4)",fontSize : "12px"}}>
                    <div className="container navbar-nav align-items-center">
                        <div className="row w-100 mx-auto">
                            <div className="col-3 col-md-2 nav-item ">
                                <a className="nav-link" href="/">About us</a>
                            </div>
                            <div className="col-3 col-md-2 nav-item">
                                <a className="nav-link" href="/">Privacy</a>
                            </div>
                            <div className="col-3  col-md-2 nav-item">
                            <Link  to = "/direction" className="nav-link">Direction</Link>
                                {/* <a className="nav-link" href="/">Direction</a> */}
                            </div>
                            <div className="col-3 col-md-2 nav-item">
                                <a className="nav-link" href="/">Connect Us</a>
                            </div>
                            <div className="col-6 col-md-4 mx-auto d-md-flex d-none justify-content-around ">
                                <a href="https://www.facebook.com/" className="nav-link d-flex justify-content-center align-self-center"><FacebookIcon/></a>
                                <a href="https://twitter.com/" className="nav-link d-flex justify-content-center align-self-center"><TwitterIcon/></a>
                                <a href="https://www.instagram.com/" className="nav-link d-flex justify-content-center align-self-center"><InstagramIcon/></a>
                                <a href="https://in.linkedin.com/" className="nav-link d-flex justify-content-center align-self-center"><LinkedInIcon/></a>
                            </div>
                        </div>
                    </div>
                </nav>
            </footer>
        </div>
    )
}

export default Footer

