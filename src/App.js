import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link, Redirect, BrowserRouter} from "react-router-dom";
import LoginPage from "./loginPage";
import SignupPage from "./signupPage";
import DoctorDashboard from "./doctorDashboard";

function App() {
    /**
  localStorage.setItem("loggedIn",false);
  let healthTrackElement;
  if(!localStorage.getItem("loggedIn")){
      healthTrackElement = <Link className="navbar-brand" to={"/sign-in"}>HealthTrack</Link>
  }else{
      if(localStorage.getItem('role')==='patient'){
          healthTrackElement = <Link className="navbar-brand" to={"/dashboard/patient"}>HealthTrack</Link>
      }else if (localStorage.getItem('role')==='doctor'){
          healthTrackElement = <Link className="navbar-brand" to={"/dashboard/doctor"}>HealthTrack</Link>
      }

  }*/
  return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">

                        <Link className="nav-link" to={"/sign-in"}>Login</Link>
                </li>
                <li className="nav-item">
                 <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav></div>





  );
}

export default App;
