import {put} from "redux-saga/effects";
import * as itemRecipeAction from "../../reducer/ItemRecipe/ItemRecipeReducer";
import {getIngredientValueToId } from "../../../Utility/stateConversion";


export function* initlizeItemRecipeSaga(){
    let localItemRecipe = JSON.parse(localStorage.getItem("itemRecipeArray"));
    let quantityValue = JSON.parse(localStorage.getItem("quantityArray"));
    let unitValue = JSON.parse(localStorage.getItem("unitArray"));
    let toDisplayIngredientValue ;
    if(quantityValue === null){
        quantityValue = []
    }
    if(unitValue === null){
        unitValue = []
    }
    if(localItemRecipe === null){
        localItemRecipe = [];
        toDisplayIngredientValue = []
        yield localStorage.setItem("itemRecipeArray",JSON.stringify(localItemRecipe));
    }
    else if(localItemRecipe !== null){
        let localItemRecipe = JSON.parse(localStorage.getItem("itemRecipeArray"));
        let localItemRecipeArray = [...localItemRecipe];
        toDisplayIngredientValue = conversionForitemRecipeIdToValue(localItemRecipeArray);
    }
    yield localStorage.setItem("quantityArray",JSON.stringify(quantityValue));
    yield localStorage.setItem("unitArray",JSON.stringify(unitValue));
    yield put(itemRecipeAction.initilizerHandlerSuccess(toDisplayIngredientValue,unitValue,quantityValue));
}

const conversionForitemRecipeIdToValue=(array)=>{
    let ingredientValue = JSON.parse(localStorage.getItem("ingredientArray"));
    let quantityValue = JSON.parse(localStorage.getItem("quantityArray"));
    let unitValue = JSON.parse(localStorage.getItem("unitArray"));
    for(let key in array){
        let updatedArray = [...array[key].ingredientRecipeArray]
        updatedArray.forEach(element => {
            const quantityObjIndex = quantityValue.findIndex(item => item.id === element.quantityId)
            const unitObjIndex = unitValue.findIndex(item => item.id === element.unitId)
            const ingredientObjIndex = ingredientValue.findIndex(item => item.id === element.ingredientId)
           
            element.ingredientId = ingredientValue[ingredientObjIndex].ingredientName;
            element.quantityId = quantityValue[quantityObjIndex].quantity;
            element.unitId = unitValue[unitObjIndex].unit;
        });    
    }
    
    return array;
}

export function* submitItemRecipeHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("itemRecipeArray"));
    let updateValue = [...localValue]
    let itemRecipeObject = {};
    if (action.itemRecipeObject.id !== null && action.editMode === true){
        const editObjIndex = updateValue.findIndex(item => item.id === action.itemRecipeObject.id)
        updateValue[editObjIndex].id = action.itemRecipeObject.id;
        updateValue[editObjIndex].foodItem = action.itemRecipeObject.foodItem;
        updateValue[editObjIndex].serving = action.itemRecipeObject.serving;
        updateValue[editObjIndex].recipeDescription = action.itemRecipeObject.recipeDescription;
        updateValue[editObjIndex].basePrice = action.itemRecipeObject.basePrice;
        updateValue[editObjIndex].ingredientRecipeArray = action.itemRecipeObject.ingredientRecipeArray;
        updateValue[editObjIndex].ingredientRecipeArray = [];
        action.itemRecipeObject.ingredientRecipeArray.map((item,index)=>{        
             let object = {}
             object.id = index + 1;
             object.ingredientId = +(getIngredientValueToId(item.ingredientId));
             object.quantityId = +item.quantityId;
             object.unitId = +item.unitId;
             object.ingredientPrice = item.ingredientPrice;
             object.menuId = action.itemRecipeObject.id;
             updateValue[editObjIndex].ingredientRecipeArray.push(object);
        });
    }
    else {
        let itemRecipeLast = null;
        if (updateValue.length !== 0) {
            const itemRecipeLastItem = updateValue[updateValue.length - 1];
            itemRecipeLast = +itemRecipeLastItem.id;
        }
        else {
            itemRecipeLast = 0;
        }
    itemRecipeObject.id = itemRecipeLast + 1;
    itemRecipeObject.foodItem = action.itemRecipeObject.foodItem;
    itemRecipeObject.serving = action.itemRecipeObject.serving;
    itemRecipeObject.recipeDescription = action.itemRecipeObject.recipeDescription;
    itemRecipeObject.basePrice = action.itemRecipeObject.basePrice;
    itemRecipeObject.ingredientRecipeArray = action.itemRecipeObject.ingredientRecipeArray;
    itemRecipeObject.ingredientRecipeArray = [];
    action.itemRecipeObject.ingredientRecipeArray.map((item,index)=>{        
         let object = {}
         object.id = index + 1;
         object.ingredientId = +(getIngredientValueToId(item.ingredientId));
         object.quantityId = +item.quantityId;
         object.unitId = +item.unitId;
         object.ingredientPrice = item.ingredientPrice;
         object.menuId = itemRecipeLast + 1;
         itemRecipeObject.ingredientRecipeArray.push(object);
        });
        updateValue.push(itemRecipeObject);
        itemRecipeObject = {};
    }
    let editMode = false; 
    yield localStorage.setItem("itemRecipeArray", JSON.stringify(updateValue));
    const localValueitemRecipe = JSON.parse(localStorage.getItem("itemRecipeArray"));
    let convertArray = conversionForitemRecipeIdToValue(localValueitemRecipe);
    yield put(itemRecipeAction.submitHandlerSuccess(convertArray,editMode,itemRecipeObject));

}

const conversionObjectForIngredientValueToId = (object) =>{
    // let ingredientValue = JSON.parse(localStorage.getItem("ingredientArray"));
    let quantityValue = JSON.parse(localStorage.getItem("quantityArray"));
    let unitValue = JSON.parse(localStorage.getItem("unitArray"));
    
        let updatedArray = [...object.ingredientRecipeArray]
        updatedArray.forEach(element => {
            const quantityObjIndex = quantityValue.findIndex(item => item.quantity === element.quantityId)
            const unitObjIndex = unitValue.findIndex(item => item.unit === element.unitId)
           
            element.quantityId = quantityValue[quantityObjIndex].id;
            element.unitId = unitValue[unitObjIndex].id;
        });    
    return object;
}

export function* editItemRecipeHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("itemRecipeArray"));
    let updateValue = [...localValue];
    let convertArray = conversionForitemRecipeIdToValue(updateValue)
    let editObject = conversionObjectForIngredientValueToId(action.itemRecipeObject);
    yield put(itemRecipeAction.editHandlerSuccess(convertArray,editObject,action.editMode));
}

export function* deleteItemRecipeHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("itemRecipeArray"));
    let updateValue = [...localValue];
    const deleteObjIndex = updateValue.findIndex(item => item.id === action.itemRecipeObject.id)
    updateValue.splice(deleteObjIndex, 1);
    yield localStorage.setItem("itemRecipeArray", JSON.stringify(updateValue));
    const localValueIngredient = JSON.parse(localStorage.getItem("itemRecipeArray"));
    let convertArray = conversionForitemRecipeIdToValue(localValueIngredient);
    yield put(itemRecipeAction.deleteHandlerSuccess(convertArray));
}