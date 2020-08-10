import React, {Component} from 'react';
import CardContent from "@material-ui/core/CardContent";
import RadarChart from "recharts/lib/chart/RadarChart";
import PolarGrid from "recharts/lib/polar/PolarGrid";
import PolarAngleAxis from "recharts/lib/polar/PolarAngleAxis";
import PolarRadiusAxis from "recharts/lib/polar/PolarRadiusAxis";
import Radar from "recharts/lib/polar/Radar";
import Legend from "recharts/lib/component/Legend";
import {CardHeader, Divider, IconButton} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import {CSVLink} from "react-csv";

class MySymptoms extends Component {
    constructor(props) {
        super(props);
        this.state={
            headache:0,
            cough:0,
            runningNose:0,
            diarrhea:0,
            breatheHard:0
        }
    }

    componentDidMount() {
        const data = {
            email:localStorage.getItem("email")
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
                if(data.message!=="the token is invalid") {
                    console.log("Success", data)
                    this.setState({
                        headache: data.headache,
                        cough: data.cough,
                        runningNose: data.runningNose,
                        diarrhea: data.diarrhea,
                        breatheHard: data.breatheHard
                    })
                }else{
                    throw data
                }
            }).catch(e=>{
            throw e
        })
    }
    render() {
        const data = [{
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
        }
        ]
        const data1 = [{
            symptom:"headache",
            frequency:this.state.headache,
        },{
            symptom:"cough",
            frequency:this.state.cough,
        },{
            symptom:"runningNose",
            frequency:this.state.runningNose,
        },{
            symptom:"diarrhea",
            frequency:this.state.diarrhea,
        },{
            symptom:"breatheHard",
            frequency:this.state.breatheHard,
        }
        ]
        console.log(data)
        return (
            <div>
                <card>
                    <CardContent>
                        <CardHeader
                            action={
                                <CSVLink
                                    data={data1}
                                    filename={"my-symptoms.csv"}
                                    className="btn btn-primary"
                                    target="_blank"
                                >
                                    Export
                                </CSVLink>

                            }
                            title="My daily symptom"
                        />
                        <Divider />

                        <RadarChart outerRadius={90} width={730} height={250} data={data}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="symptom" />
                            <PolarRadiusAxis angle={30} domain={[0, 14]} />
                            <Radar name="My Symptom" dataKey="frequency" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            <Legend />
                        </RadarChart>
                    </CardContent></card>

            </div>
        );
    }
}

export default MySymptoms;