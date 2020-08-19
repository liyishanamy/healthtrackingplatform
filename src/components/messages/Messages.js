import React, {Component} from 'react';
import Avatar from 'react-avatar';

export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urlList: [],
            userList: {}
            //messages: this.props.messages,
        }


    }

    scrollDown() {
        const {container} = this.refs
        container.scrollTop = container.scrollHeight
    }

    componentDidMount() {
        this.scrollDown()
    }

    findAvatar = (email) => {
        console.log('->', this.state.userList, email)
        if (!this.state.userList[email]) {
            fetch('http://localhost:3000/user/getImage', {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userEmail: email}),
            }).then(response => response.json())
                .then(data => {
                    if(data.message==="Cannot find the profile image"){
                        this.setState(state => ({userList: {...state.userList, [email]:"./defaultProfileImage"}}))
                    }else{
                        this.setState(state => ({userList: {...state.userList, [email]: data.url}}))

                    }

                })

        }

    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollDown()
    }

    render() {
        const {messages, user, typingUsers} = this.props

        return (
            <div ref='container'
                 className="thread-container">
                <div className="thread">
                    {
                        messages.map((mes, index) => {
                            const url = this.findAvatar(mes.email)
                            console.log("message",mes)
                            return (
                                <div
                                    key={index}
                                    className={`message-container ${mes.sender === user.name && 'right'}`}
                                >
                                    <div>{mes.email}</div>
                                    <div className="avatar"><Avatar name={mes.sender} size={50} round="20px"
                                                                    src={this.state.userList[mes.email]}/></div>

                                    <div className="time">{mes.time}</div>
                                    <div className="data">
                                        <div className="message">{mes.message}</div>
                                        <div className="name">{mes.sender}</div>
                                    </div>

                                </div>

                            )
                        })
                    }
                    {
                        typingUsers.map((name) => {
                            return (
                                <div key={name} className="typing-user">
                                    {`${name} is typing . . .`}
                                </div>
                            )
                        })
                    }
                </div>


            </div>
        );
    }
}
