
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React, {Component} from 'react';
import BarChart from "recharts/src/chart/BarChart";

class PatientPanel extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state={
            gettingBetter:0,
            gettingWorse:0,
            forgetReporting:0
        }
    }

    componentDidMount() {

        fetch("http://localhost:3000/healthStatus/stats?from=2020-05-21&to=2020-05-22", {
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
            },
        }).then(response => response.json())
            .then(data => {


            })

    }
    render() {
        const data = this.state.userTemp
        console.log(data)
        return (
            <div>
                <div>
                    <label>Reporting Updates</label>
                    <BarChart width={730} height={250} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </div>

            </div>
        );
    }
}

export default PatientPanel;

