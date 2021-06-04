export const SUBMIT_TOP_SELL_DISH_INIT = "SUBMIT_TOP_SELL_DISH_INIT";

export const SUBMIT_TOP_SELL_DISH_SUCCESS = "SUBMIT_TOP_SELL_DISH_SUCCESS";

export const SUBMIT_TOP_SELL_INGREDIENT_INIT = "SUBMIT_TOP_SELL_INGREDIENT_INIT";

export const SUBMIT_TOP_SELL_INGREDIENT_SUCCESS = "SUBMIT_TOP_SELL_INGREDIENT_SUCCESS";

export const submitTopDishHandlerInit = (topSellObject) =>{
   return{
       type : SUBMIT_TOP_SELL_DISH_INIT,
       topSellObject : topSellObject
   }
}

export const submitTopIngredienthHandlerInit = (topSellObject) =>{
    return{
        type : SUBMIT_TOP_SELL_INGREDIENT_INIT,
        topSellObject : topSellObject
    }
 }

 export const submitTopDishHandlerSuccess = (topSellDish) =>{
    return{
        type : SUBMIT_TOP_SELL_DISH_SUCCESS,
        topSellDish : topSellDish,
        topSellIngredient : []
    }
 }
 
 export const submitTopIngredienthHandlerSuccess = (topSellIngredient) =>{
     return{
         type : SUBMIT_TOP_SELL_INGREDIENT_SUCCESS,
         topSellIngredient : topSellIngredient,
         topSellDish : []
     }
  }

  const initialState = {
      topSellDish : [],
      topSellIngredient : []
  }

  const TopSell = (state = initialState , action) =>{
    switch(action.type){
        case SUBMIT_TOP_SELL_DISH_SUCCESS :
            return{
                ...state,
                topSellDish : action.topSellDish,
                topSellIngredient : action.topSellIngredient
            } 
        case SUBMIT_TOP_SELL_INGREDIENT_SUCCESS : 
            return{
                ...state,
                topSellIngredient : action.topSellIngredient,
                topSellDish : action.topSellDish 
            }
        default : return state    
    }
  }
  export default TopSell;