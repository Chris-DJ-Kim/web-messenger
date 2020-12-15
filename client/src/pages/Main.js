import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import background from "../images/bg-img.png";

import SignupForm from "../fragments/Signup.fragment";

import formStyles from "../styles/form-styles";

const Main = (props) => {
  const { classes } = props;
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={0}
      style={{ width: "100%", height: "100% " }}
    >
      <Grid item>
        <img class={classes.backgroundImg} src={background} alt="background" />
      </Grid>
      <Grid item align="center">
        Already have an account?
        <Button color="contained" variant="outlined">
          Login
        </Button>
        <h1>Create an account</h1>
        <form className={classes.form}>
          <SignupForm />
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
