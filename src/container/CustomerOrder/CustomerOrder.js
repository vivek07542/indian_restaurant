import React,{useState,useEffect} from 'react';
import Button from "../../UI/Button/Button";
import {useDispatch,useSelector} from "react-redux";
import FormWrapper from "../../component/FormWrapper/FormWrapper";
import TableWrapper from "../../component/TableWrapper/TableWrapper";
import classNames from "classnames";
import {AutoComplete} from "../../Utility/AutoComplete";
import {PriceFoodCalculation} from "../../Utility/PriceCalculation";
import Table from "../../UI/Table/Table";
import { useForm,useFieldArray } from 'react-hook-form';
import * as action from "../../store/reducer/CustomerOrder/CustomerOrderReducer";



const CustomerOrder = () => {
    const {register,handleSubmit,formState : {errors,isSubmitted,isValid},reset,control,setValue,getValues} = useForm({mode : "onChange",defaultValues : {orderArray : [{foodItemId : "",orderQtyId : "", amount : ""}]}});

    const{append,fields,remove} = useFieldArray({control,name : "orderArray"})

    const [id,setId] = useState(null);

    const[editMode,setEditMode] = useState(false);
    
    const [foodItemDisplay, setFoodItemDisplay] = useState(false);
    const [foodItemIndex, setFoodItemIndex] = useState();
    const [foodItemarray, setFoodItemArray] = useState(null);

    const [price, setPrice] = useState("");
    const [priceIndex, setPriceIndex] = useState();

    const dispatch = useDispatch();

    const orderId = useSelector(state => state.CustomerOrder.orderId);

    const customerOrderArray = useSelector(state => state.CustomerOrder.customerOrderArray)

    const editOrderMode = useSelector(state => state.CustomerOrder.editMode);

    const editObject = useSelector(state =>state.CustomerOrder.editObject);

    useEffect(() => {
        dispatch(action.initilizerOrderHandlerInit());
        // setId(orderId);
    }, [])

    useEffect(() => {
        discountCalculation();sumUpTotal()
      }, [fields])

      useEffect(() => {    
       
        if (isSubmitted) {
          reset({customerName : "" ,orderDate : "", discount : "" , totalAmount : "" , orderArray :[{foodItemId : "",orderQtyId : "", amount : ""}] });
          
        }
      }, [isSubmitted]);

    useEffect(()=>{
        if(editOrderMode !== editMode){          
            const {id,customerName,orderDate,discount,totalAmount,orderArray} = {...editObject}
            setEditMode(editOrderMode);
            setId(id);
            reset({customerName : customerName ,orderDate : orderDate, discount : discount , totalAmount : totalAmount , orderArray : orderArray}); 
        }   
    },[editOrderMode,editObject]);

    useEffect(()=>{
        setId(orderId);        
    },[orderId])

    const onSubmit = data => {
        data.id = id;
        dispatch(action.submitHandlerInit(editMode, data));       
        setId(orderId); 
    }

    const sumUpTotal = () =>{  
        let priceInput = document.querySelectorAll(".priceInput");
        let total = 0;
        for(let i=0; i < priceInput.length; i++){total += Number(priceInput[i].value)}
        {total === 0 ? setValue("totalAmount","",{shouldValidate : true}) : setValue("totalAmount",total,{shouldValidate : true}); }      
     }
    
    const discountCalculation = (e) =>{
        let discount;
        if(e === undefined || e === null){discount = getValues("discount");}
        else{discount = e.target.value}
        sumUpTotal();
        let totalPrice = getValues("totalAmount");
        if(discount && totalPrice){
            let netAmount = totalPrice - (totalPrice * discount / 100);
            setValue("totalAmount",netAmount,{shouldValidate : true});   
        }
    } 
    const customerOrder = (
            <div className="col-lg-6 col-sm-12  ">
            {customerOrderArray.map((dish,index) => {
            let array = [];
            let object = {}
                object.id = dish.id;
                object.customerName = dish.customerName;
                object.orderDate = dish.orderDate;
            array.push(object)
            return(
            <div key = {index} className = "jumbotron formWrapper my-2">   
                    <Table 
                        tableData = {array}
                        headingColumns = {["Id","Customer Name","Order Date","Edit","Delete"]}
                        breakOn = "large"
                        addEditButton = {true}
                        addDeleteButton = {true}
                        editHandler = {()=>dispatch(action.editHandlerInit(dish))}
                        deleteHandler = {()=>dispatch(action.deleteHandlerInit(dish))}
                    />    
                    <div className = "row">
                    <div className = "col-12">
                        <TableWrapper
                        tableData={dish.orderArray}
                        headingColumns={["Id","Food Item","Quantity ","Cost"]}
                        breakOn="large"
                        addDeleteButton={false}
                        addEditButton={false}
                        />
                        <div className ="jumbotron formWrapper">
                            <div className = "row mx-auto">
                                <div className="col-6"><p> Discount % : {dish.discount}</p></div>
                                <div className="col-6"><p> Purchase Price : {dish.totalAmount}</p></div>
                            </div>
                            
                        </div>
                    </div>
                </div>    
            </div>
            )          
            })}
        </div>)
    return (
        <div className="container-fluid text-center">
            <div className = "row">
                <h1 className="display-4 heading">Customer Order</h1>
            </div>
            <div className="row justify-content-around">
                <FormWrapper>
                    <div className="w-75 mx-auto">
                       <p className = "lead"> Order No : {id}</p> 
                       <form onSubmit = {handleSubmit(onSubmit)}>
                            <div className = "form-group my-2">
                                <label htmlFor = "customerName"> Customer Name </label>
                                <input className = {classNames("form-control",{"is-invalid" : errors.customerName})} type="text" placeholder="Customer Name" {...register("customerName",{required : "Field Is Required"})} />
                                {errors.customerName && (<p className = "invalid-feedback">{errors.customerName.message}</p>)}
                            </div>
                            <div className = "form-group my-2">
                                <label htmlFor = "orderDate"> Date </label>
                                <input className = {classNames("form-control",{"is-invalid" : errors.orderDate})} type="date"  {...register("orderDate",{required : "Field Is Required"})} />
                                {errors.orderDate && (<p className = "invalid-feedback">{errors.orderDate.message}</p>)}
                            </div>
                            <p className="lead">Add Order Detail</p>
                            <div className = "form-group my-2">
                                {fields.map((item,index)=>(
                                    <div className = "jumbotron w-75 border border-light mx-auto p-2 rounded m-2" key={item.id} >                                  
                                        <div className=" row justify-content-around">
                                            <div className="col-12">
                                                <div className="form-group my-2">
                                                    <label htmlFor="foodItemId">Food Item </label>
                                                    <input className={classNames("form-control",{"is-invalid": errors?.orderArray?.[index]?.foodItemId})} type="text" placeholder="Ordered Food" defaultValue={`${item.foodItemId}`} {...register(`orderArray[${index}].foodItemId`, { required: "Field Required" })} onChange={(e) => AutoComplete(e,"foodItemArray","foodItem",setFoodItemArray,setFoodItemDisplay,setFoodItemIndex,index)}/>                                                 
                                                    {(foodItemDisplay && foodItemIndex === index) &&(
                                                        <div className="card w-100"><div>                                                        
                                                        {foodItemarray.map((item) => ( 
                                                            <div key={item.id} onClick={()=>{setValue(`orderArray[${index}].foodItemId`,item.foodItem,{shouldValidate: true});setFoodItemDisplay(false);setValue(`orderArray[${index}.amount]`,item.foodPrice,{shouldValidate:true})}} className="drop border border-bottom-1">
                                                            <p>{item.foodItem}</p>
                                                            </div>
                                                        ))}</div>
                                                    </div>
                                                    )}
                                                    {errors?.orderArray?.[index]?.foodItemId && <p className="invalid-feedback">{errors?.orderArray?.[index]?.foodItemId?.message}</p>}
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className=" row justify-content-around">
                                            <div className="col-lg-6 col-mb-12">
                                            <div className="form-group my-2">
                                                <select className={classNames("form-control", {"is-invalid":errors?.orderArray?.[index]?.orderQtyId})} placeholder="Qty" defaultValue={`${item.orderQtyId}`} {...register(`orderArray[${index}].orderQtyId`,{ required: "Field Required" })} onChange={(e) => {const valuePrice = PriceFoodCalculation(getValues(`orderArray[${index}].foodItemId`),e.target.value,index,setPrice,setPriceIndex);setValue(`orderArray[${index}].amount`,valuePrice,{ shouldValidate: true });valuePrice && sumUpTotal()}}>
                                                    <option value="" disabled>Select Qty</option>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                    <option value={5}>5</option>
                                                    <option value={6}>6</option>    
                                                </select>
                                                {errors?.orderArray?.[index]?.orderQtyId && (
                                                    <div className="invalid-feedback">{errors?.orderArray?.[index]?.orderQtyId?.message}</div>
                                                )}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-mb-12">
                                                <div className="form-group my-2">
                                                    <input className={classNames("form-control priceInput", {"is-invalid":errors?.orderArray?.[index]?.amount})} type="number" placeholder="Amount" step = "0.01" defaultValue={`${item.amount}`} {...register(`orderArray[${index}].amount`,{required: "Field Required" })}/>
                                                    {errors?.orderArray?.[index]?.amount && (<div className="invalid-feedback">{errors?.orderArray?.[index]?.amount?.message}</div>)}
                                                </div>
                                            </div>
                                            <div className=" row justify-content-around">
                                                <div className="col-6">
                                                    <Button type="button" className="btn-sm" onClick={() =>append({foodItemId : "" , orderQtyId : "", amount : ""})}>+</Button>
                                                </div>
                                                <div className="col-6">
                                                    <Button type="button" className="btn-sm" onClick={() => {remove(index)}} >-</Button>
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                ))}
                            </div>
                            <div className = "form-group my-2">
                                <label htmlFor = "discount"> Discount </label>
                                <input className = {classNames("form-control")} type="number" placeholder="Discount %" {...register("discount")} onChange={(e)=>discountCalculation(e)}/>
                      
                            </div>
                            <div className = "form-group my-2">
                                <label htmlFor = "totalAmount"> Total Amount </label>
                                <input className = {classNames("form-control")} step="0.01" type="number" placeholder="Total Amount" {...register("totalAmount",{required : "Field Is Required"})}  />
                            
                            </div>
                            <Button type = "submit">Generate Bill</Button>
                       </form>
                    </div>
                </FormWrapper>
                {customerOrder}
            </div>
        </div>
    )
}
export default CustomerOrder;