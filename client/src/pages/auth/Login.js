import React from "react";
import loginImage from "../../assets/images/banner1.jpg";
import Form from "../../components/shared/Form/Form";

import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
import { toast } from "react-toastify";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src={loginImage} alt="loginImage" />
          </div>
          <div className="col-md-4 form-container">
            <Form
              formTitle={"Login Page"}
              submitBtn={"Login"}
              formType={"login"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
