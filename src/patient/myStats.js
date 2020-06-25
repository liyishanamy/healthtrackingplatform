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
import {CardHeader, Divider, IconButton} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import CardContent from "@material-ui/core/CardContent";
import MyTemperature from "./components/myTemperature";
import MySymptoms from "./components/mySymptoms";


class MyStats extends Component {
    constructor(props) {
        super(props);
        this.state={
            userTemp:null
        }
    }


    render() {
        //const data = [{Date: 'Page A', temperature: 37, pv: 2400, amt: 2400},{Date: 'Page b', temperature: 35.6, pv: 2000, amt: 3400}];
        const data = []
        return (
            <div>
                <MyTemperature/>
                <MySymptoms/>



            </div>



        );
    }
}

export default MyStats;