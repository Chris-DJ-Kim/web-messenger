import React from "react";

import { Input, InputLabel } from "@material-ui/core";

const SignupForm = () => {
  const inputProps = {
    minlength: 6,
  };
  return (
    <>
      <InputLabel>Username</InputLabel>

      <Input
        id="standard-basic"
        color="primary"
        type="text"
        label="username"
        required
      />
      <InputLabel>Email</InputLabel>
      <Input
        id="standard-basic"
        color="primary"
        type="email"
        label="email"
        required
      />
      <InputLabel>Password</InputLabel>
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

export default SignupForm;
