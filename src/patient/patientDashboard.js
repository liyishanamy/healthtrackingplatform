import React,{Component} from 'react';
import {Link,useHistory} from "react-router-dom";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserProfile from "../profile/userProfile";
import HealthStatus from "./healthStatus";
import MyStats from "./myStats";
import PatientChatbox from './patientChatbox';
import PatientAppointment from './patientAppointment'
import Layout from '../components/Layout'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        padding:100,
        display: 'flex',
        height: 500,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function SimpleTabs() {
    const classes = useStyles();
    // const [value, setValue] = React.useState(0);
    const hash = window.location.hash
    const tabs = ["my_stats", "health_status", "my_appointment", "patient_chat"].map(item => "#" + item)
    const index = tabs.findIndex(item => item === hash)
    const [value, setValue] = React.useState(index > 0 ? index : 0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >

                    <Tab label="My Health" {...a11yProps(0)} />
                    <Tab label="Daily Health Updates" {...a11yProps(1)} />
                    <Tab label="My Appointment" {...a11yProps(2)} />
                    <Tab label="Chat" {...a11yProps(3)} />

                </Tabs>

            <TabPanel value={value} index={0}>
                <MyStats />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <HealthStatus />
            </TabPanel>

            <TabPanel value={value} index={2}>
                <PatientAppointment/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Layout/>
            </TabPanel>
        </div>
    );
}


//export default DoctorDashboard;