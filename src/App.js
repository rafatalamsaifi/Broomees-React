import React, { useState } from "react";
import axios from 'axios'
import "./App.css";

const App = () => {
  const url = "http://localhost:5000/register"
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formValues.firstName) formErrors.firstName = "First name is required";
    if (!formValues.lastName) formErrors.lastName = "Last name is required";
    if (!formValues.email) formErrors.email = "Email is required";
    if (!formValues.username) formErrors.username = "Username is required";
    if (!formValues.password) formErrors.password = "Password is required";
    if (formValues.password !== formValues.confirmPassword)
      formErrors.confirmPassword = "Passwords do not match";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage("");
    setIsError(false);
    if (validate()) {
      try {
        const response = await axios.post(url, formValues);

        if (response.status === 201) {
          setServerMessage(response.data.message);
          setIsError(false);
          setFormValues({
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
          });
          setErrors({});
        } else {
          setServerMessage(response.data.message);
          setIsError(true);
        }
      } catch (error) {
        if (error.response) {
          setServerMessage(error.response.data.message);
          setIsError(true);
        } else {
          setServerMessage("Server error. Please try again later.");
          setIsError(true);
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <img
          src="https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg"
          alt="Plane View"
          className="background-image"
        />
        <div className="overlay"></div>
        <div className="text-content">
          <h1>Altitude Air</h1>
          <p>
            We promise to ensure that your well-being is taken care of while
            traveling with us. Boasting top-class fleet inventory and a 5-star
            approval for our in-flight experience, you're getting the best from
            Altitude with no attitude.
          </p>
        </div>
      </div>
      <div className="right-section">
        <h2>Explore & Experience</h2>
        <p>Get onto your most comfortable journey yet. All the way up.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formValues.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formValues.username}
            onChange={handleInputChange}
          />
          {errors.username && (
            <span className="error">{errors.username}</span>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <span className="error">{errors.password}</span>
          )}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formValues.confirmPassword}
            onChange={handleInputChange}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
          <button type="submit">Get Started</button>
        </form>
        {serverMessage && (
          <div className={isError ? "error-message" : "success-message"}>
            {serverMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
