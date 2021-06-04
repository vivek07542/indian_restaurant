import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from "react-redux";
import classNames from "classnames";
import {useForm} from "react-hook-form";
import FormWrapper from "../../component/FormWrapper/FormWrapper";
import TableWrapper from "../../component/TableWrapper/TableWrapper";
import * as action from "../../store/reducer/InvestmentBudget/InvestmentBudgetReducer";
import Button from "../../UI/Button/Button";

const InvestmentBudget = () => {
    const{register,handleSubmit,formState:{errors,isSubmitted,isValid},reset} = useForm({mode : "onChange"});

    const[editMode,setEditMode] = useState(false);

    const[budgetAllocated,setBudgetAllocated] = useState(200000);
    
    const[id,setId] = useState(null);

    const dispatch = useDispatch();

    const editBudgetItem = useSelector(state => state.InvestmentBudget.editMode);

    const editObject = useSelector(state =>state.InvestmentBudget.editObject);
    
    const investmentBudgetArray  = useSelector(state => state.InvestmentBudget.investmentBudgetArray);

    const totalAmountExpense = useSelector(state => state.InvestmentBudget.totalAmount);  
    
    useEffect(() => {
        dispatch(action.initilizerInvestmentBudgetHandlerInit());
    }, [])

    useEffect(() => {
        if(isSubmitted && isValid){     
           reset();  
        }        
    },[isSubmitted,isValid]);

    useEffect(()=>{
        if(editBudgetItem !== editMode){          
            const {id,month,monthlyExpense,monthlyExpenseAmount} = {...editObject} 
            setEditMode(editBudgetItem );
            setId(id);
            reset({month : month ,monthlyExpense : monthlyExpense,monthlyExpenseAmount : monthlyExpenseAmount});    
        }
    },[editObject,editBudgetItem])

    const onSubmit = (data) => {
        const investmentBudgetObject = {};
        investmentBudgetObject.id = id;
        investmentBudgetObject.month = data.month;
        investmentBudgetObject.monthlyExpense = data.monthlyExpense;
        investmentBudgetObject.monthlyExpenseAmount = +data.monthlyExpenseAmount;
        investmentBudgetObject.recoveryAmount = 0;
        investmentBudgetObject.lastModified = "-";        
        dispatch(action.submitHandlerInit(editMode,investmentBudgetObject));     
    }

    return (
        <div className = "container-fluid text-center">
            <div className="row ">
            <h1 className="display-4 heading">Investment Budget</h1>
            </div>
            <div className="row justify-content-around">
                <FormWrapper>
                <div className = "w-75 mx-auto">
                <div className = "form-group my-2">
                    <label htmlFor="budgetAllocated"> Budget Allocated</label>
                    <input className = "form-control" type="number" onChange={(e)=>setBudgetAllocated(e.target.value)} value = {budgetAllocated}/>
                </div>
                <form onSubmit = {handleSubmit(onSubmit)}>
                        <div className = "form-group my-2">
                            <label htmlFor="month"> Month</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.month})} type="month" {...register("month",{required : "Field  Is Required"})}/>
                            {errors.month && <p className="invalid-feedback">{errors.month.message}</p>}
                        </div>
                        <div className = "form-group my-2">
                            <label htmlFor="monthlyExpense"> Expense Detail</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.monthlyExpense})} placeholder = "Monthly Expense" type="text" {...register("monthlyExpense",{required : "Field  Is Required"})}/>
                            {errors.monthlyExpense && <p className="invalid-feedback">{errors.monthlyExpense.message}</p>}
                        </div>
                        <div className = "form-group my-2">
                            <label htmlFor="monthlyExpenseAmount"> Amount</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.monthlyExpenseAmount})} placeholder = "Expense Amount" type="number" {...register("monthlyExpenseAmount",{required : "Field  Is Required"})}/>
                            {errors.monthlyExpenseAmount && <p className="invalid-feedback">{errors.monthlyExpenseAmount.message}</p>}
                        </div>
                        <Button className ="btn-sm" type = "submit">Save</Button>
                    </form>
                </div>
                </FormWrapper>
                <div className="col-lg-6 col-sm-12  ">
                <TableWrapper 
                tableData = {investmentBudgetArray}
                headingColumns = {["Id","Month","Expense Detail","Amount","Recovery Amount","Last Modified","Edit","Delete"]}
                breakOn = "large"
                addDeleteButton = {true}
                addEditButton = {true}
                editHandler = {(data)=>dispatch(action.editHandlerInit(data))}
                deleteHandler = {(data)=>dispatch(action.deleteHandlerInit(data))}
                 />
                 <div className ="jumbotron formWrapper">
                        <p> Budget Left: {budgetAllocated - totalAmountExpense}</p>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default InvestmentBudget
