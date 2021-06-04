import React from 'react';
import "./FormWrapper.css";

const FormWrapper = (props) => {
    return (
        <div className="col-lg-5 col-sm-12">
            <div className="jumbotron formWrapper p-3">
                {props.children}
            </div>
        </div>
    )
}
export default FormWrapper;