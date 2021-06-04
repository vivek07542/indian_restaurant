import React from 'react';
import {Typography ,Breadcrumbs,Link }  from '@material-ui/core';
import { withRouter } from "react-router-dom";

const BreadCrumbs = (prop)=>{
    console.log(prop);
    const {history,location : {pathname}} = prop;
    const pathnames = pathname.split("/").filter(x => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" className = "mx-1 mx-md-5">
    {pathnames.length > 0 ? (
        <Link onClick={() => history.push("/")} className = "text-light">Food Menu</Link>
      ) : (
        <Typography className = "text-danger"> Food Menu</Typography>
    )}
    {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={name} className = "text-danger">{name}</Typography>
        ) : (
          <Link key={name} className = "text-light" onClick={() => history.push(routeTo)}>
            {name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
export default withRouter(BreadCrumbs);