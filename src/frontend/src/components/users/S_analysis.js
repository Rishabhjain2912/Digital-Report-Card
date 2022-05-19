import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Root = props => (
    <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
);
const Label = props => (
    <Legend.Label {...props} sx={{ whiteSpace: 'nowrap' }} />
);

var data = [{
    Exam: 'FA1',
    Grade: 10,
    Mean: 6,
    Mode: 5,
}, {
    Exam: 'FA2',
    Grade: 10,
    Mean: 6,
    Mode: 6,
}, {
    Exam: 'SA1',
    Grade: 8,
    Mean: 7,
    Mode: 6,
}, {
    Exam: 'FA3',
    Grade: 10,
    Mean: 7,
    Mode: 5,
}, {
    Exam: 'FA4',
    Grade: 10,
    Mean: 6,
    Mode: 7,
}, {
    Exam: 'SA2',
    Grade: 8,
    Mean: 6,
    Mode: 7,
}];

export default class S_analysis extends React.PureComponent {


    constructor(props) {
        super(props);

        this.state = {
            data,
        };
    }

    render() {
        const { data: chartData } = this.state;

        return (
            <div>
              <h1>English Grades Analytics</h1>
                <Paper>
                    <Chart
                        data={chartData}
                    >
                        <ArgumentAxis />
                        <ValueAxis />

                        <BarSeries
                            name="Grade Points"
                            valueField="Grade"
                            argumentField="Exam"
                            color="#ffd700"
                        />
                        <BarSeries
                            name="Mean Grade Points"
                            valueField="Mean"
                            argumentField="Exam"
                            color="#c0c0c0"
                        />
                        <BarSeries
                            name="Median Grade Points"
                            valueField="Mode"
                            argumentField="Exam"
                            color="#cd7f32"
                        />
                        <Animation />
                        <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                        <Title text="Grade Analytics" />
                        <Stack />
                    </Chart>
                </Paper>
            </div>
        );
    }
}
