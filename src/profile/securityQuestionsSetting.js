import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import {Button} from "@material-ui/core";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import {render} from 'react-dom';
import AvatarUploader from "react-avatar-uploader"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import "../App.css"
import Input from "@material-ui/core/Input";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DatePicker from 'react-date-picker';
import MuiPhoneNumber from "@material-ui/core/TextField";
import {setLogin, setProfileImage, setRole} from "../login_Actions";
import {connect} from "react-redux";
import {errorHandling}  from "../errorHandling"
const mapStateToProps = state => {
    console.log("state",state)

    return {isLoggedIn: state.loginReducer,userEmail: state.emailReducer,role:state.roleReducer,url:state.imageReducer}
}
class SecurityQuestionsSetting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem("email"),
            question1:"",
            question2:"",
            question3:"",
            answer1:"",
            answer2:"",
            answer3:"",
            displayMode: "ReadOnly",
            flag: true,
            saveMsg:""
        }
    }



    changeSecurityQuestions = (e) => {

        if(this.state.answer1==="" || this.state.answer2===""||this.state.answer3===""){
            alert("Please make sure the answer is not empty")
        }else{
            const body = {
                "email":this.state.email,
                "update":{
                    "question1":{"question_1":this.state.question1,"answer_1":this.state.answer1},
                    "question2":{"question_2":this.state.question2,"answer_2":this.state.answer2},
                    "question3":{"question_3":this.state.question3,"answer_3":this.state.answer3}
                }
            }

            fetch("http://localhost:3000/security-questions/", {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }).then(response => response.json())
                .then(data => {

                    if(data.message==="update your security questions successfully!"){
                        alert(data.message)

                    }else{
                        throw data
                    }


                 }).catch( e=> errorHandling(e) );
        }

    }


    handleAnswer1 = (e) => {
        this.setState({
            answer1: e.target.value
        })
    }

    handleAnswer2 = (e) => {
        this.setState({
            answer2: e.target.value
        })
    }
    handleAnswer3 = (e) => {
        this.setState({
            answer3: e.target.value
        })
    }

    toggleChecked = (e) => {
        console.log(this.state.flag)
        if (this.state.flag) {
            this.setState({
                displayMode: "Edit Mode",
                flag: !this.state.flag
            })
        }
        if (!this.state.flag) {
            this.setState({
                displayMode: "Read Mode",
                flag: !this.state.flag
            })
        }

    }

    componentDidMount() {

        fetch("http://localhost:3000/security-questions/getQuestions", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: this.state.email}),
        }).then(response => response.json())
            .then(data => {
                if (data.message!=="the token is invalid"){
                    console.log("get questions",data)
                    this.setState({
                        question1:data.question1,
                        question2:data.question2,
                        question3:data.question3,

                    } )
                }else{
                    throw data
                }


            }).catch( e=> errorHandling(e) );



        fetch("http://localhost:3000/security-questions/getAnswers", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: this.state.email}),
        }).then(response => response.json())
            .then(data => {
                console.log("get answers",data)
                if (data.message!=="the token is invalid"){
                    this.setState({
                        answer1:data.answer1,
                        answer2:data.answer2,
                        answer3:data.answer3,

                    } )
                }else{
                    throw data
                }


        }).catch( e=> errorHandling(e) );






    }


    render() {
        return (
            <div style={{padding: 150}}>
                <div>Privacy Management</div>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch onChange={this.toggleChecked}/>}
                        label={this.state.displayMode}
                    />
                </FormGroup>

                <div>
                    <label>{this.state.question1}</label><br/>
                    <Input
                        type="text"
                        value={this.state.answer1}
                        placeholder="answer"
                        onChange={this.handleAnswer1}
                        disabled={this.state.flag}
                        //required
                    />
                </div>
                <div><label>{this.state.question2}</label><br/>
                    <Input
                        type="text"
                        value={this.state.answer2}
                        placeholder="answer"
                        onChange={this.handleAnswer2}
                        disabled={this.state.flag}
                        //required
                    /></div>
                <div>
                    <label>{this.state.question3}</label><br/>
                    <Input
                        type="text"
                        value={this.state.answer3}
                        placeholder="answer"
                        onChange={this.handleAnswer3}
                        disabled={this.state.flag}
                        //required
                    />
                </div>


                <Button onClick={this.changeSecurityQuestions} disabled={this.state.flag}>Save</Button>
            </div>
        );
    }
}
const Profile = connect(mapStateToProps)(SecurityQuestionsSetting);

export default Profile;