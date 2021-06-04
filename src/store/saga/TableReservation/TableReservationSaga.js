import {put} from "redux-saga/effects";
import * as reservationAction from "../../reducer/TableReservation/TableReservationReducer";

export function* initlizeReservationSaga(action){
   
    let localValue = JSON.parse(localStorage.getItem("tableReservationArray"));
    if(localValue === null){
        localValue = [];
    }    
    const updateValue = [...localValue];
    yield localStorage.setItem("tableReservationArray", JSON.stringify(updateValue));
    yield put(reservationAction.initilizerReservationSuccess(updateValue));
}

export function* submitTableHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("tableReservationArray"));
    let updateValue = [...localValue]
    let tableReservationObject = {};
        if (action.tableReservationObject.id !== null && action.editMode === true){
        const editObjIndex = updateValue.findIndex(item => item.id === action.tableReservationObject.id)
        updateValue[editObjIndex] = action.tableReservationObject;
        updateValue[editObjIndex].tableReserved = Math.ceil(+action.tableReservationObject.person/4);
    }
    else {
        let tableLast = null;
        if (updateValue.length !== 0) {
            const tableLastItem = updateValue[updateValue.length - 1];
            tableLast = +tableLastItem.id;
        }
        else {
            tableLast = 0;
        }
        tableReservationObject = action.tableReservationObject;
        tableReservationObject.id = tableLast + 1;
        tableReservationObject.tableReserved = Math.ceil(+action.tableReservationObject.person/4);
        updateValue.push(tableReservationObject);
        tableReservationObject = {};
    }
    let editMode = false;  
    yield localStorage.setItem("tableReservationArray", JSON.stringify(updateValue));
    yield put(reservationAction.submitHandlerSuccess(updateValue,editMode,tableReservationObject));
}

export function* editTableReservationHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("tableReservationArray"));
    yield put(reservationAction.editHandlerSuccess(localValue,action.tableReservationObject,action.editMode));
 }  
export function* deleteTableReservationHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("tableReservationArray"));
    let updateValue = [...localValue];
    const deleteObjIndex = updateValue.findIndex(item => item.id === action.tableReservationObject.id)
    updateValue.splice(deleteObjIndex, 1);
    yield localStorage.setItem("tableReservationArray", JSON.stringify(updateValue));
    yield put(reservationAction.deleteHandlerSuccess(updateValue));
}