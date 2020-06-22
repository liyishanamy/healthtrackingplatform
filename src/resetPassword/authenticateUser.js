import React, {Component} from 'react';
import Input from "@material-ui/core/Input";
import Button from '@material-ui/core/Button';
class AuthenticateUser extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:"",
            question1:"",
            question2:"",
            question3:"",
            answer1:"",
            answer2:"",
            answer3:"",
            accessToken:"",
            errMsg:"",
            cannotFindUserMsg:""
        }
    }

    getSecurityQuestion=(e)=>{
        console.log("here",this.state.email)
        const data={
            "email":this.state.email
        }

        console.log(JSON.stringify(data))
        fetch('http://localhost:3000/security-questions/getQuestions',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if(data.message==="The user has not set the security questions yet"){
                    this.setState({
                        cannotFindUserMsg:data.message
                    })
                }else{
                    this.setState({
                        cannotFindUserMsg:""
                    })

                    this.setState({
                        question1:data['question1'],
                        question2:data['question2'],
                        question3:data['question3']
                    })
                }







            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    authenticate=(e)=>{
        const data={
            email:this.state.email,
            question1:{
                answer_1:this.state.answer1
            },
            question2:{
                answer_2:this.state.answer2
            },
            question3:{
                answer_3:this.state.answer3
            },


        }


        fetch('http://localhost:3000/security-questions/authenticate',{
            method:'POST',
            headers:{
                'Access-Control-Allow-Origin':'http://localhost:8000/authenticate',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if(data.message==="Authentication failed"){
                    this.setState({
                        errMsg:data.message
                    })
                }
                console.log('Success:', data);
                this.setState({
                    accessToken:data.accessToken
                },()=>{
                    localStorage.setItem("accessToken",this.state.accessToken)
                })

                const {history} = this.props
                history.push('/resetPassword')

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
    handleEmail=(e)=>{

        this.setState({
            email:e.target.value
        },
        )
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




    render() {
        return (
            <div>
                <div className="form-group">
                    <label>Email</label>
                    <Input type="text" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleEmail} required />
                </div>
                <div className="form-group">
                    {this.state.cannotFindUserMsg}
                </div>

                <Button onClick={this.getSecurityQuestion}>Go</Button>

                <div>

                    <div className="form-group">
                        <label>{this.state.question1}</label>
                        <Input type="text" className="form-control" placeholder="answer" value={this.state.answer1} onChange={this.handleAnswer1} required />
                    </div>

                    <div className="form-group">
                        <label>{this.state.question2}</label>
                        <Input type="text" className="form-control" placeholder="answer" value={this.state.answer2} onChange={this.handleAnswer2} required />
                    </div>

                    <div className="form-group">
                        <label>{this.state.question3}</label>
                        <Input type="text" className="form-control" placeholder="answer" value={this.state.answer3} onChange={this.handleAnswer3} required />
                    </div>


                    <Button onClick={this.authenticate}>Next</Button>
                    <div className="form-group">
                        {this.state.errMsg}
                    </div>

                </div>
                
            </div>
        );
    }
}

export default AuthenticateUser;