export const ITEMRECIPE_INIT ="ITEMRECIPE_INIT";
export const ITEMRECIPE_SUCCESS ="ITEMRECIPE_SUCCESS";

export const SUBMIT_ITEMRECIPE_HANDLER_INIT ="SUBMIT_ITEMRECIPE_HANDLER_INIT";
export const SUBMIT_ITEMRECIPE_HANDLER_SUCCESS ="SUBMIT_ITEMRECIPE_HANDLER_SUCCESS";

export const DELETE_ITEMRECIPE_HANDLER_INIT ="DELETE_ITEMRECIPE_HANDLER_INIT";
export const DELETE_ITEMRECIPE_HANDLER_SUCCESS ="DELETE_ITEMRECIPE_HANDLER_SUCCESS";

export const EDIT_ITEMRECIPE_HANDLER_INIT ="EDIT_ITEMRECIPE_HANDLER_INIT";
export const EDIT_ITEMRECIPE_HANDLER_SUCCESS ="EDIT_ITEMRECIPE_HANDLER_SUCCESS";

export const initilizerItemRecipeHandlerInit = () =>{
    return{
        type :ITEMRECIPE_INIT
    }
}

export const initilizerHandlerSuccess = (itemRecipeArray,unitArray,quantityArray) =>{
    return{
        type : ITEMRECIPE_SUCCESS,
        itemRecipeArray : itemRecipeArray,
        unitArray : unitArray,
        quantityArray : quantityArray
    }
}

export const submitHandlerInit = (editMode,itemRecipeObject) =>{
    return{
        type : SUBMIT_ITEMRECIPE_HANDLER_INIT,
        editMode : editMode,
        itemRecipeObject : itemRecipeObject
    }
}

export const submitHandlerSuccess = (itemRecipeArray,editMode,editObject) =>{
    return{
        type : SUBMIT_ITEMRECIPE_HANDLER_SUCCESS,
        editMode : editMode,
        itemRecipeArray : itemRecipeArray,
        editObject : editObject
    }
}

export const editHandlerInit = (itemRecipeObject) =>{
    return{
        type : EDIT_ITEMRECIPE_HANDLER_INIT,
        itemRecipeObject : itemRecipeObject,
        editMode : true
    }
}
export const editHandlerSuccess = (itemRecipeArray,editObject,editMode) =>{
    return{
        type : EDIT_ITEMRECIPE_HANDLER_SUCCESS,
        itemRecipeArray : itemRecipeArray,
        editObject : editObject,
        editMode : editMode
    }
}
export const deleteHandlerInit = (itemRecipeObject) =>{
    return{
        type : DELETE_ITEMRECIPE_HANDLER_INIT,
        itemRecipeObject : itemRecipeObject
    }
}

export const deleteHandlerSuccess = (itemRecipeArray) =>{
    return{
        type : DELETE_ITEMRECIPE_HANDLER_SUCCESS,
        itemRecipeArray : itemRecipeArray
    }
}
const initialState = {
    itemRecipeArray : [],
    unitArray : [],
    quantityArray : [],   
    editMode : false,
    editObject : {},
   
}
const ItemRecipe = (state = initialState,action) =>{
    switch(action.type){
        case ITEMRECIPE_SUCCESS : 
        return{
            ...state,
            itemRecipeArray : action.itemRecipeArray,
            unitArray : action.unitArray,
            quantityArray : action.quantityArray    

        }
        case SUBMIT_ITEMRECIPE_HANDLER_SUCCESS : 
        return {
            ...state,
            editMode : action.editMode,
            itemRecipeArray : action.itemRecipeArray,
            editObject : action.editObject
        }
        case EDIT_ITEMRECIPE_HANDLER_SUCCESS : 
        return{
            ...state,          
            itemRecipeArray : action.itemRecipeArray,
            editMode : action.editMode,
            editObject : action.editObject,
        
        }
        case DELETE_ITEMRECIPE_HANDLER_SUCCESS : 
        return{
            ...state,
            itemRecipeArray : action.itemRecipeArray 
        }
        default : return state
    }
}
export default ItemRecipe;