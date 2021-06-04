import {put} from "redux-saga/effects";
import * as profitLossAction from "../../reducer/ProfitLoss/ProfitLossReducer";

const sumUpOrderExpense = (updateValue) => {
    let total = 0;
    for(let key in updateValue){
       total += updateValue[key].monthlyAmount
    }
    return total
}

// Function to get Selected Array
const getOrderDate = (startDate,endDate,orderDetail) =>{
    let result = orderDetail.filter(d => {var time = new Date(d.date).getTime();
        return (startDate <= time && time <= endDate);
    });
    return result;
}

export function* submitProfitLossHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("monthlyExpenseArray"));
    const updateValue = [...localValue];  
    let startDate = new Date(action.profitLossObject.dateFrom);
    let endDate = new Date(action.profitLossObject.dateTo);
    let array =  getOrderDate(startDate,endDate,updateValue);
    let totalAmount = sumUpOrderExpense(array);   
    yield put(profitLossAction.submitHandlerSuccess(array,totalAmount));
}