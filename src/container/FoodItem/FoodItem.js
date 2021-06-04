import React, { useState,useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux";
import * as action from "../../store/reducer/FoodItem/FoodItemReducer";
import FormWrapper from "../../component/FormWrapper/FormWrapper";
import TableWrapper from "../../component/TableWrapper/TableWrapper";
import {useForm} from "react-hook-form";
import classNames from "classnames";
import Button from "../../UI/Button/Button";

const FoodItem = () => {
    const{register,handleSubmit,formState:{errors,isSubmitted,isValid},reset} = useForm({mode : "onChange"});

    const[editMode,setEditMode] = useState(false);
    
    const[id,setId] = useState(null);

    const dispatch = useDispatch();

    const editFoodItem = useSelector(state => state.FoodItem.editMode);

    const editObject = useSelector(state =>state.FoodItem.editObject);
  
    const foodItemArray  = useSelector(state => state.FoodItem.foodItemArray);

          
    useEffect(() => {
        dispatch(action.initilizerHandlerInit());
    }, [])

    useEffect(() => {
        if(isSubmitted && isValid){     
           reset();  
        }        
    },[isSubmitted,isValid]);

    useEffect(()=>{
        if(editFoodItem !== editMode){          
            const {id,foodItem,foodPrice} = {...editObject} 
            setEditMode(editFoodItem );
            setId(id);
            reset({foodItem : foodItem , foodPrice : foodPrice});    
        }
    },[editObject,editFoodItem])

    const onSubmit = (data) => {
        const foodItemObject = {};
        foodItemObject.id = id;
        foodItemObject.foodItem = data.foodItem;
        foodItemObject.foodPrice = +data.foodPrice;
        dispatch(action.submitHandlerInit(editMode,foodItemObject));     
    }

    return (
        <div className = "container-fluid text-center">
            <div className="row ">
            <h1 className="display-4 heading">Food item</h1>
            </div>
            <div className="row justify-content-around">
                <FormWrapper>
                <div className = "w-75 mx-auto">
                <form onSubmit = {handleSubmit(onSubmit)}>
                        <div className = "form-group my-2">
                            <label htmlFor="foodItem"> Food Item</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.foodItem})} type="text" placeholder = "Food Item" {...register("foodItem",{required : "Field  Is Required"})}/>
                            {errors.foodItem && <p className="invalid-feedback">{errors.foodItem.message}</p>}
                        </div>
                        <div className = "form-group my-2">
                            <label htmlFor="foodPrice"> Price</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.foodPrice})} type="number" placeholder = "Food Price" {...register("foodPrice",{required : "Field  Is Required"})}/>
                            {errors.foodPrice && <p className="invalid-feedback">{errors.foodPrice.message}</p>}
                        </div>
                        <Button className ="btn-sm" type = "submit">Save</Button>
                    </form>
                </div>
                </FormWrapper>
                <div className="col-lg-6 col-sm-12  ">
                <TableWrapper 
                tableData = {foodItemArray}
                headingColumns = {["Id","Food Item","Price","Edit","Delete"]}
                breakOn = "small"
                addDeleteButton = {true}
                addEditButton = {true}
                editHandler = {(data)=>dispatch(action.editHandlerInit(data))}
                deleteHandler = {(data)=>dispatch(action.deleteHandlerInit(data))}
                 />
                </div>
            </div>
        </div>
    )
}

export default FoodItem;