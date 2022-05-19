import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

const Login = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
    }, []);

    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");

    const onChangeContact = (event) => {
        setContact(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const resetInputs = () => {
        setContact("");
        setPassword("");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const User = {
            contact: contact,
            password: password
        };

        // console.log(User)

        axios
            .post("http://localhost:4000/user/login", User)
            .then((response, error) => {
                console.log(response.data);
                localStorage.setItem("token", response.data.authToken);
                // navigate("/profile")\
                axios
                    .post("http://localhost:4000/user/getuser", {
                        authToken: response.data.authToken
                    })
                    .then((response) => {
                        if (response.data.type === "student") {
                            navigate("/S_dashboard");
                          }
                          if (response.data.type === "teacher") {
                            navigate("/T_dashboard");
                          }
                    })
            });
        resetInputs();
    };

    return (
        <Grid container align={"center"} spacing={2}>
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
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    Login
                </Button>
            </Grid>
        </Grid>
    );
};

export default Login;
