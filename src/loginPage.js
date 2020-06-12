import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import {Button} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:"",
            password:"",
            status:false,
            errMsg:""
        }


    }

    handleEmail=(e)=>{
        this.setState({
            email:e.target.value
        })
    }
    handlePassword=(e)=>{
        this.setState({
            password:e.target.value
        })
    }
    handleLogin=(event)=>{
        event.preventDefault();
        let data = {
            email:this.state.email,
            password:this.state.password
        }
        console.log(data)
        // Check to see if they could authenticate
        fetch("http://localhost:3000/login", {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':"http://localhost:8000/sign-in"
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                console.log("data",data)
                if(data.message==="Authentication failed"){
                    this.setState({
                        errMsg:data.message
                    })

                }else{
                    console.log('Success:', data);
                    localStorage.setItem("accessToken",data.accessToken)
                    if(data.role==="doctor"){
                        console.log("doctor")
                        const {history} = this.props
                        localStorage.setItem("loggedIn",true)
                        localStorage.setItem('role',"doctor")
                        history.push('/dashboard/doctor')
                    }else if(data.role==="patient"){
                        console.log("patient")
                        const {history} = this.props
                        localStorage.setItem("loggedIn",true)
                        localStorage.setItem('role',"patient")
                        history.push('/dashboard/patient')

                    }

                }


            })
            .catch((error) => {
                this.setState({
                    errMsg:error.toString()
                })
                console.error('Error:', error);
            });
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <Input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleEmail} required/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <Input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handlePassword} required/>
                    </div>
                    <div>{this.state.errMsg}</div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <Input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <Button color="primary" type="submit" variant="contained" onClick={this.handleLogin} >Submit</Button>
                    <p className="forgot-password text-right">
                         <Link className="nav-link" to={"/authenticate"}> Forgot password?</Link>
                    </p>
                </form>
                
            </div>
        );
    }
}

export default LoginPage;