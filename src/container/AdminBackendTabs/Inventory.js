import React,{useState,useEffect} from 'react';
import TableWrapper from "../../component/TableWrapper/TableWrapper";
import FormWrapper from "../../component/FormWrapper/FormWrapper";
import Button from "../../UI/Button/Button";
import classNames from "classnames";
import {useDispatch,useSelector} from "react-redux";
import * as action from "../../store/reducer/Inventory/InventoryReducer";
import {AutoComplete} from "../../Utility/AutoComplete";
import {useForm,useFieldArray} from "react-hook-form";
import Table from "../../UI/Table/Table";
import {PriceVendorCalculation} from "../../Utility/PriceCalculation";
import {createVendorIdToValue} from "../../Utility/stateConversion";

const Inventory = () => {
    const{register,handleSubmit,formState : {errors,isSubmitted},control,getValues,setValue,reset} = useForm({mode : "onChange",defaultValues: {dateEntryArray: [{ingredientId : "",vendorId : "",quantityId : "",unitId : "",purchasePrice : ""}]} })
    const {append,fields,remove} = useFieldArray({control , name : "dateEntryArray"});
    
    const [editMode, setEditMode] = useState(false);
    const [id, setId] = useState(null);
    // Price Calculation
    const [price, setPrice] = useState("");
    const [priceIndex, setPriceIndex] = useState();
    // For Ingredient Auto
    const [ingredientDisplay, setIngredientDisplay] = useState();
    const [ingredientIndex, setIngredientIndex] = useState();
    const [ingredientarray, setIngredientArray] = useState(null);
    // For Vendor Auto
    const [vendorIndex, setVendorIndex] = useState();
    const [vendorarray, setVendorArray] = useState(null);
    // // For Price Auto
    // Dispatch 
    const dispatch = useDispatch()
    // Array Selectors
    let quantityArray = useSelector((state) => state.Inventory.quantityArray);

    let unitArray = useSelector((state) => state.Inventory.unitArray);   
   
    let inventoryArray = useSelector((state) => state.Inventory.inventoryArray);

    const editInventoryMode = useSelector(state => state.Inventory.editMode);

    const editObject = useSelector(state =>state.Inventory.editObject);     
    // Initial Function Run
    useEffect(() => {
        dispatch(action.initilizerInventoryHandlerInit());
    }, [])
    // After Submit
    useEffect(() => {
        isSubmitted && reset();
    }, [isSubmitted,reset]) 
    // // Total Price
    useEffect(() => {
        sumUpTotal()
      }, [fields])
    // // Price Update Auto Calculation for Price
    useEffect(() => {
        setValue(`dateEntryArray[${priceIndex}].purchasePrice`, price, {shouldValidate: true});
      }, [price]);  
    // // Edit Button Append
    useEffect(()=>{
        if(editInventoryMode !== editMode){          
            const {id,dateFrom,dateTo,dateEntryArray,totalPurchase} = {...editObject} 
            setEditMode(editInventoryMode );
            setId(id);
            reset({dateFrom : dateFrom ,dateTo : dateTo,dateEntryArray: dateEntryArray, totalPurchase : totalPurchase}); 
        }   
    },[editInventoryMode,editObject]);
       
    if(inventoryArray === undefined && inventoryArray === null){
        inventoryArray = [];
    }
    // Select Quantity for Inventory
    const selQuantity = quantityArray.map((qty) => (
        <option key={qty.id} value={qty.id}>
          {qty.quantity}
        </option>
    ));
    // Select For Vendor
    const selVendor = vendorarray !== null && (vendorarray.map((vendor) =>{
            let vendorValue;
            return(
                <option key = {vendor.vendorId} value = {vendor.vendorId} >
                    {vendorValue = createVendorIdToValue(vendor.vendorId)}
                </option>
            )
        })
    )
    // Select For Unit 
    const selUnit = unitArray.map((unit) =><option key = {unit.id} value={unit.id}>{unit.unit}</option>) 

    const sumUpTotal = () =>{     
        let priceInput = document.querySelectorAll(".priceInput");
        let total = 0;
        for(let i=0; i < priceInput.length; i++){
                total += Number(priceInput[i].value)
        }
      setValue("totalPurchase",total,{shouldValidate : true});   
  }
    const findVendorArray = (e,index) =>{
        
        if(ingredientarray !== null){
            ingredientarray.forEach(element => {
                if(element.ingredientName === e.target.value){
                    setVendorArray(element.vendorQuoteArray); 
                    setVendorIndex(index);
                }
            });
        }
    } 
  const onSubmit = (data) => {
        data.id = id;
        dispatch(action.submitHandlerInit(editMode, data));
    }

    const inventoryTable = (
        <div className="col-lg-6 col-sm-12  ">
        {inventoryArray.map((dish,index) => {
        let array = [];
        let object = {}
            object.id = dish.id;
            object.dateFrom = dish.dateFrom;
            object.dateTo = dish.dateTo;
        array.push(object)
          return(
      <div key = {index} className = "jumbotron formWrapper my-2">   
                    <Table 
                        tableData = {array}
                        headingColumns = {["Id","dateFrom","dateTo","Edit","Delete"]}
                        breakOn = "large"
                        addEditButton = {true}
                        addDeleteButton = {true}
                        editHandler = {()=>dispatch(action.editHandlerInit(dish))}
                        deleteHandler = {()=>dispatch(action.deleteHandlerInit(dish))}
                    />    
                  <div className = "row">
                  <div className = "col-12">
                      <TableWrapper
                      tableData={dish.dateEntryArray}
                      headingColumns={["Id","Ingredient","Vendor","Quantity ","Unit","Cost"]}
                      breakOn="large"
                      addDeleteButton={false}
                      addEditButton={false}
                  />
                    <div className ="jumbotron formWrapper">
                         <p> Purchase Price : {dish.totalPurchase}</p>
                    </div>
                  </div>
              </div>    
          </div>
          )          
        })}
    </div>)
    return (
        <div className="container-fluid text-center">
            <div className="row ">
                <h1 className="display-4 heading">Inventory</h1>
            </div>
            <div className="row justify-content-around">
                <FormWrapper>
                    <div className="w-75 mx-auto">
                        <form onSubmit = {handleSubmit(onSubmit)}>
                            <div className="form-group my-2">
                                <label htmlFor="dateFrom">Date From</label>
                                <input type="date" className = {classNames("form-control",{"is-invalid" : errors.dateFrom})} placeholder = "Date From" {...register("dateFrom",{required : "Field Is Required"})}/>
                                {errors.dateFrom && <p className="invalid-feedback">{errors.dateFrom.message}</p>}
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="dateTo">Date To</label>
                                <input type="date" className = {classNames("form-control",{"is-invalid" : errors.dateTo})} placeholder = "Date From" {...register("dateTo",{required : "Field Is Required"})}/>
                                {errors.dateTo && <p className="invalid-feedback">{errors.dateTo.message}</p>}
                            </div>
                            <p className = "lead">Add Purchase Inventory</p>
                            <div className = "form-group my-2">
                                {fields.map((item,index) =>(
                                    <div className = "jumbotron w-75 border border-light mx-auto p-2 rounded m-2" key = {item.id}>
                                        <div className=" row justify-content-around">
                                            <div className = "col-12">
                                                <div className = "form-group my-2">
                                                    <input className = {classNames("form-control",{"is-invalid" : errors?.dateEntryArray?.[index]?.ingredientId})} type = "text" defaultValue = {`${item.ingredientId}`} placeholder="Ingredient Name" {...register(`dateEntryArray[${index}].ingredientId`,{required : "Field Is Required"})} onChange = {(e) => {AutoComplete(e,"vendorMappingArray","ingredientName",setIngredientArray,setIngredientDisplay,setIngredientIndex,index);findVendorArray(e,index)}} />
                                                    {ingredientDisplay && index === ingredientIndex && (
                                                        <div className = "card w-100">
                                                            <div>
                                                                {ingredientarray.map((item) =>(                                                                    
                                                                    <div key = {item.id} onClick = {() =>{setValue(`dateEntryArray[${index}].ingredientId`,item.ingredientName,{shouldValidate : true});setIngredientDisplay(false);setVendorIndex(index);setVendorArray(item.vendorQuoteArray);setValue(`dateEntryArray[${index}]unitId`,item.unitId,{shouldValidate:true})}} className = "drop border border-bottom-1">
                                                                        <p>{item.ingredientName}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {errors?.dateEntryArray?.[index]?.ingredientId && (<div className = "invalid-feedback">{errors?.dateEntryArray?.[index]?.ingredientId.message}</div>)}                                                
                                                </div>
                                            </div>
                                        </div>
                                        <div className = "row justify-content-around">
                                            <div className = "col-12">
                                                <div className = "form-group my-2">
                                                    <select className={classNames("form-control", {"is-invalid":errors?.dateEntryArray?.[index]?.vendorId})} type="text" placeholder="Qty" defaultValue={`${item.vendorId}`} {...register(`dateEntryArray[${index}].vendorId`,{ required: "Field Required" })} onChange={(e)=>{const valuePrice = PriceVendorCalculation(getValues(`dateEntryArray[${index}].ingredientId`),getValues(`dateEntryArray[${index}].quantityId`),getValues(`dateEntryArray[${index}].unitId`),index,setPrice,setPriceIndex,e.target.value);setValue(`dateEntryArray[${index}].purchasePrice`,valuePrice,{ shouldValidate: true });valuePrice && sumUpTotal()}}>
                                                        <option value="" disabled>
                                                            Select Vendor
                                                        </option>
                                                         {selVendor}
                                                    </select>
                                                    {errors?.dateEntryArray?.[index]?.vendorId && (<div className="invalid-feedback">{errors?.dateEntryArray?.[index]?.vendorId?.message}</div>)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className = "row justify-content-around">
                                            <div className = "col-6">
                                                <select className={classNames("form-control", {"is-invalid":errors?.dateEntryArray?.[index]?.quantityId})} type="text" placeholder="Qty" defaultValue={`${item.quantityId}`} {...register(`dateEntryArray[${index}].quantityId`,{required: "Field Required"})} onChange={(e) => {const valuePrice = PriceVendorCalculation(getValues(`dateEntryArray[${index}].ingredientId`),e.target.value,getValues(`dateEntryArray[${index}].unitId`),index,setPrice,setPriceIndex,getValues(`dateEntryArray[${index}].vendorId`));setValue(`dateEntryArray[${index}].purchasePrice`,valuePrice,{ shouldValidate: true });valuePrice && sumUpTotal()}}>
                                                    <option value="" disabled>
                                                        Qty
                                                    </option>
                                                        {selQuantity}
                                                </select>
                                                {errors?.dateEntryArray?.[index]?.quantityId && (<div className="invalid-feedback">{errors?.dateEntryArray?.[index]?.quantityId?.message}</div>)}
                                            </div>
                                            <div className = "col-6">
                                                <select className={classNames("form-control",{"is-invalid":errors?.dateEntryArray?.[index]?.unitId})} type="text" placeholder="Unit" defaultValue={`${item.unitId}`} {...register(`dateEntryArray[${index}].unitId`,{required: "Field Required"})} onChange={(e) => {const valuePrice = PriceVendorCalculation(getValues(`dateEntryArray[${index}].ingredientId`),getValues(`dateEntryArray[${index}].quantityId`),e.target.value,index,setPrice,setPriceIndex,getValues(`dateEntryArray[${index}].vendorId`));setValue(`dateEntryArray[${index}].purchasePrice`,valuePrice,{ shouldValidate: true });valuePrice && sumUpTotal()}}>
                                                    <option value="" disabled>Unit</option>
                                                        {selUnit}
                                                </select>
                                            {errors?.dateEntryArray?.[index]?.unitId && (<div className="invalid-feedback">{errors?.dateEntryArray?.[index]?.unitId?.message}</div>)}                                                
                                            </div>
                                        </div>
                                        <div className = "row justify-content-around">
                                            <div className = "col-12">
                                                <div className="form-group my-2">
                                                    <input className={classNames("form-control priceInput", {"is-invalid":errors?.dateEntryArray?.[index]?.purchasePrice})} type="number" placeholder="Price" step = "0.01" defaultValue={`${item.purchasePrice}`} {...register(`dateEntryArray[${index}].purchasePrice`,{ required: "Field Required" })} onChange={() =>{setValue(`dateEntryArray[${priceIndex}].purchasePrice`,price,{ shouldValidate: true }); ( price === getValues(`dateEntryArray[${index}].purchasePrice`)) && sumUpTotal()}} />
                                                    {errors?.dateEntryArray?.[index]?.purchasePrice && (<div className="invalid-feedback">{errors?.dateEntryArray?.[index]?.purchasePrice?.message}</div>)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row justify-content-around">
                                            <div className="col-6">
                                                <Button type="button" className="btn-sm" onClick={() =>append({ingredientId : "",vendorId : "",quantityId : "",unitId : "",purchasePrice : ""})}>+</Button>
                                            </div>
                                            <div className="col-6">
                                                <Button type="button" className="btn-sm" onClick={() => {remove(index)}}>-</Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className = "form-group my-2">
                                <label htmlFor="totalPurchase"> Total Amount</label>
                                <input className = {classNames("form-control ",{"is-invalid" : errors.totalPurchase})} step = "0.01" type="number" {...register("totalPurchase",{required : "Field  Is Required"})}/>
                                {errors.totalPurchase && <p className="invalid-feedback">{errors.totalPurchase.message}</p>}
                            </div> 
                            <Button type="submit">Submit</Button>
                        </form>
                    </div>
                </FormWrapper>
                {inventoryTable}
            </div>
        </div>
    )
}

export default Inventory
