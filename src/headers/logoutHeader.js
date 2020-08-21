import {Link} from "react-router-dom";
import React, {Component} from 'react';
import {connect} from "react-redux";

import store from "../store/store"

const mapStateToProps = state => {

    return {isLoggedIn: state}
}
// const mapDispatchToProps = (dispatch,ownProps) =>{
//     dispatch(setLogin(!ownProps.loginOrNot))
//
// }



class LogoutHeader extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoggedIn:this.props.isLoggedIn
        }

    }


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">

                <div className="container">
                    <Link className="navbar-brand" to={"/sign-in"}>HealthTrack</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/sign-in"}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                            </li>
                        </ul>


                    </div>
                </div>
            </nav>
        );
    }
}


const Header = connect(mapStateToProps)(LogoutHeader);
export default Header;
