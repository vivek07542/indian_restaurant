import {put} from "redux-saga/effects";
import * as monthlyExpenseAction from "../../reducer/MonthlyExpense/MonthlyExpenseReducer";

export function* initlizeExpenseSaga(){
    let localValue = JSON.parse(localStorage.getItem("monthlyExpenseArray"));
    let totalAmount ;
    if(localValue === null){
        localValue = [];
        totalAmount = 0;
    }    
    else{
        totalAmount = sumUpMonthlyExpense(localValue);
    }
    const updateValue = [...localValue];
    yield localStorage.setItem("monthlyExpenseArray", JSON.stringify(updateValue));
    yield put(monthlyExpenseAction.initilizerHandlerSuccess(updateValue,totalAmount));
}

const sumUpMonthlyExpense = (updateValue) => {
    let total = 0;
    for(let key in updateValue){
       total += updateValue[key].monthlyAmount
    }
    return total
}
export function* submitExpenseHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("monthlyExpenseArray"));
    let updateValue = [...localValue]
    let monthlyExpenseObject = {};
    if (action.monthlyExpenseObject.id !== null && action.editMode === true){
        const editObjIndex = updateValue.findIndex(item => item.id === action.monthlyExpenseObject.id)
        updateValue[editObjIndex] = action.monthlyExpenseObject;
    }
    else {
        let expenseLast = null;
        if (updateValue.length !== 0) {
            const expenseLastItem = updateValue[updateValue.length - 1];
            expenseLast = +expenseLastItem.id;
        }
        else {
            expenseLast = 0;
        }
        monthlyExpenseObject = action.monthlyExpenseObject;
        monthlyExpenseObject.id = expenseLast + 1;
        updateValue.push(monthlyExpenseObject);
        monthlyExpenseObject = {};
    }
    let editMode = false;
    let totalAmount = sumUpMonthlyExpense(updateValue);
    yield localStorage.setItem("monthlyExpenseArray", JSON.stringify(updateValue));
    yield put(monthlyExpenseAction.submitHandlerSuccess(updateValue,editMode,monthlyExpenseObject,totalAmount));

}
export function* editExpenseHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("monthlyExpenseArray"));
    let totalAmount = sumUpMonthlyExpense(localValue);
    yield put(monthlyExpenseAction.editHandlerSuccess(localValue,action.monthlyExpenseObject,action.editMode,totalAmount));

}
export function* deleteExpenseHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("monthlyExpenseArray"));
    let updateValue = [...localValue];
    const deleteObjIndex = updateValue.findIndex(item => item.id === action.monthlyExpenseObject.id)
    updateValue.splice(deleteObjIndex, 1);
    yield localStorage.setItem("monthlyExpenseArray", JSON.stringify(updateValue));
    let totalAmount = sumUpMonthlyExpense(updateValue);
    yield put(monthlyExpenseAction.deleteHandlerSuccess(updateValue,totalAmount));
}