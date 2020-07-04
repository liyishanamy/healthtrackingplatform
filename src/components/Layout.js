import React, {Component} from 'react';
import io from 'socket.io-client'
import {USER_CONNECTED, LOGOUT, VERIFY_USER} from '../Events'
import LoginForm from './LoginForm'
import ChatContainer from './chats/ChatContainer'

const socketUrl = "http://localhost:3231"
export default class Layout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            socket: null,
            email: localStorage.getItem('email'),
            user: localStorage.getItem('name'),

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

    /*
    *	Sets the user property in state to null.
    */
    logout = () => {
        const {socket} = this.state
        socket.emit(LOGOUT)
        this.setState({user: null})

    }


    render() {
        const {title} = this.props
        const {socket, user} = this.state
        console.log(user)


        return (
            <div className="container">
                {
                    // !user ?
                    // <LoginForm socket={socket} setUser={this.setUser} />
                    // :

                }
                <ChatContainer socket={socket} user={user} email={this.state.email} logout={this.logout}/>
            </div>
        );
    }
}
