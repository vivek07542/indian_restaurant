import React from 'react'
import {Link} from "react-router-dom";
import "./ErrorPage.css";
const ErrorPage = () => {
    return (
        <div className = "row text-center py-5">
            <h1 className = "display-4">404 Error Page</h1>
            <p className="lead">Sorry page Not Found..!!</p>
            <Link className ="ErrorLink" to = "/"> Go Back </Link>
        </div>
    )
}

export default ErrorPage
