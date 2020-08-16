import {Link} from "react-router-dom";
import React, {Component} from 'react';
import {connect} from "react-redux";
import {setEmail, setLogin, setNoSymptomDays, setProfileImage, setRole} from "../login_Actions";
import { useLocation } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import store from "../store/store"
import Avatar from "@material-ui/core/Avatar";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import {errorHandling} from "../errorHandling";

const mapStateToProps = state => {
    console.log("state",state)
    console.log("imageReducer",state.imageReducer)
    //return {state}

    return {isLoggedIn: state.loginReducer,userEmail: state.emailReducer,role:state.roleReducer,url:state.imageReducer}
}
const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

class loginHeader extends Component {
    constructor(props) {
        super(props);


        this.state={
            email: localStorage.getItem("email"),
            isLoggedIn:this.props.isLoggedIn,
            image_preview:localStorage.getItem("image"),
            anchorEl:null,

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
        this.props.dispatch(setRole(localStorage.getItem(("role"))))
        this.props.dispatch(setProfileImage(localStorage.getItem(("image"))))
        this.props.dispatch(setEmail(localStorage.getItem(("email"))))
        this.props.dispatch(setNoSymptomDays(localStorage.getItem(("daysOfNoSymptom"))))


        this.setState({
            image_preview:localStorage.getItem("image")


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
        console.log("name",localStorage,localStorage.getItem("name"))
        let image = this.props.url

        console.log("image",image)
        let image_preview;
        if(image!==""){
            image_preview = image
            localStorage.setItem("image",image)

        }
        let healthRedirect;
        console.log("myrole",localStorage,this.props)

        if(localStorage.getItem("role")==="DOCTOR"){
            healthRedirect = "/dashboard/doctor"
        }
        if(localStorage.getItem("role")==="PATIENT"){
            healthRedirect = "/dashboard/patient"}

        if(this.props.role==="NOT_LOGGED_IN"){
            healthRedirect="/"
        }


        localStorage.setItem("healthRedirect",healthRedirect)


        const handleClick = (event) => {
            this.setState({
                anchorEl:event.currentTarget
            });
        };

        const handleClose = (event) => {
            this.setState({
                anchorEl: null
            });
        };
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">


                <div className="container">
                    <Link className="navbar-brand" to={localStorage.getItem("healthRedirect")}>HealthTrack</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

                        <ul className="navbar-nav ml-auto">

                            <li className="nav-link"><Link  to={"/userProfile"}><Avatar  sizes="small" src={localStorage.getItem("image")}/></Link></li>
                            <li className="nav-link">Hi {localStorage.getItem("name")} </li>
                            <li className="nav-link">   <KeyboardArrowDownIcon aria-controls="customized-menu"
                                                                               aria-haspopup="true"
                                                                               variant="contained"
                                                                               color="primary" onClick={handleClick}/>
                            </li>


                            <li className="nav-item">
                                 <Link className="nav-link" onClick={this.handleLogout} to={"/sign-in"}>Logout</Link>
                             </li>
                        </ul>


                    </div>
                    <div>

                        <StyledMenu
                            id="customized-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={handleClose}
                        >

                            <StyledMenuItem>
                                <ListItemIcon>
                                    <DraftsIcon fontSize="small" />
                                </ListItemIcon>
                                <Link className="nav-link"  to={"/userProfile"}><ListItemText primary="Profile" /></Link>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <InboxIcon fontSize="small" />
                                </ListItemIcon>

                                <Link className="nav-link"  to={"/privacy"}><ListItemText primary="Privacy" /></Link>

                            </StyledMenuItem>
                        </StyledMenu>
                    </div>
                </div>
            </nav>
        );
    }
}

const Header = connect(mapStateToProps)(loginHeader);
export default Header;