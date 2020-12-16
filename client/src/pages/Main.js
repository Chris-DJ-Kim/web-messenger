import React, { useState } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { Input, InputLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import background from "../images/bg-img.png";

import formStyles from "../styles/form-styles";

const Main = (props) => {
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValues({
      ...inputValues,
      [event.target.name]: value,
    });
  };
  //Sends axios post request with inputValues
  const submitForm = async (event) => {
    event.preventDefault();
    const response = await axios.post("/signup", inputValues);
    if (response.status === 201) setSignUpSuccess(true);
  };

  //material-ui stuff
  const { classes } = props;
  const inputProps = {
    minLength: 6,
  };

  //If user signs up successfully, redirects to messaging app
  if (signUpSuccess) {
    return <Redirect to="/messages" />;
  }
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={0}
      style={{ width: "100%", height: "100% " }}
    >
      <Grid item>
        <img
          className={classes.backgroundImg}
          src={background}
          alt="background"
        />
      </Grid>
      <Grid item align="center">
        Already have an account?
        <Button
          color="primary"
          variant="outlined"
          size="large"
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <h1>Create an account</h1>
        <form className={classes.form} onSubmit={submitForm}>
          <InputLabel>Username</InputLabel>

          <Input
            id="standard-basic"
            color="primary"
            type="text"
            name="username"
            value={inputValues.username}
            onChange={handleChange}
            required
          />
          <InputLabel>Email</InputLabel>
          <Input
            id="standard-basic"
            color="primary"
            type="email"
            name="email"
            value={inputValues.email}
            onChange={handleChange}
            required
          />
          <InputLabel>Password</InputLabel>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Create
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default withStyles(formStyles)(Main);
