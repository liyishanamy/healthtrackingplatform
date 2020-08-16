import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import {Button} from "@material-ui/core";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import {render} from 'react-dom';
import AvatarUploader from "react-avatar-uploader"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import "../App.css"
import Input from "@material-ui/core/Input";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DatePicker from 'react-date-picker';
import MuiPhoneNumber from "@material-ui/core/TextField";
import {setLogin, setProfileImage, setRole} from "../login_Actions";
import {connect} from "react-redux";
import {errorHandling} from "../errorHandling";
const mapStateToProps = state => {
    console.log("state",state)

    return {isLoggedIn: state.loginReducer,userEmail: state.emailReducer,role:state.roleReducer,url:state.imageReducer}
}
class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem("email"),
            pictures: null,
            image_preview:null,
            image: null,
            firstname: "",
            lastname: "",
            birthday: new Date(),
            role: "",
            gender: "",
            invitationCode: "",
            address: "",
            street: "",
            city: "",
            state: "",
            zip_code: "",
            phone: "",


            value: "",
            copied: false,
            displayMode: "ReadOnly",
            flag: true,
            saveMsg:"",
            existImage:false
        }
    }

    handleFirstName = (e) => {
        this.setState({
            firstname: e.target.value
        })
    }
    handleLastName = (e) => {
        this.setState({
            lastname: e.target.value
        })
    }
    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleStreet = (e) => {
        this.setState({
            street: e.target.value
        })
    }
    handleCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    handleState = (e) => {
        this.setState({
            state: e.target.value
        })
    }
    handleZipcode = (e) => {
        this.setState({
            zip_code: e.target.value
        })
    }


    handlePhone = (e) => {
        this.setState({
            phone: e.target.value
        })
    }



    fileUploadHandler = (e) => {
        e.preventDefault()
        let formData = new FormData()
        let pic = this.state.image;
        let email = this.state.email;
        let url;
        console.log("pic",this.state.image_preview,this.state.image)
        if(this.state.existImage){
            console.log("1")
            // Already exist a profile pic
            url = "http://localhost:3000/user/changeProfileImage"
            formData.append('image', pic)
            axios.put(url, formData, {
                headers:
                    {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                    }
            }).then(res => {
                console.log("already have a image",res);
                const url = res.data.request.url
                this.props.dispatch(setProfileImage(url))
                localStorage.setItem("image",url)

            })

                .catch(function (response) {
                    //handle error
                    console.log(response);
                });


        }else{
            console.log("2")
            url = "http://localhost:3000/user/profileImage"
            formData.append('image', pic)
            formData.append('email', email)
            axios.post(url, formData, {
                headers:
                    {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                    }
            }).then(res => {
                console.log("have no image yet",res);
                const url = res.data.createdProfileImage.request.url
                this.props.dispatch(setProfileImage(url))
                localStorage.setItem("image",url)



            })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });

        }



        // Other profile info change
        const body = {"email":this.state.email,"update":{
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                birthday: new Date(this.state.birthday),
                street: this.state.street,
                city: this.state.city,
                state: this.state.state,
                zip_code: this.state.zip_code,
                phone: this.state.phone
            }
        }

        fetch("http://localhost:3000/user", {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(response => response.json())
            .then(data => {
                if(data.message==="update user profile successfully!"){
                    alert(data.message)
                    console.log("Making post request with token",localStorage.getItem("accessToken"))
                    localStorage.setItem("name", this.state.firstname)
                }else{
                    throw data
                }

            }).catch( e=> errorHandling(e) );



    }

    handleImageChange = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        this.setState({
            image: e.target.files[0],
            image_preview: image_as_base64
        })
    };
    toggleChecked = (e) => {
        console.log(this.state.flag)
        if (this.state.flag) {
            this.setState({
                displayMode: "Edit Mode",
                flag: !this.state.flag
            })
        }
        if (!this.state.flag) {
            this.setState({
                displayMode: "Read Mode",
                flag: !this.state.flag
            })
        }

    }

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
                if (data.message!=="the token is invalid"){
                    this.setState({
                        firstname: data.firstname,
                        lastname: data.lastname,
                        birthday: new Date(data.birthday),
                        role: data.role,
                        gender: data.gender,
                        invitationCode: data.invitationCode,
                        street: data.street,
                        city: data.city,
                        state: data.state,
                        zip_code: data.postcode,
                        phone: data.phone,
                    } )
                }else{
                    throw data
                }

            }).catch( e=> errorHandling(e) );





        fetch('http://localhost:3000/user/getImage', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({userEmail: this.state.email}),

        }).then(response => response.json())
            .then(data => {
                if (data.message!=="the token is invalid") {
                    console.log("image?", data)
                    if(data.message==="Cannot find the profile image"){
                        this.setState({
                            image_preview: "./defaultProfileImage.jpg"
                        })
                    }else{
                        this.setState({
                            image_preview: data.url,
                            existImage:true
                        })
                    }

                }else{
                    throw data
                }
            }).catch( e=> errorHandling(e) );
    }


    render() {
        return (
            <div style={{padding: 150}}>
                <div>User profile</div>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch onChange={this.toggleChecked}/>}
                        label={this.state.displayMode}
                    />
                </FormGroup>
                <input style={{display: 'none'}} type="file"
                       id="image"
                       accept="image/png, image/jpeg" onChange={this.handleImageChange}
                       ref={fileInput => this.fileInput = fileInput}
                       disabled={this.state.flag}/>

                <Button onClick={() => this.fileInput.click()}><Avatar alt="" src={this.state.image_preview}/></Button>

                <div className="form-group">
                    <label>Firstname</label>
                    <Input type="firstname" className="form-control" placeholder="Enter Firstname"
                           value={this.state.firstname} onChange={this.handleFirstName} disabled={this.state.flag}/>
                </div>
                <div className="form-group">
                    <label>Lastname</label>
                    <Input type="lastname" className="form-control" placeholder="Enter Lastname"
                           value={this.state.lastname} onChange={this.handleLastName} disabled={this.state.flag}/>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <Input type="email" className="form-control" placeholder="Enter Email" value={this.state.email}
                           onChange={this.handleEmail} disabled={true}/>
                </div>


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

                <div className="form-group">
                    <label>Birthday </label><br/>
                    <DatePicker  onChange={e=>this.setState({birthday: e})} value={this.state.birthday} maxDate={new Date()} disabled={this.state.flag}/>
                </div>
                <div>
                    <label>Phone</label><br/>
                    <MuiPhoneNumber defaultCountry={'us'} onChange={this.handlePhone} value={this.state.phone}
                                    disabled={this.state.flag}/>
                </div>


                <div className="form-group">
                    <label>Address</label><br/>
                    <Input
                        type="text"
                        value={this.state.street}
                        placeholder="Street Address"
                        onChange={this.handleStreet}
                        disabled={this.state.flag}
                    />
                    <Input
                        type="text"
                        value={this.state.city}
                        placeholder="City"
                        onChange={this.handleCity}
                        disabled={this.state.flag}
                    />
                    <Input
                        type="text"
                        value={this.state.state}
                        placeholder="State"
                        onChange={this.handleState}
                        disabled={this.state.flag}
                    />
                    <Input
                        type="text"
                        value={this.state.zip_code}
                        placeholder="Zipcode"
                        onChange={this.handleZipcode}
                        disabled={this.state.flag}
                    />
                </div>

                <Button onClick={this.fileUploadHandler} disabled={this.state.flag}>Save</Button>
            </div>
        );
    }
}
const Profile = connect(mapStateToProps)(UserProfile);

export default Profile;