export const MONTHLY_EXPENSE_INIT ="MONTHLY_EXPENSE_INIT";
export const MONTHLY_EXPENSE_SUCCESS ="MONTHLY_EXPENSE_SUCCESS";

export const SUBMIT_MONTHLY_EXPENSE_HANDLER_INIT ="SUBMIT_MONTHLY_EXPENSE_HANDLER_INIT";
export const SUBMIT_MONTHLY_EXPENSE_HANDLER_SUCCESS ="SUBMIT_MONTHLY_EXPENSE_HANDLER_SUCCESS";

export const DELETE_MONTHLY_EXPENSE_HANDLER_INIT ="DELETE_MONTHLY_EXPENSE_HANDLER_INIT";
export const DELETE_MONTHLY_EXPENSE_HANDLER_SUCCESS ="DELETE_MONTHLY_EXPENSE_HANDLER_SUCCESS";

export const EDIT_MONTHLY_EXPENSE_HANDLER_INIT ="EDIT_MONTHLY_EXPENSE_HANDLER_INIT";
export const EDIT_MONTHLY_EXPENSE_HANDLER_SUCCESS ="EDIT_MONTHLY_EXPENSE_HANDLER_SUCCESS";

export const initilizerMonthlyExpenseHandlerInit = () =>{
    return{
        type :MONTHLY_EXPENSE_INIT
    }
}

export const initilizerHandlerSuccess = (monthlyExpenseArray,totalAmount) =>{
    return{
        type : MONTHLY_EXPENSE_SUCCESS,
        monthlyExpenseArray : monthlyExpenseArray,
        totalAmount : totalAmount
    }
}

export const submitHandlerInit = (editMode,monthlyExpenseObject) =>{
    return{
        type : SUBMIT_MONTHLY_EXPENSE_HANDLER_INIT,
        editMode : editMode,
        monthlyExpenseObject : monthlyExpenseObject
    }
}

export const submitHandlerSuccess = (monthlyExpenseArray,editMode,editObject,totalAmount) =>{
    return{
        type : SUBMIT_MONTHLY_EXPENSE_HANDLER_SUCCESS,
        editMode : editMode,
        monthlyExpenseArray : monthlyExpenseArray,
        editObject : editObject,
        totalAmount :totalAmount
    }
}

export const editHandlerInit = (monthlyExpenseObject) =>{
    return{
        type : EDIT_MONTHLY_EXPENSE_HANDLER_INIT,
        monthlyExpenseObject : monthlyExpenseObject,
        editMode : true,
    }
}
export const editHandlerSuccess = (monthlyExpenseArray,editObject,editMode,totalAmount) =>{
    return{
        type : EDIT_MONTHLY_EXPENSE_HANDLER_SUCCESS,
        monthlyExpenseArray : monthlyExpenseArray,
        editObject : editObject,
        editMode : editMode,
        totalAmount :totalAmount
    }
}
export const deleteHandlerInit = (monthlyExpenseObject) =>{
    return{
        type : DELETE_MONTHLY_EXPENSE_HANDLER_INIT,
        monthlyExpenseObject : monthlyExpenseObject,
        

    }
}

export const deleteHandlerSuccess = (monthlyExpenseArray,totalAmount) =>{
    return{
        type : DELETE_MONTHLY_EXPENSE_HANDLER_SUCCESS,
        monthlyExpenseArray : monthlyExpenseArray,
        totalAmount :totalAmount
    }
}
const initialState = {
    monthlyExpenseArray : [],
    totalAmount : 0,
    editMode : false,
    editObject : {},
}
const MonthlyExpense = (state = initialState,action) =>{
    switch(action.type){
        case MONTHLY_EXPENSE_SUCCESS : 
        return{
            ...state,
            monthlyExpenseArray : action.monthlyExpenseArray,
            totalAmount : action.totalAmount
        }
        case SUBMIT_MONTHLY_EXPENSE_HANDLER_SUCCESS : 
        return {
            ...state,
            editMode : action.editMode,
            monthlyExpenseArray : action.monthlyExpenseArray,
            editObject : action.editObject,
            totalAmount : action.totalAmount
        }
        case EDIT_MONTHLY_EXPENSE_HANDLER_SUCCESS : 
        return{
            ...state,          
            monthlyExpenseArray : action.monthlyExpenseArray,
            editMode : action.editMode,
            editObject : action.editObject,
            totalAmount : action.totalAmount
        
        }
        case DELETE_MONTHLY_EXPENSE_HANDLER_SUCCESS : 
        return{
            ...state,
            monthlyExpenseArray : action.monthlyExpenseArray,
            totalAmount : action.totalAmount 
        }
        default : return state
    }
}
export default MonthlyExpense;