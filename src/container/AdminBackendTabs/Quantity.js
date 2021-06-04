import React, { useState,useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux";
import * as action from "../../store/reducer/Quantity/QuantityReducer";
import FormWrapper from "../../component/FormWrapper/FormWrapper";
import TableWrapper from "../../component/TableWrapper/TableWrapper";
import {useForm} from "react-hook-form";
import classNames from "classnames";
import Button from "../../UI/Button/Button";

const Quantity = () => {
    const{register,handleSubmit,formState:{errors,isSubmitted,isValid},reset} = useForm({mode : "onChange"});


    const[editMode,setEditMode] = useState(false);
    
    const[id,setId] = useState(null);

    const dispatch = useDispatch();

    const editQuantity = useSelector(state => state.Quantity.editMode);

    const editObject = useSelector(state =>state.Quantity.editObject);
  
    let quantityArray  = useSelector(state => state.Quantity.quantityArray);

    if(quantityArray === undefined && quantityArray !== null){
        quantityArray = []
    } 
          
    useEffect(() => {
        dispatch(action.initilizerQtyHandlerInit());
    }, [])

    useEffect(() => {
        if(isSubmitted && isValid){     
           reset();  
        }        
    },[isSubmitted,isValid]);

    useEffect(()=>{
        if(editQuantity !== editMode){          
            const {id,quantity} = {...editObject} 
            setEditMode(editQuantity );
            setId(id);
            reset({quantity : quantity});    
        }
    },[editObject,editQuantity])

    const onSubmit = (data) => {
        const quantityObject = {};
        quantityObject.id = id;
        quantityObject.quantity = +data.quantity;
        dispatch(action.submitHandlerInit(editMode,quantityObject));     
    }

    return (
        <div className = "container-fluid text-center">
            <div className="row ">
            <h1 className="display-4 heading">Quantity Master</h1>
            </div>
            <div className="row justify-content-around">
                <FormWrapper>
                <div className = "w-75 mx-auto">
                <form onSubmit = {handleSubmit(onSubmit)}>
                        <div className = "form-group my-2">
                            <label htmlFor="quantity"> Quantity</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.quantity})} placeholder="Qty." type="number" {...register("quantity",{required : "Field  Is Required"})}/>
                            {errors.quantity && <p className="invalid-feedback">{errors.quantity.message}</p>}
                        </div>                        
                        <Button className ="btn-sm" type = "submit">Save</Button>
                    </form>
                </div>
                </FormWrapper>
                <div className="col-lg-6 col-sm-12  ">
                <TableWrapper 
                tableData = {quantityArray}
                headingColumns = {["Id","Quantity","Edit","Delete"]}
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

export default Quantity
