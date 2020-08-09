
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React, {Component} from 'react';
import Bar from "recharts/lib/cartesian/Bar";
import Legend from "recharts/lib/component/Legend";
import BarChart from "recharts/lib/chart/BarChart";
import {CardContent, CardHeader, Divider, IconButton} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import {errorHandling} from "../../errorHandling";

class ReportUpdateStats extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state={
            date1:null,
            gettingBetter1:0,
            gettingWorse1:0,
            forgetReporting1:0,
            date2:null,
            gettingBetter2:0,
            gettingWorse2:0,
            forgetReporting2:0,
            date3:null,
            gettingBetter3:0,
            gettingWorse3:0,
            forgetReporting3:0,
            date4:null,
            gettingBetter4:0,
            gettingWorse4:0,
            forgetReporting4:0,
            date5:null,
            gettingBetter5:0,
            gettingWorse5:0,
            forgetReporting5:0,
            date6:null,
            gettingBetter6:0,
            gettingWorse6:0,
            forgetReporting6:0,
            date7:null,
            gettingBetter7:0,
            gettingWorse7:0,
            forgetReporting7:0
        }
    }

    componentDidMount() {
        let num = [0, 1, 2, 3, 4, 5, 6]
        let today = new Date()
        let tomorrow = new Date(today)

        tomorrow.setDate(tomorrow.getDate()+1)
        console.log(today,tomorrow)
        const promises = num.map(i => {
            tomorrow=today

            let tomorrow_format = new Date(today).getFullYear()+"-"+(new Date(today).getMonth()+1)+"-"+new Date(today).getDate();
            today.setDate(today.getDate()-1)
            let today_format = new Date(today).getFullYear()+"-"+(new Date(today).getMonth()+1)+"-"+new Date(today).getDate()
            console.log(tomorrow_format,today_format)

            return fetch(`http://localhost:3000/healthStatus/stats?from=${today_format}&to=${tomorrow_format}`,{
                headers:{
                    'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                }
            })

                .then(response => {
                    console.log("AMY",response)
                    if(response){
                        return response.json()
                    }else if(response.message==="the token is invalid"){
                        throw response
                    }
                }).catch( e=> errorHandling(e) );;

        });

        Promise.all(promises).then(results => {
            console.log("results",results)
            this.setState({
                date1:results[6]['reportDate'],
                gettingBetter1:results[6]["gettingBetter"],
                gettingWorse1:results[6]["gettingWorse"],
                forgetReporting1:results[6]["forgetReporting"],
                date2:results[5]['reportDate'],
                gettingBetter2:results[5]["gettingBetter"],
                gettingWorse2:results[5]["gettingWorse"],
                forgetReporting2:results[5]["forgetReporting"],
                date3:results[4]['reportDate'],
                gettingBetter3:results[4]["gettingBetter"],
                gettingWorse3:results[4]["gettingWorse"],
                forgetReporting3:results[4]["forgetReporting"],
                date4:results[3]['reportDate'],
                gettingBetter4:results[3]["gettingBetter"],
                gettingWorse4:results[3]["gettingWorse"],
                forgetReporting4:results[3]["forgetReporting"],
                date5:results[2]['reportDate'],
                gettingBetter5:results[2]["gettingBetter"],
                gettingWorse5:results[2]["gettingWorse"],
                forgetReporting5:results[2]["forgetReporting"],
                date6:results[1]['reportDate'],
                gettingBetter6:results[1]["gettingBetter"],
                gettingWorse6:results[1]["gettingWorse"],
                forgetReporting6:results[1]["forgetReporting"],
                date7:results[0]['reportDate'],
                gettingBetter7:results[0]["gettingBetter"],
                gettingWorse7:results[0]["gettingWorse"],
                forgetReporting7:results[0]["forgetReporting"],
            })




        })



    }
    render() {
        console.log(this.state.date1)
        const data = [
            {"name": new Date(this.state.date1).getFullYear()+"/"+(new Date(this.state.date1).getMonth()+1)+"/"+new Date(this.state.date1).getDate(),
                "gettingBetter":this.state.gettingBetter1,
                "gettingWorse":this.state.gettingWorse1,
                "forgettingReporting":this.state.forgetReporting1
            },
            {"name": new Date(this.state.date2).getFullYear()+"/"+(new Date(this.state.date2).getMonth()+1)+"/"+new Date(this.state.date2).getDate(),
                "gettingBetter":this.state.gettingBetter2,
                "gettingWorse":this.state.gettingWorse2,
                "forgettingReporting":this.state.forgetReporting2
            },
            {"name": new Date(this.state.date3).getFullYear()+"/"+(new Date(this.state.date3).getMonth()+1)+"/"+new Date(this.state.date3).getDate(),
                "gettingBetter":this.state.gettingBetter3,
                "gettingWorse":this.state.gettingWorse3,
                "forgettingReporting":this.state.forgetReporting3
            },
            {"name": new Date(this.state.date4).getFullYear()+"/"+(new Date(this.state.date4).getMonth()+1)+"/"+new Date(this.state.date4).getDate(),
                "gettingBetter":this.state.gettingBetter4,
                "gettingWorse":this.state.gettingWorse4,
                "forgettingReporting":this.state.forgetReporting4
            },
            {"name": new Date(this.state.date5).getFullYear()+"/"+(new Date(this.state.date5).getMonth()+1)+"/"+new Date(this.state.date5).getDate(),
                "gettingBetter":this.state.gettingBetter5,
                "gettingWorse":this.state.gettingWorse5,
                "forgettingReporting":this.state.forgetReporting5
            },
            {"name": new Date(this.state.date6).getFullYear()+"/"+(new Date(this.state.date6).getMonth()+1)+"/"+new Date(this.state.date6).getDate(),
                "gettingBetter":this.state.gettingBetter6,
                "gettingWorse":this.state.gettingWorse6,
                "forgettingReporting":this.state.forgetReporting6
            },{"name": new Date(this.state.date7).getFullYear()+"/"+(new Date(this.state.date7).getMonth()+1)+"/"+new Date(this.state.date7).getDate(),
                "gettingBetter":this.state.gettingBetter7,
                "gettingWorse":this.state.gettingWorse7,
                "forgettingReporting":this.state.forgetReporting7
            }

        ]

        return (
            <card>
                <CardHeader
                    action={
                        <IconButton size="small">
                            <RefreshIcon />
                        </IconButton>
                    }
                    title="Report Health Status"
                />
                <Divider />
                <CardContent>
            <div>
                <div>
                    <label>Reporting Updates</label>
                    <BarChart width={730} height={250} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="gettingBetter" fill="#8dd1e" />
                        <Bar dataKey="gettingWorse" fill="#8884d8" />
                        <Bar dataKey="forgettingReporting" fill="#82ca9d" />
                    </BarChart>
                </div>

            </div></CardContent></card>
        );
    }
}

export default ReportUpdateStats;

