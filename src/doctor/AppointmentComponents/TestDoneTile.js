import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";




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

const TestDone= props => {
    const { className, ...rest } = props;
    console.log("testdone",props)
    const [daysHavingNoSymptoms,setDaysHavingNoSymptoms]=useState(0)
    const [error,setError]=useState("")
    const [patientEmail,setPatientEmail]=useState(props.patientEmail)
    const [done, setDone] = React.useState(false);
    const [doneResult,setDoneResult] = React.useState(false);
    const [open, setOpen] = React.useState(false);


    const classes = useStyles();
    const updateTestDone=(e)=>{
        const data = {
            "patientEmail":patientEmail,
            "testDone":done
        }
        console.log(data)
        fetch('http://localhost:3000/appointment/testDone/',{
            method:"PUT",
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                if(data.message==="The test has already been done"){
                    alert(data.message)
                }else{
                    alert("Update unsuccessfully")
                }

            })
    }


    const handleResultDone= (event) => {
        console.log(event.target.checked)
        setDone(event.target.checked);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        const body = {
            email:patientEmail
        }
        fetch('http://localhost:3000/appointment/myAppointment', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type':'application/json',

            },
            body:JSON.stringify(body)
        }).then(response => response.json())
            .then(data => {

                console.log(data[0]['testDone'])
                setDoneResult(data[0]['testDone'])



                

            })


    })
    let label;
    if(doneResult){
        label="Done"
    }else{
        label="Not Done"
    }


    return (
        <Card
            style={{ width: '18rem',border:'40px' }}
            {...rest}
            className={clsx(classes.root, className)}

        >
            <FormControlLabel
                control={<Switch checked={done} onChange={handleResultDone} color="primary" />}
                label="Done"
            />
            <Button onClick={updateTestDone}>Save</Button>
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
                            Test Done
                        </Typography>
                        <Typography variant="h3">{label}</Typography>

                    </Grid>

                </Grid>
                <div className={classes.difference}>



                </div>
            </CardContent>
        </Card>
    );
};

TestDone.propTypes = {
    className: PropTypes.string
};

export default TestDone;






