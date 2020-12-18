import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import formStyles from "../styles/form-styles";

const LandingForm = (props) => {
  //The prop "isSignup" will determine if this form is for the sign up form or the login form
  const [inputValues, setInputValues] = useState(
    props.isSignup
      ? { username: "", email: "", password: "" }
      : { username: "", password: "" }
  );
  const inputProps = {
    minLength: 6,
  };
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValues({
      ...inputValues,
      [event.target.name]: value,
    });
  };

  return (
    <Container className={props.classes.signupContainer}>
      <Container style={{ marginTop: "3vh", width: "65%", textAlign: "right" }}>
        {props.isSignup
          ? "Already have an account?"
          : "Need to create an account?"}
        <Button
          color="primary"
          size="large"
          component={Link}
          to={props.isSignup ? "/login" : "/signup"}
          style={{ padding: "1vh 3vh", marginLeft: "1vh" }}
        >
          {props.isSignup ? "Login" : "Sign Up"}
        </Button>
      </Container>
      <Container
        style={{ paddingBottom: "40vh", width: "65%", textAlign: "left" }}
      >
        <h1>{props.isSignup ? "Create an account" : "Log in"}</h1>
        <form
          style={{
            textAlign: "center",
          }}
          onSubmit={
            props.isSignup
              ? (e) => props.submitForm(e, "/signup", inputValues)
              : (e) => props.submitForm(e, "/login", inputValues)
          }
        >
          <TextField
            color="primary"
            margin="normal"
            type="text"
            label="Username"
            name="username"
            value={inputValues.username}
            onChange={handleChange}
            fullWidth
          />

          {props.isSignup ? (
            <TextField
              color="primary"
              margin="normal"
              type="email"
              label="E-mail address"
              name="email"
              value={inputValues.email}
              onChange={handleChange}
              fullWidth
            />
          ) : null}
          <TextField
            color="primary"
            margin="normal"
            type="password"
            label="Password"
            name="password"
            value={inputValues.password}
            onChange={handleChange}
            inputProps={inputProps}
            fullWidth
          />
          <Button
            type="submit"
            style={{ marginTop: "4vh", padding: "1vh 4vh" }}
            variant="contained"
            color="primary"
            size="large"
          >
            {props.isSignup ? "Create" : "Login"}
          </Button>
        </form>
      </Container>
    </Container>
  );
};

export default withStyles(formStyles)(LandingForm);
