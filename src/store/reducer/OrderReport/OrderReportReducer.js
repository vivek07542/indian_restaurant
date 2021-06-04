export const SUBMIT_ORDER_REPORT_INIT = "SUBMIT_ORDER_REPORT_INIT";

export const SUBMIT_ORDER_REPORT_SUCCESS = "SUBMIT_ORDER_REPORT_SUCCESS";

export const submitHandlerInit = (orderReportObject) =>{
    return{
        type : SUBMIT_ORDER_REPORT_INIT,
        orderReportObject : orderReportObject
    }
}

export const submitHandlerSuccess = (orderReportArray,totalAmount) =>{
    return{
        type : SUBMIT_ORDER_REPORT_SUCCESS,
        orderReportArray : orderReportArray,
        totalAmount : totalAmount
    }
}
const initialState = {
    orderReportArray : [],
    totalAmount : 0
}

const OrderReport = (state =initialState,action) =>{
    switch(action.type){
        case SUBMIT_ORDER_REPORT_SUCCESS : 
        return{
            ...state,
            orderReportArray : action.orderReportArray,
            totalAmount : action.totalAmount
        }
        default : return state
    }
}
export default OrderReport;