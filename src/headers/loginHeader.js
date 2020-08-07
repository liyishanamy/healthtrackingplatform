import {Link} from "react-router-dom";
import React, {Component} from 'react';
import {connect} from "react-redux";
import {setLogin, setProfileImage, setRole} from "../login_Actions";
import { useLocation } from "react-router-dom";

import store from "../store/store"
import Avatar from "@material-ui/core/Avatar";

const mapStateToProps = state => {
    console.log("state",state)
    console.log("imageReducer",state.imageReducer)
    //return {state}

    return {isLoggedIn: state.loginReducer,userEmail: state.emailReducer,role:state.roleReducer,url:state.imageReducer}
}

class loginHeader extends Component {
    constructor(props) {
        super(props);
        console.log("store",store.getState())
        //console.log("props",this.props)

        this.state={
            email: localStorage.getItem("email"),
            isLoggedIn:this.props.isLoggedIn,
            image_preview:localStorage.getItem("image")
        }
        console.log("initial header",localStorage.getItem("image"))
    }


    componentWillUnmount() {
        // and unsubscribe later
        this.unsubscribe()
    }

    handleChange() {
        // and whenever the store state changes, it re-renders.
        this.forceUpdate()
    }
    componentDidMount() {

        this.unsubscribe = store.subscribe(this.handleChange.bind(this))

        // const userEmail = this.props.userEmail
        //
        //  fetch('http://localhost:3000/user/getImage', {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({userEmail: userEmail}),
        //
        // }).then(response => response.json())
        //     .then(data => {
        //         console.log("image",data)
        //         if(data.url){
        //             this.setState({
        //                 image_preview:data.url
        //             },()=>{
        //                 this.props.dispatch(setProfileImage(data.url))
        //             })
        //         }
        //         if(data.message==="Cannot find the profile image"){
        //             localStorage.setItem("image","./defaultProfileImage.jpg")
        //         }
        //
        //     })
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
        this.props.dispatch(setRole("NOT_LOGGED_IN"))
        this.props.dispatch(setProfileImage(""))
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
        console.log("props",this.props)
        let image = this.props.url
        console.log("image",image)
        let image_preview;
        if(image!==""){
            image_preview = image

        }
        let healthRedirect;
        console.log("myrole",this.props.role)
        if(this.props.role==="DOCTOR"){
            healthRedirect = "/dashboard/doctor"
        }
        if(this.props.role==="PATIENT"){
            healthRedirect = "/dashboard/patient"
        }if(this.props.role==="NOT_LOGGED_IN"){
            healthRedirect="/"
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">


                <div className="container">
                    <Link className="navbar-brand" to={healthRedirect}>HealthTrack</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-link">Hi {localStorage.getItem("name")}</li>
                            <li className="nav-item">
                                <Link className="nav-link"  to={"/userProfile"}><Avatar  sizes="small" src={image_preview}/></Link>
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