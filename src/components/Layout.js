import React, {Component} from 'react';
import io from 'socket.io-client'
import {USER_CONNECTED, LOGOUT, VERIFY_USER} from '../Events'
import ChatContainer from './chats/ChatContainer'
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from "react-router-dom";


const socketUrl = "http://localhost:3231"
export default class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            email: localStorage.getItem('email'),
            user: localStorage.getItem('name'),
            redirectUser:null,
            activeUsers:[],
            activeUsersName:[],
            anchor:false
        };




    }

     componentWillMount() {
         this.initSocket()
    }

    /*
    *	Connect to and initializes the socket.
    */
     initSocket = () => {



         const socket = io(socketUrl)
         socket.emit(VERIFY_USER, localStorage.getItem('name'), localStorage.getItem('email'), this.setUser)
         socket.on('connect', () => {
             console.log("Connected");
         })
         this.setState({socket})





     }

    /*
    * 	Sets the user property in state
    *	@param user {id:number, name:string}
    */
    setUser = (user) => {
        const {socket} = this.state
        socket.emit(USER_CONNECTED, user);
        this.setState({user})
    }
    componentDidMount() {
         fetch('http://localhost:3000/online',{
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                },
            })
                .then(response => response.json())
                .then(data => {
                    for(let i=0;i<data.length;i++){
                        this.setState(prevState =>({
                            activeUsers:[...prevState.activeUsers,data[i].email]
                        }))
                        this.setState(prevState =>({
                            activeUsersName:[...prevState.activeUsersName,data[i].firstname]
                        }))
                    }
                })
    }


    render() {
        const {socket, user} = this.state
        if(this.props.match){
            this.state.redirectUser=this.props.match.params.email
        }else{
            this.state.redirectUser=null

        }

        let chat;
        // Check online users
        if(this.state.activeUsers.length!==0 && user && this.state.email){
            chat =   <ChatContainer socket={socket} user={user} email={this.state.email} logout={this.logout} redirectUser={this.state.redirectUser} activeUsers={this.state.activeUsers}/>
        }

        const toggleDrawer = (action) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }

            this.setState({
                anchor:action
            })
        };

        return (
            <div className="container">
                {chat}
                </div>

        );
    }
}
