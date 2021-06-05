import React from 'react';
import BreadCrumbs from "../../component/BreadCrumbs/BreadCrumbs";
import {  Route, Switch } from "react-router-dom";
import Main from "../../component/Main/Main";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import FoodItem from "../FoodItem/FoodItem";
import CustomerOrder from "../CustomerOrder/CustomerOrder";
import IngredientMaster from "../AdminBackendTabs/IngredientMaster";
import Inventory from "../AdminBackendTabs/Inventory";
import InvestmentBudget from "../AdminBackendTabs/InvestmentBudget";
import ItemRecipe from "../AdminBackendTabs/ItemRecipe";
import MonthlyExpense from "../AdminBackendTabs/MonthlyExpense";
import Quantity from "../AdminBackendTabs/Quantity";
import Unit from "../AdminBackendTabs/Unit";
import RecipeGenerator from "../AdminBackendTabs/RecipeGenerator";
import VendorIngredientMapping from "../AdminBackendTabs/VendorIngredientMapping";
import VendorMaster from "../AdminBackendTabs/VendorMaster";
import TableReservation from "../AdminBackendTabs/TableReservation";

import OrderDetail from "../Reports/OrderDetail";
import ProfitLossMaster from "../Reports/ProfitLossMaster";
import TopSellingDishes from "../Reports/TopSellingDishes";

import Direction from "../Direction/Direction";

import ErrorPage from "../ErrorPage/ErrorPage";

const ResturantPage = () => {
    let routes = (
        <>
            <BreadCrumbs/>
            <Switch>
                <Route path = "/topsellingdishes" component = {TopSellingDishes}/>
                <Route path = "/profitlossmaster" component = {ProfitLossMaster}/>
                <Route path = "/orderdetail" component = {OrderDetail}/>
                <Route path = "/tablereservation" component = {TableReservation}/>
                <Route path = "/vendormaster" component = {VendorMaster}/>
                <Route path = "/vendoringredientmapping" component = {VendorIngredientMapping}/>
                <Route path = "/recipegenerator" component = {RecipeGenerator}/>
                <Route path = "/quantity" component = {Quantity}/>
                <Route path = "/unit" component = {Unit}/>
                <Route path = "/monthlyexpense" component = {MonthlyExpense}/>
                <Route path = "/itemrecipe" component = {ItemRecipe}/>
                <Route path = "/investmentbudget" component = {InvestmentBudget}/>
                <Route path = "/inventory" component = {Inventory}/>
                <Route path = "/ingredientmaster" component = {IngredientMaster}/>
                <Route path = "/customerorder" component = {CustomerOrder}/>
                <Route path = "/direction" component = {Direction}/>
                <Route exact path = "/" component = {FoodItem}/>
                <Route component = {ErrorPage}/>
            </Switch>
        </>

    )
    return (
        <div className = "text-light">
            <Header/>
            <Main>
                {routes}
            </Main>
            <Footer/>
        </div>
    )
}

export default ResturantPage
