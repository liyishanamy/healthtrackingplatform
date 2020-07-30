import React, {Component} from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import Select from 'react-select';
import Input from "@material-ui/core/Input";
import {setLogin} from "../login_Actions";
import {connect} from "react-redux";
const mapStateToProps = state => {

    return {isLoggedIn: state}
}
class SetSecurityQuestions extends Component {
    constructor(props) {
        super(props);
        props.dispatch(setLogin("SIGNUP"))
        this.state={
            email:props.location.state.detail.email,
            question1:"",
            answer1:"",
            question2:"",
            answer2:"",
            question3:"",
            answer3:"",
            userInfo:props.location.state.detail


        }
    }
    handleQuestion1=(e)=>{
        console.log(e)
        this.setState({
            question1:e.value
        })
    }
    handleQuestion2=(e)=>{
        this.setState({
            question2:e.value
        })
    }
    handleQuestion3=(e)=>{
        this.setState({
            question3:e.value
        })
    }
    handleAnswer1=(e)=>{
        this.setState({
            answer1:e.target.value
        })
    }
    handleAnswer2=(e)=>{
        this.setState({
            answer2:e.target.value
        })
    }
    handleAnswer3=(e)=>{
        this.setState({
            answer3:e.target.value
        })
    }
    setSecurityQuestions = (event)=>{
        var data = {
            userEmail:this.state.email,
            question1:{
                question_1:this.state.question1,
                answer_1:this.state.answer1
            },
            question2:{
                question_2:this.state.question2,
                answer_2:this.state.answer2
            },
            question3:{
                question_3:this.state.question3,
                answer_3:this.state.answer3
            },


        }
        fetch("http://localhost:3000/security-questions", {
            method: 'POST',
            headers:{
                'Authorization':'Bearer ' +(localStorage.getItem("accessToken")),
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':"http://localhost:8000/signup"
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (this.state.userInfo.role === "patient") {
                    const {history} = this.props
                    localStorage.setItem("loggedIn", "LOGIN")
                    this.props.dispatch(setLogin("LOGIN"))
                    localStorage.setItem("role", "patient")
                    localStorage.setItem('email',this.state.email)
                    history.push('/dashboard/patient')

                } else if (this.state.userInfo.role === "doctor") {
                    const {history} = this.props
                    localStorage.setItem("loggedIn", "LOGIN")
                    this.props.dispatch(setLogin("LOGIN"))
                    localStorage.setItem("role", "doctor")
                    localStorage.setItem('email',this.state.email)
                    history.push('/dashboard/doctor')
                }
            } )}







    render() {
        const options = [
            { value: "What is your mum name", label: "What is your mum name" },
            { value: "What is your dad name", label: "What is your dad name"},
            { value: "What is your nick name", label: "What is your nick name" },
            { value: "What is your best friend name", label: "What is your best friend name" },
            { value: "What is your hometown city", label: "What is your hometown city" },
            { value: "What year did you graduate from highschool", label: "What year did you graduate from highschool"},
            { value: "Which city is your primary located", label: "Which city is your primary located"},

        ]


        return (
            <div>
                <h2>Setting security questions</h2>
                <h4>Q1</h4>
            <Select
                id="portf"
                options={options}
                value ={this.state.question1}
                onChange={this.handleQuestion1.bind(this)}
                placeholder="Select the first Security Questions"
            /><br/>
                <div>{this.state.question1}</div><br/>
            <Input
                type="text"
                value={this.state.answer1}
                placeholder="Answer 1"
                onChange={this.handleAnswer1}
            /><br/>
                <h4>Q2</h4>
                <Select
                    id="portf"
                    options={options}
                    value ={this.state.question2}
                    onChange={this.handleQuestion2}
                    placeholder="Select the second Security Questions"
                /><br/>
                <div>{this.state.question2}</div><br/>
                <Input
                    type="text"
                    value={this.state.answer2}
                    placeholder="Answer 2"
                    onChange={this.handleAnswer2}
                /><br/>
                <h4>Q3</h4>
                <Select
                    id="portf"
                    options={options}
                    value ={this.state.question3}
                    onChange={this.handleQuestion3}
                    placeholder="Select the third Security Questions"
                /><br/>
                <div>{this.state.question3}</div><br/>
                <Input
                    type="text"
                    value={this.state.answer3}
                    placeholder="Answer 3"
                    onChange={this.handleAnswer3}
                /><br/>
                <button onClick={this.setSecurityQuestions}>Save</button>
            </div>

        );
    }
}

const SetQuestions = connect(mapStateToProps)(SetSecurityQuestions);
export default SetQuestions;