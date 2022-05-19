import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as React from 'react';
import axios from "axios";

import Grid from "@mui/material/Grid";
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const T_addexam = (props) => {

    let navigate = useNavigate();
    const auth_token = localStorage.getItem("token");

    const [batch, setBatch] = useState("");
    const [batch_menu, setBatch_menu] = useState([]);

    const onChangeBatch = (event) => {
        setBatch(event.target.value);
    };

    const [type, setType] = useState("");
    const [number, setNumber] = useState("");
    const [total_marks, setTotal_marks] = useState("");

    const resetInputs = () => {
        setBatch("");
        setType("");
        setNumber("");
        setTotal_marks("");
        setBatch_menu([]);
    };

    const onChangeType = (event) => {
        setType(event.target.value);
    };

    const onChangeNumber = (event) => {
        setNumber(event.target.value);
    };

    const onChangeTotal_marks = (event) => {
        setTotal_marks(event.target.value);
    };

    useEffect(() => {

        let details;
        if (auth_token == null) {
            navigate("/")
        }

        const token = {
            authToken: auth_token
        }
        axios
            .post("http://localhost:4000/user/getuser", token)
            .then((response) => {
                setBatch_menu(response.data.classes_arr);
            })

            .catch(function (error) {
                console.log(error);
            });

    }, []);


    const onSubmit = (event) => {

        event.preventDefault();

        const data = {
            authToken: auth_token,
            curr_class: batch.substring(0, 3),
            curr_section: batch[3],
            curr_subject: batch[4],
            type: type,
            number: number,
            total_marks: total_marks,
            no_of_questions: 1,
            questions_arr: [],
            toughness_arr: [],
            chapter_arr: [],
            marks_arr: []
        }

        axios
            .post("http://localhost:4000/grade/addexam", data)
            .then((response) => {
                alert(response.data);
                navigate("/T_dashboard");
            });
    };

    return (
        <Grid container align={"center"} spacing={2}>

            {/* Adjust space */}
            <Grid item xs={12}></Grid>

            {/* Batch Menu implementation */}
            <Grid item xs={12}>
                <FormControl size="large" style={{ width: 235, align: 'center' }}>
                    <InputLabel id="select-Batch" >Batch</InputLabel>
                    <Select
                        labelId="select-Batch"
                        id="Batch-simple-select"
                        value={batch}
                        label="Select Batch"
                        onChange={onChangeBatch}
                        xs={12}
                    >
                        {batch_menu.map((order, ind) => {
                            return <MenuItem value={order} key={ind}>{order}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl size="large" style={{ width: 235, align: 'center' }}>
                    <InputLabel id="select-Batch" >Type</InputLabel>
                    <Select
                        labelId="select-Batch"
                        id="Batch-simple-select"
                        value={type}
                        label="Type"
                        onChange={onChangeType}
                        xs={12}
                    >
                        <MenuItem value={"fa"}>FA</MenuItem>
                        <MenuItem value={"sa"}>SA</MenuItem>
                        <MenuItem value={"ls"}>Life Skill</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl size="large" style={{ width: 235, align: 'center' }}>
                    <InputLabel id="select-Batch" >Number</InputLabel>
                    <Select
                        labelId="select-Batch"
                        id="Batch-simple-select"
                        value={number}
                        label="Number"
                        onChange={onChangeNumber}
                        xs={12}
                    >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        {type === "ls" &&
                            <MenuItem value="3">3</MenuItem>}
                        {type === "ls" &&
                            <MenuItem value="4">4</MenuItem>}
                        {type === "fa" &&
                            <MenuItem value="3">3</MenuItem>}
                        {type === "fa" &&
                            <MenuItem value="4">4</MenuItem>}
                        {type === "ls" &&
                            <MenuItem value="5">5</MenuItem>}
                        {type === "ls" &&
                            <MenuItem value="5">6</MenuItem>}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Total_marks"
                    variant="outlined"
                    value={total_marks}
                    onChange={onChangeTotal_marks}
                />
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

export default T_addexam;
