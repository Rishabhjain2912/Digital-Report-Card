import { useState, useEffect } from "react";
import * as React from 'react';
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

const T_grades = (props) => {

    let navigate = useNavigate();
    const auth_token = localStorage.getItem("token");
    const exam_id = localStorage.getItem("exam_id");

    const [examdetails, setExamdetails] = useState([]);
    const [studentdetails, setStudentdetails] = useState([]);

    var screen_width = window.innerWidth;

    useEffect(() => {

        const auth_token = localStorage.getItem("token");
        const exam_id = localStorage.getItem("exam_id");

        if (auth_token == null) {
            navigate("/")
        }

        const data = {
            authToken: auth_token,
            exam_id: exam_id
        }

        axios
            .post("http://localhost:4000/grade/getstudentbyexamid", data)
            .then((response) => {
                setStudentdetails(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios
            .post("http://localhost:4000/grade/getexamgrades", data)
            .then((response) => {
                setExamdetails(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const onGrade = (e) => {

        e.preventDefault();
        navigate("/T_addgrades");

    };

    const columns = [
        {
            field: 'name',
            headerName: 'name',
            headerAlign: 'center',
            type: 'string',
            width: screen_width / 5.2,
            // pin this column
            // only available in paid version
            align: 'center',
        },
        {
            field: 'curr_class',
            headerName: 'Class',
            headerAlign: 'center',
            type: 'string',
            width: screen_width / 5.2,
            align: 'center',
        },
        {
            field: 'section',
            headerName: 'Section',
            headerAlign: 'center',
            type: 'string',
            align: 'center',
            width: screen_width / 5.2,
        },
        {
            field: 'present',
            headerName: 'Present',
            type: 'string',
            headerAlign: 'center',
            width: screen_width / 5.2,
            align: 'center',
        },
        {
            field: 'grade',
            headerName: 'Grade',
            type: 'string',
            headerAlign: 'center',
            align: 'center',
            width: screen_width / 5.2,
        }
    ];

    var rows;
    if (examdetails && studentdetails) {

        const new_arr = studentdetails.map(student => {

            if (student.curr_class[0] === "0") {
                if (student.curr_class[2] === "1") {
                    student.curr_class = "Nursery";
                }
                else if (student.curr_class[2] === "2") {
                    student.curr_class = "Junior KG";
                }
                else if (student.curr_class[2] === "3") {
                    student.curr_class = "Senior KG";
                }
            }
            else if (student.curr_class[0] === "1") {
                student.curr_class = student.curr_class[1] + student.curr_class[2];
            }

            return {
                _id: student._id,
                name: student.name,
                curr_class: student.curr_class,
                section: student.section,
                grade: examdetails.find(element => element.student__id === student._id).grade,
                present: examdetails.find(element => element.student__id === student._id).present
            }
        })

        rows = new_arr.map((student, index) => {
            return {
                id: index,
                name: student.name,
                curr_class: student.curr_class,
                section: student.section,
                present: student.present,
                grade: student.grade
            }
        })
    }

    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
            >
                <h1>Grades</h1>
            </Box>

            <div style={{ height: 400, width: '100%' }}>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </div>
            <br></br>
            <div align="center">
            <Button
                onClick={onGrade}
                style={{
                    backgroundColor: "#00bcd4",
                    color: "white",
                    margin: "5px 5px",
                    width: "50px%",
                    height: "70%",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "none",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    padding: "10px",
                }}
            >
                ADD GRADES
            </Button>
            </div>
        </>
    );
}

export default T_grades;
