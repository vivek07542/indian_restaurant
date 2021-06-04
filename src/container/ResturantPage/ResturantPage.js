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
                <Route path = "/reports/topsellingdishes" component = {TopSellingDishes}/>
                <Route path = "/reports/profitlossmaster" component = {ProfitLossMaster}/>
                <Route path = "/reports/orderdetail" component = {OrderDetail}/>
                <Route path = "/admin/tablereservation" component = {TableReservation}/>
                <Route path = "/admin/vendormaster" component = {VendorMaster}/>
                <Route path = "/admin/vendoringredientmapping" component = {VendorIngredientMapping}/>
                <Route path = "/admin/recipegenerator" component = {RecipeGenerator}/>
                <Route path = "/admin/quantity" component = {Quantity}/>
                <Route path = "/admin/unit" component = {Unit}/>
                <Route path = "/admin/monthlyexpense" component = {MonthlyExpense}/>
                <Route path = "/admin/itemrecipe" component = {ItemRecipe}/>
                <Route path = "/admin/investmentbudget" component = {InvestmentBudget}/>
                <Route path = "/admin/inventory" component = {Inventory}/>
                <Route path = "/admin/ingredientmaster" component = {IngredientMaster}/>
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
