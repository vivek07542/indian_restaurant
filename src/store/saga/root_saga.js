import { takeLatest } from "@redux-saga/core/effects";

// Food Item
import * as foodItemAction from "../reducer/FoodItem/FoodItemReducer";
import {initHandlerSaga,submitHandlerSaga,editHandlerSaga,deleteHandlerSaga} from "./FootItemSsaga/FoodItemSaga";

// Qunatity 
import * as QuantityAction from "../reducer/Quantity/QuantityReducer";
import {initQtyHandlerSaga,submitQtyHandlerSaga,deleteQtyHandlerSaga,editQtyHandlerSaga} from "./Quantity/QuantitySaga"

// Unit 
import * as UnitAction from "../reducer/Unit/UnitReducer";
import {initUnitHandlerSaga,submitUnitHandlerSaga,deleteUnitHandlerSaga,editUnitHandlerSaga} from "./Unit/UnitSaga"

// Vendor Master
import * as vendorAction from "../reducer/VendorMaster/VendorMasterReducer";
import {initilizeVendorSaga,submitVendorHandlerSaga,deleteVendorHandlerSaga,editVendorHandlerSaga} from "./VendorMaster/VendorMasterSaga";

// ingredientMaster
import * as ingredientAction from "../reducer/IngredientMaster/IngredientMasterReducer";
import {initlizeIngredientSaga,submitIngredientHandlerSaga,deleteIngredientHandlerSaga,editIngredientHandlerSaga} from "./IngredientMaster/IngredientMasterSaga";

// Item Recipe
import * as itemRecipeAction from "../reducer/ItemRecipe/ItemRecipeReducer";
import {initlizeItemRecipeSaga,submitItemRecipeHandlerSaga,deleteItemRecipeHandlerSaga,editItemRecipeHandlerSaga} from "./ItemRecipe/ItemRecipeSaga";

// Recipe Generator
import * as recipeGeneratorAction from "../reducer/RecipeGeneratorReducer/RecipeGeneratorReducer";
import {submitRecipeGeneratorHandlerSaga} from "./RecipeGenerator/RecipeGeneratorSaga";
// Vendor Mapping
import * as vendorMappingAction from "../reducer/VendorIngredientMappingReducer/VendorIngredientMappingReducer";
import {initializeVendorMappingSaga,submitVendorMappingtHandlerSaga,editVendorMappingHandlerSaga,deleteVendorMappingHandlerSaga} from "./VendorIngredientMapping/VendorIngredientMappingSaga";
// Inventory
import * as inventoryAction from "../reducer/Inventory/InventoryReducer";
import {initalizeInventoryHandlerSaga,submitInventoryHandlerSaga,editInventoryHandlerSaga,deleteInventoryHandlerSaga} from "./Inventory/InventorySaga";
// Customer Order
import * as customerOrderAction from "../reducer/CustomerOrder/CustomerOrderReducer";
import {initlizeOrderSaga,submitOrderHandlerSaga,deleteOrderHandlerSaga,editOrderHandlerSaga} from "./CustomerOrder/CustomerOrderSaga";
// Monthly Expense
import * as monthlyExpenseAction from "../reducer/MonthlyExpense/MonthlyExpenseReducer";
import {initlizeExpenseSaga,submitExpenseHandlerSaga,deleteExpenseHandlerSaga,editExpenseHandlerSaga} from "./MonthlyExpense/MonthlyExpenseSaga";
// Investment Budget
import * as investmentBudgetAction from "../reducer/InvestmentBudget/InvestmentBudgetReducer";
import {initlizeBudgetSaga,submitBudgetHandlerSaga,deleteBudgetHandlerSaga,editBudgetHandlerSaga} from "./InvestmentBudget/InvestmentBudgetSaga";
// Order Report
import * as orderReportAction from "../reducer/OrderReport/OrderReportReducer";
import {submitOrderReportHandlerSaga} from "./OrderReport/OrderReportSaga";
// Top Sell 
import * as topSellAction from "../reducer/TopSellDish/TopSellDishReducer";
import {submitTopSellDishHandlerSaga,submitTopSellIngredientHandlerSaga} from "./TopSellDish/TopSellDishSaga";
// Profit Loss
import * as profitLossAction from "../reducer/ProfitLoss/ProfitLossReducer";
import {submitProfitLossHandlerSaga} from "./ProfitLoss/ProfitLossSaga";
// Table Reservation
import * as reservationAction from "../reducer/TableReservation/TableReservationReducer";
import {initlizeReservationSaga,submitTableHandlerSaga,editTableReservationHandlerSaga,deleteTableReservationHandlerSaga} from "./TableReservation/TableReservationSaga";

export function* watch(){
// Food Item
yield takeLatest(foodItemAction.INIT,initHandlerSaga);
yield takeLatest(foodItemAction.SUBMIT_HANDLER_INIT,submitHandlerSaga);
yield takeLatest(foodItemAction.DELETE_HANDLER_INIT,deleteHandlerSaga);
yield takeLatest(foodItemAction.EDIT_HANDLER_INIT,editHandlerSaga);
// Quantity 
yield takeLatest(QuantityAction.QUANTITY_INIT,initQtyHandlerSaga);
yield takeLatest(QuantityAction.SUBMIT_QUANTITY_HANDLER_INIT,submitQtyHandlerSaga);
yield takeLatest(QuantityAction.DELETE_QUANTITY_HANDLER_INIT,deleteQtyHandlerSaga);
yield takeLatest(QuantityAction.EDIT_QUANTITY_HANDLER_INIT,editQtyHandlerSaga);
//Unit
yield takeLatest(UnitAction.UNIT_INIT,initUnitHandlerSaga);
yield takeLatest(UnitAction.SUBMIT_UNIT_HANDLER_INIT,submitUnitHandlerSaga);
yield takeLatest(UnitAction.DELETE_UNIT_HANDLER_INIT,deleteUnitHandlerSaga);
yield takeLatest(UnitAction.EDIT_UNIT_HANDLER_INIT,editUnitHandlerSaga);
// Vendor Master
yield takeLatest(vendorAction.VENDOR_INIT,initilizeVendorSaga);
yield takeLatest(vendorAction.SUBMIT_VENDOR_HANDLER_INIT,submitVendorHandlerSaga);
yield takeLatest(vendorAction.DELETE_VENDOR_HANDLER_INIT,deleteVendorHandlerSaga);
yield takeLatest(vendorAction.EDIT_VENDOR_HANDLER_INIT,editVendorHandlerSaga);
// ingredientMaster
yield takeLatest(ingredientAction.INGREDIENT_INIT,initlizeIngredientSaga);
yield takeLatest(ingredientAction.SUBMIT_INGREDIENT_HANDLER_INIT,submitIngredientHandlerSaga);
yield takeLatest(ingredientAction.DELETE_INGREDIENT_HANDLER_INIT,deleteIngredientHandlerSaga);
yield takeLatest(ingredientAction.EDIT_INGREDIENT_HANDLER_INIT,editIngredientHandlerSaga);
// Item Recipe
yield takeLatest(itemRecipeAction.ITEMRECIPE_INIT,initlizeItemRecipeSaga);
yield takeLatest(itemRecipeAction.SUBMIT_ITEMRECIPE_HANDLER_INIT,submitItemRecipeHandlerSaga);
yield takeLatest(itemRecipeAction.DELETE_ITEMRECIPE_HANDLER_INIT,deleteItemRecipeHandlerSaga);
yield takeLatest(itemRecipeAction.EDIT_ITEMRECIPE_HANDLER_INIT,editItemRecipeHandlerSaga);
// Recipe Generator
yield takeLatest(recipeGeneratorAction.RECIPE_GENERATOR_SUBMIT_INIT,submitRecipeGeneratorHandlerSaga);
// Vendor Mapping
yield takeLatest(vendorMappingAction.VENDOR_MAPPING_INIT,initializeVendorMappingSaga);
yield takeLatest(vendorMappingAction.VENDOR_MAPPING_SUBMIT_INIT,submitVendorMappingtHandlerSaga);
yield takeLatest(vendorMappingAction.VENDOR_MAPPING_DELETE_INIT,deleteVendorMappingHandlerSaga);
yield takeLatest(vendorMappingAction.VENDOR_MAPPING_EDIT_INIT,editVendorMappingHandlerSaga);
// Inventory
yield takeLatest(inventoryAction.INVENTORY_INIT,initalizeInventoryHandlerSaga);
yield takeLatest(inventoryAction.SUBMIT_INVENTORY_INIT,submitInventoryHandlerSaga);
yield takeLatest(inventoryAction.EDIT_INVENTORY_INIT,editInventoryHandlerSaga);
yield takeLatest(inventoryAction.DELETE_INVENTORY_INIT,deleteInventoryHandlerSaga);
// Customer Order
yield takeLatest(customerOrderAction.ORDER_INIT,initlizeOrderSaga);
yield takeLatest(customerOrderAction.SUBMIT_ORDER_HANDLER_INIT,submitOrderHandlerSaga);
yield takeLatest(customerOrderAction.DELETE_ORDER_HANDLER_INIT,deleteOrderHandlerSaga);
yield takeLatest(customerOrderAction.EDIT_ORDER_HANDLER_INIT,editOrderHandlerSaga);
// MonthlyExpense
yield takeLatest(monthlyExpenseAction.MONTHLY_EXPENSE_INIT ,initlizeExpenseSaga);
yield takeLatest(monthlyExpenseAction.SUBMIT_MONTHLY_EXPENSE_HANDLER_INIT,submitExpenseHandlerSaga);
yield takeLatest(monthlyExpenseAction.DELETE_MONTHLY_EXPENSE_HANDLER_INIT,deleteExpenseHandlerSaga);
yield takeLatest(monthlyExpenseAction.EDIT_MONTHLY_EXPENSE_HANDLER_INIT,editExpenseHandlerSaga);
// Investment Budget
yield takeLatest(investmentBudgetAction.INVESTMENT_BUDGET_INIT,initlizeBudgetSaga);
yield takeLatest(investmentBudgetAction.SUBMIT_INVESTMENT_BUDGET_HANDLER_INIT,submitBudgetHandlerSaga);
yield takeLatest(investmentBudgetAction.DELETE_INVESTMENT_BUDGET_HANDLER_INIT,deleteBudgetHandlerSaga);
yield takeLatest(investmentBudgetAction.EDIT_INVESTMENT_BUDGET_HANDLER_INIT,editBudgetHandlerSaga);
// Order Report
yield takeLatest(orderReportAction.SUBMIT_ORDER_REPORT_INIT,submitOrderReportHandlerSaga);
// Top Sell
yield takeLatest(topSellAction.SUBMIT_TOP_SELL_DISH_INIT,submitTopSellDishHandlerSaga);
yield takeLatest(topSellAction.SUBMIT_TOP_SELL_INGREDIENT_INIT,submitTopSellIngredientHandlerSaga);
// Profit Loss
yield takeLatest(profitLossAction.SUBMIT_PROFIT_LOSS_INIT,submitProfitLossHandlerSaga);
// Table Reservation
yield takeLatest(reservationAction.RESERVATION_TABLE_INIT,initlizeReservationSaga);
yield takeLatest(reservationAction.RESERVATION_TABLE_SUBMIT_INIT,submitTableHandlerSaga)
yield takeLatest(reservationAction.EDIT_TABLE_RESERVATION_INIT,editTableReservationHandlerSaga);
yield takeLatest(reservationAction.DELETE_TABLE_RESERVATION_INIT,deleteTableReservationHandlerSaga);

}