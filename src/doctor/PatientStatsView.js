import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class PatientStatsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersData:[],
            error: null,
            selectedUser: null
        };
    }

    handleClick = (id) => {
        const selectedUser = this.state.usersData.find(user => user.id === id)
        this.setState(() => ({selectedUser}))
        // this.setState(() => ({selectedUser}), () => console.log(this.state.selectedUser))
    }

    render() {
        const usersList = this.state.usersData.map(user => {
            return <li key={user.email} onClick={()=>this.handleClick(user.email)}>{user.firstname+" "+user.lastname+" "}<Link to={`/patientHealthStatus/${user.email}`}>See Details</Link></li>
        })
        return (
            <>
                <div className="UserList">
                    <h1>My Patients</h1>
                    <ul>{usersList}</ul>
                </div>

            </>
        );
    }

    componentDidMount() {
        fetch('http://localhost:3000/users?page=1&limit=10',{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
            },

        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({usersData: data})
            })
            .catch(err => this.setState({error: err.message}))
    }
}

export default PatientStatsView;