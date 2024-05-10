import { useFormik } from "formik";
import { signupSchema } from "@/schema";

const signupValidator = () =>{
    const initialValues ={
    fullName:"",
    email:"",
    username:"",
    gender:"",
    password:"",
    confirmPassword:""

    }
    const {errors,handleBlur,handleSubmit,handleChange,touched,values}  = useFormik({
        initialValues,
        validationSchema:signupSchema,
        validateOnChange:true,
        validateOnBlur:false,
        onSubmit:(values,action)=>{
            console.log(values);
            action.resetForm();
        }
    })
    return [errors,handleBlur,handleSubmit,handleChange,touched,values]
}

export {
    signupValidator
}