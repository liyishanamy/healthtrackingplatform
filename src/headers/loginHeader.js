import {Link} from "react-router-dom";
import React, {Component} from 'react';
import {connect} from "react-redux";
import {setLogin} from "../login_Actions";

import store from "../store/store"

const mapStateToProps = state => {

    return {isLoggedIn: state}
}
// const mapDispatchToProps = (dispatch,ownProps) =>{
//     dispatch(setLogin(!ownProps.loginOrNot))
//
// }



class loginHeader extends Component {
    constructor(props) {
        super(props);
        console.log("initial header",store.getState(), props)
        this.state={
            isLoggedIn:this.props.isLoggedIn
        }

    }
    handleLogout=(props)=> {
        console.log("handlelogout",props)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.setItem("loggedIn",false);
        this.props.dispatch(setLogin("LOGOUT"))
        console.log(props)
        // const {history} = this.props;
        // history.push('/sign-in')
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
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">

                <div className="container">

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

                        <ul className="navbar-nav ml-auto">
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