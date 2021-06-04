// UNIT
export const UNIT_INIT = "UNIT_INIT";

export const UNIT_SUCCESS = "UNIT_SUCCESS";

export const SUBMIT_UNIT_HANDLER_INIT = "SUBMIT_UNIT_HANDLER_INIT";

export const SUBMIT_UNIT_HANDLER_SUCCESS = "SUBMIT_UNIT_HANDLER_SUCCESS";

export const EDIT_UNIT_HANDLER_INIT = "EDIT_UNIT_HANDLER_INIT";

export const EDIT_UNIT_HANDLER_SUCCESS = "EDIT_UNIT_HANDLER_SUCCESS";

export const DELETE_UNIT_HANDLER_INIT = "DELETE_UNIT_HANDLER_INIT";

export const DELETE_UNIT_HANDLER_SUCCESS = "DELETE_UNIT_HANDLER_SUCCESS";

export const initilizerUnitHandlerInit = () =>{
    return{
        type : UNIT_INIT
    }
}

export const initilizerHandlerSuccess = (unitArray) =>{
    return{
        type : UNIT_SUCCESS,
        unitArray : unitArray
    }
}

export const submitHandlerInit = (editMode,unitObject) =>{
    return{
        type : SUBMIT_UNIT_HANDLER_INIT,
        editMode : editMode,
        unitObject : unitObject
    }
}

export const submitHandlerSuccess = (unitArray,editMode,editObject) =>{
    return{
        type : SUBMIT_UNIT_HANDLER_SUCCESS,
        editMode : editMode,
        unitArray : unitArray,
        editObject : editObject
    }
}

export const editHandlerInit = (unitObject) =>{
    return{
        type : EDIT_UNIT_HANDLER_INIT,
        unitObject : unitObject,
        editMode : true
    }
}
export const editHandlerSuccess = (unitArray,editObject,editMode) =>{
    return{
        type : EDIT_UNIT_HANDLER_SUCCESS,
        unitArray : unitArray,
        editObject : editObject,
        editMode : editMode
    }
}
export const deleteHandlerInit = (unitObject) =>{
    return{
        type : DELETE_UNIT_HANDLER_INIT,
        unitObject : unitObject
    }
}

export const deleteHandlerSuccess = (unitArray) =>{
    return{
        type : DELETE_UNIT_HANDLER_SUCCESS,
        unitArray : unitArray
    }
}

const initialState = {
    unitArray : [],
    unitEditMode : false,
    unitEditObject : {}
}

const Unit = (state = initialState,action) =>{
    switch(action.type){
        case UNIT_SUCCESS : 
        return{
            ...state,           
            unitArray : action.unitArray
        }
        case SUBMIT_UNIT_HANDLER_SUCCESS : 
        return{
            ...state,
            editMode : action.editMode,
            unitArray : action.unitArray,
            editObject : action.editObject
        }
        case EDIT_UNIT_HANDLER_SUCCESS : 
        return{
            ...state,          
            editMode : action.editMode,
            editObject : action.editObject,
            unitArray : action.unitArray
        }
        case DELETE_UNIT_HANDLER_SUCCESS : 
        return{
            ...state,
            unitArray : action.unitArray 
        }
        default : return state
    }
}
export default Unit;