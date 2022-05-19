import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";

const Profile = (props) => {

  let navigate = useNavigate();
  const auth_token = localStorage.getItem("token");

  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [section, setSection] = useState("");
  const [contact, setContact] = useState("");
  const [curr_class, setCurr_class] = useState("");
  const [student_id, setStudent_id] = useState("");
  const [teacher_id, setTeacher_id] = useState("");
  const [classes_arr, setClasses_arr] = useState("");

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangeSection = (event) => {
    setSection(event.target.value);
  };

  const onChangeCurr_class = (event) => {
    setCurr_class(event.target.value);
  };

  const onChangeStudent_id = (event) => {
    setStudent_id(event.target.value);
  };

  const onChangeTeacher_id = (event) => {
    setTeacher_id(event.target.value);
  };

  useEffect(() => {

    const auth_token = localStorage.getItem("token");

    if (auth_token == null) {
      navigate("/")
    }

    const token = {
      authToken: auth_token
    }

    axios
      .post("http://localhost:4000/user/getuser", token)
      .then((response) => {
        if (response.data.type === "student") {
          setId(response.data._id);
          setType(response.data.type);
          setName(response.data.name);
          setEmail(response.data.email);
          setSection(response.data.section);
          setContact(response.data.contact);
          setStudent_id(response.data.student_id);
          setCurr_class(response.data.curr_class);
        }
        if (response.data.type === "teacher") {
          setId(response.data._id);
          setType(response.data.type);
          setName(response.data.name);
          setEmail(response.data.email);
          setContact(response.data.contact);
          setTeacher_id(response.data.teacher_id);
          setClasses_arr(response.data.classes_arr);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      authToken: auth_token,
      id: id,
      type: type,
      name: name,
      email: email,
      contact: contact,
      section: section,
      curr_class: curr_class,
      student_id: student_id,
      teacher_id: teacher_id,
      classes_arr: classes_arr
    };

    axios
      .post("http://localhost:4000/user/update/", newUser)
      .then((response) => {
        console.log("Updated! " + response.data.name)
        console.log(response.data);
      })
      .catch(err => { console.log(err); })
  };

  return (
    <div>
      <br />
      <br />
      <Grid container align={"center"} spacing={2}>
        {type === "student" &&
          <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Student's Name"
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
                label="Phone Number"
                variant="outlined"
                value={contact}
                onChange={onChangeContact}
              />
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
          </Grid>
        }
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
                label="Phone Number"
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
          </Grid>
        }
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmit}>
            Update
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
