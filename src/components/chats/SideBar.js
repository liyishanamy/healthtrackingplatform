import React, { Component } from 'react';
import {FiMenu, FaSearch, FaChevronDown, MdEject} from "react-icons/all";




export default class SideBar extends Component{
	constructor(props) {
		super(props);
		console.log("side bar",props)
		this.state={
			redirectUser:props.redirectFrom,
			receiver:"",
			flag:1
		}
		// if(!props.redirectFrom){
		// 	console.log("1234")
		//
		// 	this.setState({receiver:this.state.redirectFrom},()=> {
		// 		const {receiver} = this.state
		// 		const {onSendPrivateMessage} = this.props
		// 		console.log("handleSubmit")
		// 		onSendPrivateMessage(receiver)
		// 	})
		//
		// }

	}
	handleSubmit=(e)=>{
		e.preventDefault()
		const {receiver} = this.state
		const {onSendPrivateMessage} = this.props
		console.log("handleSubmit")
		onSendPrivateMessage(receiver)
	}
	componentDidMount() {

		const {receiver,redirectUser,setActiveChat,activeChat,chats} = this.state
		const {onSendPrivateMessage} = this.props

		onSendPrivateMessage(receiver)



}


	render(){
		const { chats, activeChat, user, setActiveChat, redirectUser} = this.props
		const {receiver} = this.state

		return (
			<div id="side-bar">
					<div className="heading">
						<div className="app-name">HealthTrack Chat </div>

					</div>
					<form onSubmit={this.handleSubmit} className="search">
						<i className="search-icon"><FaSearch /></i>
						<input
							placeholder="Search"
							type="text"
							value={receiver}
							onChange={(e)=>{this.setState({receiver:e.target.value})}}
						/>
					</form>
					<div 
						className="users" 
						ref='users' 
						onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}>
						
						{

						chats.map((chat)=>{
							const {redirectUser} = this.props
							if(chat.name){
								const lastMessage = chat.messages[chat.messages.length - 1];
								// Update
								let chatSideName ;
								if(redirectUser){
									if(!chat.users.includes(redirectUser)||!chat.users.includes(localStorage.getItem("email"))){
										return null
									}else {
										chatSideName=redirectUser
										if(this.state.flag===1){
											setActiveChat(chat)
											console.log("active chat",activeChat)
											this.setState({
												flag:0
											})
										}


									}


								}else{
									chatSideName = chat.users.find((name)=>{
										return name !== user.email
									}) || "Community"

								}
								console.log("chatSideName",chat,chatSideName)
								const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''



								return(
								<div
									key={chat.id}
									className={`user ${classNames}`}
									onClick={ ()=>{ setActiveChat(chat) } }
									>
									<div className="user-photo">{chatSideName[0].toUpperCase()}</div>
									<div className="user-info">
										<div className="name">{chatSideName}</div>
										{lastMessage && <div className="last-message">{lastMessage.message}</div>}
									</div>

								</div>
							)
							}

							return null
						})	
						}
						
					</div>
					<div className="current-user">
						<span>{user.name}</span>

					</div>
			</div>
		);
	
	}
}
