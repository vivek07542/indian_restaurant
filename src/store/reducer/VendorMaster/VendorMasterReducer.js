export const VENDOR_INIT = "VENDOR_INIT";

export const VENDOR_SUCCESS  = "VENDOR_SUCCESS";

export const SUBMIT_VENDOR_HANDLER_INIT = "SUBMIT_VENDOR_HANDLER_INIT";

export const SUBMIT_VENDOR_HANDLER_SUCCESS = "SUBMIT_VENDOR_HANDLER_SUCCESS";

export const EDIT_VENDOR_HANDLER_INIT = "EDIT_VENDOR_HANDLER_INIT" ;

export const EDIT_VENDOR_HANDLER_SUCCESS = "EDIT_VENDOR_HANDLER_SUCCESS" ;

export const DELETE_VENDOR_HANDLER_INIT = "DELETE_VENDOR_HANDLER_INIT" ;

export const DELETE_VENDOR_HANDLER_SUCCESS = "DELETE_VENDOR_HANDLER_SUCCESS";

export const initializeVendorInit = () =>{
    return{
        type : VENDOR_INIT
    }
}
export const initilizerHandlerSuccess = (vendorArray) =>{
    return{
        type : VENDOR_SUCCESS,
        vendorArray : vendorArray  
    }
}

export const submitHandlerInit = (editMode,vendorObject) =>{
    return{
        type : SUBMIT_VENDOR_HANDLER_INIT,
        editMode : editMode,
        vendorObject : vendorObject
    }
}

export const submitHandlerSuccess = (vendorArray,editMode,editObject) =>{
    return{
        type : SUBMIT_VENDOR_HANDLER_SUCCESS,
        editMode : editMode,
        vendorArray : vendorArray,
        editObject : editObject
    }
}

export const editHandlerInit = (vendorObject) =>{
    return{
        type : EDIT_VENDOR_HANDLER_INIT,
        vendorObject : vendorObject,
        editMode : true
    }
}
export const editHandlerSuccess = (vendorArray,editObject,editMode) =>{
    return{
        type : EDIT_VENDOR_HANDLER_SUCCESS,
        vendorArray : vendorArray,
        editObject : editObject,
        editMode : editMode
    }
}
export const deleteHandlerInit = (vendorObject) =>{
    return{
        type : DELETE_VENDOR_HANDLER_INIT,
        vendorObject : vendorObject
    }
}

export const deleteHandlerSuccess = (vendorArray) =>{
    return{
        type : DELETE_VENDOR_HANDLER_SUCCESS,
        vendorArray : vendorArray
    }
}

const initialState = {
    vendorArray : [],
    editMode : false,
    editObject : {},
 
}
const VendorMaster = (state = initialState,action) =>{
    switch(action.type){
        case VENDOR_SUCCESS : 
        return{
            ...state,
            vendorArray : action.vendorArray      
        }
        case SUBMIT_VENDOR_HANDLER_SUCCESS : 
        return{
            ...state,
            editMode : action.editMode,
            vendorArray : action.vendorArray,
            editObject : action.editObject
        }
        case EDIT_VENDOR_HANDLER_SUCCESS : 
        return{
            ...state,          
            editMode : action.editMode,
            editObject : action.editObject,
            vendorArray : action.vendorArray
        }
        case DELETE_VENDOR_HANDLER_SUCCESS : 
        return{
            ...state,
            vendorArray : action.vendorArray 
        }
        default : return state
    }
}
export default VendorMaster;