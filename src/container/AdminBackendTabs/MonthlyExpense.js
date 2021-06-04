import React ,{useState,useEffect}from 'react';
import Button from "../../UI/Button/Button";
import FormWrapper from "../../component/FormWrapper/FormWrapper";
import TableWrapper from "../../component/TableWrapper/TableWrapper";
import * as action from "../../store/reducer/MonthlyExpense/MonthlyExpenseReducer";
import {useForm} from "react-hook-form";
import {useDispatch,useSelector} from "react-redux";
import classNames from "classnames";

const MonthlyExpense = () => {
    const{register,handleSubmit,formState:{errors,isSubmitted},reset} = useForm({mode : "onChange"});

    const[editMode,setEditMode] = useState(false);
    
    const[id,setId] = useState(null);

    const dispatch = useDispatch();

    const editExpenseItem = useSelector(state => state.MonthlyExpense.editMode);

    const editObject = useSelector(state =>state.MonthlyExpense.editObject);
  
    const monthlyExpenseArray  = useSelector(state => state.MonthlyExpense.monthlyExpenseArray);

    const totalExpense  = useSelector(state => state.MonthlyExpense.totalAmount)
    useEffect(() => {
        dispatch(action.initilizerMonthlyExpenseHandlerInit());
    }, [])

    useEffect(() => {
        if(isSubmitted){     
           reset();  
        }        
    },[isSubmitted]);

    useEffect(()=>{
        if(editExpenseItem !== editMode){          
            const {id,date,expense,monthlyAmount} = {...editObject} 
            setEditMode(editExpenseItem );
            setId(id);
            reset({date : date , expense : expense,monthlyAmount : monthlyAmount});    
        }
    },[editObject,editExpenseItem])

    const onSubmit = (data) => {
        const mothlyExpenseObject = {};
        mothlyExpenseObject.id = id;
        mothlyExpenseObject.date = data.date;
        mothlyExpenseObject.expense = data.expense;
        mothlyExpenseObject.monthlyAmount = +data.monthlyAmount;
        dispatch(action.submitHandlerInit(editMode,mothlyExpenseObject));     
    }

    return (
        <div className = "container-fluid text-center">
            <div className="row ">
            <h1 className="display-4 heading">Monthly Expense Chart</h1>
            </div>
            <div className="row justify-content-around">
                <FormWrapper>
                <div className = "w-75 mx-auto">
                <form onSubmit = {handleSubmit(onSubmit)}>
                        <div className = "form-group my-2">
                            <label htmlFor="date"> Date</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.date})}  type="date" {...register("date",{required : "Field  Is Required"})}/>
                            {errors.date && <p className="invalid-feedback">{errors.date.message}</p>}
                        </div>
                        <div className = "form-group my-2">
                            <label htmlFor="expense"> Expense Detail</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.expense})} placeholder = "Expense Detail" type="expense" {...register("expense",{required : "Field  Is Required"})}/>
                            {errors.expense && <p className="invalid-feedback">{errors.expense.message}</p>}
                        </div>
                        <div className = "form-group my-2">
                            <label htmlFor="monthlyAmount"> Monthly Expense</label>
                            <input className = {classNames("form-control",{"is-invalid" : errors.monthlyAmount})} placeholder = "Expense Amount" type="number" {...register("monthlyAmount",{required : "Field  Is Required"})}/>
                            {errors.monthlyAmount && <p className="invalid-feedback">{errors.monthlyAmount.message}</p>}
                        </div>
                        <Button className ="btn-sm" type = "submit">Submit</Button>
                    </form>
                </div>
                </FormWrapper>
                <div className="col-lg-6 col-sm-12">
                <TableWrapper 
                tableData = {monthlyExpenseArray}
                headingColumns = {["Id","Date","Expense Detail","Amount","Edit","Delete"]}
                breakOn = "small"
                addDeleteButton = {true}
                addEditButton = {true}
                editHandler = {(data)=>dispatch(action.editHandlerInit(data))}
                deleteHandler = {(data)=>dispatch(action.deleteHandlerInit(data))}
                 />
                  <div className ="jumbotron formWrapper">
                        <p> Total Expense: {totalExpense}</p>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default MonthlyExpense
