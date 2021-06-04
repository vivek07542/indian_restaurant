import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  const { className, ...allProps } = { ...props };
  
  let classNameProp = ["btn btn-outline-danger"];
  if (className) {
    classNameProp.push(className);
  }
  let assignedClass = classNameProp.join(" ");
  return (  
      <button className={assignedClass} {...allProps}>
        {props.children}
      </button>   
  );
};
Button.propTypes = {
  className : PropTypes.string,
  onClick : PropTypes.func  
}
export default Button;