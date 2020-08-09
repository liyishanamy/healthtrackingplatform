import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
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

const GetBetterRate= props => {
    const { className, ...rest } = props;
    const [gettingBetterRate,setGettingBetterRate]=useState(0)
    const [error,setError]=useState("")

    const classes = useStyles();
    useEffect(()=>{
        let today = new Date()
        let today_format = new Date(today).getFullYear()+"-"+(new Date(today).getMonth()+1)+"-"+new Date(today).getDate()
        today.setDate(today.getDate()+1)
        let tomorrow_format = new Date(today).getFullYear()+"-"+(new Date(today).getMonth()+1)+"-"+new Date(today).getDate();

        fetch(`http://localhost:3000/healthStatus/stats?from=${today_format}&to=${tomorrow_format}`,{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
            },
        })
            .then(response => response.json())
            .then(data => {
                if(data.message!=="the token is invalid"){
                    const getBetterRate = (data['gettingBetter']/(data['forgetReporting']+data['gettingBetter']+data['gettingWorse'])).toFixed(2)
                    setGettingBetterRate(getBetterRate)
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
                            Today Get-Better Rates
                        </Typography>
                        <Typography variant="h3">{gettingBetterRate}</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <AssignmentIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
                <div className={classes.difference}>
                    <ArrowUpwardIcon className={classes.differenceIcon} />
                    <Typography
                        className={classes.differenceValue}
                        variant="body2"
                    >
                        16%
                    </Typography>
                    <Typography
                        className={classes.caption}
                        variant="caption"
                    >
                        Since last month
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};

GetBetterRate.propTypes = {
    className: PropTypes.string
};

export default GetBetterRate;

