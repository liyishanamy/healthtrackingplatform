import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PageviewIcon from '@material-ui/icons/Pageview';

import FolderIcon from '@material-ui/icons/Folder';


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

const FullyRecovered= props => {
    const { className, ...rest } = props;
    const [positive,setPositive]=useState(0)
    const [negative,setNegative]=useState(0)
    const [error,setError]=useState("")

    const classes = useStyles();
    useEffect(()=>{
        fetch(`http://localhost:3000/appointment/stats`,{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
            },
        })
            .then(response => response.json())
            .then(data => {
                setNegative(data['negative'])

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
                            Fully Recovered
                        </Typography>
                        <Typography variant="h3">{negative}</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <PageviewIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    );
};

FullyRecovered.propTypes = {
    className: PropTypes.string
};

export default FullyRecovered;

