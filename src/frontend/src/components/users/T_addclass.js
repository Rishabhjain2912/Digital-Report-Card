import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as React from 'react';
import axios from "axios";

import Grid from "@mui/material/Grid";
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const T_addclass = (props) => {

    let navigate = useNavigate();
    const auth_token = localStorage.getItem("token");

    const [section, setSection] = useState("");
    const [curr_class, setCurr_class] = useState("");
    const [subject, setSubject] = useState("");

    const onChangeSubject = (event) => {
        setSubject(event.target.value);
    };

    const onChangeCurr_class = (event) => {
        setCurr_class(event.target.value);
    };

    const onChangeSection = (event) => {
        setSection(event.target.value);
    };

    const resetInputs = () => {
        setSubject("");
        setCurr_class("");
        setSection("");
      };

    const onSubmit = (event) => {

        event.preventDefault();

        // checks if any field is empty
        if (curr_class === "" || section === "" || subject === "") {
            alert("Please fill all the fields");
            return
        }
        else {

            const data = {
                authToken: auth_token,
                curr_class: curr_class,
                section: section,
                subject: subject
            }

            axios
                .post("http://localhost:4000/user/addclass", data)
                .then((response) => {
                    alert(response.data);
                    navigate("/T_dashboard");
                });
        }

    };

    const onNext = (event) => {

        event.preventDefault();

        // checks if any field is empty
        if (curr_class === "" || section === "" || subject === "") {
            alert("Please fill all the fields");
            return
        }
        else {

            const data = {
                authToken: auth_token,
                curr_class: curr_class,
                section: section,
                subject: subject
            }

            axios
                .post("http://localhost:4000/user/addclass", data)
                .then((response) => {
                    alert(response.data);
                    resetInputs();
                    navigate("/T_addclass");
                });
        }

    };

    return (
        <Grid container align={"center"} spacing={2}>

            {/* Adjust space */}
            <Grid item xs={12}></Grid>

            {/* Role menu implementation */}
            <Grid item xs={12}>
                <FormControl size="large" style={{ width: 235, align: 'center' }}>
                    <InputLabel id="select-Batch" >Class</InputLabel>
                    <Select
                        labelId="select-Batch"
                        id="Batch-simple-select"
                        value={curr_class}
                        label="Class"
                        onChange={onChangeCurr_class}
                        xs={12}
                    >
                        <MenuItem value={"001"}>Nursery</MenuItem>
                        <MenuItem value={"002"}>Junior K.G.</MenuItem>
                        <MenuItem value={"003"}>Senior K.G.</MenuItem>
                        <MenuItem value={"101"}>1</MenuItem>
                        <MenuItem value={"102"}>2</MenuItem>
                        <MenuItem value={"103"}>3</MenuItem>
                        <MenuItem value={"104"}>4</MenuItem>
                        <MenuItem value={"105"}>5</MenuItem>
                        <MenuItem value={"106"}>6</MenuItem>
                        <MenuItem value={"107"}>7</MenuItem>
                        <MenuItem value={"108"}>8</MenuItem>
                        <MenuItem value={"109"}>9</MenuItem>
                        <MenuItem value={"110"}>10</MenuItem>
                        <MenuItem value={"111"}>11</MenuItem>
                        <MenuItem value={"112"}>12</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            {curr_class &&
                <Grid item xs={12}>
                    <FormControl size="large" style={{ width: 235, align: 'center' }}>
                        <InputLabel id="select-Batch" >Section</InputLabel>
                        <Select
                            labelId="select-Batch"
                            id="Batch-simple-select"
                            value={section}
                            label="Section"
                            onChange={onChangeSection}
                            xs={12}
                        >
                            <MenuItem value={"A"}>Section A</MenuItem>
                            <MenuItem value={"B"}>Section B</MenuItem>
                            <MenuItem value={"C"}>Section C</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            }
            {curr_class && section &&
                <Grid item xs={12}>
                    <FormControl size="large" style={{ width: 235, align: 'center' }}>
                        <InputLabel id="select-Batch" >Subject</InputLabel>
                        <Select
                            labelId="select-Batch"
                            id="Batch-simple-select"
                            value={subject}
                            label="Subject"
                            onChange={onChangeSubject}
                            xs={12}
                        >
                            <MenuItem value={"1"}>English</MenuItem>
                            <MenuItem value={"2"}>Hindi</MenuItem>
                            <MenuItem value={"3"}>Mathematics</MenuItem>
                            <MenuItem value={"4"}>Science</MenuItem>
                            <MenuItem value={"5"}>Social Studies</MenuItem>
                            <MenuItem value={"6"}>Communication Skills</MenuItem>
                            <MenuItem value={"7"}>Participation</MenuItem>
                            <MenuItem value={"8"}>Decision Making</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
            }

            {/* Next button */}
            <Grid item xs={12}>
                <Button variant="contained" onClick={onNext} style={{ minWidth: "100px" }}>
                    Next
                </Button>
            </Grid>

            {/* Submit button */}
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit} style={{ minWidth: "100px" }}>
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
};

export default T_addclass;
