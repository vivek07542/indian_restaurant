import React from 'react'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import "./Spinner.css";
const Spinner = ({loading}) => {
    return (
        <div className = "Spinner">
             <ClimbingBoxLoader color={'#2caabe'} loading={loading} size={20} />
        </div>
    )
}
export default Spinner;