import React,{Component} from 'react';
import {Link,useHistory} from "react-router-dom";


class NewPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            displayData:[]

        }
    }
    componentDidMount(){
        console.log('Bearer ' + localStorage.getItem("accessToken"))
        fetch('http://localhost:3000/users',{
            method:'GET',
            headers:{
                'Authorization':'Bearer ' +(localStorage.getItem("accessToken")),
                'Access-Control-Allow-Origin':'http://localhost:8000/dashboard'
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
        let deleteToken={"token":localStorage.getItem("accessToken")}
        fetch('http://localhost:3000/logout', {
            method: 'DELETE',
            body: JSON.stringify(deleteToken)
        })
            .then(res => res.json()) // or res.json()
            .then(res => console.log(res))
        localStorage.removeItem("accessToken")

        this.props.history.push('/sign-in')
    }

    render() {


        return (
            <div>
                <div>
                    hello {this.state.displayData.firstname}
                    <button onClick={this.handleLogout}>Logout</button>

                </div>
            </div>
        );
    }
}
/**
export default NewPage;
const getName=()=>{
    console.log('Bearer ' + localStorage.getItem("accessToken"))
    fetch('http://localhost:3000/users',{
        method:'GET',
        headers:{
            'Authorization':'Bearer ' +(localStorage.getItem("accessToken")),
            'Access-Control-Allow-Origin':'http://localhost:8000/dashboard'
        }

    })
        .then(response => response.json())
        .then(data => {

            console.log('Success:', data);


        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
const handleLogout=history=>()=>{

        fetch("http://localhost:3000/logout", {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':"http://localhost:8000/dashboard"
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                this.state.statue = false
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);

        event.preventDefault();
            }); history.push('/sign-in')}*/


export default NewPage;