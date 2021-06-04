import {put} from "redux-saga/effects";
import * as investmentBudgetAction from "../../reducer/InvestmentBudget/InvestmentBudgetReducer";

export function* initlizeBudgetSaga(){
    let localValue = JSON.parse(localStorage.getItem("investmentBudgetArray"));
    let totalAmount ;
    if(localValue === null){
        localValue = [];
        totalAmount = 0;
    }    
    else{
        totalAmount = sumUpInvestmentBudget(localValue);
    }    
    const updateValue = [...localValue];
    yield localStorage.setItem("investmentBudgetArray", JSON.stringify(updateValue));
    yield put(investmentBudgetAction.initilizerHandlerSuccess(updateValue,totalAmount));
}

const sumUpInvestmentBudget = (updateValue) => {
    let total = 0;
    for(let key in updateValue){
       total += updateValue[key].monthlyExpenseAmount;
    }
    return total
}

export function* submitBudgetHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("investmentBudgetArray"));
    let updateValue = [...localValue]
    let investmentBudgetObject = {};
    if (action.investmentBudgetObject.id !== null && action.editMode === true){
        const editObjIndex = updateValue.findIndex(item => item.id === action.investmentBudgetObject.id)
        updateValue[editObjIndex] = action.investmentBudgetObject;
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
        investmentBudgetObject = action.investmentBudgetObject;
        investmentBudgetObject.id = expenseLast + 1;
        updateValue.push(investmentBudgetObject);
        investmentBudgetObject = {};
    }
    let editMode = false;
    let totalAmount = sumUpInvestmentBudget(updateValue);
    yield localStorage.setItem("investmentBudgetArray", JSON.stringify(updateValue));
    yield put(investmentBudgetAction.submitHandlerSuccess(updateValue,editMode,investmentBudgetObject,totalAmount));
}
export function* editBudgetHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("investmentBudgetArray"));
    let totalAmount = sumUpInvestmentBudget(localValue);
    yield put(investmentBudgetAction.editHandlerSuccess(localValue,action.investmentBudgetObject,action.editMode,totalAmount));
}

export function* deleteBudgetHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("investmentBudgetArray"));
    let updateValue = [...localValue];
    const deleteObjIndex = updateValue.findIndex(item => item.id === action.investmentBudgetObject.id)
    updateValue.splice(deleteObjIndex, 1);
    yield localStorage.setItem("investmentBudgetArray", JSON.stringify(updateValue));
    let totalAmount = sumUpInvestmentBudget(updateValue);
    yield put(investmentBudgetAction.deleteHandlerSuccess(updateValue,totalAmount));

}