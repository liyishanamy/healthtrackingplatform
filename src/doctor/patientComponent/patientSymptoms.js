
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React, {Component} from 'react';
import {CardHeader, Divider, Grid, IconButton} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import CardContent from "@material-ui/core/CardContent";
import PolarGrid from "recharts/lib/polar/PolarGrid";
import PolarAngleAxis from "recharts/lib/polar/PolarAngleAxis";
import PolarRadiusAxis from "recharts/lib/polar/PolarRadiusAxis";
import Radar from "recharts/lib/polar/Radar";
import Legend from "recharts/lib/component/Legend";
import RadarChart from "recharts/lib/chart/RadarChart";


class PatientSymptoms extends Component {
    constructor(props) {
        super(props);
        console.log("props",props)
        this.state={
            patientEmail:props.patientEmail,
            headache:"",
            cough:"",
            runningNose:"",
            diarrhea:"",
            breatheHard:"",
        }
    }
    componentDidMount() {
        const data = {
            email:this.state.patientEmail
        }
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

        return (
                <div>
                    <card>
                        <CardContent>
                            <CardHeader
                                action={
                                    <IconButton size="small">
                                        <RefreshIcon />
                                    </IconButton>
                                }
                                title="My daily symptom"
                            />
                            <Divider />

                            <RadarChart outerRadius={90} width={730} height={250} data={symptom}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="symptom" />
                                <PolarRadiusAxis angle={30} domain={[0, 14]} />
                                <Radar name="My Symptom" dataKey="frequency" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                <Legend />
                            </RadarChart>
                        </CardContent>
                    </card>

                </div>

        );
    }
}

export default PatientSymptoms;
