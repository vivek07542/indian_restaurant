import React ,{useState} from 'react';
import ResturantLogo from "../../assets/images/resturantLogo1.png";
import {Link} from "react-router-dom";
import "./Header.css";

const Header =() => {

  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () =>{
     if(window.scrollY >= 80){
       setColorchange(true);
     }
     else{
       setColorchange(false);
     }

  };
  window.addEventListener('scroll', changeNavbarColor);
return (
<div className = "head">
<header>
    <nav className={colorChange ? "navbar navbar-expand-lg navbar-dark navbar-fixed-top scrollTrue" : "navbar navbar-expand-lg navbar-dark navbar-fixed-top scrollFalse"} >
     <div className = "container">
     <Link  to = "/" className="navbar-brand">
        <img className="navImage mx-sm-0" src={ResturantLogo} width="40" height="40" alt="Indian Resturant Logo"/>
      </Link>
      <Link className="navbar-brand m-0" to = "/">The Indian Resturant</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
              <Link  to = "/" className="nav-link">Food Menu</Link> 
              {/* <a className="nav-link" href="index.html">Food Menu<span className="sr-only">(current)</span></a> */}
          </li>
          <li className="nav-item">
          <Link  to = "/customerorder" className="nav-link">Order Food</Link>
              {/* <a className="nav-link" href="Pages/OrderFood.html">Order Food</a> */}
          </li>
          <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Admin Backend
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/admin/quantity">Quantity</Link>
                  <Link className="dropdown-item" to="/admin/unit">Unit</Link>
                  <Link className="dropdown-item" to="/admin/ingredientmaster">Ingridient Master</Link>
                  <Link className="dropdown-item" to="/admin/vendormaster">Vendor Master</Link>
                  <Link className="dropdown-item" to="/admin/vendoringredientmapping">Vendor Ingridient Mapping</Link>
                  <Link className="dropdown-item" to="/admin/itemrecipe">Item Reciepe</Link>
                  <Link className="dropdown-item" to="/admin/recipegenerator">Reciepe Generator</Link>
                  <Link className="dropdown-item" to="/admin/inventory">Inventory</Link>
                  <Link className="dropdown-item" to="/admin/monthlyexpense">Monthly Expense</Link>
                  <Link className="dropdown-item" to="/admin/investmentbudget">Investment Budget</Link>
                  <Link className="dropdown-item" to="/admin/tablereservation">Table Reservation</Link>
              </div>
          </li>
          <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Reports
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/reports/orderdetail">Order Detail</Link>
                  <Link className="dropdown-item" to="/reports/topsellingdishes">Top Selling Dishes</Link>
                  <Link className="dropdown-item" to="/reports/profitlossmaster">Profilt Loss Master</Link>
              </div>
          </li>
      </ul>
      </div>

     </div>
    </nav>
  </header>
</div>
    )
 }

export default Header
