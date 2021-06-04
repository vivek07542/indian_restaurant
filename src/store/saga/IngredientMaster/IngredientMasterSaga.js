import {put} from "redux-saga/effects";
import * as ingredientAction from "../../reducer/IngredientMaster/IngredientMasterReducer";

export function* initlizeIngredientSaga(){
    let ingredientValue = JSON.parse(localStorage.getItem("ingredientArray"));
    let quantityValue = JSON.parse(localStorage.getItem("quantityArray"));
    let unitValue = JSON.parse(localStorage.getItem("unitArray"));
    let toDisplayIngredientValue ; 
    if(quantityValue === null){
        quantityValue = []
    }
    if(unitValue === null){
        unitValue = []
    }
    if(ingredientValue === null){
        ingredientValue = [];
        toDisplayIngredientValue = []
        yield localStorage.setItem("ingredientArray",JSON.stringify(ingredientValue));
    }
    else{
        let ingredientValue = JSON.parse(localStorage.getItem("ingredientArray"));
        let ingredientValueArray = [...ingredientValue]
        toDisplayIngredientValue = conversionForIngredientIdToValue(ingredientValueArray);
    }
    
    yield localStorage.setItem("quantityArray",JSON.stringify(quantityValue));
    yield localStorage.setItem("unitArray",JSON.stringify(unitValue));
    yield put(ingredientAction.initilizerHandlerSuccess(toDisplayIngredientValue,unitValue,quantityValue));
}

const conversionForIngredientIdToValue = (array) =>{
    let quantityValue = JSON.parse(localStorage.getItem("quantityArray"));
    let unitValue = JSON.parse(localStorage.getItem("unitArray"));
    let updatedArray = [...array]
    updatedArray.forEach(element => {
        const quantityObjIndex = quantityValue.findIndex(item => item.id === element.quantityId)
        const unitObjIndex = unitValue.findIndex(item => item.id === element.unitId)
        element.quantityId = quantityValue[quantityObjIndex].quantity;
        element.unitId = unitValue[unitObjIndex].unit;
    });
    return updatedArray
}

const conversionObjectForIngredientValueToId = (Object) =>{
    let quantityValue = JSON.parse(localStorage.getItem("quantityArray"));
    let unitValue = JSON.parse(localStorage.getItem("unitArray"));     
        const quantityObjIndex = quantityValue.findIndex(item => item.quantity === Object.quantityId)
        const unitObjIndex = unitValue.findIndex(item => item.unit === Object.unitId)
        Object.quantityId = quantityValue[quantityObjIndex].id;
        Object.unitId = unitValue[unitObjIndex].id;  
    return Object
}

export function* submitIngredientHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("ingredientArray"));
    let updateValue = [...localValue]
    let ingredientObject = {};
    if (action.ingredientObject.id !== null && action.editMode === true){
        const editObjIndex = updateValue.findIndex(item => item.id === action.ingredientObject.id)
        updateValue[editObjIndex] = action.ingredientObject;
    }
    else {
        let ingredientLast = null;
        if (updateValue.length !== 0) {
            const ingredientLastItem = updateValue[updateValue.length - 1];
            ingredientLast = +ingredientLastItem.id;
        }
        else {
            ingredientLast = 0;
        }
        ingredientObject = action.ingredientObject;
        ingredientObject.id = ingredientLast + 1;
        updateValue.push(ingredientObject);
        ingredientObject = {};
    }
    let editMode = false; 
    yield localStorage.setItem("ingredientArray", JSON.stringify(updateValue));
    const localValueIngredient = JSON.parse(localStorage.getItem("ingredientArray"));
    let convertArray = conversionForIngredientIdToValue(localValueIngredient);
    yield put(ingredientAction.submitHandlerSuccess(convertArray,editMode,ingredientObject));
}
 export function* editIngredientHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("ingredientArray"));
    let updateValue = [...localValue];
    let convertArray = conversionForIngredientIdToValue(updateValue)
    let editObject = conversionObjectForIngredientValueToId(action.ingredientObject);
    yield put(ingredientAction.editHandlerSuccess(convertArray,editObject,action.editMode));
 }  
export function* deleteIngredientHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("ingredientArray"));
    let updateValue = [...localValue];
    const deleteObjIndex = updateValue.findIndex(item => item.id === action.ingredientObject.id)
    updateValue.splice(deleteObjIndex, 1);
    yield localStorage.setItem("ingredientArray", JSON.stringify(updateValue));
    const localValueIngredient = JSON.parse(localStorage.getItem("ingredientArray"));
    let convertArray = conversionForIngredientIdToValue(localValueIngredient);
    yield put(ingredientAction.deleteHandlerSuccess(convertArray));
}