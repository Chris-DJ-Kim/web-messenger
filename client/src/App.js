import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import Main from "./pages/Main";
import Messages from "./pages/Messages";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            render={(props) => <Main {...props} isSignup={false} />}
          />
          <Route path="/messages" component={Messages} />
          <Route
            path="/"
            render={(props) => <Main {...props} isSignup={true} />}
          />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
