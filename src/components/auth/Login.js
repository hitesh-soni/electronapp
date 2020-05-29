import React,{useState} from "react";
import "../../assets/login.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Formik } from "formik";
import { LoginValidations } from "./authValidations";
import Cryptr from 'cryptr';
import {LoginAcion} from '../../actions/authActions'

const Login = ({ users , LoginAcion}) => {
    
    const [message, setmessage] = useState("")
    
  return (
    <div className="page">
      <div className="container">
        <div className="left">
          <div className="login">Login</div>
          <div className="eula">
            By logging in you agree to the ridiculously long terms that you
            didn't bother to read
          </div>
        </div>
        <div className="right">
        {message && <div className="userCreate"><p>{message}</p></div>}
          <Formik
            enableReinitialize={true}
            validationSchema={LoginValidations}
            onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {

                const cryptr = new Cryptr('SecretKeyOfMine'); 
               
               const findUser = users.find((user)=>{
                    return user.email === values.email;
               })
               
               if(findUser){
                    if(cryptr.decrypt(findUser.password) === values.password)
                        LoginAcion(true);
                    else{
                        setmessage("Invalid credentials");
                        setTimeout(() => {setmessage("")}, 3000);
                    }
               }else{
                setmessage("User Not Exist");
                setTimeout(() => {setmessage("")}, 3000);
               }
                
            }}
            initialValues={{
              email: "",
              password: "",
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
              isSubmitting,
            }) => (
              <div className="form">
                <form noValidate onSubmit={handleSubmit}>
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
                  <div className="btn-container">
                    <button type="submit" id="submit">
                      Submit
                    </button>
                    <div>
                      <Link to="/register" className="register">
                        Register
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ users }) => ({
  users: users.users,
});

export default connect(mapStateToProps, {LoginAcion})(Login);
