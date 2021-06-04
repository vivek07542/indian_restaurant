export const INIT = "INIT";

export const SUCCESS = "SUCCESS";

export const SUBMIT_HANDLER_INIT = "SUBMIT_HANDLER_INIT";

export const SUBMIT_HANDLER_SUCCESS = "SUBMIT_HANDLER_SUCCESS";

export const EDIT_HANDLER_INIT = "EDIT_HANDLER_INIT";

export const EDIT_HANDLER_SUCCESS = "EDIT_HANDLER_SUCCESS";

export const DELETE_HANDLER_INIT = "DELETE_HANDLER_INIT";

export const DELETE_HANDLER_SUCCESS = "DELETE_HANDLER_SUCCESS";

export const initilizerHandlerInit = () =>{
    return{
        type : INIT
    }
}

export const initilizerHandlerSuccess = (foodItemArray) =>{
    return{
        type : SUCCESS,
        foodItemArray : foodItemArray
    }
}
export const submitHandlerInit = (editMode,foodItemObject) =>{
    return{
        type : SUBMIT_HANDLER_INIT,
        editMode : editMode,
        foodItemObject : foodItemObject
    }
}

export const submitHandlerSuccess = (foodItemArray,editMode,editObject) =>{
    return{
        type : SUBMIT_HANDLER_SUCCESS,
        editMode : editMode,
        foodItemArray : foodItemArray,
        editObject : editObject
    }
}

export const editHandlerInit = (foodItemObject) =>{
    return{
        type : EDIT_HANDLER_INIT,
        foodItemObject : foodItemObject,
        editMode : true
    }
}
export const editHandlerSuccess = (foodItemArray,editObject,editMode) =>{
    return{
        type : EDIT_HANDLER_SUCCESS,
        foodItemArray : foodItemArray,
        editObject : editObject,
        editMode : editMode
    }
}
export const deleteHandlerInit = (foodItemObject) =>{
    return{
        type : DELETE_HANDLER_INIT,
        foodItemObject : foodItemObject
    }
}

export const deleteHandlerSuccess = (foodItemArray) =>{
    return{
        type : DELETE_HANDLER_SUCCESS,
        foodItemArray : foodItemArray
    }
}
const initialState = {
    editMode: false,
    editObject : {},
    foodItemArray : []
}

const FoodItem = (state=initialState,action) =>{
    switch(action.type){
        case SUCCESS : 
        return{
            ...state,
            foodItemArray : action.foodItemArray
        }
        case SUBMIT_HANDLER_SUCCESS : 
        return{
            ...state,
            editMode : action.editMode,
            foodItemArray : action.foodItemArray,
            editObject : action.editObject
        }
        case EDIT_HANDLER_SUCCESS : 
        return{
            ...state,          
            editMode : action.editMode,
            editObject : action.editObject,
            foodItemArray : action.foodItemArray
        }
        case DELETE_HANDLER_SUCCESS : 
        return{
            ...state,
            foodItemArray : action.foodItemArray 
        }
        default :return state;
    }
}
export default FoodItem;