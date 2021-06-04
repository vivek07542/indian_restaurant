import React, { useState, useEffect } from "react";
import Button from "../../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import FormWrapper from "../../component/FormWrapper/FormWrapper";
import TableWrapper from "../../component/TableWrapper/TableWrapper";
import { useForm, useFieldArray} from "react-hook-form";
import classNames from "classnames";
import * as action from "../../store/reducer/ItemRecipe/ItemRecipeReducer";
import { AutoComplete } from "../../Utility/AutoComplete";
import { PriceCalculation} from "../../Utility/PriceCalculation";
import Table from "../../UI/Table/Table";
const ItemRecipe = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitted},
    control,
    getValues,
    setValue,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      ingredientRecipeArray: [
        { ingredientId: "", quantityId: "", unitId: "", ingredientPrice: "" },
      ],
    },
  });
  const { append, fields, remove } = useFieldArray({
    control,
    name: "ingredientRecipeArray",
  });

  // For Normal Page Functioning
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState(null);
  const [price, setPrice] = useState("");
  const [priceIndex, setPriceIndex] = useState();
  // For Display Card
  const [foodDisplay, setFoodDisplay] = useState(false);
  const [foodarray, setFoodArray] = useState(null);
  const [ingredientDisplay, setIngredientDisplay] = useState();
  const [ingredientIndex, setIngredientIndex] = useState();
  const [ingredientarray, setIngredientArray] = useState(null);
  // Reducer Function
  const dispatch = useDispatch();
  let unitArray = useSelector((state) => state.ItemRecipe.unitArray);
  let quantityArray = useSelector((state) => state.ItemRecipe.quantityArray);
  let itemRecipeArray  = useSelector(state => state.ItemRecipe.itemRecipeArray);
  const editItemRecipeMode = useSelector(state => state.ItemRecipe.editMode);
  const editObject = useSelector(state =>state.ItemRecipe.editObject);

  if(itemRecipeArray === undefined && itemRecipeArray === null){
    itemRecipeArray = [];
    }
    const selQuantity = quantityArray.map((qty) => (
      <option key={qty.id} value={qty.id}>
        {qty.quantity}
      </option>
    ));
    const selUnit = unitArray.map((unit) => (
      <option key={unit.id} value={unit.id}>
        {unit.unit}
      </option>
    ));
  useEffect(() => {
    sumUpTotal()
  }, [fields])

  useEffect(() => {
    dispatch(action.initilizerItemRecipeHandlerInit());
  }, []);

  useEffect(() => {
    setValue(`ingredientRecipeArray[${priceIndex}].ingredientPrice`, price, {shouldValidate: true});
  }, [price]);

  useEffect(() => {    
    if (isSubmitted) {
      reset();
    }
  }, [isSubmitted,reset]);

  useEffect(()=>{
    if(editItemRecipeMode !== editMode){          
        const {id,foodItem,serving,recipeDescription,basePrice,ingredientRecipeArray} = {...editObject} 
        setEditMode(editItemRecipeMode );
        setId(id);
        reset({foodItem : foodItem ,serving : serving,recipeDescription: recipeDescription,basePrice : basePrice,ingredientRecipeArray : ingredientRecipeArray }); 
    }   
},[editItemRecipeMode,editObject]);

  const onSubmit = (data) => {    
    data.id = id;
    dispatch(action.submitHandlerInit(editMode, data));
  };
  
  const sumUpTotal = () =>{     
        let priceInput = document.querySelectorAll(".priceInput");
        let total = 0;
        for(let i=0; i < priceInput.length; i++){
                total += Number(priceInput[i].value)
        }
      setValue("basePrice",total,{shouldValidate : true});   
  }

  const autoHandler = (
    e,
    Array,
    elementValue,
    setArray,
    setDisplay,
    setIndex,
    indexing
  ) => {
    AutoComplete(
      e,
      Array,
      elementValue,
      setArray,
      setDisplay,
      setIndex,
      indexing
    );
  };
  let recipeChart = (
    <div className="col-lg-6 col-sm-12  ">
    {itemRecipeArray.map((dish,index) => {
     let array = [];
      let object = {}
        object.id = dish.id;
        object.foodItem = dish.foodItem;
        object.recipeDescription = dish.recipeDescription;
        object.serving = dish.serving;
        object.basePrice=dish.basePrice
  array.push(object)
      return(
  <div key = {index} className = "jumbotron formWrapper my-2">   
                <Table 
                    tableData = {array}
                    headingColumns = {[
                  "Id",
                  "Food Item",
                  "RecipeDescription",
                  "Serving",
                  "Base Price",
                  "Edit",
                  "Delete"
                  ]}
                    breakOn = "large"
                    addEditButton = {true}
                    addDeleteButton = {true}
                    editHandler = {()=>dispatch(action.editHandlerInit(dish))}
                    deleteHandler = {()=>dispatch(action.deleteHandlerInit(dish))}
                />    
              <div className = "row">
              <div className = "col-12">
                      <TableWrapper
                  tableData={dish.ingredientRecipeArray}
                  headingColumns={[
                  "Id",
                  "ingredient",
                  "Quantity ",
                  "Unit",
                  "Cost",
                  "Menu Id",                  
                  ]}
                  breakOn="large"
                  addDeleteButton={false}
                  addEditButton={false}
              />
              </div>
          </div>

      </div>)
      
    })}
    </div>
    )
  return (
    <div className="container-fluid text-center">
      <div className="row ">
        <h1 className="display-4 heading">Food Item Recipe</h1>
      </div>
      <div className="row justify-content-around">
        <FormWrapper>
          <div className="w-75 mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group my-2">
                {/* Auto Scroll */}
                <label htmlFor="foodItem">Food Item </label>
                <input
                  className={classNames("form-control", {
                    "is-invalid": errors.foodItem,
                  })}
                  type="text"
                  placeholder="Food Item"
                  defaultValue=""
                  {...register("foodItem", { required: "Field Required" })}
                  onChange={(e) =>
                    autoHandler(
                      e,
                      "foodItemArray",
                      "foodItem",
                      setFoodArray,
                      setFoodDisplay,
                      null,
                      null
                    )
                  }
                />
                {foodDisplay && (
                  <div className="card w-100">
                    <div>
                      {foodarray.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setValue("foodItem", item.foodItem, {
                              shouldValidate: true,
                            });
                            setFoodDisplay(false);
                          }}
                          className="drop border border-bottom-1"
                        >
                          <p>{item.foodItem}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {errors.foodItem && (
                  <p className="invalid-feedback">{errors.foodItem.message}</p>
                )}
              </div>
              <div className="form-group my-2">
                <label className="col-5" htmlFor="serving">
                  Serving For
                </label>
                <select
                  className={classNames("form-control", {
                    "is-invalid": errors.serving,
                  })}
                  defaultValue={4}
                  {...register("serving", { required: "Field Required" })}
                >
                  <option value={2}> 2</option>
                  <option value={4}> 4</option>
                  <option value={6}> 6</option>
                  <option value={8}> 8</option>
                  <option value={10}> 10</option>
                  <option value={20}> 20</option>
                  <option value={50}> 50</option>
                  <option value={100}> 100</option>
                  <option value={200}> 200</option>
                </select>
                {errors.serving && (
                  <p className="invalid-feedback">{errors.serving.message}</p>
                )}
              </div>
              <div className="form-group my-2">
                <label htmlFor="recipeDescription">Recipe Description</label>
                <textarea
                  className={classNames("form-control", {
                    "in-valid": errors.recipeDescription,
                  })}
                  placeholder="Recipe Description"
                  defaultValue = ""
                  {...register("recipeDescription", {
                    required: "Field Is Required",
                  })}
                />
                {errors.recipeDescription && (
                  <p className="invalid-feedback">
                    {errors.recipeDescription.message}
                  </p>
                )}
              </div>
              <p className="lead">Add ingredient Details</p>
              <div className="form-group my-2">
                {fields.map((item, index) => (
                  <div
                    className="jumbotron w-75 border border-light mx-auto p-2 rounded m-2"
                    key={item.id}
                  >
                    <div className=" row justify-content-around">
                      <div className="col-12">
                        <div className="form-group my-2">
                          <input
                            className={classNames("form-control", {
                              "is-invalid":
                                errors?.ingredientRecipeArray?.[index]
                                  ?.ingredientId,
                            })}
                            type="text"
                            placeholder="Ingredient Name"
                            defaultValue={`${item.ingredientId}`}
                            {...register(
                              `ingredientRecipeArray[${index}].ingredientId`,
                              { required: "Field Required" }
                            )}
                            onChange={(e) =>
                              autoHandler(
                                e,
                                "ingredientArray",
                                "ingredientName",
                                setIngredientArray,
                                setIngredientDisplay,
                                setIngredientIndex,
                                index
                              )
                            }
                          />
                          {ingredientDisplay && index === ingredientIndex && (
                            <div className="card w-100">
                              <div>
                                {ingredientarray.map((item) => (
                                  <div
                                    key={item.id}
                                    onClick={() => {
                                      setValue(
                                        `ingredientRecipeArray[${index}].ingredientId`,
                                        item.ingredientName,
                                        { shouldValidate: true }
                                      );
                                      setIngredientDisplay(false);
                                    }}
                                    className="drop border border-bottom-1"
                                  >
                                    <p>{item.ingredientName}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {errors?.ingredientRecipeArray?.[index]
                            ?.ingredientId && (
                            <div className="invalid-feedback">
                              {
                                errors?.ingredientRecipeArray?.[index]
                                  ?.ingredientId?.message
                              }
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className=" row justify-content-around">
                      <div className="col-lg-6 col-mb-12">
                        <div className="form-group my-2">
                          <select
                            className={classNames("form-control", {
                              "is-invalid":
                                errors?.ingredientRecipeArray?.[index]
                                  ?.quantityId,
                            })}
                            type="text"
                            placeholder="Qty"
                            defaultValue={`${item.quantityId}`}
                            {...register(
                              `ingredientRecipeArray[${index}].quantityId`,
                              { required: "Field Required" }
                            )}
                            onChange={(e) => {
                              const valuePrice = PriceCalculation(
                                getValues(
                                  `ingredientRecipeArray[${index}].ingredientId`
                                ),
                                e.target.value,
                                getValues(
                                  `ingredientRecipeArray[${index}].unitId`
                                ),
                                index,
                                setPrice,
                                setPriceIndex
                              );
                              setValue(
                                `ingredientRecipeArray[${index}].ingredientPrice`,
                                valuePrice,
                                { shouldValidate: true }
                              );
                              valuePrice && sumUpTotal()
                            }}
                          >
                            <option value="" disabled>
                              Select Qty
                            </option>
                            {selQuantity}
                          </select>
                          {errors?.ingredientRecipeArray?.[index]
                            ?.quantityId && (
                            <div className="invalid-feedback">
                              {
                                errors?.ingredientRecipeArray?.[index]
                                  ?.quantityId?.message
                              }
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-mb-12">
                        <div className="form-group my-2">
                          <select
                            className={classNames("form-control", {
                              "is-invalid":
                                errors?.ingredientRecipeArray?.[index]?.unitId,
                            })}
                            type="text"
                            placeholder="Unit"
                            defaultValue={`${item.unitId}`}
                            {...register(
                              `ingredientRecipeArray[${index}].unitId`,
                              { required: "Field Required" }
                            )}
                            onChange={(e) => {
                              const valuePrice = PriceCalculation(
                                getValues(
                                  `ingredientRecipeArray[${index}].ingredientId`
                                ),
                                getValues(
                                  `ingredientRecipeArray[${index}].quantityId`
                                ),
                                e.target.value,
                                index,
                                setPrice,
                                setPriceIndex
                              );
                              setValue(
                                `ingredientRecipeArray[${index}].ingredientPrice`,
                                valuePrice,
                                { shouldValidate: true }
                              );
                              valuePrice && sumUpTotal()
                            }}
                          >
                            <option value="" disabled>
                              Select Unit
                            </option>
                            {selUnit}
                          </select>
                          {errors?.ingredientRecipeArray?.[index]?.unitId && (
                            <div className="invalid-feedback">
                              {
                                errors?.ingredientRecipeArray?.[index]?.unitId
                                  ?.message
                              }
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-around">
                      <div className="col-12">
                        <div className="form-group my-2">
                          <input
                            className={classNames("form-control priceInput", {
                              "is-invalid":
                                errors?.ingredientRecipeArray?.[index]
                                  ?.ingredientPrice,
                            })}
                            type="number"
                            placeholder="Price"
                            step = "0.01"
                            defaultValue={`${item.ingredientPrice}`}
                            {...register(
                              `ingredientRecipeArray[${index}].ingredientPrice`,
                              { required: "Field Required" }
                            )}
                            onChange={() =>
                              {setValue(
                                `ingredientRecipeArray[${priceIndex}].ingredientPrice`,
                                price,
                                { shouldValidate: true }
                              ); ( price === getValues(`ingredientRecipeArray[${index}].ingredientPrice`)) && sumUpTotal()}}
                            
                          />
                          {errors?.ingredientRecipeArray?.[index]
                            ?.ingredientPrice && (
                            <div className="invalid-feedback">
                              {
                                errors?.ingredientRecipeArray?.[index]
                                  ?.ingredientPrice?.message
                              }
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className=" row justify-content-around">
                      <div className="col-6">
                        <Button
                          type="button"
                          className="btn-sm"
                          onClick={() =>
                            append({
                              ingredientId: "",
                              quantityId: "",
                              unitId: "",
                              ingredientPrice: "",
                            })
                          }
                        >
                          +
                        </Button>
                      </div>
                      <div className="col-6">
                        <Button
                          type="button"
                          className="btn-sm"
                          onClick={() => {remove(index)}}
                        >
                          -
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className = "form-group my-2">
                    <label htmlFor="basePrice"> Total Amount</label>
                    <input className = {classNames("form-control ",{"is-invalid" : errors.basePrice})} step = "0.01" type="number" {...register("basePrice",{required : "Field  Is Required"})}/>
                    {errors.basePrice && <p className="invalid-feedback">{errors.basePrice.message}</p>}
              </div> 
              <Button className="btn-sm" type="submit">
                Save
              </Button>
            </form>
          </div>
        </FormWrapper>
        {recipeChart}
      </div>
    </div>
  );
};

export default ItemRecipe;
