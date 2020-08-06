import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import {Button} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {setLogin, setEmail, setRole} from "../login_Actions";


const mapStateToProps = state => {
    console.log("loginpage",state)
    return {isLoggedIn: state}
}
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:"",
            password:"",
            status:false,
            errMsg:"",
            rememberedVal:false
        }
    }
    rememberUser = async () =>{
        try {
            await localStorage.setItem("rememberMe",true)
            await localStorage.setItem("YOUR-KEY", this.state.email);
        } catch (error) {
            // Error saving data
            console.log("rememberedVal error ", error)
        }
    }
    getRememberedUser = async () => {
        try {
            const username = await localStorage.getItem('YOUR-KEY');
            if (username !== null) {
                // We have username!!
                return username;
            }
        } catch (error) {
            // Error retrieving data
            console.log("getRememberedUser error ", error)
        }
    };
    forgetUser = async () => {
        try {
            await localStorage.setItem("rememberMe",false)
            await localStorage.removeItem('YOUR-KEY');
        } catch (error) {
            // Error removing
            console.log("forgetUser error ", error)
        }
    };
    toggleRememberMe = (event) =>{
        console.log(this.state.rememberedVal)
        this.setState({
            rememberedVal:event.target.checked
        })
        if(event.target.checked===true){
            // User wants to be remembered
            console.log("remember")
            this.rememberUser()
        }else{
            console.log("forget")
            this.forgetUser()
        }
    }
    async componentDidMount() {
        const username = await this.getRememberedUser()
        console.log(this.state.rememberedVal)

        this.setState({
            email:username || "",
            rememberedVal:username? true:false
        })
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
                    localStorage.setItem("userInfo",data)
                    localStorage.setItem("loggedIn","LOGIN")
                    this.props.dispatch(setEmail(data.email))
                    this.props.dispatch(setLogin("LOGIN"))


                    console.log("already login",this.props)
                    if(data.role==="doctor"){
                        console.log("doctor")
                        const {history} = this.props
                        localStorage.setItem("email",data.email)
                        this.props.dispatch(setRole("DOCTOR"))
                        localStorage.setItem('role',"doctor")
                        history.push(`/dashboard/doctor`)
                    }else if(data.role==="patient"){
                        console.log("patient")
                        const {history} = this.props
                        localStorage.setItem("email",data.email)
                        localStorage.setItem('role',"patient")
                        this.props.dispatch(setRole("PATIENT"))

                        //history.push(`/dashboard/patient`)
                        history.push(`/dashboard/patient`)

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
                            <input type="checkbox" id="customCheck1"  value="remember" checked={this.state.rememberedVal}  onChange={this.toggleRememberMe}/>
                                <label htmlFor="customCheck1">Remember me</label>
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
const login = connect(mapStateToProps)(LoginPage)


export default login;