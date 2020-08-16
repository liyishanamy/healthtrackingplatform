import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import {errorHandling} from "../../errorHandling";
import TextField from "@material-ui/core/TextField";




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

const TestNote= props => {
    const { className, ...rest } = props;
    const [daysHavingNoSymptoms,setDaysHavingNoSymptoms]=useState(0)
    const [error,setError]=useState("")
    const [patientEmail,setPatientEmail]=useState(props.patientEmail)
    const [testNote,setTestNote]=useState("")
    const [finalTestNote,setFinalTestNote]=useState("")


    const handleTestNoteChange = (event) => {
        setTestNote(event.target.value);
    };

    const classes = useStyles();
    const updateTestNote=(e)=>{
        const data = {
            "patientEmail":patientEmail,
            "testNote":testNote
        }
        console.log(data)

        fetch('http://localhost:3000/appointment/testNote',{
            method:"PUT",
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                if(data.message==="the token is invalid"){
                    throw data
                }else{
                    if(data.message==="Test has been already updated."){
                        alert(data.message)
                    }else{
                        setFinalTestNote("")
                        alert("Update unsuccessfully")
                    }
                }

            }).catch( e=> errorHandling(e) );
    }
    useEffect(()=>{
        const data = {
            email:props.patientEmail
        }
        fetch('http://localhost:3000/appointment/myAppointment',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data),

        })
            .then(response => response.json())
            .then(data => {
                if(data.message!=="the token is invalid"){
                    setFinalTestNote(data[0]['testNote'])
                }else{
                    throw data
                }

            })
            .catch( e=> errorHandling(e) );
    })

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <TextField
                id="outlined-multiline-flexible"
                label="Message to Patient "
                multiline
                rowsMax={4}
                onChange={handleTestNoteChange}
                variant="outlined"
            />
            <Button onClick={updateTestNote}>Save</Button>

            <CardContent>

                <Grid
                    container
                    justify="space-between"
                >

                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            Test Note
                        </Typography>
                        <Typography variant="h3">{finalTestNote}</Typography>
                    </Grid>

                </Grid>
                <div className={classes.difference}>


                </div>
            </CardContent>
        </Card>
    );
};

TestNote.propTypes = {
    className: PropTypes.string
};

export default TestNote;

