import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Index from "./views/Index.jsx";
import Login from "./views/page/Login.jsx";
import Profile from "./views/page/Profile.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Index {...props} />} />
      <Route
        path="/profile"
        exact
        render={props => <Profile {...props} />}
      />
      <Route path="/login" exact render={props => <Login {...props} />} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
