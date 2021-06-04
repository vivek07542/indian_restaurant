// function to convert Id To Value
export const getQtyIdToValue = (element) =>{
    let qtyDetail = JSON.parse(localStorage.getItem("quantityArray"));
    let qtyValue;
    let qtyValueN;
    qtyDetail.forEach(el =>{
        if(+element === +el.id){
             qtyValue = el.quantity;
             qtyValueN = Number(qtyValue);
        }
    });
    return qtyValueN;
}
// function to ingredient convert  Value To Id
export const getingredientIdToValue = (element) =>{
    let ingredientDetail = JSON.parse(localStorage.getItem("ingredientArray"));
    let ingredientValue;   
    ingredientDetail.forEach(el =>{
        if(+element === +el.id){
            ingredientValue = el.ingredientName;
        }
    });
    return ingredientValue;
}
// function to Unit convert  ID To Value
export const getUnitIdToValue = (element) => {
    let unitDetail = JSON.parse(localStorage.getItem("unitArray"));
    let unitValue;   
    unitDetail.forEach(el =>{
        if(+element === +el.id){
            unitValue = el.unit;
        }
    });
    return unitValue;
}
// function to convert Value To Id
export const getQtyValueToId = (element)=>{
    let qtyDetail = JSON.parse(localStorage.getItem("quantityArray"));
    let qtyId;
    qtyDetail.forEach(el =>{
        if(+element === +el.quantity){
             qtyId = el.Id;
        }
    });
    return qtyId;
}
// Function For ingredient Value To Id
export const getIngredientValueToId = (element) =>{
    let ingredientDetail = JSON.parse(localStorage.getItem("ingredientArray"));
    let ingredientId;
    ingredientDetail.forEach(el =>{
        if(element === el.ingredientName){
            ingredientId = el.id;
        }
    });
    return ingredientId;
}
// function to convert Value To Id
export const getUnitValueToId = (element)=>{
    let unitDetail = JSON.parse(localStorage.getItem("unitArray"));
    let unitId;
    unitDetail.forEach(el =>{
        if(element === el.unit){
             unitId = el.id;
        }
    });
    return unitId;
}    

// // Menu Value To Id
// export const createMenuValueToId = (element) =>{
//     let menuDetail = JSON.parse(localStorage.getItem("menuReciepeDetail"));
//     let menuId;
//     menuDetail.forEach(el =>{
//         if(element == el.fooditem){
//             menuId = el.Id;
//         }
//     })
//     return menuId;
// }
// // Menu Id To Value
// export const createMenuIdToValue = (element)=>{
//     let menuDetail = JSON.parse(localStorage.getItem("menuReciepeDetail"));
//     let menuValue;
//     menuDetail.forEach(el =>{
//         if(element == el.Id){
//             menuValue = el.fooditem;
//         }
//     });
//     return menuValue;
// }
// Vendor Value To Id
export const createVendorValueToId = (element) =>{
    let vendorArray = JSON.parse(localStorage.getItem("vendorArray"));
    let vendorId;
    vendorArray.forEach(el =>{
        if(element === el.vendorName){
            vendorId = el.id;
        }
    })
    return vendorId;
}
// Vendor Id To Value
export const createVendorIdToValue=(element)=>{
    let vendorArray = JSON.parse(localStorage.getItem("vendorArray"));
    let vendorValue;
    vendorArray.forEach(el =>{
        if(+element === +el.id){
            vendorValue = el.vendorName;
        }
    });
    return vendorValue;
}