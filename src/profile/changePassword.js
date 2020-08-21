import React, {Component} from 'react';
import Input from "@material-ui/core/Input";
import {Button} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {errorHandling} from "../errorHandling";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state={
            newPassword:"",
            confirmedPassword:"",
            passwordErrorMsg:""
        }
    }
    handlePassword=(e)=>{
        this.setState({
            newPassword:e.target.value
        })
    }
    handleConfirmedPassword=(e)=>{
        this.setState({
            confirmedPassword:e.target.value
        })
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        const data =  {
            "password":this.state.newPassword,
            "confirmedPassword":this.state.confirmedPassword
        }

        if(this.state.newPassword!==this.state.confirmedPassword) {
            this.setState({
                passwordErrorMsg: "Error message does not match up"
            })
        }
        else{
            //const passwordRegex =new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
            const passwordRegex =new RegExp("^(?=.{3,})")
            let pwd= this.state.newPassword
            if (!passwordRegex.test(pwd)){
                this.setState({
                    passwordErrorMsg:"The password should have at least 8 digits,and it must contain at least one digit, lower case letter, and one uppercase letter and one special char"
                })
            } else {
                this.setState({
                    passwordErrorMsg: "",
                    newPassword: "",
                    confirmedPassword: "",
                })


                fetch("http://localhost:3000/resetPassword", {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                }).then(response => {
                    if(!response.ok) {
                        this.setState({
                            passwordErrorMsg: "You can only change your password once a day"
                        })
                    }
                    else return response.json();
                })

                    .then(data => {
                        if (data.message === "The password does not match up") {
                            this.setState({
                                passwordErrorMsg: data.message
                            })
                        }
                        else if (data.message === "Your password has been updated!") {
                            alert(data.message)
                            this.setState({
                                newPassword: "",
                                confirmedPassword: ""
                            })
                        } else if (data.message === "the token is invalid") {
                            throw data
                        }
                    }).catch(e => errorHandling(e));


            }}



    }
    render() {

        return (
            <div>
                <div className="form-group">
                    <label>New Password</label>
                    <Input type="password" className="form-control" placeholder="Enter New password"  value={this.state.newPassword} onChange={this.handlePassword} required/>
                </div>
                <div className="form-group">
                    <label>Confirm New Password</label>
                    <Input type="password" className="form-control" placeholder="Confirm New password" value={this.state.confirmedPassword} onChange={this.handleConfirmedPassword} required/>
                    </div>

                <div>{this.state.passwordErrorMsg}</div>
                <Button onClick={this.handleSubmit} >Save</Button>
            </div>
        );
    }
}

export default ChangePassword;
