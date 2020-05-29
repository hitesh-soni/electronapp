import React ,{useState} from 'react';
import '../../assets/login.css';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { Formik } from "formik";
import {RegisterValidations} from  "./authValidations";
import {register as registerUser} from "../../actions/authActions"
import Cryptr from 'cryptr';

const Register = ({registerUser}) => {

const [message, setMessage] = useState("")

  return (
    <div className="page">
        <div className="container">
        <div className="left">
            <div className="login">Register</div>
            <div className="eula">By logging in you agree to the ridiculously long terms that you didn't bother to read</div>
        </div>
        <div className="right">
      {message && <div className="userCreate"><p>{message}</p></div>}
        <Formik
        enableReinitialize={true}
        validationSchema={RegisterValidations}
        onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
        
   
        const cryptr = new Cryptr('SecretKeyOfMine');
 
        const encryptedString = cryptr.encrypt(values.password);

            registerUser({firstname:values.firstname,
              lastname:values.lastname,
              email: values.email,
              password: encryptedString
            }).then(()=>{
              setMessage("User Registered Successfully");
              setTimeout(() => {
                setMessage("");
              }, 3000);
              resetForm();
            });  

         

      }}
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        setFieldTouched,
        errors,
        resetForm,
        setFieldValue,
        isSubmitting
      }) => (
            <div className="form">
                <form noValidate onSubmit={handleSubmit}>

                 <label className="loginInput" htmlFor="firstname">Firstname</label>
                    <input 
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={values.firstname}
                      onChange={handleChange}
                      isinvalid={touched.firstname && !!errors.firstname}
                    />
                    <p className="error">{errors.firstname}</p>

                    <label className="loginInput" htmlFor="lastname"> Lastname </label>
                    <input 
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={values.lastname}
                      onChange={handleChange}
                      isinvalid={touched.lastname && !!errors.lastname}
                    />
                    <p className="error">{errors.lastname}</p>



                    <label className="loginInput" htmlFor="email">Email</label>
                    <input 
                      type="email"
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isinvalid={touched.email && !!errors.email}
                    />
                    <p className="error">{errors.email}</p>

                    <label className="loginInput" htmlFor="password">Password</label>
                    <input 
                    type="password"     
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isinvalid={touched.password && !!errors.password}
                    />
                    <p className="error">{errors.password}</p>


                    <label className="loginInput" htmlFor="password">Confirm Password</label>
                    <input 
                    type="password"     
                    id="confirmPassword"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    isinvalid={touched.confirmPassword && !!errors.confirmPassword}
                    />
                    <p className="error">{errors.confirmPassword}</p>

                    <div className="btn-container"> 
                        <button type="submit" id="submit" >Submit </button>
                        <div><Link to="/"  className="register"> Login</Link></div>
                    </div>
                </form>
            </div>
       
       )}
       </Formik>
       
       
       
       
        </div>
        </div>
    </div>
    )
}

export default connect('',{
  registerUser
})(Register)