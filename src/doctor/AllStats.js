import React, {Component} from 'react';

import { Grid } from '@material-ui/core';
import TotalPatients from './components/totalPatients'
import AgeDistribution from "./components/ageDistribution";
import GenderDistribution from './components/genderDistribution'
import ReportUpdateStats from "./components/reportUpdateStats";
import GetBetterRate from "./components/getBetterRate";
import GetWorseRate from "./components/getWorseRate";
import FullyRecovered from "./components/fullyRecovered";
import TestResultStats from "./patientComponent/testResultStats";

class AllStats extends Component {


    render() {
        return (
            <div>
                <Grid
                    container
                    spacing={4}
                >

                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <TotalPatients />
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <GetBetterRate />
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <GetWorseRate />
                </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <FullyRecovered />
                    </Grid>
                </Grid>
                <br/>
                <ReportUpdateStats/>

                <AgeDistribution/>
                <GenderDistribution/>











            </div>
        );
    }
}

export default AllStats;