import React from "react";

import LoginForm from "../fragments/Login.fragment";

import Button from "@material-ui/core/Button";

const Login = () => {
  return (
    <div>
      <form>
        <LoginForm />
        <Button variant="contained" color="primary" size="large">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
