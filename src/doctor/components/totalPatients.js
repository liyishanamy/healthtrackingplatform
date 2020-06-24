import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

/*
const TotalUsers = props => {


    return (
        <Card

        >
            <CardContent>
                <Grid
                    container
                    justify="space-between"
                >
                    <Grid item>
                        <Typography

                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            TOTAL USERS
                        </Typography>
                        <Typography variant="h3">1,600</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar >
                            <PeopleIcon/>
                        </Avatar>
                    </Grid>
                </Grid>
                <div>
                    <ArrowUpwardIcon />
                    <Typography

                        variant="body2"
                    >
                        16%
                    </Typography>
                    <Typography

                        variant="caption"
                    >
                        Since last month
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};

TotalUsers.propTypes = {
    className: PropTypes.string
};

export default TotalUsers;*/


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

const TotalPatients= props => {
    const { className, ...rest } = props;
    const [totalPatients,setTotalPatients]=useState(0)
    const [error,setError]=useState("")

    const classes = useStyles();
    useEffect(()=>{
        fetch('http://localhost:3000/users/totalPatients',{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setTotalPatients(data['totalPatients'])
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
                            TOTAL Patients
                        </Typography>
                        <Typography variant="h3">{totalPatients}</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <PeopleIcon className={classes.icon} />
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

TotalPatients.propTypes = {
    className: PropTypes.string
};

export default TotalPatients;

