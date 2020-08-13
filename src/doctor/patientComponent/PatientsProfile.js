import React, {memo, useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import {errorHandling} from "../../errorHandling";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";




const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        fontWeight: 700
    },
    avatar: {
        backgroundColor: theme.palette.success.main,
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    },
    difference: {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignItems: 'center'
    },
    differenceIcon: {
        color: theme.palette.success.dark
    },
    differenceValue: {
        color: theme.palette.success.dark,
        marginRight: theme.spacing(1)
    }
}));

const PatientsProfile= props => {
    const { className, ...rest } = props;
    const [name,setName]=useState("")
    const [gender,setGender] = useState("")
    const [phone,setPhone]=useState("")
    const [email,setEmail]=useState(props.patientEmail)
    const [age,setAge]=useState(0)
    const [address,setAddress]=useState("")
    const [result,setResult]=useState("")
    const [image,setImage]=useState("")
    const [error,setError]=useState("")
    console.log("email",props.patientEmail)
    const classes = useStyles();
    useEffect(()=>{
        const data = {
            userEmail:props.patientEmail
        }

        fetch('http://localhost:3000/user',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data),

        })
            .then(response => response.json())
            .then(data => {
                console.log("->",data,props.patientEmail)
                if(data.message!=="the token is invalid"){
                    setName(data.firstname+" "+data.lastname)
                    setAddress(data.street+" "+data.city+" "+data.state+" "+data.postcode)
                    setEmail(data.email)
                    setAge(data.age)
                    setPhone(data.phone)
                    setResult(data.result)
                }else{
                    throw data
                }
            }).catch( e=> errorHandling(e) );




    }, [])
    useEffect(()=>{
        const data= {userEmail: email}
        console.log("data",data)
        fetch('http://localhost:3000/user/getImage', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({userEmail: email}),
        }).then(response => {
            if(!response.ok){
                setImage("./defaultProfileImage")
            }
            return response.json()
        })
            .then(data => {
                setImage(data.url)
            }).catch( e=> errorHandling(e) );
    }, [])


    return (

        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >

            <CardContent>

                <Typography variant="h5" component="h2">
                    <Avatar  sizes="small" src={image}/>

                </Typography>
                <Typography variant="body2" align ='justify' component="p">
                    Name:{name}
                </Typography>
                <Typography variant="body2" align ='justify' component="p">
                    Age:{age}
                </Typography>
                <Typography variant="body2"  align ='justify' component="p">
                    phone:{phone}
                </Typography>
                <Typography variant="body2"  align ='justify' component="p">
                    gender:{gender}
                </Typography>
                <Typography variant="body2" align ='justify' component="p">
                    email:{email}
                </Typography>
                <Typography variant="body2"  align ='justify' component="p">
                    address:{address}
                </Typography>

                <Typography variant="body2" align ='justify' component="p">
                    Test Result:{result}

                </Typography>
            </CardContent>
        </Card>
    );
};

PatientsProfile.propTypes = {
    className: PropTypes.string
};

export default PatientsProfile;

