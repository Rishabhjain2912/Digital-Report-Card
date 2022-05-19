import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as React from 'react';
import axios from "axios";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const T_addgrade = (props) => {

    let navigate = useNavigate();

    const [grade, setGrade] = useState("");
    const [marks, setMarks] = useState("");
    const [present, setPresent] = useState("");
    const [details, setDetails] = useState([]);

    const auth_token = localStorage.getItem("token");
    const exam_id = localStorage.getItem("exam_id");
    const student_id = localStorage.getItem("student_id");

    const onChangeGrade = (event) => {
        setGrade(event.target.value);
    };

    const onChangeMarks = (event) => {
        setMarks(event.target.value);
    };

    const onChangePresent = (event) => {
        setPresent(event.target.value);
    };

    useEffect(() => {

        // checks if any field is empty
        const auth_token = localStorage.getItem("token");
        const exam_id = localStorage.getItem("exam_id");
        const student_id = localStorage.getItem("student_id");

        if (auth_token == null) {
            navigate("/")
        }

        if (exam_id == null) {
            navigate("/T_dashboard");
        }

        if (student_id == null) {
            navigate("/T_addgrades");
        }

        const data = {
            authToken: auth_token,
            exam_id: exam_id,
            student_id: student_id
        }

        axios
            .post("http://localhost:4000/grade/getexambyid", data)
            .then((response) => {
                setDetails(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    const resetInputs = () => {
        setGrade("");
        setMarks("");
        setPresent("");
    };

    const onSubmit = (event) => {

        event.preventDefault();

        const data = {
            authToken: auth_token,
            exam_id: exam_id,
            grade: grade,
            marks: marks,
            present: present,
            marks_arr: [],
            student_id: student_id,
            exam_type: details.type,
        }

        axios
            .post("http://localhost:4000/grade/addstudentgrade", data)
            .then((response) => {
                alert(response.data);
                resetInputs();
                navigate("/T_grades");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Grid container align={"center"} spacing={2}>

            {/* Adjust space */}
            <Grid item xs={12}></Grid>
            {/* heading */}
            <Grid item xs={12}>
                <h1>ADD GRADE</h1>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Grade"
                    variant="outlined"
                    value={grade}
                    onChange={onChangeGrade}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Marks"
                    variant="outlined"
                    value={marks}
                    onChange={onChangeMarks}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Present"
                    variant="outlined"
                    value={present}
                    onChange={onChangePresent}
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

export default T_addgrade;
