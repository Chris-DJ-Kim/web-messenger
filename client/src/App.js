import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Messages from "./pages/Messages";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/messages" component={Messages} />
          <Route path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
