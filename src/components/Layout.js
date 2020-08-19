import React, {Component} from 'react';
import io from 'socket.io-client'
import {USER_CONNECTED, LOGOUT, VERIFY_USER} from '../Events'
import LoginForm from './LoginForm'
import ChatContainer from './chats/ChatContainer'
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import {DateRangePicker} from "react-date-range";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from "react-router-dom";


const socketUrl = "http://localhost:3231"
export default class Layout extends Component {

    constructor(props) {
        super(props);
        console.log("props",props)
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
         //localStorage.setItem("chat","true")
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
        console.log("user",user)
        // this.setState(previousState=>({
        //     activeUsers: [...previousState.activeUsers, user]
        // }),()=> console.log("get active list",this.state.activeUsers));
    }

    /*
    *	Sets the user property in state to null.
    */
    // logout = () => {
    //     const {socket} = this.state
    //     socket.emit(LOGOUT)
    //     this.setState({user: null})
    //
    // }
    componentDidMount() {

            console.log("get patient list")
            fetch('http://localhost:3000/online',{
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("active",data)
                    for(let i=0;i<data.length;i++){
                        console.log(i)
                        this.setState(prevState =>({
                            activeUsers:[...prevState.activeUsers,data[i].email]
                        }))
                        this.setState(prevState =>({
                            activeUsersName:[...prevState.activeUsersName,data[i].firstname]
                        }))
                    }

                })


        // if (localStorage.getItem("role")==="PATIENT"){
        //     this.setState(previousState=>({
        //         activeUsers: [...previousState.activeUsers, this.state.user]
        //     }),()=> console.log("get active list",this.state.activeUsers));
        //
        // }
    }


    render() {
        const {title} = this.props
        const {socket, user,email} = this.state
        console.log("user",user,email)
        if(this.props.match){
            console.log("propppp",this.props.match.params.email)
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
           <div>
                <React.Fragment key={'right'} >
                    <Button onClick={toggleDrawer(true)} color="primary" >Check the online users</Button>
                    <Drawer anchor={'right'} open={this.state.anchor} onClose={toggleDrawer( false)}>
                        <List>
                            {this.state.activeUsers.map((item,index) => (
                                <ListItem button key={item}>
                                    <Link ><ListItemText primary={this.state.activeUsersName[index]} /></Link> (email:
                                    <ListItemText primary={item} />
                                    )
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </React.Fragment>
            <div className="container">
                {chat}
                </div>
           </div>
        );
    }
}
