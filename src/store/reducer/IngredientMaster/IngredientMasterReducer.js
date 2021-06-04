
// INGREDIENT
export const INGREDIENT_INIT = "INGREDIENT_INIT";

export const INGREDIENT_SUCCESS = "INGREDIENT_SUCCESS";

export const SUBMIT_INGREDIENT_HANDLER_INIT = "SUBMIT_INGREDIENT_HANDLER_INIT";

export const SUBMIT_INGREDIENT_HANDLER_SUCCESS = "SUBMIT_INGREDIENT_HANDLER_SUCCESS";

export const EDIT_INGREDIENT_HANDLER_INIT = "EDIT_INGREDIENT_HANDLER_INIT";

export const EDIT_INGREDIENT_HANDLER_SUCCESS = "EDIT_INGREDIENT_HANDLER_SUCCESS";

export const DELETE_INGREDIENT_HANDLER_INIT = "DELETE_INGREDIENT_HANDLER_INIT";

export const DELETE_INGREDIENT_HANDLER_SUCCESS = "DELETE_INGREDIENT_HANDLER_SUCCESS";

export const initilizerIngredientHandlerInit = () =>{
    return{
        type : INGREDIENT_INIT
    }
}

export const initilizerHandlerSuccess = (ingredientArray,unitArray,quantityArray) =>{
    return{
        type : INGREDIENT_SUCCESS,
        ingredientArray : ingredientArray,
        unitArray : unitArray,
        quantityArray : quantityArray  
    }
}

export const submitHandlerInit = (editMode,ingredientObject) =>{
    return{
        type : SUBMIT_INGREDIENT_HANDLER_INIT,
        editMode : editMode,
        ingredientObject : ingredientObject
    }
}

export const submitHandlerSuccess = (ingredientArray,editMode,editObject) =>{
    return{
        type : SUBMIT_INGREDIENT_HANDLER_SUCCESS,
        editMode : editMode,
        ingredientArray : ingredientArray,
        editObject : editObject
    }
}

export const editHandlerInit = (ingredientObject) =>{
    return{
        type : EDIT_INGREDIENT_HANDLER_INIT,
        ingredientObject : ingredientObject,
        editMode : true
    }
}
export const editHandlerSuccess = (ingredientArray,editObject,editMode) =>{
    return{
        type : EDIT_INGREDIENT_HANDLER_SUCCESS,     
        ingredientArray : ingredientArray, 
        editObject : editObject,
        editMode : editMode
    }
}
export const deleteHandlerInit = (ingredientObject) =>{
    return{
        type : DELETE_INGREDIENT_HANDLER_INIT,
        ingredientObject : ingredientObject
    }
}

export const deleteHandlerSuccess = (ingredientArray) =>{
    return{
        type : DELETE_INGREDIENT_HANDLER_SUCCESS,
        ingredientArray : ingredientArray
    }
}

const initialState = {
    ingredientArray : [],
    unitArray : [],
    quantityArray : [],
    editMode : false,
    editObject : {},
 
}
const IngredientMaster = (state = initialState,action) =>{
    switch(action.type){
        case INGREDIENT_SUCCESS : 
        return{
            ...state,
            ingredientArray : action.ingredientArray,
            unitArray : action.unitArray,
            quantityArray : action.quantityArray        
        }
        case SUBMIT_INGREDIENT_HANDLER_SUCCESS : 
        return{
            ...state,
            editMode : action.editMode,
            ingredientArray : action.ingredientArray,
            editObject : action.editObject
        }
        case EDIT_INGREDIENT_HANDLER_SUCCESS : 
        return{
            ...state,          
            ingredientArray : action.ingredientArray,
            editMode : action.editMode,
            editObject : action.editObject,
        
        }
        case DELETE_INGREDIENT_HANDLER_SUCCESS : 
        return{
            ...state,
            ingredientArray : action.ingredientArray 
        }
        default : return state
    }
}
export default IngredientMaster;