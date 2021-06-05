import {put} from "redux-saga/effects";
import * as orderAction from "../../reducer/CustomerOrder/CustomerOrderReducer";

export function* initlizeOrderSaga(){
    let localCustomerOrder = JSON.parse(localStorage.getItem("customerOrderArray"));
    let foodItemValue = JSON.parse(localStorage.getItem("foodItemArray"));
    let customerLastOrder = null;
    if(foodItemValue === null){
        foodItemValue = []
    }  
    if(localCustomerOrder === null || localCustomerOrder.length === 0 ){
        localCustomerOrder = [];
        customerLastOrder = 0;
    }
    else {
            if(localCustomerOrder.length !== 0){
                const customerLastOrderItem = localCustomerOrder[localCustomerOrder.length - 1];
                customerLastOrder = +customerLastOrderItem.id;     
            }
        }
    let orderId = customerLastOrder + 1
    yield localStorage.setItem("foodItemArray",JSON.stringify(foodItemValue));
    yield localStorage.setItem("customerOrderArray",JSON.stringify(localCustomerOrder));
    yield put(orderAction.initilizerHandlerSuccess(localCustomerOrder,foodItemValue,orderId));
}

export function* submitOrderHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("customerOrderArray"));
    let updateValue = [...localValue]
    let customerOrderObject = {};
    // let nextOrderId;
    if (action.editMode === true){
        const editObjIndex = updateValue.findIndex(item => item.id === action.customerOrderObject.id)
        updateValue[editObjIndex].id = +action.customerOrderObject.id;
        updateValue[editObjIndex].customerName = action.customerOrderObject.customerName;
        updateValue[editObjIndex].orderDate = action.customerOrderObject.orderDate;
        updateValue[editObjIndex].discount = +action.customerOrderObject.discount;
        updateValue[editObjIndex].totalAmount = +action.customerOrderObject.totalAmount;
        updateValue[editObjIndex].orderArray = action.customerOrderObject.orderArray;
        updateValue[editObjIndex].orderArray = [];
        action.customerOrderObject.orderArray.map((item,index)=>{        
             let object = {}
             object.id = index + 1;
             object.foodItemId = item.foodItemId;
             object.orderQtyId = +item.orderQtyId;
             object.amount = +item.amount;
             updateValue[editObjIndex].orderArray.push(object);
            });
    }
    else {
        let customerOrderLast = null;
        if (updateValue.length !== 0) {
            const customerOrderLastItem = updateValue[updateValue.length - 1];
            customerOrderLast = +customerOrderLastItem.id;
        }
        else {
            customerOrderLast = 0;
        }
    customerOrderObject.id = customerOrderLast + 1;
    customerOrderObject.customerName = action.customerOrderObject.customerName;
    customerOrderObject.orderDate = action.customerOrderObject.orderDate;
    customerOrderObject.discount = +action.customerOrderObject.discount;
    customerOrderObject.totalAmount = +action.customerOrderObject.totalAmount;
    customerOrderObject.orderArray = action.customerOrderObject.orderArray;
    customerOrderObject.orderArray = [];
    action.customerOrderObject.orderArray.map((item,index)=>{        
        let object = {}
        object.id = index + 1;
        object.foodItemId = item.foodItemId;
        object.orderQtyId = +item.orderQtyId;
        object.amount = +item.amount;
         customerOrderObject.orderArray.push(object);
        });
        updateValue.push(customerOrderObject);
        // nextOrderId =customerOrderObject.id +1;
        customerOrderObject = {};
    }
    
    let editMode = false; 
    yield localStorage.setItem("customerOrderArray", JSON.stringify(updateValue));  

    // For Order No.
    const localValueD = JSON.parse(localStorage.getItem("customerOrderArray"));
    let updateValueD = [...localValueD];
    let customerLastOrders;
    if(updateValue === null ){
        customerLastOrders = 0;
    }
    else {
        const customerLastOrderItem = updateValueD[updateValue.length - 1];
        customerLastOrders = +customerLastOrderItem.id;     
    }
    let orderId = customerLastOrders + 1

    yield put(orderAction.submitHandlerSuccess(updateValue,editMode,action.customerOrderObject,orderId));    
}
    
export function* editOrderHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("customerOrderArray"));
    let updateValue = [...localValue];
    let editObject = action.customerOrderObject;
    yield put(orderAction.editHandlerSuccess(updateValue,editObject,action.editMode,editObject.id));
}

export function* deleteOrderHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("customerOrderArray"));
    let updateValue = [...localValue];
    const deleteObjIndex = updateValue.findIndex(item => item.id === action.customerOrderObject.id)
    updateValue.splice(deleteObjIndex, 1);
    let customerLastOrder;
    if(updateValue === null ){
        customerLastOrder = 0;
    }
    else {
        const customerLastOrderItem = updateValue[updateValue.length - 1];
        customerLastOrder = +customerLastOrderItem.id;     
    }
    let orderId = customerLastOrder + 1
    yield localStorage.setItem("customerOrderArray", JSON.stringify(updateValue));
    yield put(orderAction.deleteHandlerSuccess(updateValue,orderId));
}