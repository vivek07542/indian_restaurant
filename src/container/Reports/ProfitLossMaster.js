import React,{useEffect} from 'react';
import Button from "../../UI/Button/Button";
import {useForm} from "react-hook-form";
import {useDispatch,useSelector} from "react-redux";
import * as action from "../../store/reducer/ProfitLoss/ProfitLossReducer";
import TableWrapper from "../../component/TableWrapper/TableWrapper";
import FormWrapper from "../../component/FormWrapper/FormWrapper";
import classNames from "classnames";

const ProfitLossMaster = () => {
    const{register,handleSubmit,formState:{errors,isSubmitted,isValid},reset} = useForm({mode : "onChange"});

    const dispatch = useDispatch();
  
    const profitLossArray  = useSelector(state => state.ProfitLoss.profitLossArray);

    const totalAmount = useSelector(state => state.ProfitLoss.totalAmount);
          
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
            <h1 className="display-4 heading">Profit Loss Report</h1>
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
                {profitLossArray.length !== 0 && 
                <div className="col-lg-6 col-sm-12  ">
                <TableWrapper 
                tableData = {profitLossArray}
                headingColumns = {["Id","Month","Expense Detail","Amount"]}
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

export default ProfitLossMaster
