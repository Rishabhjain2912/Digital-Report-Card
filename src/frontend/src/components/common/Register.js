import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as React from 'react';
import axios from "axios";

import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Register = (props) => {
  
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [section, setSection] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [curr_class, setCurr_class] = useState("");
  const [student_id, setStudent_id] = useState("");
  const [teacher_id, setTeacher_id] = useState("");

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangeCurr_class = (event) => {
    setCurr_class(event.target.value);
  };

  const onChangeSection = (event) => {
    setSection(event.target.value);
  };

  const onChangeStudent_id = (event) => {
    setStudent_id(event.target.value);
  };

  const onChangeTeacher_id = (event) => {
    setTeacher_id(event.target.value);
  };

  const onChangeType = (event) => {
    setType(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeCpassword = (event) => {
    setCpassword(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setContact("");
    setCurr_class("");
    setSection("");
    setStudent_id("");
    setTeacher_id("");
    setPassword("");
    setCpassword("");
    setType("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      type: type,
      name: name,
      email: email,
      contact: contact,
      section: section,
      curr_class: curr_class,
      student_id: student_id,
      teacher_id: teacher_id,
      password: password,
      cpassword: cpassword,
    };

    // error handling
    if (newUser.contact.length !== 10) {
      alert("Invalid Phone Number!");
      setContact("");
    }
    else if (newUser.password.length < 8) {
      alert("Password is too short!");
      setPassword("");
      setCpassword("");
    }
    else if (newUser.password !== newUser.cpassword) {
      alert("Confirm password does not match!");
      setCpassword("");
    }
    else {
      axios
        .post("http://localhost:4000/user/register", newUser)
        .then((response) => {
          alert(response.data);
          navigate("/login");
        });

      resetInputs();
    }
  };

  return (
    <Grid container align={"center"} spacing={2}>

      {/* Role menu implementation */}
      <Grid item xs={12}>
        <Box sx={{ maxWidth: 500 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Role"
              onChange={onChangeType}
            >
              <MenuItem value="student">Parent</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>

      {/* Adjust space */}
      <Grid item xs={12}></Grid>

      {/* Form for parents */}
      {type === "student" &&
        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name of the Student"
              variant="outlined"
              value={name}
              onChange={onChangeName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={onChangeEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contact Number"
              variant="outlined"
              value={contact}
              onChange={onChangeContact}
            />
          </Grid>
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
                <MenuItem value={"A"}>A</MenuItem>
                <MenuItem value={"B"}>B</MenuItem>
                <MenuItem value={"C"}>C</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Roll Number"
              variant="outlined"
              value={student_id}
              onChange={onChangeStudent_id}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Create Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={onChangePassword}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={cpassword}
              onChange={onChangeCpassword}
            />
          </Grid>
        </Grid>
      }

      {/* Form for teachers */}
      {type === "teacher" &&
        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={onChangeName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={onChangeEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contact Number"
              variant="outlined"
              value={contact}
              onChange={onChangeContact}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Teacher ID"
              variant="outlined"
              value={teacher_id}
              onChange={onChangeTeacher_id}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Create Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={onChangePassword}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={cpassword}
              onChange={onChangeCpassword}
            />
          </Grid>
        </Grid>
      }

      {/* Submit button */}
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>

    </Grid>
  );
};

export default Register;
