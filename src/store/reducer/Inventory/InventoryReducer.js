export const INVENTORY_INIT = "INVENTORY_INIT";

export const INVENTORY_SUCCESS = "INVENTORY_SUCCESS";

export const SUBMIT_INVENTORY_INIT = "SUBMIT_INVENTORY_INIT";

export const SUBMIT_INVENTORY_SUCCESS = "SUBMIT_INVENTORY_SUCCESS"; 

export const EDIT_INVENTORY_INIT = "EDIT_INVENTORY_INIT"; 

export const EDIT_INVENTORY_SUCCESS = "EDIT_INVENTORY_SUCCESS";

export const DELETE_INVENTORY_INIT = "DELETE_INVENTORY_INIT";

export const DELETE_INVENTORY_SUCCESS = "DELETE_INVENTORY_SUCCESS";

export const initilizerInventoryHandlerInit = () =>{
    return{
        type : INVENTORY_INIT
    }
}

export const initilizerHandlerSuccess = (inventoryArray,ingredientArray,quantityArray,vendorMappingArray,unitArray) =>{
    return{
        type : INVENTORY_SUCCESS,
        inventoryArray : inventoryArray,
        ingredientArray : ingredientArray,
        quantityArray : quantityArray,
        vendorMappingArray : vendorMappingArray,
        unitArray :unitArray
    }
}

export const submitHandlerInit = (editMode,inventoryObject) =>{
    return{
        type : SUBMIT_INVENTORY_INIT,
        editMode : editMode,
        inventoryObject : inventoryObject
    }
}

export const submitHandlerSuccess = (inventoryArray,editMode,editObject) =>{
    return{
        type : SUBMIT_INVENTORY_SUCCESS,
        editMode : editMode,
        inventoryArray : inventoryArray,
        editObject : editObject
    }
}

export const editHandlerInit = (inventoryObject) =>{
    return{
        type : EDIT_INVENTORY_INIT,
        inventoryObject : inventoryObject,
        editMode : true
    }
}
export const editHandlerSuccess = (inventoryArray,editObject,editMode) =>{
    return{
        type : EDIT_INVENTORY_SUCCESS,     
        inventoryArray : inventoryArray, 
        editObject : editObject,
        editMode : editMode
    }
}
export const deleteHandlerInit = (inventoryObject) =>{
    return{
        type : DELETE_INVENTORY_INIT,
        inventoryObject : inventoryObject
    }
}

export const deleteHandlerSuccess = (inventoryArray) =>{
    return{
        type : DELETE_INVENTORY_SUCCESS,
        inventoryArray : inventoryArray
    }
}

const initialState = {
    inventoryArray : [],
    editMode : false,
    editObject : {},
    ingredientArray : [],
    quantityArray : [],
    vendorMappingArray : [],
    unitArray : []
}
const Inventory = (state = initialState,action) =>{
    switch(action.type){
        case INVENTORY_SUCCESS : 
        return{
            ...state,
            inventoryArray : action.inventoryArray,
            vendorMappingArray : action.vendorMappingArray,
            quantityArray : action.quantityArray,
            ingredientArray : action.ingredientArray,
            unitArray : action.unitArray
        }
        case SUBMIT_INVENTORY_SUCCESS : 
        return{
            ...state,
            editMode : action.editMode,
            inventoryArray : action.inventoryArray,
            editObject : action.editObject
        }
        case EDIT_INVENTORY_SUCCESS : 
        return{
            ...state,          
            inventoryArray : action.inventoryArray,
            editMode : action.editMode,
            editObject : action.editObject,
        
        }
        case DELETE_INVENTORY_SUCCESS : 
        return{
            ...state,
            inventoryArray : action.inventoryArray 
        }
        default : return state
    }
} 
export default Inventory;