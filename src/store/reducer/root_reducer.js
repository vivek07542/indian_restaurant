import {combineReducers} from "redux";
import FoodItem from "../reducer/FoodItem/FoodItemReducer";
import Quantity from "../reducer/Quantity/QuantityReducer";
import Unit from "../reducer/Unit/UnitReducer";
import VendorMaster from "../reducer/VendorMaster/VendorMasterReducer";
import IngredientMaster from "./IngredientMaster/IngredientMasterReducer";
import ItemRecipe from "./ItemRecipe/ItemRecipeReducer";
import RecipeGenerator from "./RecipeGeneratorReducer/RecipeGeneratorReducer";
import VendorMapping from "./VendorIngredientMappingReducer/VendorIngredientMappingReducer";
import Inventory from "./Inventory/InventoryReducer";
import CustomerOrder from "./CustomerOrder/CustomerOrderReducer";
import InvestmentBudget from "./InvestmentBudget/InvestmentBudgetReducer";
import MonthlyExpense from "./MonthlyExpense/MonthlyExpenseReducer";
import OrderReport from "./OrderReport/OrderReportReducer";
import TopSell from "./TopSellDish/TopSellDishReducer";
import ProfitLoss from "./ProfitLoss/ProfitLossReducer";
import TableReservation from "./TableReservation/TableReservationReducer";

export default combineReducers({
FoodItem,Quantity,Unit,VendorMaster,IngredientMaster,
ItemRecipe,RecipeGenerator,VendorMapping,Inventory,CustomerOrder,
InvestmentBudget,MonthlyExpense,OrderReport,TopSell,ProfitLoss,TableReservation
})