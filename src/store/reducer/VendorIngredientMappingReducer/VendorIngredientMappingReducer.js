export const VENDOR_MAPPING_INIT = "VENDOR_MAPPING_INIT";

export const VENDOR_MAPPING_SUCCESS = "VENDOR_MAPPING_SUCCESS";

export const VENDOR_MAPPING_SUBMIT_INIT = "VENDOR_MAPPING_SUBMIT_INIT";

export const VENDOR_MAPPING_SUBMIT_SUCCESS = "VENDOR_MAPPING_SUBMIT_SUCCESS";

export const VENDOR_MAPPING_EDIT_INIT = "VENDOR_MAPPING_EDIT_INIT";

export const VENDOR_MAPPING_EDIT_SUCCESS = "VENDOR_MAPPING_EDIT_SUCCESS";

export const VENDOR_MAPPING_DELETE_INIT = "VENDOR_MAPPING_DELETE_INIT";

export const VENDOR_MAPPING_DELETE_SUCCESS = "VENDOR_MAPPING_DELETE_SUCCESS";

export const initializeVendorMappingInit = () =>{
    return{
        type : VENDOR_MAPPING_INIT
    }
}

export const initilizerHandlerSuccess = (vendorMappingArray,ingredientArray,vendorArray,unitArray) =>{
    return{
        type : VENDOR_MAPPING_SUCCESS,
        vendorMappingArray : vendorMappingArray,
        ingredientArray: ingredientArray,
        vendorArray : vendorArray,
        unitArray : unitArray
    }
}

export const submitHandlerInit = (editMode,vendorMappingObject) =>{
    return{
        type : VENDOR_MAPPING_SUBMIT_INIT,
        editMode : editMode,
        vendorMappingObject : vendorMappingObject
    }
}

export const submitHandlerSuccess = (vendorMappingArray,editMode,editObject) =>{
    return{
        type : VENDOR_MAPPING_SUBMIT_SUCCESS,
        editMode : editMode,
        vendorMappingArray : vendorMappingArray,
        editObject : editObject
    }
}

export const editHandlerInit = (vendorMappingObject) =>{
    return{
        type : VENDOR_MAPPING_EDIT_INIT,
        vendorMappingObject : vendorMappingObject,
        editMode : true
    }
}
export const editHandlerSuccess = (vendorMappingArray,editObject,editMode) =>{
    return{
        type : VENDOR_MAPPING_EDIT_SUCCESS,     
        vendorMappingArray : vendorMappingArray, 
        editObject : editObject,
        editMode : editMode
    }
}
export const deleteHandlerInit = (vendorMappingObject) =>{
    return{
        type : VENDOR_MAPPING_DELETE_INIT,
        vendorMappingObject : vendorMappingObject
    }
}


export const deleteHandlerSuccess = (vendorMappingArray) =>{
    return{
        type : VENDOR_MAPPING_DELETE_SUCCESS,
        vendorMappingArray : vendorMappingArray
    }
}


const initialState = {
    vendorMappingArray : [],
    editMode : false,
    editObject : {},
    ingredientArray : [],
    vendorArray : [],
    unitArray : []
}
const VendorMapping = (state = initialState,action) =>{
    switch(action.type){
        case VENDOR_MAPPING_SUCCESS:
            return{
                ...state,
                vendorMappingArray : action.vendorMappingArray,
                ingredientArray : action.ingredientArray,
                vendorArray : action.vendorArray,
                unitArray : action.unitArray
            }
            case VENDOR_MAPPING_SUBMIT_SUCCESS : 
            return{
                ...state,
                editMode : action.editMode,
                vendorMappingArray : action.vendorMappingArray,
                editObject : action.editObject
            }
            case VENDOR_MAPPING_EDIT_SUCCESS : 
            return{
                ...state,          
                vendorMappingArray : action.vendorMappingArray,
                editMode : action.editMode,
                editObject : action.editObject,
            
            }
            case VENDOR_MAPPING_DELETE_SUCCESS : 
            return{
                ...state,
                vendorMappingArray : action.vendorMappingArray 
            }
        default : return state;    
    }
}
export default VendorMapping;