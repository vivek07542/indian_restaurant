export const RECIPE_GENERATOR_SUBMIT_INIT = "RECIPE_GENERATOR_SUBMIT_INIT";

export const RECIPE_GENERATOR_SUBMIT_SUCCESS = "RECIPE_GENERATOR_SUBMIT_SUCCESS";

export const submitHandlerInit = (recipeGeneratorObject) =>{
    return{
        type : RECIPE_GENERATOR_SUBMIT_INIT,
   
        recipeGeneratorObject : recipeGeneratorObject
    }
}

export const submitHandlerSuccess = (recipeGeneratorArray,totalPrice) =>{
    return{
        type : RECIPE_GENERATOR_SUBMIT_SUCCESS,
        recipeGeneratorArray : recipeGeneratorArray,
        totalPrice : totalPrice
    }
}

const initialState = {
    recipeGeneratorArray : [],
    totalPrice : 0 
}
const RecipeGenerator = (state = initialState,action) =>{
    switch(action.type){
        case RECIPE_GENERATOR_SUBMIT_SUCCESS : 
        return{
            ...state,
            totalPrice : action.totalPrice,
            recipeGeneratorArray : action.recipeGeneratorArray
        }
        default : return state;
    }
}
export default RecipeGenerator;
