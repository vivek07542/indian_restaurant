import {put} from "redux-saga/effects";
import * as recipeGeneratorAction from "../../reducer/RecipeGeneratorReducer/RecipeGeneratorReducer";


const conversionObjectForIngredientValueToId = (object) =>{
    // let ingredientValue = JSON.parse(localStorage.getItem("ingredientArray"));
    let quantityValue = JSON.parse(localStorage.getItem("quantityArray"));
    let unitValue = JSON.parse(localStorage.getItem("unitArray"));
    let ingredientValue = JSON.parse(localStorage.getItem("ingredientArray"));
        let updatedArray = [...object]
        updatedArray.forEach(element => {
            const quantityObjIndex = quantityValue.findIndex(item => item.id === element.quantityId)
            const unitObjIndex = unitValue.findIndex(item => item.id === element.unitId)
            const ingredientObjIndex = ingredientValue.findIndex(item => item.id === element.ingredientId)
           
            element.ingredientId = ingredientValue[ingredientObjIndex].ingredientName;
            element.quantityId = quantityValue[quantityObjIndex].quantity;
            element.unitId = unitValue[unitObjIndex].unit;
        });    
    return object;
}

const qtyCalculation= (quantity, selectedServing, serving)=> {
 
    let newQuantity = (Number(quantity) / Number(serving)) * Number(selectedServing);
    return newQuantity;
}

const priceCalculation = (newQuantity, ingridientcost, quantity) => {

    let newPrice = Math.ceil((Number(ingridientcost) / Number(quantity)) * Number(newQuantity));
    return newPrice;
}

const totalRecipePrice = (array)=> {
    let priceValue = 0 ;
    for (let i = 0; i < array.length; i++) {
         priceValue += array[i].ingredientPrice;
    }
    return priceValue;
}

export function* submitRecipeGeneratorHandlerSaga(action){
const localValue = JSON.parse(localStorage.getItem("itemRecipeArray"));
let updateValue = [...localValue];
// Find Index
const objIndexRecipe = updateValue.findIndex(item => item.foodItem === action.recipeGeneratorObject.foodItem);
let recipeServed = updateValue[objIndexRecipe].serving;
let newRecipeIngredientObject = conversionObjectForIngredientValueToId(updateValue[objIndexRecipe].ingredientRecipeArray)
newRecipeIngredientObject.forEach(el =>{
    let newQuantity = qtyCalculation(el.quantityId,action.recipeGeneratorObject.serving,recipeServed);
    let newIngredientPrice = priceCalculation(newQuantity,el.ingredientPrice,el.quantityId)
    el.quantityId = newQuantity;
    el.ingredientPrice = newIngredientPrice;
}) 
let totalPrice = totalRecipePrice(newRecipeIngredientObject);
yield put(recipeGeneratorAction.submitHandlerSuccess(newRecipeIngredientObject,totalPrice))
}