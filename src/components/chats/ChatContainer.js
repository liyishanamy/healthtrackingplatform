import React, {Component} from 'react';
import SideBar from './SideBar'
import {COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED, TYPING, PRIVATE_MESSAGE} from '../../Events'
import ChatHeading from './ChatHeading'
import Messages from '../messages/Messages'
import MessageInput from '../messages/MessageInput'


export default class ChatContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            activeChat: null,
            email: this.props.email,
            redirectUser: this.props.redirectUser,
            firstRender:0
        };
    }
    componentDidMount() {
        const {socket} = this.props
        this.initSocket(socket)
    }

    initSocket(socket) {
        socket.emit(COMMUNITY_CHAT, this.resetChat)
        const {redirectUser} = this.props
        if (redirectUser) {
            let receiver = this.state.redirectUser
            socket.emit(PRIVATE_MESSAGE, {receiver, sender: localStorage.getItem("email")})
        }
        socket.on(PRIVATE_MESSAGE, this.addChat)
        socket.on('connect', () => {
            socket.emit(COMMUNITY_CHAT, this.resetChat)
        })
    }

    sendOpenPrivateMessage = (receiver) => {
        const {socket, user} = this.props
        socket.emit(PRIVATE_MESSAGE, {receiver, sender: localStorage.getItem("email")})
    }

    /*
    *	Reset the chat back to only the chat passed in.
    * 	@param chat {Chat}
    */
    resetChat = (chat) => {
        return this.addChat(chat, true)
    }

    /*
    *	Adds chat to the chat container, if reset is true removes all chats
    *	and sets that chat to the main chat.
    *	Sets the message and typing socket events for the chat.
    *
    *	@param chat {Chat} the chat to be added.
    *	@param reset {boolean} if true will set the chat as the only chat.
    */
    addChat = (chat, reset = false) => {
        console.log("add chat", chat)
        const {socket} = this.props
        const {chats} = this.state
        const newChats = reset ? [chat] : [...chats, chat]
        this.setState({chats: newChats, activeChat: reset ? chat : this.state.activeChat})

        const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`
        const typingEvent = `${TYPING}-${chat.id}`

        socket.on(typingEvent, this.updateTypingInChat(chat.id))
        socket.on(messageEvent, this.addMessageToChat(chat.id))
    }

    /*
    * 	Returns a function that will
    *	adds message to chat with the chatId passed in.
    *
    * 	@param chatId {number}
    */
    addMessageToChat = (chatId) => {
            return message => {
                const {chats} = this.state
                let newChats = chats.map((chat) => {
                    if (chat.id === chatId)
                        chat.messages.push(message)
                    return chat
                })
                this.setState({chats: newChats})
            }

    }

    /*
    *	Updates the typing of chat with id passed in.
    *	@param chatId {number}
    */
    updateTypingInChat = (chatId) => {
        return ({isTyping, user}) => {
            if (user !== this.props.user.name) {
                const {chats} = this.state
                let newChats = chats.map((chat) => {
                    if (chat.id === chatId) {
                        if (isTyping && !chat.typingUsers.includes(user)) {
                            chat.typingUsers.push(user)
                        } else if (!isTyping && chat.typingUsers.includes(user)) {
                            chat.typingUsers = chat.typingUsers.filter(u => u !== user)
                        }
                    }
                    return chat
                })
                this.setState({chats: newChats})
            }
        }
    }

    /*
    *	Adds a message to the specified chat
    *	@param chatId {number}  The id of the chat to be added to.
    *	@param message {string} The message to be added to the chat.
    */
    sendMessage = (chatId, message, email) => {
        const {socket} = this.props
        socket.emit(MESSAGE_SENT, {chatId, message, email})
    }

    /*
    *	Sends typing status to server.
    *	chatId {number} the id of the chat being typed in.
    *	typing {boolean} If the user is typing still or not.
    */
    sendTyping = (chatId, isTyping) => {
        const {socket} = this.props
        socket.emit(TYPING, {chatId, isTyping})
    }

    setActiveChat = (activeChat) => {
        this.setState({activeChat})
    }

    render() {
        const {user, logout} = this.props
        const {chats, activeChat} = this.state

        return (
            <div className="container_chat">
                <SideBar className="chat-room-container" id="sidebar"
                         chats={chats}
                         user={user}
                         redirectUser={this.state.redirectUser}
                         activeChat={activeChat}
                         setActiveChat={this.setActiveChat}
                         onSendPrivateMessage={this.sendOpenPrivateMessage}

                />
                <div className="chat-room-container">
                    {
                        activeChat !== null ? (

                                <div className="chat-room">
                                    <ChatHeading name={activeChat.name}/>
                                    <Messages
                                        messages={activeChat.messages}
                                        user={user}
                                        typingUsers={activeChat.typingUsers}
                                    />
                                    <MessageInput
                                        sendMessage={
                                            (message) => {
                                                this.sendMessage(activeChat.id, message, this.state.email)
                                            }
                                        }
                                        sendTyping={
                                            (isTyping) => {
                                                this.sendTyping(activeChat.id, isTyping)
                                            }
                                        }
                                    />

                                </div>
                            ) :
                            <div className="chat-room choose">
                                <h3>The chatting server is down</h3>
                            </div>
                    }
                </div>

            </div>
        );
    }
}
