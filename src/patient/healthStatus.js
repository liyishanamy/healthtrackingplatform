import React, {useCallback, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Select from 'react-select';
import {Button} from "@material-ui/core";
//import { useAlert } from 'react-alert'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
    },
    margin: {
        height: theme.spacing(5),
    },

}));

const marks = [
    {
        value: 35,
        label: '35°C',
    },

    {
        value: 36,
        label: '36°C',
    },
    {
        value: 37,
        label: '37°C',
    },
    {
        value: 38,
        label: '38°C',
    },
    {
        value: 39,
        label: '39°C',
    },
    {
        value: 40,
        label: '40°C',
    },
];

function valuetext(value) {
    return `${value}°C`;
}

function handleSubmit(temp,symptoms) {
    const data={
        email:localStorage.getItem("email"),
        temperature:temp,
        symptom:symptoms

    }
    console.log(data)
    console.log("hello")
    fetch("http://localhost:3000/healthStatus", {
        method: 'POST',
        headers:{
            'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
    }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);


        })

}

export default function DiscreteSlider() {
    //const alert = useAlert()
    const classes = useStyles();
    const options = [
        { value: 'Headache', label: 'Headache' },
        { value: 'Cough', label: 'Cough' },
        { value: 'Running Nose', label: 'Running Nose' },
        { value: 'Diarrhea', label: 'Diarrhea' },
        { value: 'Breathe Hard', label: 'Breathe Hard' }
    ]
    const [temp, setTemp] = useState("35");
    const [symptoms,setSymptoms] = useState([])
    let symptom = symptoms



    return (
        <div className={classes.root}>
            <div>{new Date().getFullYear()+"/"+(new Date().getMonth()+1)+"/"+new Date().getDate()}</div>


            <Typography id="discrete-slider-custom" gutterBottom>
                Today's Temperature
            </Typography>
            <Slider
                defaultValue={20}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-custom"
                step={0.1}
                valueLabelDisplay="auto"
                marks={marks}
                min={35}
                max={40}
                // onChange={(value) => setTemp(value)}
                onChange={(event,value) => setTemp(value)}
            />
            <label>Symptoms</label>

            <Select
                isMulti
                name="symptom"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange = {(event,value) => {
                    if(value.action==="select-option"){
                        symptom = symptom.concat(value.option.value)
                        setSymptoms(symptom)
                    }
                    else if(value.action ==="remove-value"){
                       symptom = symptom.filter(item=>item!==value.removedValue.value);
                       setSymptoms(symptom)

                    }


                }}
            />
            <Button onClick={()=>handleSubmit(temp,symptoms)}>Submit</Button>

        </div>
    );
}
