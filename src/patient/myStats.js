import React, {Component} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {dateFormat} from "canvasjs/src/helpers/utils";
import ReferenceLine from "recharts/lib/cartesian/ReferenceLine";
import RadarChart from "recharts/lib/chart/RadarChart";
import PolarGrid from "recharts/lib/polar/PolarGrid";
import PolarAngleAxis from "recharts/lib/polar/PolarAngleAxis";
import PolarRadiusAxis from "recharts/lib/polar/PolarRadiusAxis";
import Radar from "recharts/lib/polar/Radar";
import Legend from "recharts/lib/component/Legend";
import {CardHeader, Divider, Grid, IconButton} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import CardContent from "@material-ui/core/CardContent";
import MyTemperature from "./components/myTemperature";
import MySymptoms from "./components/mySymptoms";
import TotalPatients from "../doctor/components/totalPatients";
import GetBetterRate from "../doctor/components/getBetterRate";
import GetWorseRate from "../doctor/components/getWorseRate";
import FullyRecovered from "../doctor/components/fullyRecovered";
import DaysHaveNoSymptoms from "./components/daysHaveNoSymptoms";
import MyAppointment from "./components/myAppointment"
import ErrorBoundary from "../ErrorBoundary";

class MyStats extends Component {
    constructor(props) {
        super(props);
        this.state={
            userTemp:null,

        }
    }



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
                        <DaysHaveNoSymptoms />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <MyAppointment/>

                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >

                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >

                    </Grid>
                </Grid>
                <br/>
                <MyTemperature/>
                <MySymptoms/>




            </div>




        );
    }
}

export default MyStats;