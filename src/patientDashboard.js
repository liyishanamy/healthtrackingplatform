import React,{Component} from 'react';
import {Link,useHistory} from "react-router-dom";


class PatientDashboard extends Component {
    constructor(props) {
        super(props);
        this.state={
            displayData:[]

        }
    }
    componentDidMount(){
        console.log('Bearer ' + localStorage.getItem("accessToken"))
        fetch('http://localhost:3000/user',{
            method:'GET',
            headers:{
                'Authorization':'Bearer ' +(localStorage.getItem("accessToken")),
                'Access-Control-Allow-Origin':'http://localhost:8000/patient/dashboard'
            }

        })
            .then(response => response.json())
            .then(data => {

                console.log('Success:', data);
                this.setState({
                    displayData:data[0]

                })


            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    handleLogout=()=>{
        console.log("click logout")
        let deleteToken={"token":localStorage.getItem("accessToken")}
        fetch('http://localhost:3000/logout', {
            method: 'DELETE',
            body: JSON.stringify(deleteToken)
        })
            .then(res => res.json()) // or res.json()
            .then(res => console.log(res))
        //localStorage.removeItem("accessToken")
        localStorage.clear();

        this.props.history.push('/sign-in')
    }

    render() {
        return (
            <div>
                <div>
                    hello {this.state.displayData.firstname}
                    <label>patient</label>
                    <button onClick={this.handleLogout}>Logout</button>

                </div>
            </div>
        );
    }
}



export default PatientDashboard;