import {put} from "redux-saga/effects";
import * as orderReportAction from "../../reducer/OrderReport/OrderReportReducer";

// Function to get Selected Array
const getOrderDate = (startDate,endDate,orderDetail) =>{
    let result = orderDetail.filter(d => {var time = new Date(d.orderDate).getTime();
        return (startDate <= time && time <= endDate);
    });
    return result;
}

const sumUpOrderExpense = (updateValue) => {
    let total = 0;
    for(let key in updateValue){
       total += updateValue[key].totalAmount
    }
    return total
}

export function* submitOrderReportHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("customerOrderArray"));
    const updateValue = [...localValue];
    let orderReport = [];
    let startDate = new Date(action.orderReportObject.dateFrom);
    let endDate = new Date(action.orderReportObject.dateTo);
    let array =  getOrderDate(startDate,endDate,updateValue);

    if(array.length !== 0){
        array.map((item) =>{
            let object = {};
            object.orderId = item.id;
            object.orderDate = item.orderDate;
            object.customerName = item.customerName;
            object.totalAmount = item.totalAmount;
            orderReport.push(object);
        })    
    }   
    let totalAmount = sumUpOrderExpense(orderReport);
    yield put(orderReportAction.submitHandlerSuccess(orderReport,totalAmount));

}