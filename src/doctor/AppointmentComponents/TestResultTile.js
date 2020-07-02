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

const TestResult= props => {
    const { className, ...rest } = props;
    const [daysHavingNoSymptoms,setDaysHavingNoSymptoms]=useState(0)
    const [error,setError]=useState("")
    const [patientEmail,setPatientEmail]=useState(props.patientEmail)
    const [testResult,setTestResult]=useState("None")
    const [finalResult,setFinalResult]=useState("None")


    const handleTestResultChange = (event) => {
        setTestResult(event.target.value);
    };

    const classes = useStyles();
    const updateTestResult=(e)=>{
        const data = {
            "patientEmail":patientEmail,
            "testResult":testResult
        }
        console.log(data)

        fetch('http://localhost:3000/appointment/testResult',{
            method:"PUT",
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                if(data.message==="Test has been updated."){
                    setFinalResult(testResult)
                    alert(data.message)
                }else{
                    alert("Update unsuccessfully")
                }

            })
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
                setFinalResult(data[0]['testResult'])
            })
            .catch(err => setError(err))
    })

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <RadioGroup
                aria-label="direction"
                name="direction"
                value={testResult}
                onChange={handleTestResultChange}
                row
            >
                <FormControlLabel value="positive" control={<Radio />} label="Positive" />
                <FormControlLabel value="negative" control={<Radio />} label="Negative" />
                <FormControlLabel value="Not Done" control={<Radio />} label="None" />

            </RadioGroup>
            <Button onClick={updateTestResult}>Save</Button>

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
                            Test Result
                        </Typography>
                        <Typography variant="h3">{finalResult}</Typography>
                    </Grid>

                </Grid>
                <div className={classes.difference}>


                </div>
            </CardContent>
        </Card>
    );
};

TestResult.propTypes = {
    className: PropTypes.string
};

export default TestResult;

