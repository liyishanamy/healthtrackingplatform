import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import {Button} from "@material-ui/core";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import {render} from 'react-dom';
import AvatarUploader from "react-avatar-uploader"
import {CopyToClipboard} from 'react-copy-to-clipboard';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem("email"),
            pictures: null,
            image_preview: null,
            image: null,
            firstname: "",
            lastname: "",
            birthday: "",
            role: "",
            gender: "",
            invitationCode: "",
            address: "",

            value: "",
            copied: false
        }
        //this.onDrop = this.onDrop.bind(this);
    }

    fileUploadHandler = (e) => {
        e.preventDefault()
        let formData = new FormData()
        let pic = this.state.image;
        let email = this.state.email;
        let url = "http://localhost:3000/user/profileImage"
        formData.append('image', pic)
        formData.append('email', email)
        console.log(formData)
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1])

        }
        axios.post(url, formData, {
            //method: 'post',
            //url: url,
            headers:
                {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                }
        }).then(res => {
            console.log(res);

        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleImageChange = (e) => {
        console.log(e.target.files[0])
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        console.log("image_as_base64", image_as_base64)
        this.setState({
            image: e.target.files[0],
            image_preview: image_as_base64
        })
    };

    componentDidMount() {
        fetch("http://localhost:3000/user", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userEmail: this.state.email}),
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.status === "403") {

                    alert("Your session is expired")
                    window.location = '/sign-in'

                } else {
                    this.setState({
                        firstname: data.firstname,
                        lastname: data.lastname,
                        birthday: data.birthday,
                        role: data.role,
                        gender: data.gender,
                        invitationCode: data.invitationCode,
                        address: data.street.concat(" " + data.city + " " + data.state)

                    })
                    localStorage.setItem('name', data.firstname + " " + data.lastname)

                }

            })
        fetch('http://localhost:3000/user/getImage', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({userEmail: this.state.email}),

        }).then(response => response.json())
            .then(data => {
                this.setState({
                    image_preview: data.url
                })
            })
    }

    render() {
        return (
            <div>
                <div>User profile</div>
                <input style={{display: 'none'}} type="file"
                       id="image"
                       accept="image/png, image/jpeg" onChange={this.handleImageChange}
                       ref={fileInput => this.fileInput = fileInput}
                       required/>
                <Button onClick={this.fileUploadHandler}>Upload</Button>
                <Button onClick={() => this.fileInput.click()}><Avatar alt="Remy Sharp" src={this.state.image_preview}/></Button>

                <div>Firstname:{this.state.firstname}</div>
                <div>Lastname:{this.state.lastname}</div>
                <div>Email:{this.state.email}</div>
                {this.state.role === "doctor" ? <div>Code:
                    <div>
                        <input value={this.state.invitationCode} disabled={true}/>


                        <CopyToClipboard text={this.state.invitationCode}
                                         onCopy={() => this.setState({copied: true})}>
                            <button>Copy to clipboard</button>
                        </CopyToClipboard>

                        {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
                    </div>
                </div> : ""}

                <div>birthday:{this.state.birthday}</div>
                <div>address:{this.state.address}</div>


            </div>
        );
    }
}

export default UserProfile;