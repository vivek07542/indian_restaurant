export const INVESTMENT_BUDGET_INIT ="INVESTMENT_BUDGET_INIT";
export const INVESTMENT_BUDGET_SUCCESS ="INVESTMENT_BUDGET_SUCCESS";

export const SUBMIT_INVESTMENT_BUDGET_HANDLER_INIT ="SUBMIT_INVESTMENT_BUDGET_HANDLER_INIT";
export const SUBMIT_INVESTMENT_BUDGET_HANDLER_SUCCESS ="SUBMIT_INVESTMENT_BUDGET_HANDLER_SUCCESS";

export const DELETE_INVESTMENT_BUDGET_HANDLER_INIT ="DELETE_INVESTMENT_BUDGET_HANDLER_INIT";
export const DELETE_INVESTMENT_BUDGET_HANDLER_SUCCESS ="DELETE_INVESTMENT_BUDGET_HANDLER_SUCCESS";

export const EDIT_INVESTMENT_BUDGET_HANDLER_INIT ="EDIT_INVESTMENT_BUDGET_HANDLER_INIT";
export const EDIT_INVESTMENT_BUDGET_HANDLER_SUCCESS ="EDIT_INVESTMENT_BUDGET_HANDLER_SUCCESS";

export const initilizerInvestmentBudgetHandlerInit = () =>{
    return{
        type :INVESTMENT_BUDGET_INIT
    }
}

export const initilizerHandlerSuccess = (investmentBudgetArray,totalAmount) =>{
    return{
        type : INVESTMENT_BUDGET_SUCCESS,
        investmentBudgetArray : investmentBudgetArray,
        totalAmount : totalAmount
     
    }
}

export const submitHandlerInit = (editMode,investmentBudgetObject) =>{
    return{
        type : SUBMIT_INVESTMENT_BUDGET_HANDLER_INIT,
        editMode : editMode,
        investmentBudgetObject : investmentBudgetObject
    }
}

export const submitHandlerSuccess = (investmentBudgetArray,editMode,editObject,totalAmount) =>{
    return{
        type : SUBMIT_INVESTMENT_BUDGET_HANDLER_SUCCESS,
        editMode : editMode,
        investmentBudgetArray : investmentBudgetArray,
        editObject : editObject,
        totalAmount : totalAmount
    }
}

export const editHandlerInit = (investmentBudgetObject) =>{
    return{
        type : EDIT_INVESTMENT_BUDGET_HANDLER_INIT,
        investmentBudgetObject : investmentBudgetObject,
        editMode : true
    }
}
export const editHandlerSuccess = (investmentBudgetArray,editObject,editMode,totalAmount) =>{
    return{
        type : EDIT_INVESTMENT_BUDGET_HANDLER_SUCCESS,
        investmentBudgetArray : investmentBudgetArray,
        editObject : editObject,
        editMode : editMode,
        totalAmount : totalAmount
    }
}
export const deleteHandlerInit = (investmentBudgetObject) =>{
    return{
        type : DELETE_INVESTMENT_BUDGET_HANDLER_INIT,
        investmentBudgetObject : investmentBudgetObject
    }
}

export const deleteHandlerSuccess = (investmentBudgetArray,totalAmount) =>{
    return{
        type : DELETE_INVESTMENT_BUDGET_HANDLER_SUCCESS,
        investmentBudgetArray : investmentBudgetArray,
        totalAmount : totalAmount
    }
}
const initialState = {
    investmentBudgetArray : [],
    editObject : {},
    editMode : false,
    totalAmount : 0,
   
}
const InvestmentBudget = (state = initialState,action) =>{
    switch(action.type){
        case INVESTMENT_BUDGET_SUCCESS : 
        return{
            ...state,
            investmentBudgetArray : action.investmentBudgetArray,
            totalAmount : action.totalAmount
        }
        case SUBMIT_INVESTMENT_BUDGET_HANDLER_SUCCESS : 
        return {
            ...state,
            editMode : action.editMode,
            investmentBudgetArray : action.investmentBudgetArray,
            editObject : action.editObject,
            totalAmount : action.totalAmount
        }
        case EDIT_INVESTMENT_BUDGET_HANDLER_SUCCESS : 
        return{
            ...state,          
            investmentBudgetArray : action.investmentBudgetArray,
            editMode : action.editMode,
            editObject : action.editObject,
            totalAmount : action.totalAmount
        }
        case DELETE_INVESTMENT_BUDGET_HANDLER_SUCCESS : 
        return{
            ...state,
            investmentBudgetArray : action.investmentBudgetArray,
            totalAmount : action.totalAmount 
        }
        default : return state
    }
}
export default InvestmentBudget;