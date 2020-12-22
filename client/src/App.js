import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import MessagePage from "./pages/MessagePage";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            render={(props) => <LandingPage {...props} isSignup={false} />}
          />
          <Route path="/messages" component={MessagePage} />
          <Route
            path="/"
            render={(props) => <LandingPage {...props} isSignup={true} />}
          />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
