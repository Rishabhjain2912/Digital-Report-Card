import * as React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const S_gradeAnalysis = (props) => {
    let navigate = useNavigate();
    const auth_token = localStorage.getItem("token");

    const [details, setDetails] = useState([]);
    const [allgrades, setGrades] = useState([]);
    const [subject, setSubject] = useState("");

    const onChangeSubject = (event) => {
        setSubject(event.target.value);
    };
    const resetInputs = () => {
        setSubject("");
    };

    const onSubmit = (event) => {

        event.preventDefault();
        const token = {
            authToken: auth_token,
            subject: subject
        }
        axios
            .post("http://localhost:4000/grade/getexamsbysubject", token)
            .then((response) => {
                setDetails(response.data);
                // console.log(response.data)
                // console.log(details);
            })
            .catch(function (error) {
                console.log(error);
            });
        axios
            .post("http://localhost:4000/grade/getgradesbysubject", token)
            .then((response) => {
                setGrades(response.data);
                // console.log(response.data)
                // console.log(allgrades);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        if (auth_token == null) {
            navigate("/")
        }
    }, []);

    return (<div><h1>Graph</h1>
        <Grid container align={"center"} spacing={2}>

            {/* Role menu implementation */}
            <Grid item xs={12}>
                <Box sx={{ maxWidth: 500 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subject}
                            label="Role"
                            onChange={onChangeSubject}
                        >
                            <MenuItem value="1">ENGLISH</MenuItem>
                            <MenuItem value="2">HINDI</MenuItem>
                            <MenuItem value="3">MATHEMATICS</MenuItem>
                            <MenuItem value="4">SCIENCE</MenuItem>
                            <MenuItem value="5">SOCIAL STUDIES</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            {/* Submit button */}
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    Register
                </Button>
            </Grid>
        </Grid></div>);
};

export default S_gradeAnalysis;

