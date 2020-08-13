import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import React, {Component} from 'react';
import ReferenceLine from "recharts/lib/cartesian/ReferenceLine";
import {Button, CardHeader, Divider, Grid, IconButton, Typography} from "@material-ui/core";

import DaysHaveNoSymptoms from "./patientComponent/daysHaveNoSymptoms";
import PatientSymptoms from "./patientComponent/patientSymptoms";
import PatientTemperature from "./patientComponent/patientTemperature";
import PatientAppointment from "./patientComponent/patientAppointment";
import PatientsProfile from "./patientComponent/PatientsProfile";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

class PatientPanel extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            userTemp: [],
            patientEmail: props.match.params.email,
            isActive: true,
            loading: false
        }
    }

    componentDidMount() {
        const data = {
            email: this.state.patientEmail
        }
        fetch("http://localhost:3000/healthStatus/temperature/", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                console.log("Success1", data)
                var formateDate = [];
                for (var i = 0; i < data.length; i++) {
                    let date = new Date(data[i]['Date'])
                    formateDate = formateDate.concat({
                        temperature: data[i]['temperature'],
                        Date: (date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate())
                    })
                }
                this.setState({
                    userTemp: formateDate
                })

            })

        fetch("http://localhost:3000/healthStatus/symptom/count", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                console.log("Success", data)
                this.setState({
                    headache: data.headache,
                    cough: data.cough,
                    runningNose: data.runningNose,
                    diarrhea: data.diarrhea,
                    breatheHard: data.breatheHard
                })
            })


        fetch("http://localhost:3000/users/getStatus", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({patientEmail: this.state.patientEmail}),
        }).then(response => response.json())
            .then(data => {
                console.log("initial status", data)
                this.setState({
                    isActive: data.active
                })

            })
    }

    changeStatus = action => {
        console.log("action", action)
        const data = {"patientEmail": this.state.patientEmail}
        console.log("param", `http://localhost:3000/users/${action}`, data)
        if (!this.state.loading) {
            this.setState({loading: true})

            fetch(`http://localhost:3000/users/${action}`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(response => {
                console.log("response", response)
                return response.json()
            }).then(data => {
                    if(this.state.isActive!==data.active){
                        this.setState({
                            isActive: data.active
                        })
                    }

                }
            ).then (()=> {
                this.setState({loading: false})
            }).catch(()=> {
                this.setState({loading: false})
            })
        }

    };

    render() {


        const data = this.state.userTemp
        const symptom = [{
            "symptom": "headache",
            "frequency": this.state.headache,
            "fullMark": 30
        }, {
            "symptom": "cough",
            "frequency": this.state.cough,
            "fullMark": 30
        }, {
            "symptom": "runningNose",
            "frequency": this.state.runningNose,
            "fullMark": 30
        }, {
            "symptom": "diarrhea",
            "frequency": this.state.diarrhea,
            "fullMark": 30
        }, {
            "symptom": "breatheHard",
            "frequency": this.state.breatheHard,
            "fullMark": 30
        }]


        let button;
        let msg;
        if (this.state.isActive) {
            button = <Button color={"primary"} onClick={() => this.changeStatus("archive")}>Archive</Button>
            msg =<Alert severity="success">This user is active </Alert>


        } else {
            button = <Button  color={"primary"}  onClick={() => this.changeStatus("activate")}>Activate</Button>
            msg =<Alert severity="error">This user is inactive </Alert>

        }

        return (
            <div style={{padding: 100}}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb">
                    <Link color="inherit" href='/dashboard/doctor#patient_list'>
                        PatientList
                    </Link>
                    <Typography color="textPrimary">{this.state.patientEmail}</Typography>
                </Breadcrumbs>
                <br/>
                {msg}

                <Grid
                    container
                    spacing={4}
                >
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <PatientsProfile patientEmail={this.state.patientEmail} status={this.state.isActive}/>

                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <DaysHaveNoSymptoms patientEmail={this.state.patientEmail}/>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <PatientAppointment patientEmail={this.state.patientEmail}/>
                    </Grid>


                </Grid>


                <br/>
                <PatientTemperature patientEmail={this.state.patientEmail}/>
                <PatientSymptoms patientEmail={this.state.patientEmail}/><br/>

                {button}

            </div>
        );
    }
}

export default PatientPanel;
