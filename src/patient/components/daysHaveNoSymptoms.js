import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import {errorHandling} from "../../errorHandling";




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
                if(data.message!=="the token is invalid"){
                    setDaysHavingNoSymptoms(data['daysOfNoSymptom'])
                }
                else{
                    throw data
                }
            }).catch( e=> errorHandling(e) );
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
                            Days having no Symptom
                        </Typography>
                        <Typography variant="h3">{daysHavingNoSymptoms}</Typography>
                    </Grid>

                </Grid>

            </CardContent>
        </Card>
    );
};

DaysHaveNoSymptoms.propTypes = {
    className: PropTypes.string
};

export default DaysHaveNoSymptoms;

