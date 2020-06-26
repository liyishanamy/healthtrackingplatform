import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import {Link} from "react-router-dom";




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

const DaysHaveNoSymptoms= props => {
    const { className, ...rest } = props;
    const [daysHavingNoSymptoms,setDaysHavingNoSymptoms]=useState(0)
    const [appointmentDate, setAppointmentDate] = useState(null)
    const [userMsg,setUseMsg] = useState("")
    const [error,setError]=useState("")

    const classes = useStyles();
    useEffect(()=>{
        const data = {
            email:localStorage.getItem("email")
        }
        fetch('http://localhost:3000/healthStatus/daysHavingNoSymptoms',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data),

        })
            .then(response => response.json())
            .then(data => {
                console.log("here",data)
                setDaysHavingNoSymptoms(data['daysOfNoSymptom'])


                //Change the val to 14 once done
                if(daysHavingNoSymptoms>=2){
                    setUseMsg("You can now book a retesting appointment")

                }else{
                    setUseMsg("You have at least "+(14-parseInt(daysHavingNoSymptoms))+" to go to book an appointment")


                }

            })
            .catch(err => setError(err))
    })

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
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
                           Your appointment is on:
                        </Typography>
                        <Typography variant="h3">{appointmentDate}</Typography>

                    </Grid>

                </Grid>
                <div className={classes.difference}>

                    <Typography
                        className={classes.caption}
                        variant="caption"
                    >
                        {userMsg}
                    </Typography>
                    <br/>
                    <Typography variant="h6"><Link to={`/bookAppointment/`}>Book Appointment
                    </Link></Typography>
                </div>
            </CardContent>
        </Card>
    );
};

DaysHaveNoSymptoms.propTypes = {
    className: PropTypes.string
};

export default DaysHaveNoSymptoms;

