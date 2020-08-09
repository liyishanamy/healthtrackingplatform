
import { Tooltip } from 'recharts';
import React, {Component} from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Divider,
    Typography
} from '@material-ui/core';
import Legend from "recharts/lib/component/Legend";
import RadialBar from "recharts/lib/polar/RadialBar";
import RadialBarChart from "recharts/lib/chart/RadialBarChart";
import RefreshIcon from "@material-ui/icons/Refresh";
import {errorHandling} from "../../errorHandling";

class AgeDistribution extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state={
            age_020:{number:0,name:"0-20","fill": "#8884d8"},
            age_2040:{number:0,name:"20-40","fill": "#83a6ed"},
            age_4060:{number:0,name:"40-60","fill": "#8dd1e1"},
            age_6080:{number:0,name:"60-80","fill": "#82ca9d"},
            age_80100:{number:0,name:"80-100","fill": "#a4de6c"},
            bundle:[]

        }
    }

    componentDidMount() {

            let num = [0, 1, 2, 3, 4]
            const promises = num.map(i => {
                return fetch(`http://localhost:3000/users/age?from=${i * 20}&to=${(i + 1) * 20}`,{
                    headers:{
                        'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),

                    }
                })

                    .then(response => {
                        if(response){
                            return response.json()
                        }else if(response.message==="the token is invalid"){

                            throw response.data
                        }
                    }).catch( e=> errorHandling(e) );;
            });

            Promise.all(promises).then(results => {
                console.log("results",results)
                this.state.age_020['number']=results[0]['number']
                this.state.age_2040['number']=results[1]['number']
                this.state.age_4060['number']=results[2]['number']
                this.state.age_6080['number']=results[3]['number']
                this.state.age_80100['number']=results[4]['number']
                this.setState({
                    bundle:[this.state.age_020,this.state.age_2040,this.state.age_4060,this.state.age_6080,this.state.age_80100]
                })


            })
        }


    render() {
        const data = this.state.bundle
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
                    <RadialBarChart
                        width={730}
                        height={250}
                        innerRadius="10%"
                        outerRadius="80%"
                        data={data}
                        startAngle={180}
                        endAngle={0}
                    >
                        <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='number' />
                        <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
                        <Tooltip />
                    </RadialBarChart>
                </div>

            </div></CardContent></card>
        );
    }
}

export default AgeDistribution;

