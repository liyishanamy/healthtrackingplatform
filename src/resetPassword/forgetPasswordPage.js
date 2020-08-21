import React, {Component} from 'react';
import Input from "@material-ui/core/Input";
import Button from '@material-ui/core/Button';
class ForgetPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            passwordErrorMsg:"",
            password:"",
            confirmedPassword:""

        }
    }
    handlePassword=(e)=>{
        this.setState({
            password:e.target.value
        })
    }
    handleConfirmedPassword=(e)=>{
        this.setState({
            confirmedPassword:e.target.value
        })
    }
    changePassword=(e)=> {
        const passwordRegex = new RegExp("^(?=.{3,})")
        let pwd = this.state.password
        if (!passwordRegex.test(pwd)) {
            this.setState({
                passwordErrorMsg: "The password should have at least 8 digits,and it must contain at least one digit, lower case letter, and one uppercase letter and one special char"
            })
        }
        if (this.state.password !== this.state.confirmedPassword) {
            this.setState({
                passwordErrorMsg: "The password does not match up"
            })
        }
        if(this.state.password === this.state.confirmedPassword && passwordRegex.test(pwd)){
            this.setState({
                passwordErrorMsg:""
            })
            const data = {
                password:this.state.password,
                confirmedPassword:this.state.confirmedPassword
            }

            fetch('http://localhost:3000/resetPassword',{
                method:'PUT',
                headers:{
                    'Authorization':'Bearer ' +(localStorage.getItem("accessToken")),
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(data => {
                    if(data.message==="Your password has been updated!"){
                        const {history} = this.props
                        history.push('/sign-in')

                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        }


    }

    render() {
        return (
            <div style={{padding:"50px"}}>
                <h4>Reset my password</h4>
                <label>Note:Before you reset the password, you have to authenticate yourself first</label>
                <div className="form-group">
                    <label>Password</label>
                    <Input type="password" className="form-control" placeholder="Enter password"  value={this.state.password} onChange={this.handlePassword} required/>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <Input type="password" className="form-control" placeholder="Confirm password" value={this.state.confirmedPassword} onChange={this.handleConfirmedPassword} required/>
                </div>
                <div>{this.state.passwordErrorMsg}</div>
                <Button onClick={this.changePassword}>Change Password</Button>

            </div>

        );
    }
}

export default ForgetPasswordPage;