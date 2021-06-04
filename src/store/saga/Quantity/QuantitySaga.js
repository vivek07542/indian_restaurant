import {put} from "redux-saga/effects";
import * as actionQuantity from "../../reducer/Quantity/QuantityReducer";

export function* initQtyHandlerSaga(){
    let qtyLocalValue = JSON.parse(localStorage.getItem("quantityArray"));
    if(qtyLocalValue === null){
        qtyLocalValue = [];
    } 
    yield localStorage.setItem("quantityArray", JSON.stringify(qtyLocalValue));
    yield put(actionQuantity.initilizerHandlerSuccess(qtyLocalValue));
}

export function* submitQtyHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("quantityArray"));
    let updateValue = [...localValue]
    let quantityObject = {};
    if (action.quantityObject.id !== null && action.editMode === true){
        const editObjIndex = updateValue.findIndex(item => item.id === action.quantityObject.id)
        updateValue[editObjIndex] = action.quantityObject;
    }
    else {
        let quantityLast = null;
        if (updateValue.length !== 0) {
            const quantityLastItem = updateValue[updateValue.length - 1];
            quantityLast = +quantityLastItem.id;
        }
        else {
            quantityLast = 0;
        }
        quantityObject = action.quantityObject;
        quantityObject.id = quantityLast + 1;
        updateValue.push(quantityObject);
        quantityObject = {};
    }
    let editMode = false;
  
    yield localStorage.setItem("quantityArray", JSON.stringify(updateValue));
    yield put(actionQuantity.submitHandlerSuccess(updateValue,editMode,quantityObject));
}
 export function* editQtyHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("quantityArray"));
    yield put(actionQuantity.editHandlerSuccess(localValue,action.quantityObject,action.editMode));
 }  
export function* deleteQtyHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("quantityArray"));
    let updateValue = [...localValue];
    const deleteObjIndex = updateValue.findIndex(item => item.id === action.quantityObject.id)
    updateValue.splice(deleteObjIndex, 1);
    yield localStorage.setItem("quantityArray", JSON.stringify(updateValue));
    yield put(actionQuantity.deleteHandlerSuccess(updateValue));
}