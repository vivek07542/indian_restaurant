import {put} from "redux-saga/effects";
import * as inventoryAction from "../../reducer/Inventory/InventoryReducer";
import {getIngredientValueToId} from "../../../Utility/stateConversion";

export function* initalizeInventoryHandlerSaga(){

    let localInventoryArray = JSON.parse(localStorage.getItem("inventoryArray"));
    let vendorIngredientMappingValue = JSON.parse(localStorage.getItem("vendorMappingArray"));
    let ingredientValue = JSON.parse(localStorage.getItem("ingredientArray"));
    let quantityValue = JSON.parse(localStorage.getItem("quantityArray"));
    let unitValue = JSON.parse(localStorage.getItem("unitArray"));

    let toDisplayInventory ; 
    if(quantityValue === null){
        quantityValue = []
    }
    if(unitValue === null){
        unitValue = []
    }
    if(ingredientValue === null){
        ingredientValue = []
    }
    if(vendorIngredientMappingValue === null){
        vendorIngredientMappingValue = []
    }
    if(localInventoryArray === null){
        localInventoryArray = [];
        toDisplayInventory = []
        yield localStorage.setItem("inventoryArray",JSON.stringify(localInventoryArray));
    }
    else{
        let inventoryValue = JSON.parse(localStorage.getItem("inventoryArray"));
        let inventoryValueArray = [...inventoryValue]
        toDisplayInventory = conversionForInventoryIdToValue(inventoryValueArray);
    }
    yield localStorage.setItem("quantityArray",JSON.stringify(quantityValue));
    yield localStorage.setItem("unitArray",JSON.stringify(unitValue));
    yield localStorage.setItem("ingredientArray" , JSON.stringify(ingredientValue));
    yield localStorage.setItem("vendorMappingArray" , JSON.stringify(vendorIngredientMappingValue));    
    yield put(inventoryAction.initilizerHandlerSuccess(toDisplayInventory,ingredientValue,quantityValue,vendorIngredientMappingValue,unitValue));
}

const conversionForInventoryIdToValue=(array)=>{
    let ingredientValue = JSON.parse(localStorage.getItem("ingredientArray"));
    let vendorValue = JSON.parse(localStorage.getItem("vendorArray"));
    let quantityValue = JSON.parse(localStorage.getItem("quantityArray"));
    let unitValue = JSON.parse(localStorage.getItem("unitArray"));
    for(let key in array){
        let updatedArray = [...array[key].dateEntryArray]
        updatedArray.forEach(element => {
            const vendorObjIndex = vendorValue.findIndex(item => item.id === +element.vendorId)
            const quantityObjIndex = quantityValue.findIndex(item => item.id === +element.quantityId)
            const unitObjIndex = unitValue.findIndex(item => item.id ===+ element.unitId)
            const ingredientObjIndex = ingredientValue.findIndex(item => item.id === +element.ingredientId)
           
            element.ingredientId = ingredientValue[ingredientObjIndex].ingredientName;
            element.vendorId = vendorValue[vendorObjIndex].vendorName;
            element.quantityId = quantityValue[quantityObjIndex].quantity;
            element.unitId = unitValue[unitObjIndex].unit;
        });    
    }    
    return array;
}

export function* submitInventoryHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("inventoryArray"));
    let updateValue = [...localValue]
    let inventoryObject = {};
    if (action.inventoryObject.id !== null && action.editMode === true){
        const editObjIndex = updateValue.findIndex(item => item.id === action.inventoryObject.id)
        updateValue[editObjIndex].id = action.inventoryObject.id;
        updateValue[editObjIndex].dateFrom = action.inventoryObject.dateFrom;
        updateValue[editObjIndex].dateTo = action.inventoryObject.dateTo;
        updateValue[editObjIndex].totalPurchase = action.inventoryObject.totalPurchase;      
        updateValue[editObjIndex].dateEntryArray = action.inventoryObject.dateEntryArray;
        updateValue[editObjIndex].dateEntryArray = [];
        action.inventoryObject.dateEntryArray.map((item,index)=>{        
             let object = {}
             object.id = index + 1;
             object.ingredientId = +(getIngredientValueToId(item.ingredientId));
             object.vendorId = +item.vendorId;
             object.quantityId = +item.quantityId;
             object.unitId = +item.unitId;
             object.purchasePrice = +item.purchasePrice;
             updateValue[editObjIndex].dateEntryArray.push(object);
            });
    }
    else {
        let inventoryLast = null;
        if (updateValue.length !== 0) {
            const inventoryLastItem = updateValue[updateValue.length - 1];
            inventoryLast = +inventoryLastItem.id;
        }
        else {
            inventoryLast = 0;
        }
    inventoryObject.id = inventoryLast + 1;
    inventoryObject.dateFrom = action.inventoryObject.dateFrom;
    inventoryObject.dateTo = action.inventoryObject.dateTo;
    inventoryObject.totalPurchase = action.inventoryObject.totalPurchase;
  
    inventoryObject.dateEntryArray = action.inventoryObject.dateEntryArray;
    inventoryObject.dateEntryArray = [];
    action.inventoryObject.dateEntryArray.map((item,index)=>{        
         let object = {}
         object.id = index + 1;
         object.ingredientId = +(getIngredientValueToId(item.ingredientId));
         object.vendorId = +item.vendorId;
         object.quantityId = +item.quantityId;
         object.unitId = +item.unitId;
         object.purchasePrice = +item.purchasePrice;
         inventoryObject.dateEntryArray.push(object);
        });
        updateValue.push(inventoryObject);
        inventoryObject = {};
    }
    let editMode = false; 
    yield localStorage.setItem("inventoryArray", JSON.stringify(updateValue));
    const localValueInventory = JSON.parse(localStorage.getItem("inventoryArray"));
    let convertArray = conversionForInventoryIdToValue(localValueInventory);
    yield put(inventoryAction.submitHandlerSuccess(convertArray,editMode,inventoryObject));
}

const conversionObjectForInventoryValueToId = (object) =>{
    // let ingredientValue = JSON.parse(localStorage.getItem("ingredientArray"));
    let vendorValue = JSON.parse(localStorage.getItem("vendorArray"));
    let quantityValue = JSON.parse(localStorage.getItem("quantityArray"));
    let unitValue = JSON.parse(localStorage.getItem("unitArray"));
    let updatedArray = [...object.dateEntryArray]
    updatedArray.forEach(element => {
        const vendorObjIndex = vendorValue.findIndex(item => item.vendorName === element.vendorId);
        const quantityObjIndex = quantityValue.findIndex(item => item.quantity === element.quantityId);
        const unitObjIndex = unitValue.findIndex(item => item.unit === element.unitId);
        element.vendorId = vendorValue[vendorObjIndex].id;
        element.quantityId = quantityValue[quantityObjIndex].id;
        element.unitId = unitValue[unitObjIndex].id;
    });        
    return object;
}

export function* editInventoryHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("inventoryArray"));
    let updateValue = [...localValue];
    let convertArray = conversionForInventoryIdToValue(updateValue)
    let editObject = conversionObjectForInventoryValueToId(action.inventoryObject);
    yield put(inventoryAction.editHandlerSuccess(convertArray,editObject,action.editMode));
}  
export function* deleteInventoryHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("inventoryArray"));
    let updateValue = [...localValue];
    const deleteObjIndex = updateValue.findIndex(item => item.id === action.inventoryObject.id)
    updateValue.splice(deleteObjIndex, 1);
    yield localStorage.setItem("inventoryArray", JSON.stringify(updateValue));
    const localValueInventory = JSON.parse(localStorage.getItem("inventoryArray"));
    let convertArray = conversionForInventoryIdToValue(localValueInventory);
    yield put(inventoryAction.deleteHandlerSuccess(convertArray));
}
