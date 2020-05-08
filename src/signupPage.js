import React, {Component} from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DatePicker from "react-date-picker";
import Radio from "@material-ui/core/Radio";
import {Button,FormControl,FormLabel,RadioGroup,FormControlLabel} from "@material-ui/core";
import Input from '@material-ui/core/Input';


class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            firstname:"",
            lastname:"",
            gender:"",
            date:new Date(),
            street:"",
            city:"",
            state:"",
            zip_code:"",
            invitation:"",
            googleMapLink:"",
            autocomplete:null,
            email:"",
            password:"",
            confirmedPassword:"",
            passwordErrorMsg:""
        }

    }

    onChange = date => this.setState({ date })
    handleFirstName=(e)=>{
        this.setState({
            firstname:e.target.value
        })
    }
    handleLastName=(e)=>{
        this.setState({
            lastname:e.target.value
        })
    }
    handleEmail=(e)=>{
        this.setState({
            email:e.target.value
        })
    }
    handleGender=(e)=>{
        this.setState({
            gender:e.target.value
        })
    }
    handleInvitation=(e)=>{
        this.setState({
            invitation:e.target.value
        })
    }

    handleStreet=(e)=>{
        this.setState({
            street:e.target.value
        })
    }
    handleCity=(e)=>{
        this.setState({
            city:e.target.value
        })
    }
    handleState=(e)=>{
        this.setState({
            state:e.target.value
        })
    }
    handleZipcode=(e)=>{
        this.setState({
            zip_code:e.target.value
        })
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




    handleSubmit=(event)=>{
        event.preventDefault();
        const form = event.target;
        console.log(event.target);
        if(this.state.password!==this.state.confirmedPassword){
            this.setState({
                passwordErrorMsg:"Error message does not match up"
            })
        }
        else{
            this.setState({
                passwordErrorMsg:""
            })

            var data = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                gender: this.state.gender,
                invitation:this.state.invitation,
                street: this.state.street,
                city: this.state.city,
                state: this.state.state,
                postcode: this.state.zip_code,
                birthday:this.state.date,
                email: this.state.email,
                password: this.state.password,
                confirmedPassword: this.state.confirmedPassword
            }
            console.log(JSON.stringify(data))


            fetch("http://localhost:3000/users", {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':"http://localhost:8000/sign-up"
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

    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <Input type="text" className="form-control" placeholder="First name" value={this.state.firstname} onChange={this.handleFirstName} required />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <Input type="text" className="form-control" placeholder="Last name" value={this.state.lastname} onChange={this.handleLastName} required />
                    </div>

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1"  onChange={this.handleGender} required>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>




                    <div className="form-group">
                        <label>Email address</label>
                        <Input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleEmail} required />
                    </div>
                    <div className="form-group">
                        <label>invitation code</label>
                        <Input type="text" className="form-control" placeholder="invitation code" value={this.state.invitation} onChange={this.handleInvitation} required />
                    </div>

                    <div className="form-group">
                        <label>Birthday </label><br/>
                        <DatePicker onChange={this.onChange} value={this.state.date} />
                    </div>


                    <div className="form-group">
                        <label>Address</label><br/>
                        <Input
                            type="text"
                            value={this.state.street}
                            placeholder="Street Address"
                            onChange={this.handleStreet}
                        />
                        <Input
                            type="text"
                            value={this.state.city}
                            placeholder="City"
                            onChange={this.handleCity}
                             />
                        <Input
                            type="text"
                            value={this.state.state}
                            placeholder="State"
                            onChange={this.handleState}
                            />
                        <Input
                            type="text"
                            value={this.state.zip_code}
                            placeholder="Zipcode"
                            onChange={this.handleZipcode}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <Input type="password" className="form-control" placeholder="Enter password"  value={this.state.password} onChange={this.handlePassword} required/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <Input type="password" className="form-control" placeholder="Confirm password" value={this.state.confirmedPassword} onChange={this.handleConfirmedPassword} required/>
                    </div>
                    <div>{this.state.passwordErrorMsg}</div>

                    <Button color="primary" type="submit" variant="contained">Sign Up</Button>
                    <p className="forgot-password text-right">
                        Already registered <Link to={"/sign-in"}>sign in?</Link>
                    </p>
                </form>

            </div>
        );
    }
}

export default SignupPage;