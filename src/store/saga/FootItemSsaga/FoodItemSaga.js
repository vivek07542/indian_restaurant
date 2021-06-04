import { put } from "redux-saga/effects";
import * as actionFood from "../../reducer/FoodItem/FoodItemReducer";

export function* initHandlerSaga(){
    let localValue = JSON.parse(localStorage.getItem("foodItemArray"));
    if(localValue === null){
        localValue = [];
    }    
    const updateValue = [...localValue];
    yield localStorage.setItem("foodItemArray", JSON.stringify(updateValue));
    yield put(actionFood.initilizerHandlerSuccess(updateValue));
}
export function* submitHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("foodItemArray"));
    let updateValue = [...localValue]
    let foodItemObject = {};
    if (action.foodItemObject.id !== null && action.editMode === true){
        const editObjIndex = updateValue.findIndex(item => item.id === action.foodItemObject.id)
        updateValue[editObjIndex] = action.foodItemObject;
    }
    else {
        let studentLast = null;
        if (updateValue.length !== 0) {
            const foodLastItem = updateValue[updateValue.length - 1];
            studentLast = +foodLastItem.id;
        }
        else {
            studentLast = 0;
        }
        foodItemObject = action.foodItemObject;
        foodItemObject.id = studentLast + 1;
        updateValue.push(foodItemObject);
        foodItemObject = {};
    }
    let editMode = false;
  
    yield localStorage.setItem("foodItemArray", JSON.stringify(updateValue));
    yield put(actionFood.submitHandlerSuccess(updateValue,editMode,foodItemObject));
}
 export function* editHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("foodItemArray"));
    yield put(actionFood.editHandlerSuccess(localValue,action.foodItemObject,action.editMode));
 }  
export function* deleteHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("foodItemArray"));
    let updateValue = [...localValue];
    const deleteObjIndex = updateValue.findIndex(item => item.id === action.foodItemObject.id)
    updateValue.splice(deleteObjIndex, 1);
    yield localStorage.setItem("foodItemArray", JSON.stringify(updateValue));
    yield put(actionFood.deleteHandlerSuccess(updateValue));
}