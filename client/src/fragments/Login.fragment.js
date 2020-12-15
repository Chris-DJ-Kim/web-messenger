import React from "react";

import { InputLabel, Input } from "@material-ui/core";

const LoginForm = () => {
  const inputProps = {
    minlength: 6,
  };
  return (
    <>
      <InputLabel shrink>Username</InputLabel>

      <Input
        id="standard-basic"
        color="primary"
        type="text"
        label="username"
        required
      />

      <InputLabel shrink>Password</InputLabel>
      <Input
        id="standard-basic"
        color="primary"
        type="password"
        inputProps={inputProps}
        required
      />
    </>
  );
};

export default LoginForm;
