export const AutoComplete = (e,Array,elementValue,setArray,setDisplay,setIndex,indexing)=>{
    let inputValue = e.target.value;
    const array = JSON.parse(localStorage.getItem(Array));
    let emptyArray = [];
    let wrongArray = [];
    array.forEach(element => {
        let matchValue = null;
        if(elementValue === "foodItem"){
            matchValue = element.foodItem.match(inputValue);    
        }
        else if(elementValue === "ingredientName"){
            matchValue = element.ingredientName.match(inputValue);
        }
        else if(elementValue === "vendorName"){
            matchValue = element.vendorName.match(inputValue);
        }            
        if (matchValue !== null) {
            let object = {};
            if(elementValue === "foodItem"){
                let objIndex = array.findIndex((obj => obj.foodItem === matchValue.input));                     
                object.id = array[objIndex].id;
                object.foodItem = array[objIndex].foodItem; 
                object.foodPrice = array[objIndex].foodPrice;
                setIndex !== null && setIndex(indexing) 
            }
            if(elementValue === "ingredientName"){
                let objIndex = array.findIndex((obj => obj.ingredientName === matchValue.input));
                object.id = array[objIndex].id;
                object.ingredientName = array[objIndex].ingredientName;  
                if(Array === "vendorMappingArray"){
                object.vendorQuoteArray = array[objIndex].vendorQuoteArray;
                object.unitId = array[objIndex].unitId; 
                }    
                setIndex !== null && setIndex(indexing) 
            }
            if(elementValue === "vendorName"){
                let objIndex = array.findIndex((obj => obj.vendorName === matchValue.input));
                object.id = array[objIndex].id;
                object.vendorName = array[objIndex].vendorName;    
            }
            emptyArray.push(object);
            setArray(emptyArray);
            setDisplay(true);

        }
        else {
            let inputLength = inputValue.length
            if (inputLength > 6) {
                wrongArray.push(false)
            }
        }
    });
    let inputLength = inputValue.length;
    if(wrongArray !== null && wrongArray.every((condition) => condition ===  false) && inputLength > 6 ){
        if(elementValue === "ingredientName"){
            if(Array === "vendorMappingArray"){
                let adminDecision = window.confirm(
                    "This Ingridient Not Mapped with Vendor..Please Click to Add"
                   );
                 if (adminDecision) {
                     window.location.href = "#/vendoringredientmapping";
                 } 
            }
            else{
                let adminDecision = window.confirm(
                    "This Ingridient Not In List..Please Click to Add"
                   );
                 if (adminDecision) {
                     window.location.href = "#/ingredientmaster";
                 }
            }
        }

        if(elementValue === "foodItem"){
            let adminDecision = window.confirm(
                "This Food Item Not In List..Please Click to Add"
               );
             if (adminDecision) {
                 window.location.href = "#/";
             }
        }

        if(elementValue === "vendorName"){
            let adminDecision = window.confirm(
                "This Vendor Not In List..Please Click to Add"
               );
             if (adminDecision) {
                 window.location.href = "#/vendormaster";
             }
        }
    }
}
// export function AutoComplete(input, array, div) {
    // let emptyArray = [];
    // array.forEach(element => {
    //     let matchValue = element.ingridientname.match(input.value);
    //     if (matchValue !== null) {
    //         let objIndex = array.findIndex((obj => obj.ingridientname == matchValue.input));
    //         let object = {};
    //         object.Id = array[objIndex].Id;
    //         object.ingridientname = array[objIndex].ingridientname;
    //         div.style.display = "flex";
    //         emptyArray.push(object);
    //         callFunction(emptyArray, div, input);
    //     }
    //     else {
    //         let inputValue = input.value;
    //         let inputLength = inputValue.length;
    //         if (inputLength > 6) {
    //             if (confirm("This Ingridient Not In List..Please Click to Add")) {
    //                 window.location.href = "IngridientMaster.html";
    //             }
    //         }
    //     }
    // });
// }
// Create Ul Li Using Array 
// export function callFunction(emptyArray, div, input) {
//     div.innerHTML = "";
//     emptyArray.forEach(el => {
//         let ingridientUl = createElements(div, "ul", "col-12 ingridientNameUl", null, null, null, null);
//         let ingridientli = createElements(ingridientUl, "li", "col-12 ingridientNameLi", null, el.ingridientname, null, null)
//         ingridientli.addEventListener("click", function () {
//             clickEventForLi(ingridientli, input, div);
//         });
//     });
// }

// Click Event on Li 
// function clickEventForLi(li, input, div) {
//     input.value = li.innerText;
//     div.style.display = "none";
// }


// export const AutoComplete=(e,Array)=>{
//     let inputValue = e.target.value;
//     const array = JSON.parse(localStorage.getItem(Array));
//     let emptyArray = [];
//     array.forEach(element => {
//         let matchValue = element.foodItem.match(inputValue);
//         if (matchValue !== null) {
//             let objIndex = array.findIndex((obj => obj.foodItem === matchValue.input));
//             let object = {};
//             object.id = array[objIndex].id;
//             object.fooIitem = array[objIndex].fooditem;           
//             emptyArray.push(object);
//             return emptyArray;
//         }
//         else {
//             let inputLength = inputValue.length;
//             if (inputLength > 6) {
//                 let adminDecision = window.confirm(
//                     "This Ingridient Not In List..Please Click to Add"
//                   );
//                 if (adminDecision) {
//                     <Link exact to = "/" />
//                 }
//             }
//         }
//     });
// }
// Create Ul Li Using Array 
// export function callFunctionItem(emptyArray, div, input) {
//     div.innerHTML = "";
//     emptyArray.forEach(el => {
//         let foodItemUl = createElements(div, "ul", "col-12 ingridientNameUl", null, null, null, null);
//         let foodItemli = createElements(foodItemUl, "li", "col-12 ingridientNameLi", null, el.fooditem, null, null)
//         foodItemli.addEventListener("click", function () {
//             clickEventForLi(foodItemli, input, div);
//         });
//     });
// }

// Vendor AutoComplet
// export function autoCompleteVendor(input, array, div){
//     let emptyArray = [];
//     array.forEach(element => {
//         let matchValue = element.vendorname.match(input.value);
//         if (matchValue !== null) {
//             let objIndex = array.findIndex((obj => obj.vendorname == matchValue.input));
//             let object = {};
//             object.Id = array[objIndex].Id;
//             object.vendorname = array[objIndex].vendorname;
//             div.style.display = "flex";
//             emptyArray.push(object);
//             callFunctionVendor(emptyArray, div, input);
//         }
//         else {
//             let inputValue = input.value;
//             let inputLength = inputValue.length;
//             if (inputLength > 6) {
//                 if (confirm("This Vendor Not In List..Please Click to Add")) {
//                     window.location.href = "VendorMaster.html";
//                 }
//             }
//         }
//     });
// }

// Create Ul Li Using Array 
// function callFunctionVendor(emptyArray, div, input) {
//     div.innerHTML = "";
//     emptyArray.forEach(el => {
//         let vendorUl = createElements(div, "ul", "col-12 ingridientNameUl", null, null, null, null);
//         let vendorli = createElements(vendorUl, "li", "col-12 ingridientNameLi", null, el.vendorname, null, null)
//         vendorli.addEventListener("click", function () {
//             clickEventForLi(vendorli, input, div);
//         });
//     });
// }