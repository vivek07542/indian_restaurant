export const VerifyItem = (item,Array,category,setDisabledValue) =>{
    const array = JSON.parse(localStorage.getItem(Array));
    let valueObtained;
    if(category === "recipeCheck"){
       valueObtained =  array.some(recipe => recipe.foodItem === item);   
        if(!valueObtained){
            let adminDecision = window.confirm( 
                "The Recipe is not generated yet..Please Click to Add"
            );
            if (adminDecision) {
                window.location.href = "#/itemrecipe";
            } 
        }
    }  

    valueObtained && setDisabledValue(false);
}