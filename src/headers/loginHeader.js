import {Link} from "react-router-dom";
import React, {Component} from 'react';
import {connect} from "react-redux";
import {setLogin} from "../login_Actions";

import store from "../store/store"
import Avatar from "@material-ui/core/Avatar";

const mapStateToProps = state => {

    return {isLoggedIn: state}
}

class loginHeader extends Component {
    constructor(props) {
        super(props);

        this.state={
            email: localStorage.getItem("email"),
            isLoggedIn:this.props.isLoggedIn,
            image_preview:localStorage.getItem("image")
        }
        console.log("initial header",localStorage.getItem("image"))
    }
    componentDidMount() {
        fetch('http://localhost:3000/user/getImage', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({userEmail: localStorage.getItem("email")}),

        }).then(response => response.json())
            .then(data => {
                console.log("data",data)
                if(data.url){
                    // this.setState({
                    //     image_preview: data.url
                    // },()=>{
                    //     localStorage.setItem("image",this.state.image_preview)
                    // })
                    localStorage.setItem("image",data.url)


                }
                if(data.message==="Cannot find the profile image"){
                    // this.setState({
                    //     image_preview: "./defaultProfileImage.jpg"
                    // },()=>{
                    //     localStorage.setItem("image",this.state.image_preview)
                    // })
                    localStorage.setItem("image","./defaultProfileImage.jpg")
                }

            })
    }

    handleLogout=(props)=> {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("image")
        localStorage.setItem("loggedIn","LOGOUT");
        this.props.dispatch(setLogin("LOGOUT"))
        console.log(props)
        alert("Your session is expired")
        window.location = '/sign-in'

        let deleteToken={"token":localStorage.getItem("accessToken")}
        fetch('http://localhost:3000/logout', {
            method: 'DELETE',
            body: JSON.stringify(deleteToken)
        })
            .then(res => res.json()) // or res.json()
            .then(res => console.log(res))
    };


    render() {
        let healthRedirect;
        if(localStorage.getItem("role")==="doctor"){
            healthRedirect = "/dashboard/doctor"
        }
        if(localStorage.getItem("role")==="patient"){
            healthRedirect = "/dashboard/patient"
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">


                <div className="container">
                    <Link className="navbar-brand" to={healthRedirect}>HealthTrack</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-link">Hi {localStorage.getItem("name")}</li>
                            <li className="nav-item">
                                <Link className="nav-link"  to={"/userProfile"}><Avatar  sizes="small" src={localStorage.getItem("image")}/></Link>
                            </li>
                            <li className="nav-item">
                                 <Link className="nav-link" onClick={this.handleLogout} to={"/sign-in"}>Logout</Link>
                             </li>
                        </ul>


                    </div>
                </div>
            </nav>
        );
    }
}

const Header = connect(mapStateToProps)(loginHeader);
export default Header;