import React, {Component, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
class BookAppointment extends Component {

    constructor (props) {
        super(props)
        this.state = {
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        })
    }

    onFormSubmit(e) {
        e.preventDefault();
        console.log(this.state.startDate)
        const body = {
            appointmentTime:new Date(this.state.startDate)
        }

        fetch('http://localhost:3000/appointment',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type':'application/json',
            },
            body: JSON.stringify(body),

        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(data.message==="You have already booked one appointment. If you want to rebook one, please cancel the existing one first"){
                    alert(data.message)
                }
                if (data.message==="Sorry, this time period has either been already booked or it is unavailable"){
                    alert(data.message)

                }
                else{
                    alert("You have successfully booked the appointment.")
                }

            })
    }





    render() {
        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }
        function disableWeekends(date) {
            console.log( date.getDay() )
            return date.getDay() === 0 || date.getDay() === 6;
        }

        return (
        <form onSubmit={ this.onFormSubmit }>
            <div className="form-group">
                <DatePicker
                    selected={ this.state.startDate }
                    onChange={ this.handleChange }
                    minDate={new Date()}
                    maxDate={addDays(new Date(),14)}
                    shouldDisableDate={disableWeekends}
                    showTimeSelect
                    excludeOutOfBoundsTimes
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    inputProps={{readOnly: true}}
                />
                <button className="btn btn-primary" >Book Appointment</button>
            </div>
        </form>
    )

}}
export default BookAppointment;
