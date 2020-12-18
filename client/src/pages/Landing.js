import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import LandingForm from "../components/landing-form";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import mainStyles from "../styles/main-styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import { ReactComponent as Logo } from "../images/speechBubbleIcon.svg";

const LandingPage = (props) => {
  const [signUpOrLoginSuccess, setSignUpOrLoginSuccess] = useState(false);

  const submitForm = async (event, path, inputs) => {
    event.preventDefault();
    try {
      const response = await axios.post(path, inputs);
      if (response.status === 201 || 200) setSignUpOrLoginSuccess(true);
    } catch (e) {}
  };

  //material-ui stuff
  const { classes } = props;

  //If user signs up successfully, redirects to messaging app
  if (signUpOrLoginSuccess) {
    return <Redirect to="/messages" />;
  }

  return (
    <Grid container spacing={0} style={{ height: "100vh" }}>
      <Grid item xs={5} className={classes.backgroundImg}>
        <div className={classes.colorOverlay}>
          <Typography
            variant="h2"
            align="center"
            style={{ color: "#ffffff", padding: "0 5vh" }}
          >
            <Typography style={{ color: "inherit" }}>
              <SvgIcon
                style={{ width: "5em", height: "5em", paddingBottom: "4vh" }}
              >
                <Logo />
              </SvgIcon>
            </Typography>
            Converse with anyone with any language
          </Typography>
        </div>
      </Grid>
      <Grid item xs={7} align="center">
        <LandingForm
          setSignUpSuccess={setSignUpOrLoginSuccess}
          submitForm={submitForm}
          isSignup={props.isSignup}
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(mainStyles)(LandingPage);
