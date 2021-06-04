import {put} from "redux-saga/effects";
import * as vendorMappingAction from "../../reducer/VendorIngredientMappingReducer/VendorIngredientMappingReducer";

export function* initializeVendorMappingSaga(action){
    let  localVendorMappingValue= JSON.parse(localStorage.getItem("vendorMappingArray"));
    let vendorValue = JSON.parse(localStorage.getItem("vendorArray"));
    let unitValue = JSON.parse(localStorage.getItem("unitArray"));
    let ingredientValue = JSON.parse(localStorage.getItem("ingredientArray"));
    let toDisplayVendorMappingValue ;
    if(vendorValue === null){
        vendorValue = []
    }
    if(unitValue === null){
        unitValue = []
    }
    if(ingredientValue === null){
        ingredientValue = []
    }
    if(localVendorMappingValue === null){
        localVendorMappingValue = [];
        toDisplayVendorMappingValue = []
        yield localStorage.setItem("vendorMappingArray",JSON.stringify(localVendorMappingValue));
    }
    else if(localVendorMappingValue !== null){
        let  localVendorMappingValue= JSON.parse(localStorage.getItem("vendorMappingArray"));
        let localVendorMappingArray = [...localVendorMappingValue];
        toDisplayVendorMappingValue = conversionForVendorMappingIdToValue(localVendorMappingArray);
    }
    yield localStorage.setItem("vendorArray",JSON.stringify(vendorValue));
    yield localStorage.setItem("ingredientArray",JSON.stringify(ingredientValue));
    yield localStorage.setItem("unitArray",JSON.stringify(unitValue));
    yield put(vendorMappingAction.initilizerHandlerSuccess(toDisplayVendorMappingValue,ingredientValue,vendorValue,unitValue));
}

const conversionForVendorMappingIdToValue=(array)=>{
    let vendorValue = JSON.parse(localStorage.getItem("vendorArray"));
    for(let key in array){
        let updatedArray = [...array[key].vendorQuoteArray]
        updatedArray.forEach(element => {
            const vendorObjIndex = vendorValue.findIndex(item => item.id === element.vendorId);
            element.vendorId = vendorValue[vendorObjIndex].vendorName;
        });    
    }
    return array;
}

export function* submitVendorMappingtHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("vendorMappingArray"));
    let updateValue = [...localValue]
    let vendorMappingObject = {};
    if (action.vendorMappingObject.id !== null && action.editMode === true){
        const editObjIndex = updateValue.findIndex(item => item.id === action.vendorMappingObject.id)
        updateValue[editObjIndex].id = action.vendorMappingObject.id;
        updateValue[editObjIndex].ingredientName = action.vendorMappingObject.ingredientName;
        updateValue[editObjIndex].unitId = action.vendorMappingObject.unitId;
        updateValue[editObjIndex].vendorQuoteArray = action.vendorMappingObject.vendorQuoteArray;
        updateValue[editObjIndex].vendorQuoteArray = [];
        action.vendorMappingObject.vendorQuoteArray.map((item,index)=>{        
             let object = {}
             object.id = index + 1;
             object.vendorId = +item.vendorId;
             object.quotePrice = +item.quotePrice;
             updateValue[editObjIndex].vendorQuoteArray.push(object);
            });
    }
    else {
        let vendorMappingLast = null;
        if (updateValue.length !== 0) {
            const vendorMappingLastItem = updateValue[updateValue.length - 1];
            vendorMappingLast = +vendorMappingLastItem.id;
        }
        else {
            vendorMappingLast = 0;
        }
    vendorMappingObject.id = vendorMappingLast + 1;
    vendorMappingObject.ingredientName = action.vendorMappingObject.ingredientName;
    vendorMappingObject.unitId = action.vendorMappingObject.unitId;
    vendorMappingObject.recipeDescription = action.vendorMappingObject.recipeDescription;
    vendorMappingObject.basePrice = action.vendorMappingObject.basePrice;
    vendorMappingObject.vendorQuoteArray = action.vendorMappingObject.vendorQuoteArray;
    vendorMappingObject.vendorQuoteArray = [];
    action.vendorMappingObject.vendorQuoteArray.map((item,index)=>{        
         let object = {}
         object.id = index + 1;
         object.vendorId = +item.vendorId;
         object.quotePrice = +item.quotePrice;
         vendorMappingObject.vendorQuoteArray.push(object);
        });
        updateValue.push(vendorMappingObject);
        vendorMappingObject = {};
    }
    let editMode = false; 
    yield localStorage.setItem("vendorMappingArray", JSON.stringify(updateValue));
    const localvendorMapping = JSON.parse(localStorage.getItem("vendorMappingArray"));
    let convertArray = conversionForVendorMappingIdToValue(localvendorMapping);
    yield put(vendorMappingAction.submitHandlerSuccess(convertArray,editMode,vendorMappingObject));
}

const conversionObjectForVendortValueToId = (object) =>{
        let vendorValue = JSON.parse(localStorage.getItem("vendorArray"));      
            let updatedArray = [...object.vendorQuoteArray]
            updatedArray.forEach(element => {
                const vendorObjIndex = vendorValue.findIndex(item => item.vendorName === element.vendorId);
                element.vendorId = vendorValue[vendorObjIndex].id;
            }); 
    return object;
}

export function* editVendorMappingHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("vendorMappingArray"));
    let updateValue = [...localValue];
    let convertArray = conversionForVendorMappingIdToValue(updateValue);
    let editObject = conversionObjectForVendortValueToId(action.vendorMappingObject);
    yield put(vendorMappingAction.editHandlerSuccess(convertArray,editObject,action.editMode));
}
export function*deleteVendorMappingHandlerSaga(action){    
    const localValue = JSON.parse(localStorage.getItem("vendorMappingArray"));
    let updateValue = [...localValue];
    const deleteObjIndex = updateValue.findIndex(item => item.id === action.vendorMappingObject.id)
    updateValue.splice(deleteObjIndex, 1);
    yield localStorage.setItem("vendorMappingArray", JSON.stringify(updateValue));
    const localValueVendor = JSON.parse(localStorage.getItem("vendorMappingArray"));
    let convertArray = conversionForVendorMappingIdToValue(localValueVendor);
    yield put(vendorMappingAction.deleteHandlerSuccess(convertArray));
} 