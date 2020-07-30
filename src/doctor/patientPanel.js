
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React, {Component} from 'react';
import ReferenceLine from "recharts/lib/cartesian/ReferenceLine";
import {CardHeader, Divider, Grid, IconButton} from "@material-ui/core";

import DaysHaveNoSymptoms from "./patientComponent/daysHaveNoSymptoms";
import PatientSymptoms from "./patientComponent/patientSymptoms";
import PatientTemperature from "./patientComponent/patientTemperature";
import PatientAppointment from "./patientComponent/patientAppointment";

class PatientPanel extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state={
            userTemp:[],
            patientEmail:props.match.params.email
        }
    }
    componentDidMount() {
        const data = {
            email:this.state.patientEmail
        }
        fetch("http://localhost:3000/healthStatus/temperature/", {
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                console.log("Success1",data)
                var formateDate =[];
                for(var i=0;i<data.length;i++){
                    let date =new Date(data[i]['Date'])
                    formateDate = formateDate.concat({temperature:data[i]['temperature'],Date:(date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate())})
                }
                this.setState({
                    userTemp:formateDate
                })

            })

        fetch("http://localhost:3000/healthStatus/symptom/count", {
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                console.log("Success",data)
                this.setState({
                    headache:data.headache,
                    cough:data.cough,
                    runningNose:data.runningNose,
                    diarrhea:data.diarrhea,
                    breatheHard:data.breatheHard
                })
            })

    }
    render() {
        const data = this.state.userTemp
        const symptom = [{
            "symptom":"headache",
            "frequency":this.state.headache,
            "fullMark":30
        },{
            "symptom":"cough",
            "frequency":this.state.cough,
            "fullMark":30
        },{
            "symptom":"runningNose",
            "frequency":this.state.runningNose,
            "fullMark":30
        },{
            "symptom":"diarrhea",
            "frequency":this.state.diarrhea,
            "fullMark":30
        },{
            "symptom":"breatheHard",
            "frequency":this.state.breatheHard,
            "fullMark":30
        }]
        console.log(data)
        return (
            <div style={{padding:100}}>
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
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                    </Grid>
                </Grid>
                <br/>
                <PatientTemperature patientEmail={this.state.patientEmail}/>
                <PatientSymptoms patientEmail={this.state.patientEmail}/>

            </div>
        );
    }
}

export default PatientPanel;
