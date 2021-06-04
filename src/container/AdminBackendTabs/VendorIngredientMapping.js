import React,{useEffect,useState} from 'react';
import Button from "../../UI/Button/Button";
import {useForm,useFieldArray} from "react-hook-form";
import FormWrapper from "../../component/FormWrapper/FormWrapper";
import TableWrapper from "../../component/TableWrapper/TableWrapper";
import classNames from "classnames";
import * as action from "../../store/reducer/VendorIngredientMappingReducer/VendorIngredientMappingReducer";
import {useDispatch,useSelector} from "react-redux";
import Table from "../../UI/Table/Table";
import { AutoComplete } from '../../Utility/AutoComplete';

const VendorIngredientMapping = () => {
    const{register,handleSubmit,formState : {errors,isSubmitted},control,setValue,reset} = useForm({mode : "onChange",
    defaultValues : {
        vendorQuoteArray : [
            {vendorId : "" , quotePrice : ""}
        ]
    }})
    const {append,fields,remove} = useFieldArray({
        control,
        name : "vendorQuoteArray"
    });

    const[editMode ,setEditMode] = useState(false);
    const[id,setId] = useState(null);
        
    // Ingredient Display
    const [ingredientDisplay, setIngredientDisplay] = useState(false);
    const [ingredientarray, setIngredientArray] = useState(null);

    const dispatch = useDispatch();

    let vendorArray = useSelector(state => state.VendorMapping.vendorArray);
    let unitArray = useSelector(state =>state.VendorMapping.unitArray);
    let vendorMappingArray = useSelector(state => state.VendorMapping.vendorMappingArray);
    
    const editObject = useSelector(state => state.VendorMapping.editObject);
    const editVendorMappingMode = useSelector(state => state.VendorMapping.editMode);

    if(vendorMappingArray === undefined && vendorMappingArray === null){
        vendorMappingArray = [];
    }

    useEffect(() => {
        dispatch(action.initializeVendorMappingInit());
    }, []);

    useEffect(() => {    
        if (isSubmitted) {
          reset();
        }
    }, [isSubmitted,reset]);

    useEffect(()=>{
        if(editVendorMappingMode !== editMode){          
            const {id,ingredientName,unitId,vendorQuoteArray} = {...editObject} 
            setEditMode(editVendorMappingMode );
            setId(id);
            reset({ingredientName : ingredientName ,unitId : unitId,vendorQuoteArray: vendorQuoteArray}); 
        }         
    },[editVendorMappingMode,editObject]);

    const onSubmit = (data) => {    
        data.id = id;
        dispatch(action.submitHandlerInit(editMode, data));
    };

    const selUnit = unitArray.map((unit) => (
    <option key={unit.id} value={unit.id}>
        {unit.unit}
    </option>
    ));

    const selVendor = vendorArray.map((vendor) =>(
        <option key={vendor.id} value = {vendor.id}>
            {vendor.vendorName}
        </option>
    ))

    const vendorMappingChart = (
        <div className="col-lg-6 col-sm-12  ">
            {vendorMappingArray.map((item,index) => {
                let array = [];
                let object = {}
                object.id = item.id;
                object.ingredientName = item.ingredientName;
                object.unitId = item.unitId;
                array.push(object)
                    return(
            <div key = {index}>
                <div  className = "jumbotron formWrapper my-2">   
                    <Table tableData = {array} headingColumns = {["Id","Ingredient Name","Unit","Edit","Delete"]} breakOn = "large" addEditButton = {true} addDeleteButton = {true} editHandler = {()=>dispatch(action.editHandlerInit(item))} deleteHandler = {()=>dispatch(action.deleteHandlerInit(item))}/>    
                <div className = "row">
                <div className = "col-12">
                        <TableWrapper tableData={item.vendorQuoteArray} headingColumns={["Id","Vendor Name", "Quote Price"]} breakOn="large" addDeleteButton={false} addEditButton={false} />
                </div>
            </div>            
        </div>
      </div>)      
    })}
    </div>
    )
      return (
        <div className="container-fluid text-center">
            <div className="row ">
                <h1 className="display-4 heading">Vendor Ingredient Mapping</h1>
            </div>
            <div className="row justify-content-around">
               <FormWrapper>
                   <div className="w-75 mx-auto">
                       <form onSubmit = {handleSubmit(onSubmit)}>
                           <div className = "form-group my-2">
                               <label htmlFor = "ingredientName">Ingredient Name</label>
                               <input className = {classNames("form-control",{"is-invalid" : errors.ingredientName})} placeholder = "Ingredient Name" type = "text" {...register("ingredientName",{required : "Field required"})} onChange = {(e) => AutoComplete(e,"ingredientArray","ingredientName",setIngredientArray,setIngredientDisplay,null,null)} />
                               {ingredientDisplay && (
                                <div className = "card w-100">
                                    <div>
                                        {ingredientarray.map((item) =>(
                                            <div key = {item.id} onClick = {() =>{setValue("ingredientName",item.ingredientName,{shouldValidate : true});setIngredientDisplay(false)}} className = "drop border border-bottom-1">
                                                <p>{item.ingredientName}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                               )}
                               {errors.ingredientName && (<p className = "invalid-feedback">{errors.ingredientName.message}</p>)}
                           </div>
                           <div className = "form-group my-2">
                               <label htmlFor = "unitId">Unit</label>
                               <select className = {classNames("form-control",{"is-invalid" : errors.unitId})} defaultValue="" {...register("unitId",{required : "Field Required"})}>
                               <option value="" disabled>
                                  Select Unit
                                </option>
                                {selUnit}
                               </select>
                           </div>
                           <p className="lead">Add Vendor Quote</p>
                           <div className = "form-group my-2">
                               {fields.map((item,index) =>(
                                   <div key={index}>
                                        <div className = "form-group my-2">
                                        <select className = {classNames("form-control",{"is-invalid" : errors?.vendorQuoteArray?.[index]?.vendorId})} type = "text" placeholder = "Vendor" defaultValue = {`${item.vendorId}`} {...register(`vendorQuoteArray[${index}].vendorId`,{required : "Field Required"})}>
                                            <option value="" disabled>
                                            Select Vendor
                                            </option>
                                            {selVendor}  
                                            </select>
                                            {errors?.vendorQuoteArray?.[index]?.vendorId && (
                                                <div className = "invalid-feedback">
                                                    {errors?.vendorQuoteArray?.[index].vendorId?.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className = "form-group my-2">
                                            <input className = {classNames("form-control",{"is-invalid" : errors?.vendorQuoteArray?.[index]?.quotePrice})} type ="number" step="0.01" placeholder = "Price" defaultValue = {`${item.quotePrice}`} {...register(`vendorQuoteArray[${index}].quotePrice`,{required : "Field Required"})}/>
                                            {errors?.vendorQuoteArray?.[index]?.quotePrice && <div className = "invalid-feedback">{errors?.vendorQuoteArray?.[index]?.quotePrice?.message}</div>}
                                        </div>
                                       <div className=" row justify-content-around">
                                           <div className="col-6 ">
                                               <Button type="button" className="btn-sm" onClick={() =>append({vendorId : "",quotePrice : ""})}>+</Button>
                                            </div>
                                           <div className="col-6">
                                               <Button type="button" className="btn-sm" onClick={() => { remove(index) }}>-</Button>
                                           </div>
                                       </div>
                                   </div>
                               ))}
                           </div>
                           <Button className="btn-sm" type="submit">
                            Submit
                            </Button>
                       </form>
                   </div>
               </FormWrapper> 
               {vendorMappingChart}
            </div>
        </div>
    )
}

export default VendorIngredientMapping
