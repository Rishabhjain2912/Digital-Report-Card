import axios from "axios";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Navbar = () => {

  const navigate = useNavigate();

  const [type, setType] = useState("");

  useEffect(() => {

    const auth_token = localStorage.getItem("token");

    if (auth_token) {
      const token = {
        authToken: auth_token
      }
      axios
        .post("http://localhost:4000/user/getuser", token)
        .then((response) => {
          setType(response.data.type);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setType(null);
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            {...type === "student" ? { onClick: () => navigate("/S_dashboard") } : { onClick: () => navigate("/T_dashboard") }}
          >
            DASHBOARD
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* {type === "teacher" &&
            <Button color="inherit" onClick={() => navigate("/T_lifeskills")}>
              Life Skills
            </Button>} */}
          {type &&
            <Button color="inherit" onClick={() => navigate("/profile")}>
              Profile
            </Button>}
          {type === "teacher" &&
          <Button color="inherit" onClick={() => navigate("/T_addclass")}>
            Add Class
          </Button>}
          {type === "teacher" &&
          <Button color="inherit" onClick={() => navigate("/T_addexam")}>
            Add Exam
          </Button>}
          {type === "student" &&
            <Button color="inherit" onClick={() => navigate("/S_analysis")}>
              analysis
            </Button>}
            {/* {type === "student" &&
            <Button color="inherit" onClick={() => navigate("/S_gradeAnalysis")}>
              Graph
            </Button>} */}
          {type &&
            <Button color="inherit" onClick={() => navigate("/")}>
              Logout
            </Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
};


export default Navbar;
