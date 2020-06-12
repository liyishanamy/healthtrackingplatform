import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./loginPage";
import SignupPage from "./signupPage";
import DoctorDashboard from "./doctorDashboard";
import PatientDashboard from './patientDashboard';
import SetSecurityQuestions from './setSecurityQuestions';
import ForgetPasswordPage from './resetPassword/forgetPasswordPage';
import AuthenticateUser from './resetPassword/authenticateUser';
ReactDOM.render(
  <BrowserRouter>
      <div className="auth-wrapper">
          <div className="auth-inner">
              <Switch>
                  <Route exact path='/' component={LoginPage} />
                  <Route path="/sign-in" component={LoginPage} />
                  <Route path="/sign-up" component={SignupPage} />
                  <Route path="/dashboard/doctor" component={DoctorDashboard}/>
                  <Route path="/dashboard/patient" component={PatientDashboard}/>
                  <Route path="/setSecurityQuestions" component={SetSecurityQuestions}/>
                  <Route path="/logout" component={LoginPage}/>
                  <Route path="/resetPassword" component={ForgetPasswordPage}/>
                  <Route path='/authenticate' component={AuthenticateUser}/>
              </Switch>
              <App/>
          </div>
      </div>

  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
