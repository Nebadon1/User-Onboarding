import React, { useState, useEffect } from "react";
import { Form, Field, withFormik  } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Forms=({errors, touched, values, status})=>{
const [users, setusers]=useState([])
//console.log(users);

useEffect(()=>{
 if(status){
     setusers([...users, status])
 }
}, [status, users])

 return(
     
     <div className="onboard-form">
     <Form>

         {touched.name && errors.name && (
          <p className="error" >{errors.name}</p>
        )}
         <Field type="text" name="name" placeholder="Name"/>

         {touched.email && errors.email && (
          <p className="error" >{errors.name}</p>
        )}
         <Field type="email" name="email" placeholder="Email"/>

         {touched.password && errors.password && (
          <p className="error" >{errors.password}</p>
        )}
         <Field type="password" name="password" placeholder="password" />
         <label className="checkbox-container">
             Term of Service
         <Field type="checkBox" name="terms" placeholder="Agree" checked={values.terms}/>
         <span className="checkmark"/>
         </label>
         <button type="submit">Submit</button>
     </Form>
     {users.map(name =>(
       <p key={name.id}>{name.name}</p>  
 ))}
 </div>

 )
}

const formikHOC = withFormik({
    mapsPropsToValues({name, email, password}){
        return{
            name: name || "",
            email: email || "",
            password: password || "",

        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Not a good input"),
        email: Yup.string().required("Please enter a valid email address"),
        password: Yup.string().required("Please enter a valid password"),
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        axios
          .post("https://reqres.in/api/users", values)
          .then(res => {
            //console.log("handleSubmit: then: res: ", res);
            setStatus(res.data);
            resetForm();
          })
          .catch(err => console.error("handleSubmit: catch: err: ", err));
        }
})

const onboardwithFormik = formikHOC(Forms)

export default onboardwithFormik;