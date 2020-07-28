import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Switch, Route, Link, Redirect, BrowserRouter} from "react-router-dom";
import LoginPage from "./loginPage/loginPage";
import SignupPage from "./signupProcess/signupPage";
import DoctorDashboard from "./doctor/doctorDashboard";

import { createStore, combineReducers } from "redux";
import { Provider, connect } from 'react-redux';
import {isLoggedInOptions} from './login_Actions/index'
function App(props) {


    function handleLogout(props){
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.setItem("loggedIn",false);

        const {history} = this.props;
        history.push('/sign-in')

        console.log("click logout")
        let deleteToken={"token":localStorage.getItem("accessToken")}
        fetch('http://localhost:3000/logout', {
            method: 'DELETE',
            body: JSON.stringify(deleteToken)
        })
            .then(res => res.json()) // or res.json()
            .then(res => console.log(res))
    }

    let element;

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
    }else if (localStorage.getItem("loggedIn")==="false"){

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
