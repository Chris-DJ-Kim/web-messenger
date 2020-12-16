import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { InputLabel, Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const Login = () => {
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValues({
      ...inputValues,
      [event.target.name]: value,
    });
  };
  const submitForm = async (event) => {
    event.preventDefault();
    const response = await axios.post("/login", inputValues);
    if (response.status === 200) setLoginSuccess(true);
  };
  const inputProps = {
    minlength: 6,
  };
  //Redirects to messaging app on login success
  if (loginSuccess) return <Redirect to="/messages" />;
  return (
    <div>
      <form onSubmit={submitForm}>
        <InputLabel shrink>Username</InputLabel>

        <Input
          id="standard-basic"
          color="primary"
          type="text"
          name="username"
          value={inputValues.username}
          onChange={handleChange}
          required
        />

        <InputLabel shrink>Password</InputLabel>
        <Input
          id="standard-basic"
          color="primary"
          type="password"
          name="password"
          value={inputValues.password}
          onChange={handleChange}
          inputProps={inputProps}
          required
        />
        <Button type="submit" variant="contained" color="primary" size="large">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
