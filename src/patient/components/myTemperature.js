import React, {Component} from 'react';
import {CardHeader, Divider, IconButton,Card} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import CardContent from "@material-ui/core/CardContent";
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import ReferenceLine from "recharts/lib/cartesian/ReferenceLine";
import {errorHandling} from "../../errorHandling";
import {CSVLink} from "react-csv";

class MyTemperature extends Component {
    constructor(props) {
        super(props);
        this.state={
            userTemp:[]
        }
    }
    componentDidMount() {
        const data = {
            email:localStorage.getItem("email")
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
                if (data.message !== "the token is invalid") {
                    var formateDate = [];
                    for (var i = 0; i < data.length; i++) {
                        let date = new Date(data[i]['Date'])
                        formateDate = formateDate.concat({
                            Date: (date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()),
                            temperature: data[i]['temperature']
                        })
                    }
                    return formateDate


                }else{
                    throw data
                }
            }).then(res=>{
            this.setState({
                userTemp: res
            })

        }).catch( e=> errorHandling(e) );

    }
    render() {
        const data = this.state.userTemp
        return (
            <div>
                <Card>
                    <CardHeader
                        action={
                            <CSVLink
                                data={this.state.userTemp}
                                filename={"my-temperature.csv"}
                                className="btn btn-primary"
                                target="_blank"
                            >
                                Export
                            </CSVLink>

                        }
                        title="My daily temperature"
                    />
                    <Divider />
                    <CardContent>


                        <LineChart  width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="Date" />
                            <ReferenceLine y="37" stroke="red" label={{ position: 'top',  value: 'Abnormal', fill: 'red', fontSize: 14 }}/>

                            <YAxis domain={[dataMin=>35, dataMax => 40]}/>
                            <Tooltip />
                        </LineChart>
                    </CardContent></Card>

            </div>
        );
    }
}

export default MyTemperature;