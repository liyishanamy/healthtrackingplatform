
import { Tooltip } from 'recharts';
import React, {Component} from 'react';

import Legend from "recharts/lib/component/Legend";
import RadialBar from "recharts/lib/polar/RadialBar";
import RadialBarChart from "recharts/lib/chart/RadialBarChart";
import PieChart from "recharts/lib/chart/PieChart";
import Pie from "recharts/lib/polar/Pie";
import {Card, CardHeader, Divider, IconButton} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import CardContent from "@material-ui/core/CardContent";

class GenderDistribution extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state={
            female:0,
            male:0,
            other:0,

        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/users/gender',{
            headers:{
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
            }
        }).then(response => response.json())
            .then(data => {
                console.log("success",data)
               this.setState({
                   female:data.female,
                   male:data.male,
                   other:data.other,

               })
            });



    }


    render() {
        const data = [{name:"female",value:this.state.female,"fill": "#8884d8"},{name:"male",value: this.state.male,"fill": "#8dd1e1"},{name:"other",value:this.state.other,"fill": "#a4de6c"}]
        return (
            <card>
                <CardHeader
                    action={
                        <IconButton size="small">
                            <RefreshIcon />
                        </IconButton>
                    }
                    title="Gender Distribution"
                />
                <Divider />
                <CardContent>
                    <div>
                <div>
                    <PieChart width={730} height={250}>
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36}/>
                    </PieChart>

                </div>

            </div></CardContent></card>

        );
    }
}

export default GenderDistribution;

