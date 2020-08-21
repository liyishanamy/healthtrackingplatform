import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import FolderIcon from '@material-ui/icons/Folder';
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

const GetWorseRate= props => {
    const { className, ...rest } = props;
    const [gettingWorseRate,setGettingWorseRate]=useState(0)
    const [gettingWorseYesterdayRate,setGettingWorseYesterdayRate]=useState(0)

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
                    const getWorseRate = (data['gettingWorse']/(data['forgetReporting']+data['gettingBetter']+data['gettingWorse'])).toFixed(2)
                    setGettingWorseRate(getWorseRate)
                }else{
                    throw data
                }
            })
            .catch( e=> errorHandling(e) );

    })
    useEffect(()=>{
        // yesterday
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        let today_format = new Date(today).getFullYear()+"-"+(new Date(today).getMonth()+1)+"-"+new Date(today).getDate()
        today.setDate(today.getDate()+1)
        let yesterday_format = new Date(yesterday).getFullYear()+"-"+(new Date(yesterday).getMonth()+1)+"-"+new Date(yesterday).getDate();

        fetch(`http://localhost:3000/healthStatus/stats?from=${yesterday_format}&to=${today_format}`,{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
            },
        })
            .then(response => response.json())
            .then(data => {
                if(data.message!=="the token is invalid"){
                    const getWorseRate = (data['gettingWorse']/(data['gettingBetter']+data['gettingWorse']+data['forgetReporting'])).toFixed(2)
                    setGettingWorseYesterdayRate(getWorseRate)
                }else{
                    throw data
                }
            })
            .catch( e=> errorHandling(e) );
    },[])

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
                           Today Get-Worse Rates
                        </Typography>
                        <Typography variant="h3">{gettingWorseRate}</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <FolderIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
                <div className={classes.difference}>
                    <Typography
                        className={classes.differenceValue}
                        variant="body2"
                    >

                        {(gettingWorseRate>=gettingWorseYesterdayRate)?
                            <><ArrowUpwardIcon/>{(gettingWorseRate - gettingWorseYesterdayRate).toFixed(2) * 100}</>:
                            <><ArrowDownwardIcon/>{(gettingWorseYesterdayRate - gettingWorseRate).toFixed(2)  * 100}</>
                        }%

                    </Typography>
                    <Typography
                        className={classes.caption}
                        variant="caption"
                    >
                        Today vs Yesterday
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};

GetWorseRate.propTypes = {
    className: PropTypes.string
};

export default GetWorseRate;

