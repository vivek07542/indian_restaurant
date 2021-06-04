import React, { useState,useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux";
import * as action from "../../store/reducer/Unit/UnitReducer";
import FormWrapper from "../../component/FormWrapper/FormWrapper";
import TableWrapper from "../../component/TableWrapper/TableWrapper";
import {useForm} from "react-hook-form";
import classNames from "classnames";
import Button from "../../UI/Button/Button";

const Unit = () => {
    const{register,handleSubmit,formState:{errors,isSubmitted,isValid},reset} = useForm({mode : "onChange"});


    const[editMode,setEditMode] = useState(false);
    
    const[id,setId] = useState(null);

    const dispatch = useDispatch();

    const editUnit = useSelector(state => state.Unit.editMode);

    const editObject = useSelector(state =>state.Unit.editObject);
  
    let unitArray  = useSelector(state => state.Unit.unitArray);

    if(unitArray === undefined && unitArray !== null){
        unitArray = []
    } 
          
    useEffect(() => {
        dispatch(action.initilizerUnitHandlerInit());
    }, [])

    useEffect(() => {
        if(isSubmitted && isValid){     
           reset();  
        }        
    },[isSubmitted,isValid]);

    useEffect(()=>{
        if(editUnit !== editMode){          
            const {id,unit} = {...editObject} 
            setEditMode(editUnit );
            setId(id);
            reset({unit : unit});    
        }
    },[editObject,editUnit])

    const onSubmit = (data) => {
        const unitObject = {};
        unitObject.id = id;
        unitObject.unit = data.unit;
        dispatch(action.submitHandlerInit(editMode,unitObject));     
    }

    return (
        <div className = "container-fluid text-center">
            <div className="row ">
            <h1 className="display-4 heading">unit Master</h1>
            </div>
            <div className="row justify-content-around">
                <FormWrapper>
                <div  className = "w-75 mx-auto">
                <form onSubmit = {handleSubmit(onSubmit)}>
                        <div className = "form-group my-2">
                            <label htmlFor="unit"> Unit</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.unit})} placeholder = "Unit" type="text" {...register("unit",{required : "Field  Is Required"})}/>
                            {errors.unit && <p className="invalid-feedback">{errors.unit.message}</p>}
                        </div>                        
                        <Button className ="btn-sm" type = "submit">Save</Button>
                    </form>
                </div>
                </FormWrapper>
                <div className="col-lg-6 col-sm-12  ">
                <TableWrapper 
                tableData = {unitArray}
                headingColumns = {["Id","Unit","Edit","Delete"]}
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

export default Unit
