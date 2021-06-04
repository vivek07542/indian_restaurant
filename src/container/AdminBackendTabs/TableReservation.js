import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import FormWrapper from "../../component/FormWrapper/FormWrapper";
import TableWrapper from "../../component/TableWrapper/TableWrapper";
import Button from "../../UI/Button/Button";
import classNames from "classnames";
import {useForm} from "react-hook-form";
import * as action from "../../store/reducer/TableReservation/TableReservationReducer";
import * as yup from "yup";

// const schema = yup.object().shape({
//     attachment : yup
//         .mixed()
//         .required("Field Required")
//         .test("fileSize","This File is too large accept less than 2 MB",(value)=>{
//             return value && value[0].size <= 200000
//         })
//         .test("type","We only support PNG",(value)=>{
//             return value && (value[0].type === "image/png" )
//         }),
// });
 
const TableReservation = () => {
    const{register,handleSubmit,formState:{errors,isSubmitted,isValid},reset} = useForm({mode:"onChange"});

    const[editMode,setEditMode] = useState(false);

    const[id,setId] = useState(null);

    const dispatch = useDispatch();

    const editTableReservationMode = useSelector(state => state.TableReservation.editMode);

    const editObject = useSelector(state => state.TableReservation.editObject);

    const tableReservationArray = useSelector(state => state.TableReservation.tableReservationArray);

    useEffect(()=>{
        dispatch(action.initilizerReservationInit());
    },[])        

    useEffect(()=>{
        if(editTableReservationMode !== editMode){          
            const {id,customerName,date,time,person} = {...editObject} 
            setEditMode(editTableReservationMode );
            setId(id);
            reset({customerName : customerName , date : date,time : time,person : person});    
        }
    },[editObject,editTableReservationMode])

    useEffect(()=>{
        if(isSubmitted && isValid){
            reset({customerName : "",});
        }
    },[isSubmitted,reset]);

    const onSubmit = (data) => {
        data.id = id;
        dispatch(action.submitHandlerInit(editMode,data));
    };

    return (
        <div className = "container-fluid text-center">
            <div className="row ">
            <h1 className="display-4 heading">Table Reservation</h1>
            </div>
            <div className="row justify-content-around">
                <FormWrapper>
                <div className = "w-75 mx-auto">
                <form onSubmit= {handleSubmit(onSubmit) }>
                        <div className = "form-group my-2">
                            <label htmlFor="customerName"> Customer Name</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.customerName})} placeholder = "Customer Name" type="text" {...register("customerName",{required : "Field  Is Required"})}/>
                            {errors.customerName && <p className="invalid-feedback">{errors.customerName.message}</p>}
                        </div>
                        <div className = "form-group my-2">
                            <label htmlFor="date"> Date Of Reservation</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.date})} type="date" {...register("date",{required : "Field  Is Required"})}/>
                            {errors.date && <p className="invalid-feedback">{errors.date.message}</p>}
                        </div>
                        <div className = "form-group my-2">
                            <label htmlFor="time"> Time Of Reservation</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.time})} type="time" {...register("time",{required : "Field  Is Required"})}/>
                            {errors.time && <p className="invalid-feedback">{errors.time.message}</p>}
                        </div>
                        <div className = "form-group my-2">
                            <label htmlFor="person"> Total Person's</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.person})} placeholder="Person Joining" type="number" {...register("person",{required : "Field  Is Required", validate : value => (value < 40 || "Cant Accept More than 40 Person at a Time")})}/>
                            {errors.person && <p className="invalid-feedback">{errors.person.message}</p>}
                        </div>
                        {/* Validation For Import File With Complete Set Up */}
                        {/* <div className = "form-group my-2">
                            <label htmlFor="attachment"> Attachment</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.attachment})} type="file" {...register("attachment",{required : "Field  Is Required", validate : (value)=>{return value && value[0].size <= 200000 || "This File is too large accept less than 2 MB"} , validate : (value)=>{return value && value[0].type === "image/png" || "We Support Only PNG format"}})}/>
                            {errors.attachment && <p className="invalid-feedback">{errors.attachment.message}</p>}
                        </div>                      */}
                        <Button className ="btn-sm" type = "submit">Save</Button>
                    </form>
                </div>
                </FormWrapper>
                <div className="col-lg-6 col-sm-12  ">
                <TableWrapper 
                tableData = {tableReservationArray}
                headingColumns = {["Id","Customer Name","Date","Time","Visitors","Table","Edit","Delete"]}
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

export default TableReservation
