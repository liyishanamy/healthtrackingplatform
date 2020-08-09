import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {errorHandling} from "../../errorHandling";

class ViewAppointment extends Component {
    constructor(props) {
        super(props);
        this.state={
            patientName:"",
            appointmentStart:null,
            appointmentEnd:null,
            testDone:false,
            appointment:false,

        }
    }

    componentDidMount() {
        const data={
            email:localStorage.getItem('email')
        }
        fetch('http://localhost:3000/appointment/myAppointment',{
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        }).then(response => response.json())
        .then(data => {
            console.log("get",data)
            if(data.message==="You do not have a booked appointment yet."){
                this.setState({
                    appointment:false
                })
            }
            if(data.message!=="You do not have a booked appointment yet."&&data.length!==0){
                this.setState({
                    patientName:data[0].patientName,
                    appointmentStart:data[0].appointmentTime.startTime,
                    appointmentEnd:data[0].appointmentTime.endTime,
                    testDone:data[0].testDone,
                    appointment:true
                })
            }if(data.message==="the token is invalid"){
                throw data
            }

        }).catch( e=> errorHandling(e) );
    }
    cancelAppointment=(e)=>{
        fetch('http://localhost:3000/appointment/',{
            method: 'DELETE',
            headers:{
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
            },
        }).then(response => response.json())
            .then(data => {
                console.log("delete",data)
                alert("Your appointment has been cancelled");
                if(data.message ==="You successfully cancelled the appointment"){
                    this.setState({
                        appointment:false
                    })
                }else if(data.message==="You do not have a booked appointment yet."){
                    this.setState({
                        appointment:false
                    })
                }else if(data.message==="the token is invalid"){
                    throw data
                }
                else{
                    console.log("something went wrong")
                }

            }).catch( e=> errorHandling(e) );
    }


    render() {

        console.log("isAppointment",this.state.appointment)
        let testDone;
        if (this.state.testDone){
            testDone= "Done"

        }else {
            testDone= "Not Done"
        }
        let buttonDisableFlag=false
        if(new Date(this.state.appointmentStart).getTime()< Date.now()){
            buttonDisableFlag=true
        }
        let minute1;

        if(new Date(this.state.appointmentStart).getMinutes()===0){
            minute1= "00"
        }else{
            minute1=new Date(this.state.appointmentStart).getMinutes()
        }

        let minute2;

        if(new Date(this.state.appointmentEnd).getMinutes()===0){
            minute2= "00"
        }else{
            minute2=new Date(this.state.appointmentEnd).getMinutes()
        }

        let isAppointment;
        if(this.state.appointment){
            isAppointment=<Card  variant="outlined">
                <CardContent>
                    <Typography  color="textSecondary" gutterBottom>
                        View My Appointment
                    </Typography>
                    <Typography variant="h5" component="h2">

                    </Typography>
                    <Typography variant="body2" component="p">
                        Name:{this.state.patientName}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Appointment Date:{new Date(this.state.appointmentStart).getFullYear()+"/"+(new Date(this.state.appointmentStart).getMonth()+1)+"/"+new Date(this.state.appointmentStart).getDate()}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Appointment Time:
                        <br/>
                        Time Start:{new Date(this.state.appointmentStart).getHours()+":"+minute1}
                        <br/>
                        Time End:{

                        new Date(this.state.appointmentEnd).getHours()+":"+minute2}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Test Done:{testDone}


                    </Typography>
                </CardContent>
                <CardActions>
                    <Button disabled={buttonDisableFlag} onClick={this.cancelAppointment} size="small" color="primary">
                        Cancel Appointment
                    </Button>
                    <Button  onClick={this.bookAppointment} size="small" color="primary">
                        <Link to={`/bookAppointment/`}> Rebook Appointment
                        </Link>

                    </Button>
                </CardActions>

            </Card>

        }else{
            isAppointment=<Card  variant="outlined">
                <CardContent>
                    <Typography  color="textSecondary" gutterBottom>
                        You don't have any appointment booked
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Book Appointment
                    </Button>
                </CardActions>

            </Card>

        }
        return (
            <div style={{padding:100}}>{isAppointment}</div>




        );
    }
}

export default ViewAppointment;