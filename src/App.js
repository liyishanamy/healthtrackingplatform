import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link, Redirect, BrowserRouter} from "react-router-dom";
import LoginPage from "./loginPage/loginPage";
import SignupPage from "./signupProcess/signupPage";
import DoctorDashboard from "./doctor/doctorDashboard";


function handleLogout() {
    console.log("click logout")
    let deleteToken={"token":localStorage.getItem("accessToken")}
    fetch('http://localhost:3000/logout', {
        method: 'DELETE',
        body: JSON.stringify(deleteToken)
    })
        .then(res => res.json()) // or res.json()
        .then(res => console.log(res))
    //localStorage.removeItem("accessToken")
    localStorage.clear();

    this.props.history.push('/sign-in')
}

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

    let element;
    console.log("localStorage",localStorage)
    if (localStorage.getItem("loggedIn")==="true"){
        console.log(localStorage)
         element =  <nav className="navbar navbar-expand-lg navbar-light fixed-top">

            <div className="container">

                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" onClick={handleLogout} to={"/sign-in"}>Logout</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    }else{

        element =  <nav className="navbar navbar-expand-lg navbar-light fixed-top">

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
        </nav>
    }
  return (
      <div className="App">
          {element}
      </div>




  );
}

export default App;
