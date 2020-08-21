import React, {Component, useCallback, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Select from 'react-select';
import {Button, FormControl, FormControlLabel, FormLabel, RadioGroup} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Input from "@material-ui/core/Input";
import Radio from "@material-ui/core/Radio";
import {setLogin, setRole} from "../login_Actions";
import {connect} from "react-redux";
import {errorHandling} from "../errorHandling";
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




export default function DiscreteSlider() {
    //const alert = useAlert()
    const classes = useStyles();
    const options = [
        {value: 'Headache', label: 'Headache'},
        {value: 'Cough', label: 'Cough'},
        {value: 'Running Nose', label: 'Running Nose'},
        {value: 'Diarrhea', label: 'Diarrhea'},
        {value: 'Breathe Hard', label: 'Breathe Hard'}
    ]
    const [temp, setTemp] = useState(35);
    const [symptoms, setSymptoms] = useState([])

    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [mask, setMask] = useState(null)


    let symptom = symptoms

    function handleMask(e) {
        if (e.target.value === "Yes") {
            setMask(true)
        } else if (e.target.value === "No") {
            setMask(false)
        }


    }

    function handleFrom(e) {
        setFrom(e.target.value)
    }

    function handleTo(e) {
        setTo(e.target.value)

    }

    function handleSubmit(temp, symptoms, placesFrom, placesTo, mask) {

        let symptom = []
        for (var i = 0; i < symptoms.length; i++) {
            symptom = symptom.concat(symptoms[i].value)
        }
        const data = {
            email: localStorage.getItem("email"),
            temperature: temp,
            symptom: symptom,
            placesFrom: placesFrom,
            placesTo: placesTo,
            mask: mask
        }

        fetch("http://localhost:3000/healthStatus", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken")),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                if (data.message!=="the token is invalid") {
                    console.log('Success:', data);

                }else{
                    throw data
                }
            }).catch( e=> errorHandling(e) )
            .finally(() => {
            setSymptoms([])
            setTemp(35);
            setFrom(null)
            setTo(null)
            setMask(null)
        })

    }


    return (

        <Card variant="outlined" style={{padding: 170}}>
            <h1>My Daily Update</h1>
            <CardContent>
                <div className={classes.root}>
                    <div>{new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate()}</div>


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
                        value={temp}
                        // onChange={(value) => setTemp(value)}
                        onChange={(event, value) => setTemp(value)}
                    />
                    <label>Symptoms</label>

                    <Select
                        isMulti
                        name="symptom"
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        isClearable={true}
                        value={symptoms}
                        onChange={(event, value) => {

                            if (value.action === "select-option") {
                                symptom = symptom.concat(value.option)
                                setSymptoms(symptom)
                            } else if (value.action === "remove-value") {
                                symptom = symptom.filter(item => item !== value.removedValue.value);
                                setSymptoms(symptom)

                            }


                        }}
                    />

                    <div className="form-group">
                        <label>Report the places you have traveled. If any. If not, leave it empty</label><br/>
                        From <Input type="text" className="form-control" placeholder="From"
                                    onChange={handleFrom} required/>
                        To <Input type="text" className="form-control" placeholder="To"  onChange={handleTo}
                                  required/>
                    </div>
                    <div className="form-group">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">If you went somewhere, whether you wear mask?</FormLabel>
                            <RadioGroup aria-label="mask" name="mask" onChange={handleMask}>
                                <FormControlLabel value="Yes" control={<Radio required={true}/>} label="I did"/>
                                <FormControlLabel value="No" control={<Radio required={true}/>} label="I did not"/>
                            </RadioGroup>
                        </FormControl>

                    </div>

                    <Button onClick={() => handleSubmit(temp, symptoms, from, to, mask)}>Submit</Button>

                </div>
            </CardContent>


        </Card>


    );
}


