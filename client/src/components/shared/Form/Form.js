import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";
//
import {
  handleLoginSaga,
  handleRegisterSaga,
} from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "donar",
    name: "",
    organizationName: "",
    hospitalName: "",
    website: "",
    address: "",
    phone: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, e.g., submit it to a backend API
    if (formType === "login")
      return handleLogin(e, formData.email, formData.password, formData.role);
    else if (formType === "register")
      return handleRegister(
        e,
        formData.name,
        formData.role,
        formData.email,
        formData.password,
        formData.hospitalName,
        formData.website,
        formData.address,
        formData.organizationName,
        formData.phone
      );

    // Reset the form data after form submission
    setFormData({
      email: "",
      password: "",
      role: "donar",
      name: "",
      organizationName: "",
      hospitalName: "",
      website: "",
      address: "",
      phone: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">{formTitle}</h1>
        <hr />

        <div className="d-flex mb-3">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="donarRadio"
              value={"donar"}
              onChange={handleOnChange}
              defaultChecked
            />
            <label htmlFor="donarRadio" className="form-check-label">
              Donar
            </label>
          </div>

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={handleOnChange}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>

          <div className="form-check ms-2 ">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={handleOnChange}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>

          <div className="form-check ms-2 ">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="organizationRadio"
              value={"organization"}
              onChange={handleOnChange}
            />
            <label htmlFor="organizationRadio" className="form-check-label">
              Organization
            </label>
          </div>
        </div>

        {formType === "login" && (
          <>
            <InputType
              labelText={"Email"}
              labelFor={"forEmail"}
              inputType={"email"}
              name={"email"}
              value={formData.email}
              onChange={handleOnChange}
            />

            <InputType
              labelText={"Password"}
              labelFor={"forPassword"}
              inputType={"password"}
              name={"password"}
              value={formData.password}
              onChange={handleOnChange}
            />
          </>
        )}

        {formType === "register" && (
          <>
            <InputType
              labelText={"Email"}
              labelFor={"forEmail"}
              inputType={"email"}
              name={"email"}
              value={formData.email}
              onChange={handleOnChange}
            />

            <InputType
              labelText={"Password"}
              labelFor={"forPassword"}
              inputType={"password"}
              name={"password"}
              value={formData.password}
              onChange={handleOnChange}
            />

            {(formData.role === "admin" || formData.role === "donar") && (
              <InputType
                labelText={"Name"}
                labelFor={"forName"}
                inputType={"text"}
                name={"name"}
                value={formData.name}
                onChange={handleOnChange}
              />
            )}

            {formData.role === "organization" && (
              <InputType
                labelText={"Organization Name"}
                labelFor={"forOrganizationName"}
                inputType={"text"}
                name={"organizationName"}
                value={formData.organizationName}
                onChange={handleOnChange}
              />
            )}

            {formData.role === "hospital" && (
              <InputType
                labelText={"Hospital Name"}
                labelFor={"forHospitalName"}
                inputType={"text"}
                name={"hospitalName"}
                value={formData.hospitalName}
                onChange={handleOnChange}
              />
            )}

            <InputType
              labelText={"Website"}
              labelFor={"forWebsite"}
              inputType={"text"}
              name={"website"}
              value={formData.website}
              onChange={handleOnChange}
            />

            <InputType
              labelText={"Address"}
              labelFor={"forAddress"}
              inputType={"text"}
              name={"address"}
              value={formData.address}
              onChange={handleOnChange}
            />

            <InputType
              labelText={"Phone"}
              labelFor={"forPhone"}
              inputType={"text"}
              name={"phone"}
              value={formData.phone}
              onChange={handleOnChange}
            />
          </>
        )}

        <div className="d-flex  flex-row justify-content-between ">
          {formType === "login" ? (
            <p>
              Not register yet? Register
              <Link to="/register"> Here !</Link>
            </p>
          ) : (
            <p>
              Already User plase
              <Link to="/login"> Login !</Link>
            </p>
          )}
          <button type="submit" className="btn btn-primary">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
