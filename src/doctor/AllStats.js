import React, {Component} from 'react';

import { Grid } from '@material-ui/core';
import TotalPatients from './components/totalPatients'
import AgeDistribution from "./components/ageDistribution";
import GenderDistribution from './components/genderDistribution'

class AllStats extends Component {
    render() {
        return (
            <div>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <TotalPatients />
                </Grid>
                <br/>

                <AgeDistribution/>
                <GenderDistribution/>







                total Appointments
                people get better today
                People get worse today
                People forget today
                1.age
                2.gender
                3.Everyday growth
                4.Total patient
            </div>
        );
    }
}

export default AllStats;