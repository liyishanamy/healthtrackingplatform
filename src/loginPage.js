import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import {Button} from "@material-ui/core";
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:"",
            password:""
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
    handleLogin=()=>{
        let data = {
            email:this.state.email,
            password:this.state.password
        }
        console.log(data)
        // Check to see if they could authenticate
        fetch("http://localhost:3000/users/login", {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':"http://localhost:8000/sign-in"
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
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
                        <Input type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <Input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <Input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <Button color="primary" type="submit" variant="contained" onClick={this.handleLogin} >Submit</Button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </form>
                
            </div>
        );
    }
}

export default LoginPage;