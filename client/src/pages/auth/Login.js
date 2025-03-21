import React from "react";
import InputType from "../../components/shared/form/InputType";
import Form from "../../components/shared/form/Form";

import { useSelector } from "react-redux";
import Spinner from "./../../components/shared/Spinner";
import { toast } from "react-toastify";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  
  const loginwithgoogle = ()=>{
    window.open("http://localhost:8080/auth/google/callback","_self")
}
  return (
    <>
      {error && <span>{toast.error(error)}</span>}
      {loading ? (
        <Spinner />
      ) :( <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src="./assets/image/3.jpg" alt="loginImage" />
          </div>
          <div className="col-md-4 form-container">
          <div className="border1">
          <Form formTitle={'Login page'} submitButton={"Login"} formType={'login'}/>
           </div>
            
              {/* <button className='login-with-google-btn' onClick={loginwithgoogle}>
                    Sign In With Google
                </button> */}

          </div>
        </div>) }
       
      {/* )} */}
    </>
  );
};

export default Login;

