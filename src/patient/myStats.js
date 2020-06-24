import React, {Component} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {dateFormat} from "canvasjs/src/helpers/utils";


class MyStats extends Component {
    constructor(props) {
        super(props);
        this.state={
            userTemp:null
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
                console.log("Success",data)
                var formateDate =[];
                for(var i=0;i<data.length;i++){
                    let date =new Date(data[i]['Date'])
                    formateDate = formateDate.concat({temperature:data[i]['temperature'],Date:(date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate())})

                }
                this.setState({
                    userTemp:formateDate
                })

            })

    }

    render() {
        //const data = [{Date: 'Page A', temperature: 37, pv: 2400, amt: 2400},{Date: 'Page b', temperature: 35.6, pv: 2000, amt: 3400}];
        const data = this.state.userTemp
        return (
            <div>
                <label>My Temperature</label>
                <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </div>
        );
    }
}

export default MyStats;