import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./loginPage/loginPage";
import SignupPage from "./signupProcess/signupPage";
import DoctorDashboard from "./doctor/doctorDashboard";
import PatientDashboard from './patient/patientDashboard';
import SetSecurityQuestions from './signupProcess/setSecurityQuestions';
import ForgetPasswordPage from './resetPassword/forgetPasswordPage';
import AuthenticateUser from './resetPassword/authenticateUser';
import UserProfile from './profile/userProfile';
import PatientList from './doctor/patientList';
import HealthStatus from './patient/healthStatus';
import MyStats from './patient/myStats'
import PatientChatbox from "./patient/patientChatbox";
import PatientHealthStatus from "./doctor/patientPanel"
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import ViewAppointment from './patient/Appointment/viewAppointment';
import TestResult from './patient/Appointment/testResult'
import theme from "./theme";
import PatientAppointment from "./patient/patientAppointment";
import ManageAppointment from "./doctor/manageAppointment";
ReactDOM.render(
    <ThemeProvider theme={theme}>
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
                        <Route path='/userProfile' component={UserProfile}/>
                        <Route path="/patientList" component={PatientList}/>
                        <Route path='/healthStatus' component={HealthStatus} />
                        <Route path='/myStats' component={MyStats}/>
                        <Route path='/patientChatbox' component={PatientChatbox}/>
                        <Route path='/patientHealthStatus/:email' component={PatientHealthStatus}/>
                        <Route path='/updateResult/:email' component={ManageAppointment}/>
                        <Route path='/bookAppointment' component={PatientAppointment}/>
                        <Route path='/viewAppointment' component={ViewAppointment}/>
                        <Route path='/viewTestResult' component={TestResult}/>
                    </Switch>
                    <App/>
                </div>
            </div>

        </BrowserRouter>

    </ThemeProvider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
