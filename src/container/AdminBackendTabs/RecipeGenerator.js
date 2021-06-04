import React, { useEffect ,useState} from 'react';
import Button from "../../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import FormWrapper from "../../component/FormWrapper/FormWrapper";
import TableWrapper from "../../component/TableWrapper/TableWrapper";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import * as action from "../../store/reducer/RecipeGeneratorReducer/RecipeGeneratorReducer";
import { AutoComplete } from "../../Utility/AutoComplete";
const RecipeGenerator = () => {
    const { register, handleSubmit, formState: { errors, isValid, isSubmitted }, reset,setValue } = useForm({ mode: "onChange" })

    const [foodDisplay, setFoodDisplay] = useState(false);
    const [foodarray, setFoodArray] = useState(null);

    const dispatch = useDispatch();

    let recipeGeneratorArray = useSelector((state) => state.RecipeGenerator.recipeGeneratorArray);

    let totalPrice  = useSelector(state => state.RecipeGenerator.totalPrice);

    if (recipeGeneratorArray === null) {
        recipeGeneratorArray = []
    }

    useEffect(() => {
        if (isSubmitted && isValid) {
            reset();
        }
    }, [isSubmitted, isValid, reset])

    const onSubmit = (data) => {
        dispatch(action.submitHandlerInit(data));
    }

    return (
        <div className="container-fluid text-center">
            <div className="row ">
                <h1 className="display-4 heading">Recipe Generator</h1>
            </div>
            <div className="row justify-content-around">
                <FormWrapper>
                    <div className="w-75 mx-auto">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group my-2">
                                {/* Auto Scroll */}
                                <label htmlFor="foodItem">Food Item </label>
                                <input
                                    className={classNames("form-control", {
                                        "is-invalid": errors.foodItem,
                                    })}
                                    type="text"
                                    placeholder="Food Item"
                                    defaultValue=""
                                    {...register("foodItem", { required: "Field Required" })}
                                    onChange={(e) =>
                                        AutoComplete(
                                            e,
                                            "foodItemArray",
                                            "foodItem",
                                            setFoodArray,
                                            setFoodDisplay,
                                            null,
                                            null
                                        )
                                    }
                                />
                                {foodDisplay && (
                                    <div className="card w-100">
                                        <div>
                                            {foodarray.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => {
                                                        setValue("foodItem", item.foodItem, {
                                                            shouldValidate: true,
                                                        });
                                                        setFoodDisplay(false);
                                                    }}
                                                    className="drop border border-bottom-1"
                                                >
                                                    <p>{item.foodItem}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {errors.foodItem && (
                                    <p className="invalid-feedback">{errors.foodItem.message}</p>
                                )}
                            </div>
                            <div className="form-group my-2">
                                <label className="col-5" htmlFor="serving">
                                    Serving For
                                </label>
                                <select
                                    className={classNames("form-control", {
                                        "is-invalid": errors.serving,
                                    })}
                                    defaultValue={4}
                                    {...register("serving", { required: "Field Required" })}
                                >
                                    <option value={2}> 2</option>
                                    <option value={4}> 4</option>
                                    <option value={6}> 6</option>
                                    <option value={8}> 8</option>
                                    <option value={10}> 10</option>
                                    <option value={20}> 20</option>
                                    <option value={50}> 50</option>
                                    <option value={100}> 100</option>
                                    <option value={200}> 200</option>
                                </select>
                                {errors.serving && (
                                    <p className="invalid-feedback">{errors.serving.message}</p>
                                )}
                            </div>
                            <Button type="submit" disabled = {!foodDisplay}>Generate</Button>        
                        </form>
                    </div>
                </FormWrapper>
                <div className="col-lg-6 col-sm-12  ">                    
                   <TableWrapper
                        tableData = {recipeGeneratorArray}
                        headingColumns = {["Id","Ingredient","Quantity","Unit","Price","MenuId"]}
                        breakOn = "large"
                        addDeleteButton = {false}
                        addEditButton = {false}
                   /> 
                    <div className ="jumbotron formWrapper">
                         <p> Total Price : {totalPrice}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeGenerator
