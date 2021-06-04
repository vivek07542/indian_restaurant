import {put} from "redux-saga/effects";
import * as topSellAction from "../../reducer/TopSellDish/TopSellDishReducer";
import {getingredientIdToValue,getUnitIdToValue,getQtyIdToValue} from "../../../Utility/stateConversion";

// Function to get Selected Array
const getOrderDate = (startDate,endDate,orderDetail) =>{
    let result = orderDetail.filter(d => {var time = new Date(d.orderDate).getTime();
        return (startDate <= time && time <= endDate);
    });
    return result;
}

const extractMenu = (arrayOfOrder,array) =>{
    let customerOrderDetail = JSON.parse(localStorage.getItem("customerOrderArray"));
    let orderArray=[]
    customerOrderDetail.forEach(element =>{
        element.orderArray.forEach((item) =>{
            item.orderId = element.id;  
            orderArray.push(item);          
        })
    })
    arrayOfOrder.forEach(el =>{
        orderArray.forEach(element =>{
            if(element.orderId === el.id){
                let object = {};
                object.orderedfood = element.foodItemId;
                object.quantity = +element.orderQtyId;
                array.push(object);
            }
        });
    });   
    let countedArray = countEachFood(array);
    return countedArray;
}

const countEachFood = (array) =>{
    var result = [];
    array.reduce(function(res, value) {
     if (!res[value.orderedfood]) {
      res[value.orderedfood] = {orderedfood: value.orderedfood, quantity: 0 };
     result.push(res[value.orderedfood])
     }
     res[value.orderedfood].quantity += value.quantity;
    return res;
    }, {});
    result.sort((a, b) => parseFloat(b.quantity) - parseFloat(a.quantity));
    return result;
}

const sliceTopDishes=(sortedArray,qtyTopServed)=>{   

    let start = 0;
    let topSelection;
    let end = qtyTopServed;
    if (sortedArray !== null) {
        topSelection = sortedArray.slice(start,end);       
    }
    return topSelection;
}

export function* submitTopSellDishHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("customerOrderArray"));
    const updateValue = [...localValue];
    let startDate = new Date(action.topSellObject.dateFrom);
    let endDate = new Date(action.topSellObject.dateTo);
    let qtyTopServed = action.topSellObject.topServed
    let arrayOfOrder =  getOrderDate(startDate,endDate,updateValue);
    let array = [];
    let sortedArray = extractMenu(arrayOfOrder,array);
    let topSelection = sliceTopDishes(sortedArray,qtyTopServed);
    yield put(topSellAction.submitTopDishHandlerSuccess(topSelection));
}



const addMenuId = (array)=>{
    let itemRecipeDetail = JSON.parse(localStorage.getItem("itemRecipeArray"));
    array.forEach(element => {
        itemRecipeDetail.forEach(el =>{
            if(element.orderedfood === el.foodItem){
                element.menuId = el.id;
            }
        });
    });
    return array;
}

const extractIngridient = (array,emptyArray)=>{
    let itemRecipeDetail = JSON.parse(localStorage.getItem("itemRecipeArray"));
    let ingredientArray=[]
    itemRecipeDetail.forEach(element =>{
        element.ingredientRecipeArray.forEach((item) =>{            
            ingredientArray.push(item);          
        })
    })
    array.forEach(el =>{
        ingredientArray.forEach(element =>{
            if(element.menuId === el.menuId){
                let object = {};
                object.ingridient = getingredientIdToValue(element.ingredientId);
                object.unit = getUnitIdToValue(element.unitId);
                object.quantity = Math.ceil(Number(getQtyIdToValue(element.quantityId) * el.quantity));                
                emptyArray.push(object);
            }
        });
    });   
    let countedArray = countEachIngridient(emptyArray);
    return countedArray;
}

// Count Each Food Function
const countEachIngridient=(array)=>{
    var result = [];
    array.reduce(function(res, value) {
     if (!res[value.ingridient]) {
      res[value.ingridient] = {ingridient: value.ingridient, quantity: 0,unit: value.unit};
     result.push(res[value.ingridient])
     }
     res[value.ingridient].quantity += value.quantity;
    return res;
    }, {});
    result.sort((a, b) => parseFloat(b.quantity) - parseFloat(a.quantity));
    return result;
}

export function* submitTopSellIngredientHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("customerOrderArray"));
    const updateValue = [...localValue];
    let startDate = new Date(action.topSellObject.dateFrom);
    let endDate = new Date(action.topSellObject.dateTo);
    let qtyTopServed = action.topSellObject.topServed
    let arrayOfOrder =  getOrderDate(startDate,endDate,updateValue);
    let array = [];
    let sortedArray = extractMenu(arrayOfOrder,array);
    let topSelection = sliceTopDishes(sortedArray,qtyTopServed);
    let addedMenuId = addMenuId(topSelection);
    let emptyArray = [];
    let arrayIngridient = extractIngridient(addedMenuId,emptyArray);
    let topSelectIngridient = sliceTopDishes(arrayIngridient,qtyTopServed);
    yield put(topSellAction.submitTopIngredienthHandlerSuccess(topSelectIngridient));   
}