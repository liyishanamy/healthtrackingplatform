import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import {Button} from "@material-ui/core";
import axios from 'axios';
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:localStorage.getItem("email"),
            pictures:null,
            firstname:"",
            lastname:"",
            birthday:"",
            gender:"",
            invitationCode:"",
            address:""
        }
        this.onDrop = this.onDrop.bind(this);
    }
    onDrop(picture) {
        this.setState({
            pictures: picture,
        },()=>{
            console.log(this.state.pictures)
        });
    }
    fileUploadHandler=()=>{
        let formData = new FormData()
        let pic = this.state.pictures;
        let email = this.state.email;
        let url = " http://localhost:3000/user/profileImage"
        formData.set('image', pic)
        formData.set('email', email)
        console.log(formData)
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1])
        }

        axios({
            method: 'post',
            url: url,
            data: formData,
            headers:
                {'Content-Type': 'multipart/form-data',
                'Authorization':'Bearer ' +(localStorage.getItem("accessToken")),

            }
        })
            .then(function (response) {
                //handle success
                console.log("hello")
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

    }
    componentDidMount() {
        fetch("http://localhost:3000/user", {
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type':'application/json',
            },
            body: JSON.stringify({userEmail:this.state.email}),
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    firstname:data.firstname,
                    lastname:data.lastname,
                    birthday:data.birthday,
                    gender:data.gender,
                    invitationCode:data.invitationCode,
                    address:data.street.concat(" "+data.city+" "+data.state)
                })

            })
    }

    render() {
        return (
            <div>
                <div>User profile</div>
                <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
                <Button onClick={this.fileUploadHandler}>Upload</Button>
                <div>Firstname:{this.state.firstname}</div>
                <div>Lastname:{this.state.lastname}</div>
                <div>Email:{this.state.email}</div>
                <div>Code:{this.state.invitationCode}</div>
                <div>birthday:{this.state.birthday}</div>
                <div>address:{this.state.address}</div>

            </div>
        );
    }
}

export default UserProfile;