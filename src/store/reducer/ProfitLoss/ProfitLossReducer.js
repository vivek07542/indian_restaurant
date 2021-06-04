export const SUBMIT_PROFIT_LOSS_INIT = "SUBMIT_PROFIT_LOSS_INIT";

export const SUBMIT_PROFIT_LOSS_SUCCESS = "SUBMIT_PROFIT_LOSS_SUCCESS";

export const submitHandlerInit = (profitLossObject) =>{
    return{
        type : SUBMIT_PROFIT_LOSS_INIT,
        profitLossObject : profitLossObject
    }
}

export const submitHandlerSuccess = (profitLossArray,totalAmount) =>{
    return{
        type : SUBMIT_PROFIT_LOSS_SUCCESS,
        profitLossArray : profitLossArray,
        totalAmount : totalAmount
    }
}
const initialState = {
    profitLossArray : [],
    totalAmount : 0
}
const ProfitLoss = (state = initialState,action) =>{
    switch(action.type){
        case SUBMIT_PROFIT_LOSS_SUCCESS :
            return{
                ...state,
                profitLossArray : action.profitLossArray,
                totalAmount : action.totalAmount
            }
        default : return state     
    }
}
export default ProfitLoss;