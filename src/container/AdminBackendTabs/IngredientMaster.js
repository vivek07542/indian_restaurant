import React , {useState,useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import Button  from "../../UI/Button/Button";
import FormWrapper from "../../component/FormWrapper/FormWrapper";
import TableWrapper from "../../component/TableWrapper/TableWrapper";
import * as action from "../../store/reducer/IngredientMaster/IngredientMasterReducer";
import {useForm} from "react-hook-form";
import classNames from "classnames";

const IngredientMaster = () => {
    const{register,handleSubmit,formState : {errors,isSubmitted,isValid},reset} = useForm({mode : "onChange"});

    const [editMode,setEditMode] = useState(false);

    const[id,setId] = useState(null);

    const dispatch = useDispatch();

    const editIngredient = useSelector(state => state.IngredientMaster.editMode);

    const editObject = useSelector(state =>state.IngredientMaster.editObject);
  
    let unitArray  = useSelector(state => state.IngredientMaster.unitArray);

    let quantityArray  = useSelector(state => state.IngredientMaster.quantityArray);

    let ingredientArray   = useSelector(state => state.IngredientMaster.ingredientArray);

    if(unitArray === undefined && unitArray !== null){
        unitArray = []
    } 
    if(quantityArray === undefined && quantityArray !== null){
        quantityArray = [];
    }
    if(ingredientArray === undefined && ingredientArray !== null){
        ingredientArray = [];
    }

    useEffect(() => {
        dispatch(action.initilizerIngredientHandlerInit());
    }, [])

    useEffect(()=>{
        if(editIngredient !== editMode){          
            const {id,ingredientName,quantityId,unitId,ingredientPrice } = {...editObject} 
            setEditMode(editIngredient );
            setId(id);
            reset({ingredientName :ingredientName ,quantityId :quantityId ,unitId :unitId ,ingredientPrice :ingredientPrice }); 
        }   
    },[editIngredient,editObject]);

    useEffect(()=>{
        if(isSubmitted && isValid){
            reset();            
        }
    },[isSubmitted,isValid]);

    const onSubmit = (data) => {
        const ingredientObject = {};
        ingredientObject.id = id;
        ingredientObject.ingredientName = data.ingredientName;
        ingredientObject.quantityId = +data.quantityId;
        ingredientObject.unitId = +data.unitId;
        ingredientObject.ingredientPrice = +data.ingredientPrice;        
        dispatch(action.submitHandlerInit(editMode,ingredientObject));     
    }
    
    const selQuantity = quantityArray.map(qty => <option key = {qty.id} value ={qty.id}>{qty.quantity}</option>)

    const selUnit = unitArray.map(unit => <option key = {unit.id} value={unit.id}>{unit.unit}</option>)

    return (
        <div className = "container-fluid text-center">
        <div className="row ">
        <h1 className="display-4 heading">Ingredient Master</h1>
        </div>
        <div className="row justify-content-around">
            <FormWrapper>
            <div  className = "w-75 mx-auto">
            <form onSubmit = {handleSubmit(onSubmit)}>
                    <div className = "form-group my-2">
                        <label htmlFor="ingredientName"> Ingredient Name</label>
                        <input className = {classNames("form-control",{"is-invalid" : errors.ingredientName})} placeholder = "Ingredient Name" type="text" {...register("ingredientName",{required : "Field  Is Required"})}/>
                        {errors.ingredientName && <p className="invalid-feedback">{errors.ingredientName.message}</p>}
                    </div>   
                    <div className = "form-group my-2">
                        <label htmlFor="quantityId">Quantity</label>
                        <select className = {classNames("form-control",{"is-invalid" : errors.quantityId})} defaultValue = "" {...register("quantityId",{required : "Field  Is Required"})}>
                            <option value = "" disabled >Select Qty</option>
                            {selQuantity}
                        </select>
                        {errors.quantityId && <p className="invalid-feedback">{errors.quantityId.message}</p>}
                    </div>
                    <div className = "form-group my-2">
                        <label htmlFor="unitId">Unit</label>
                        <select className = {classNames("form-control",{"is-invalid" : errors.unitId})} defaultValue = "" {...register("unitId",{required : "Field  Is Required"})}>
                            <option value = "" disabled  >Select Unit</option>
                            {selUnit}
                        </select>
                        {errors.unitId && <p className="invalid-feedback">{errors.unitId.message}</p>}
                    </div> 
                    <div className = "form-group my-2">
                            <label htmlFor="ingredientPrice"> Price</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.ingredientPrice})} placeholder = "Price" type="number" {...register("ingredientPrice",{required : "Field  Is Required"})}/>
                            {errors.ingredientPrice && <p className="invalid-feedback">{errors.ingredientPrice.message}</p>}
                    </div>                     
                    <Button className ="btn-sm" type = "submit">Save</Button>
                </form>
            </div>
            </FormWrapper>
            <div className="col-md-6 col-12">
            <TableWrapper 
            tableData = {ingredientArray}
            headingColumns = {["Id","Ingredient Name","Quantity","Unit","Price","Edit","Delete"]}
            breakOn = "large"
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
export default IngredientMaster;