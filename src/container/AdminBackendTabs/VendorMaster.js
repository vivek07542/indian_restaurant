import React ,{useState,useEffect}from 'react'
import {useDispatch,useSelector} from "react-redux";
import Button from "../../UI/Button/Button";
import FormWrapper from "../../component/FormWrapper/FormWrapper";
import TableWrapper from "../../component/TableWrapper/TableWrapper";
import {useForm} from "react-hook-form";
import classNames from "classnames";
import * as action from "../../store/reducer/VendorMaster/VendorMasterReducer";

const VendorMaster = () => {
    const {register,handleSubmit,formState : {errors,isSubmitted,isValid},reset} = useForm({mode : "onChange"});

    const [editMode,setEditMode]  = useState(false);

    const[id,setId] = useState(null);

    const dispatch = useDispatch();

    const editModeForm = useSelector(state => state.VendorMaster.editMode);

    const editObject = useSelector(state => state.VendorMaster.editObject);

    let vendorArray = useSelector(state => state.VendorMaster.vendorArray);

    if(vendorArray === undefined && vendorArray !== null){
        vendorArray = []
    }

    useEffect(() => {
        dispatch(action.initializeVendorInit());
    }, [])

    useEffect(() =>{
        if(isSubmitted && isValid){
            reset();
        }
    },[isSubmitted,isValid])

    useEffect(() => {
        if(editModeForm !== editMode){
            const {id,vendorName,address,mobileNumber,email} = {...editObject} 
            setEditMode(editModeForm );
            setId(id);
            reset({vendorName : vendorName , address : address , mobileNumber : mobileNumber , email : email});    
        }
    }, [editModeForm,editObject])

    const onSubmit = data => {
        const vendorObject = {};
        vendorObject.id = id;
        vendorObject.vendorName = data.vendorName;
        vendorObject.address = data.address;
        vendorObject.mobileNumber = data.mobileNumber;
        vendorObject.email = data.email;
        dispatch(action.submitHandlerInit(editMode,vendorObject));  
    }

    return (
        <div className = "container-fluid text-center">
            <div className="row ">
            <h1 className="display-4 heading">Vendor Master</h1>
            </div>
            <div className="row justify-content-around">
                <FormWrapper>
                <div className = "w-75 mx-auto">
                <form onSubmit = {handleSubmit(onSubmit)}>
                        <div className = "form-group my-2">
                            <label htmlFor="vendorName"> Vendor Name</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.vendorName})} type="text" placeholder = "Vendor Name" {...register("vendorName",{required : "Field  Is Required"})}/>
                            {errors.vendorName && <p className="invalid-feedback">{errors.vendorName.message}</p>}
                        </div>    
                        <div className = "form-group my-2">
                            <label htmlFor = "address">Address</label>
                            <textarea className = {classNames("form-control",{"is-invalid" : errors.address})} placeholder = "Address" {...register("address",{required : "Field Is Required"})}/>
                            {errors.address && <p className="invalid-feedback">{errors.address.message}</p>}
                        </div> 
                        <div className = "form-group">
                            <label htmlFor="mobileNumber"> Mobile Number</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.mobileNumber})} placeholder = "Mobile Number" type="number" {...register("mobileNumber",{required : "Field  Is Required",pattern:{value : /^\d{10}$/,message: "Type Valid Mobile Number of 10 Digit"}})}/>
                            {errors.mobileNumber && <p className="invalid-feedback">{errors.mobileNumber.message}</p>}
                        </div>  
                        <div className = "form-group">
                            <label htmlFor="email"> Email Address</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.email})} placeholder = "E-mail" type = "email" {...register("email",{required : "Field  Is Required",pattern:{value : /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ ,message: "Type Valid Email Address"}})}/>
                            {errors.email && <p className="invalid-feedback">{errors.email.message}</p>}
                        </div>                 
                        <Button className ="btn-sm my-2" type = "submit">Save</Button>
                    </form>
                </div>
                </FormWrapper>
                <div className="col-lg-6 col-sm-12  ">
                <TableWrapper 
                tableData = {vendorArray}
                headingColumns = {["Id","Vendor Name","Address","Mobile Number","Email","Edit","Delete"]}
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

export default VendorMaster
