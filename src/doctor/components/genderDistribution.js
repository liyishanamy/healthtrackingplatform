
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
import {errorHandling} from "../../errorHandling";
import {CSVLink} from "react-csv";

class GenderDistribution extends Component {
    constructor(props) {
        super(props);
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
                if(data.message!=="the token is invalid"){
                    this.setState({
                        female:data.female,
                        male:data.male,
                        other:data.other,

                    })
                }else{
                    throw data
                }
            }).catch( e=> errorHandling(e) );;



    }


    render() {
        const data = [{name:"female",value:this.state.female,"fill": "#8884d8"},{name:"male",value: this.state.male,"fill": "#8dd1e1"},{name:"other",value:this.state.other,"fill": "#a4de6c"}]
        const data1 = [{name:"female",value:this.state.female},{name:"male",value: this.state.male,},{name:"other",value:this.state.other}]
        return (
            <Card>
                <CardHeader
                    action={
                        <CSVLink
                            data={data1}
                            filename={"genderDistribution.csv"}
                            className="btn btn-primary"
                            target="_blank"
                            style={{ align: 'right'}}

                        >
                            Export
                        </CSVLink>

                    }
                    title="Gender Distribution"
                />

                <Divider />

                <CardContent>
                    <div>
                <div>
                    <PieChart width={730} height={250}>
                        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36}/>
                    </PieChart>

                </div>

            </div></CardContent></Card>

        );
    }
}

export default GenderDistribution;

