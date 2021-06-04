import {put} from "redux-saga/effects";
import * as actionUnit from "../../reducer/Unit/UnitReducer";

export function* initUnitHandlerSaga(){
    let unitLocalValue = JSON.parse(localStorage.getItem("unitArray"));
    if(unitLocalValue === null){
        unitLocalValue = [];
    }    
    yield localStorage.setItem("unitArray", JSON.stringify(unitLocalValue));
    yield put(actionUnit.initilizerHandlerSuccess(unitLocalValue));
}
export function* submitUnitHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("unitArray"));
    let updateValue = [...localValue]
    let unitObject = {};
    if (action.unitObject.id !== null && action.editMode === true){
        const editObjIndex = updateValue.findIndex(item => item.id === action.unitObject.id)
        updateValue[editObjIndex] = action.unitObject;
    }
    else {
        let unitLast = null;
        if (updateValue.length !== 0) {
            const unitLastItem = updateValue[updateValue.length - 1];
            unitLast = +unitLastItem.id;
        }
        else {
            unitLast = 0;
        }
        unitObject = action.unitObject;
        unitObject.id = unitLast + 1;
        updateValue.push(unitObject);
        unitObject = {};
    }
    let editMode = false;
  
    yield localStorage.setItem("unitArray", JSON.stringify(updateValue));
    yield put(actionUnit.submitHandlerSuccess(updateValue,editMode,unitObject));
}
 export function* editUnitHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("unitArray"));
    yield put(actionUnit.editHandlerSuccess(localValue,action.unitObject,action.editMode));
 }  
export function* deleteUnitHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("unitArray"));
    let updateValue = [...localValue];
    const deleteObjIndex = updateValue.findIndex(item => item.id === action.unitObject.id)
    updateValue.splice(deleteObjIndex, 1);
    yield localStorage.setItem("unitArray", JSON.stringify(updateValue));
    yield put(actionUnit.deleteHandlerSuccess(updateValue));
}