export const ORDER_INIT ="ORDER_INIT";
export const ORDER_SUCCESS ="ORDER_SUCCESS";

export const SUBMIT_ORDER_HANDLER_INIT ="SUBMIT_ORDER_HANDLER_INIT";
export const SUBMIT_ORDER_HANDLER_SUCCESS ="SUBMIT_ORDER_HANDLER_SUCCESS";

export const DELETE_ORDER_HANDLER_INIT ="DELETE_ORDER_HANDLER_INIT";
export const DELETE_ORDER_HANDLER_SUCCESS ="DELETE_ORDER_HANDLER_SUCCESS";

export const EDIT_ORDER_HANDLER_INIT ="EDIT_ORDER_HANDLER_INIT";
export const EDIT_ORDER_HANDLER_SUCCESS ="EDIT_ORDER_HANDLER_SUCCESS";

export const initilizerOrderHandlerInit = () =>{
    return{
        type :ORDER_INIT
    }
}

export const initilizerHandlerSuccess = (customerOrderArray,foodItemArray,orderId) =>{
    return{
        type : ORDER_SUCCESS,
        customerOrderArray : customerOrderArray,
        foodItemArray : foodItemArray,
        orderId : orderId
    
    }
}

export const submitHandlerInit = (editMode,customerOrderObject) =>{
    return{
        type : SUBMIT_ORDER_HANDLER_INIT,
        editMode : editMode,
        customerOrderObject : customerOrderObject
    }
}

export const submitHandlerSuccess = (customerOrderArray,editMode,editObject,orderId) =>{
    return{
        type : SUBMIT_ORDER_HANDLER_SUCCESS,
        editMode : editMode,
        customerOrderArray : customerOrderArray,
        editObject : editObject,
        orderId : orderId
    }
}

export const editHandlerInit = (customerOrderObject) =>{
    return{
        type : EDIT_ORDER_HANDLER_INIT,
        customerOrderObject : customerOrderObject,
        editMode : true

    }
}
export const editHandlerSuccess = (customerOrderArray,editObject,editMode,orderId) =>{
    return{
        type : EDIT_ORDER_HANDLER_SUCCESS,
        customerOrderArray : customerOrderArray,
        editObject : editObject,
        editMode : editMode,
        orderId : orderId
    }
}
export const deleteHandlerInit = (customerOrderObject) =>{
    return{
        type : DELETE_ORDER_HANDLER_INIT,
        customerOrderObject : customerOrderObject
    }
}

export const deleteHandlerSuccess = (customerOrderArray,orderId) =>{
    return{
        type : DELETE_ORDER_HANDLER_SUCCESS,
        customerOrderArray : customerOrderArray,
        orderId : orderId
    }
}
const initialState = {
    customerOrderArray : [],
    foodItemArray : [],  
    editMode : false,
    editObject : {},
    orderId : "",
   
}
const CustomerOrder = (state = initialState,action) =>{
    switch(action.type){
        case ORDER_SUCCESS : 
        return{
            ...state,
            customerOrderArray : action.customerOrderArray,
            foodItemArray : action.foodItemArray,
            orderId : action.orderId
        }
        case SUBMIT_ORDER_HANDLER_SUCCESS : 
        return {
            ...state,
            editMode : action.editMode,
            customerOrderArray : action.customerOrderArray,
            editObject : action.editObject,
            orderId : action.orderId
        }
        case EDIT_ORDER_HANDLER_SUCCESS : 
        return{
            ...state,          
            customerOrderArray : action.customerOrderArray,
            editMode : action.editMode,
            editObject : action.editObject,
            orderId : action.orderId

        
        }
        case DELETE_ORDER_HANDLER_SUCCESS : 
        return{
            ...state,
            customerOrderArray : action.customerOrderArray,
            orderId : action.orderId
 
        }

        default : return state
    }
}
export default CustomerOrder;