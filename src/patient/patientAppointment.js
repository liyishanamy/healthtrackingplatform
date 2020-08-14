import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BookAppointment from './Appointment/bookAppointment';
import ViewAppointment from './Appointment/viewAppointment';
import TestResult from "./Appointment/testResult";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,

    },
}));

export default function VerticalTabs() {
    const classes = useStyles();

    // const [value, setValue] = React.useState(0);
    const hash = window.location.hash
    const tabs = ["book_appintment", "view_appointment", "view_result"].map(item => "#" + item)
    const index = tabs.findIndex(item => item === hash)
    const [value, setValue] = React.useState(index > 0 ? index : 0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root} >
            <AppBar position="static">

            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">

                <Tab label="Book Appointment" {...a11yProps(0)} />
                <Tab label="View Appointment" {...a11yProps(1)} />
                <Tab label="Test Result" {...a11yProps(2)} />

            </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>

                <BookAppointment/>
            </TabPanel>
            <TabPanel value={value} index={1}>

                <ViewAppointment/>

            </TabPanel>
            <TabPanel value={value} index={2}>

                <TestResult/>

            </TabPanel>
        </div>
    );
}
