
// QUANTITY
export const QUANTITY_INIT = "QUANTITY_INIT";

export const QUANTITY_SUCCESS = "QUANTITY_SUCCESS";

export const SUBMIT_QUANTITY_HANDLER_INIT = "SUBMIT_QUANTITY_HANDLER_INIT";

export const SUBMIT_QUANTITY_HANDLER_SUCCESS = "SUBMIT_QUANTITY_HANDLER_SUCCESS";

export const EDIT_QUANTITY_HANDLER_INIT = "EDIT_QUANTITY_HANDLER_INIT";

export const EDIT_QUANTITY_HANDLER_SUCCESS = "EDIT_QUANTITY_HANDLER_SUCCESS";

export const DELETE_QUANTITY_HANDLER_INIT = "DELETE_QUANTITY_HANDLER_INIT";

export const DELETE_QUANTITY_HANDLER_SUCCESS = "DELETE_QUANTITY_HANDLER_SUCCESS";

export const initilizerQtyHandlerInit = () =>{
    return{
        type : QUANTITY_INIT
    }
}

export const initilizerHandlerSuccess = (quantityArray) =>{
    return{
        type : QUANTITY_SUCCESS,
        quantityArray : quantityArray  
    }
}

export const submitHandlerInit = (editMode,quantityObject) =>{
    return{
        type : SUBMIT_QUANTITY_HANDLER_INIT,
        editMode : editMode,
        quantityObject : quantityObject
    }
}

export const submitHandlerSuccess = (quantityArray,editMode,editObject) =>{
    return{
        type : SUBMIT_QUANTITY_HANDLER_SUCCESS,
        editMode : editMode,
        quantityArray : quantityArray,
        editObject : editObject
    }
}

export const editHandlerInit = (quantityObject) =>{
    return{
        type : EDIT_QUANTITY_HANDLER_INIT,
        quantityObject : quantityObject,
        editMode : true
    }
}
export const editHandlerSuccess = (quantityArray,editObject,editMode) =>{
    return{
        type : EDIT_QUANTITY_HANDLER_SUCCESS,
        quantityArray : quantityArray,
        editObject : editObject,
        editMode : editMode
    }
}
export const deleteHandlerInit = (quantityObject) =>{
    return{
        type : DELETE_QUANTITY_HANDLER_INIT,
        quantityObject : quantityObject
    }
}

export const deleteHandlerSuccess = (quantityArray) =>{
    return{
        type : DELETE_QUANTITY_HANDLER_SUCCESS,
        quantityArray : quantityArray
    }
}

const initialState = {
    quantityArray : [],
    editMode : false,
    editObject : {},
 
}
const Quantity = (state = initialState,action) =>{
    switch(action.type){
        case QUANTITY_SUCCESS : 
        return{
            ...state,
            quantityArray : action.quantityArray      
        }
        case SUBMIT_QUANTITY_HANDLER_SUCCESS : 
        return{
            ...state,
            editMode : action.editMode,
            quantityArray : action.quantityArray,
            editObject : action.editObject
        }
        case EDIT_QUANTITY_HANDLER_SUCCESS : 
        return{
            ...state,          
            editMode : action.editMode,
            editObject : action.editObject,
            quantityArray : action.quantityArray
        }
        case DELETE_QUANTITY_HANDLER_SUCCESS : 
        return{
            ...state,
            quantityArray : action.quantityArray 
        }
        default : return state
    }
}
export default Quantity;