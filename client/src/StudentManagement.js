import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import NavBar from "./HomePage/NavBar";
import Login from "./Login/Login";

//This "/" path is not used
const InvalidPage = () => {
  return <Redirect to="/login" />;
};

class StudentManagement extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/home" component={NavBar} />
          <Route exact path="/login" component={Login} />
          <Route path="/" component={InvalidPage} />
        </Switch>
      </Router>
    );
  }
}

export default StudentManagement;
