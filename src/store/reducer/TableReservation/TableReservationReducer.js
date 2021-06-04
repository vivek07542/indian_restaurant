export const RESERVATION_TABLE_INIT = "RESERVATION_TABLE_INIT";

export const RESERVATION_SUCCESS = "RESERVATION_SUCCESS";

export const RESERVATION_TABLE_SUBMIT_INIT = "RESERVATION_TABLE_SUBMIT_INIT";

export const RESERVATION_SUBMIT_SUCCESS = "RESERVATION_SUBMIT_SUCCESS";

export const EDIT_TABLE_RESERVATION_INIT = "EDIT_TABLE_RESERVATION_INIT";

export const EDIT_RESERVATION_SUCCESS = "EDIT_RESERVATION_SUCCESS";

export const DELETE_TABLE_RESERVATION_INIT = "DELETE_TABLE_RESERVATION_INIT";

export const DELETE_RESERVATION_SUCCESS = "DELETE_RESERVATION_SUCCESS";

export const initilizerReservationInit=()=>{
    console.log("HOLLO");
    return{
        type : RESERVATION_TABLE_INIT,
    }
}

export const initilizerReservationSuccess=(tableReservationArray)=>{
    console.log("Print INIT SUCCESS")
    return{
        type : RESERVATION_SUCCESS,
        tableReservationArray : tableReservationArray     
    }
}

export const submitHandlerInit = (editMode,tableReservationObject) =>{    
    console.log(tableReservationObject)
    return{
        type : RESERVATION_TABLE_SUBMIT_INIT,
        editMode : editMode,
        tableReservationObject : tableReservationObject
    }
}

export const submitHandlerSuccess = (tableReservationArray,editMode,editObject) =>{
    return{
        type : RESERVATION_SUBMIT_SUCCESS,
        editMode : editMode,
        tableReservationArray : tableReservationArray,
        editObject : editObject
    }
}

export const editHandlerInit = (tableReservationObject) =>{
    return{
        type : EDIT_TABLE_RESERVATION_INIT,
        tableReservationObject : tableReservationObject,
        editMode : true
    }
}
export const editHandlerSuccess = (tableReservationArray,editObject,editMode) =>{
    return{
        type : EDIT_RESERVATION_SUCCESS,
        tableReservationArray : tableReservationArray,
        editObject : editObject,
        editMode : editMode
    }
}
export const deleteHandlerInit = (tableReservationObject) =>{
    return{
        type : EDIT_TABLE_RESERVATION_INIT,
        tableReservationObject : tableReservationObject
    }
}

export const deleteHandlerSuccess = (tableReservationArray) =>{
    return{
        type : DELETE_RESERVATION_SUCCESS,
        tableReservationArray : tableReservationArray
    }
}
const initialState = {
    editMode : false,
    editObject : {},
    tableReservationArray : [],
    reservationLeft : 10
}

const TableReservation = (state = initialState,action) =>{
    switch(action.type){
        case RESERVATION_SUCCESS : 
        return{
            ...state,
            tableReservationArray : action.tableReservationArray,
      
        }
        case RESERVATION_SUBMIT_SUCCESS : 
        return{
            ...state,
            editMode : action.editMode,
            tableReservationArray : action.tableReservationArray,
            editObject : action.editObject
        }
        case EDIT_RESERVATION_SUCCESS : 
        return{
            ...state,          
            editMode : action.editMode,
            editObject : action.editObject,
            tableReservationArray : action.tableReservationArray
        }
        case DELETE_RESERVATION_SUCCESS : 
        return{
            ...state,
            tableReservationArray : action.tableReservationArray 
        }
        default : return state
    }
}
export default TableReservation