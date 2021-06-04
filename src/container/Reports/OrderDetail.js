import React,{useEffect} from 'react';
import Button from "../../UI/Button/Button";
import {useForm} from "react-hook-form";
import {useDispatch,useSelector} from "react-redux";
import FormWrapper from "../../component/FormWrapper/FormWrapper";
import TableWrapper from "../../component/TableWrapper/TableWrapper";
import classNames from "classnames";
import * as action from "../../store/reducer/OrderReport/OrderReportReducer";

const OrderDetail = () => {
    const{register,handleSubmit,formState:{errors,isSubmitted,isValid},reset} = useForm({mode : "onChange"});

    const dispatch = useDispatch();
  
    const orderReportArray  = useSelector(state => state.OrderReport.orderReportArray);

    const totalAmount = useSelector(state => state.OrderReport.totalAmount);
          
    useEffect(() => {
        if(isSubmitted && isValid){     
           reset();  
        }        
    },[isSubmitted,isValid]);

    const onSubmit = (data) => {
        dispatch(action.submitHandlerInit(data));     
    }

    return (
        <div className = "container-fluid text-center">
            <div className="row ">
            <h1 className="display-4 heading">Order Report</h1>
            </div>
            <div className="row justify-content-around">
                <FormWrapper>
                <div className = "w-75 mx-auto">
                <form onSubmit = {handleSubmit(onSubmit)}>
                        <div className = "form-group my-2">
                            <label htmlFor="dateFrom"> Date From</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.dateFrom})} type="date" {...register("dateFrom",{required : "Field  Is Required"})}/>
                            {errors.dateFrom && <p className="invalid-feedback">{errors.dateFrom.message}</p>}
                        </div>
                        <div className = "form-group my-2">
                            <label htmlFor="dateTo"> Date To</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.dateTo})} type="date" {...register("dateTo",{required : "Field  Is Required"})}/>
                            {errors.dateTo && <p className="invalid-feedback">{errors.dateTo.message}</p>}
                        </div>
                        <Button className ="btn-sm" type = "submit">Submit</Button>
                    </form>
                </div>
                </FormWrapper>                
                {orderReportArray.length !== 0 && 
                <div className="col-lg-6 col-sm-12  ">
                <TableWrapper 
                tableData = {orderReportArray}
                headingColumns = {["Order Id","Order Date","Customer Name","Total Price"]}
                breakOn = "large"
                addDeleteButton = {false}
                addEditButton = {false}
                 />
                  <div className ="jumbotron formWrapper">
                    <p> Total Expense: {totalAmount}</p>
                  </div>
                </div>
                }
            </div>
        </div>
    )
}

export default OrderDetail
