import {getQtyIdToValue,getUnitIdToValue} from "./stateConversion";

export const PriceCalculation=(ingredient,qty,unit,index,setPrice,setPriceIndex)=>{
if(ingredient && qty && unit){
    let reciepeRequiredPrice;
    let ingredientDetail = JSON.parse(localStorage.getItem("ingredientArray"));
    ingredientDetail.forEach(element => {
        if (element.ingredientName === ingredient) {
            let ingredientQty = getQtyIdToValue(element.quantityId)
            let ingredientPrice = Number(element.ingredientPrice);
            let ingredientUnit = getUnitIdToValue(element.unitId);
            let reciepeRequiredQty = getQtyIdToValue(qty);
            let reciepeRequiredUnit = getUnitIdToValue(unit);
            if (ingredientUnit === reciepeRequiredUnit) {
                reciepeRequiredPrice = Math.ceil(ingredientPrice / ingredientQty) * reciepeRequiredQty;
            }
            else {
                if (reciepeRequiredUnit === "gram" || reciepeRequiredUnit === "ml") {
                    reciepeRequiredPrice = Math.ceil(ingredientPrice / ingredientQty) * reciepeRequiredQty / 1000;
                }
                else if (reciepeRequiredUnit === "kg" || reciepeRequiredUnit === "litre") {
                    reciepeRequiredPrice = Math.ceil(ingredientPrice / ingredientQty) * reciepeRequiredQty * 1000;
                }
            }
        }
    });
    setPrice(reciepeRequiredPrice);
    setPriceIndex(index);     
    return reciepeRequiredPrice;
    }
}

export const PriceVendorCalculation=(ingredient,qty,unit,index,setPrice,setPriceIndex,vendorId)=>{
    if(ingredient && qty && unit && vendorId){
        let reciepeRequiredPrice;
        let vendorDetail = JSON.parse(localStorage.getItem("vendorMappingArray"));
        const ingredientObject = vendorDetail.find(item => item.ingredientName === ingredient);
        const vendorObject = ingredientObject.vendorQuoteArray.find(vendor =>vendor.vendorId === +vendorId);
        let ingredientPrice = Number(vendorObject.quotePrice);

        let ingredientDetail = JSON.parse(localStorage.getItem("ingredientArray"));
        ingredientDetail.forEach(element => {
            if (element.ingredientName === ingredient) {
                let ingredientQty = getQtyIdToValue(element.quantityId)
                let ingredientUnit = getUnitIdToValue(element.unitId);
                let reciepeRequiredQty = getQtyIdToValue(qty);
                let reciepeRequiredUnit = getUnitIdToValue(unit);
                if (ingredientUnit === reciepeRequiredUnit) {
                    reciepeRequiredPrice = Math.ceil(ingredientPrice / ingredientQty) * reciepeRequiredQty;
                }
                else {
                    if (reciepeRequiredUnit === "gram" || reciepeRequiredUnit === "ml") {
                        reciepeRequiredPrice = Math.ceil(ingredientPrice / ingredientQty) * reciepeRequiredQty / 1000;
                    }
                    else if (reciepeRequiredUnit === "kg" || reciepeRequiredUnit === "litre") {
                        reciepeRequiredPrice = Math.ceil(ingredientPrice / ingredientQty) * reciepeRequiredQty * 1000;
                    }
                }
            }
        });
        setPrice(reciepeRequiredPrice);
        setPriceIndex(index);     
        return reciepeRequiredPrice;
        }
}

export const PriceFoodCalculation=(foodItem,qty,index,setPrice,setPriceIndex)=>{
    if(foodItem && qty ){    
        let foodPriceRequired;
        let foodDetail = JSON.parse(localStorage.getItem("foodItemArray"));
        const foodObject = foodDetail.find(item => item.foodItem === foodItem);
        let foodPrice = Number(foodObject.foodPrice);
        if(qty === 1){
            foodPriceRequired = foodPrice;
        }   
        else{
            foodPriceRequired = +qty*foodPrice;
        }
        setPrice(foodPriceRequired);
        setPriceIndex(index);     
        return foodPriceRequired;
    }
}