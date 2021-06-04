import React,{useEffect} from 'react';
import {useForm} from "react-hook-form";
import classNames from "classnames";
import {useDispatch,useSelector} from "react-redux";
import Button from "../../UI/Button/Button";
import * as action from "../../store/reducer/TopSellDish/TopSellDishReducer";
import TableWrapper from "../../component/TableWrapper/TableWrapper";
import FormWrapper from "../../component/FormWrapper/FormWrapper";


const TopSellingDishes = () => {
    const{register,handleSubmit,formState:{errors,isSubmitted,isValid},reset} = useForm({mode : "onChange"});

    const dispatch = useDispatch();
  
    const topSellDishArray  = useSelector(state => state.TopSell.topSellDish);

    const topSellIngredientArray  = useSelector(state => state.TopSell.topSellIngredient);
          
    useEffect(() => {
        if(isSubmitted){     
           reset();  
        }        
    },[isSubmitted]);
 
    const onSubmitTop = handleSubmit(data =>{
        dispatch(action.submitTopDishHandlerInit(data)); 
    })

    const onSubmitIngredient = handleSubmit(data =>{
        dispatch(action.submitTopIngredienthHandlerInit(data)); 
    })

    return (
        <div className = "container-fluid text-center">
            <div className="row ">
            <h1 className="display-4 heading">Top Order Chart</h1>
            </div>
            <div className="row justify-content-around">
                <FormWrapper>
                <div className = "w-75 mx-auto">
                <form>
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
                        <div className="form-group my-2">
                            <label htmlFor="topServed">Select Top</label>
                            <select className={classNames("form-control", {"is-invalid": errors.topServed,})} defaultValue={5} {...register("topServed", { required: "Field Required" })}>
                                <option value={1}> 1</option>
                                <option value={2}> 2</option>
                                <option value={3}> 3</option>
                                <option value={4}> 4</option>
                                <option value={5}> 5</option>
                                <option value={6}> 6</option>
                                <option value={7}> 7</option>
                                <option value={10}> 10</option>
                                <option value={15}> 15</option>
                            </select>
                            {errors.topServed && (<p className="invalid-feedback">{errors.topServed.message}</p>)}
                        </div>    
                        <div className = "row">
                            <div className = "col-6">
                            <Button className ="btn-sm" type = "submit" onClick = {onSubmitTop} >Top 5 Dish</Button>
                            </div>
                            <div className = "col-6">
                            <Button className ="btn-sm" type = "submit" onClick = {onSubmitIngredient}>Top 5 Ingredient</Button>
                            </div>
                        </div>

                    </form>
                </div>
                </FormWrapper>                
                {topSellDishArray.length !== 0 && 
                <div className="col-lg-6 col-sm-12  ">
                <TableWrapper 
                tableData = {topSellDishArray}
                headingColumns = {["order Food","Qty Ordered"]}
                breakOn = "large"
                addDeleteButton = {false}
                addEditButton = {false}
                 />
                 
                </div>
                }
                {topSellIngredientArray.length !== 0 && 
                <div className="col-lg-6 col-sm-12  ">
                <TableWrapper 
                tableData = {topSellIngredientArray}
                headingColumns = {["order Food","Qty Ordered","Unit"]}
                breakOn = "large"
                addDeleteButton = {false}
                addEditButton = {false}
                 />
                 
                </div>
                }
            </div>
        </div>
    )
}

export default TopSellingDishes
