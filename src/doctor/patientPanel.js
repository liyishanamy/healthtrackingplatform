
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React, {Component} from 'react';

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

    }
    render() {
        const data = this.state.userTemp
        console.log(data)
        return (
            <div>
                <div>
                    <label>My Temperature</label>
                    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="Date" />
                        <YAxis domain={[dataMin=>35, dataMax => 40]}/>
                        <Tooltip />
                    </LineChart>
                </div>

            </div>
        );
    }
}

export default PatientPanel;
