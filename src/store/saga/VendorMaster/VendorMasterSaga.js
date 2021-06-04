import {put} from "redux-saga/effects";
import * as vendorAction from "../../reducer/VendorMaster/VendorMasterReducer";

export function* initilizeVendorSaga(){
    let localValue = JSON.parse(localStorage.getItem("vendorArray"));
    if(localValue === null){
        localValue = []
    }
    yield localStorage.setItem("vendorArray",JSON.stringify(localValue));
    yield put(vendorAction.initilizerHandlerSuccess(localValue));
}

export function* submitVendorHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("vendorArray"));
    let updateValue = [...localValue]
    let vendorObject = {};
    if (action.vendorObject.id !== null && action.editMode === true){
        const editObjIndex = updateValue.findIndex(item => item.id === action.vendorObject.id)
        updateValue[editObjIndex] = action.vendorObject;
    }
    else {
        let vendorLast = null;
        if (updateValue.length !== 0) {
            const vendorLastItem = updateValue[updateValue.length - 1];
            vendorLast = +vendorLastItem.id;
        }
        else {
            vendorLast = 0;
        }
        vendorObject = action.vendorObject;
        vendorObject.id = vendorLast + 1;
        updateValue.push(vendorObject);
        vendorObject = {};
    }
    let editMode = false;
  
    yield localStorage.setItem("vendorArray", JSON.stringify(updateValue));
    yield put(vendorAction.submitHandlerSuccess(updateValue,editMode,vendorObject));
}
 export function* editVendorHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("vendorArray"));
    yield put(vendorAction.editHandlerSuccess(localValue,action.vendorObject,action.editMode));
 }  
export function* deleteVendorHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("vendorArray"));
    let updateValue = [...localValue];
    const deleteObjIndex = updateValue.findIndex(item => item.id === action.vendorObject.id)
    updateValue.splice(deleteObjIndex, 1);
    yield localStorage.setItem("vendorArray", JSON.stringify(updateValue));
    yield put(vendorAction.deleteHandlerSuccess(updateValue));
}

