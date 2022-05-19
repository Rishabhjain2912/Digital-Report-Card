import { useState, useEffect } from "react";
import * as React from 'react';
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

const T_dashboard = (props) => {

    let navigate = useNavigate();
    const auth_token = localStorage.getItem("token");

    const [details, setDetails] = useState([]);
    var screen_width = window.innerWidth;

    useEffect(() => {

        if (auth_token == null) {
            navigate("/")
        }

        const token = {
            authToken: auth_token,
        }

        axios
            .post("http://localhost:4000/grade/getteacherexamsls", token)
            .then((response) => {
                setDetails(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    const columns = [
        {
            field: 'Subject',
            headerName: 'Topic',
            headerAlign: 'center',
            type: 'string',
            width: screen_width / 6,
            // pin this column
            // only available in paid version
            align: 'center',
        },
        {
            field: 'Class',
            headerName: 'Class',
            headerAlign: 'center',
            type: 'string',
            width: screen_width / 6,
            align: 'center',
        },
        {
            field: 'Section',
            headerName: 'Section',
            headerAlign: 'center',
            type: 'string',
            width: screen_width / 7,
            align: 'center',
        },
        {
            field: 'Number',
            headerName: 'Exam Number',
            type: 'string',
            headerAlign: 'center',
            width: screen_width / 7,
            align: 'center',
        },
        {
            field: 'Total_Marks',
            headerName: 'Grade',
            type: 'string',
            align: 'center',
            headerAlign: 'center',
            width: screen_width / 6,
        },
        {
            field: 'Actions',
            align: 'center',
            headerAlign: 'center',
            headerName: 'Actions',
            width: screen_width / 6,

            renderCell: (params) => {

                const onGrade = (e) => {

                    e.stopPropagation(); // don't select this row after clicking

                    localStorage.setItem("exam_id", details[params.id]._id);
                    console.log(params.id)
                    navigate("/T_lsgrades");
                };

                const onDelete = (e) => {

                    e.stopPropagation(); // don't select this row after clicking

                    const data = {
                        authToken: auth_token,
                        exam_id: details[params.id]._id
                    }
                    axios.post("http://localhost:4000/grade/deleteexam", data)
                        .then(response => {
                            console.log(response.data);
                        });

                    setDetails(details.filter(el => el._id !== details[params.id]._id));

                };

                return (
                    <>
                        <Button
                            onClick={onGrade}
                            style={{
                                backgroundColor: "#00bcd4",
                                color: "white",
                                margin: "5px 5px",
                                width: "70%",
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
                            GRADES
                        </Button>
                        <Button
                            onClick={onDelete}
                            style={{
                                backgroundColor: "#ff5722",
                                color: "white",
                                margin: "5px 5px",
                                width: "70%",
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
                            DELETE
                        </Button>
                    </>
                );
            }
        }
    ];

    var rows;
    if (details != null) {

        rows = details.map((item, index) => {

            if (item.curr_class[0] === "0") {
                if (item.curr_class[2] === "1") {
                    item.curr_class = "Nursery";
                }
                else if (item.curr_class[2] === "2") {
                    item.curr_class = "Junior KG";
                }
                else if (item.curr_class[2] === "3") {
                    item.curr_class = "Senior KG";
                }
            }
            else if (item.curr_class[0] === "1") {
                item.curr_class = item.curr_class[1] + item.curr_class[2];
            }

            if (item.type === "fa") {
                item.type = "FA";
            }
            else if (item.type === "sa") {
                item.type = "SA";
            }
            else if (item.type === "ls") {
                item.type = "Life Skill";
            }

            // please put this in a dictionary and use it ffs
            if (item.curr_subject === "1") {
                item.curr_subject = "English";
            }
            else if (item.curr_subject === "2") {
                item.curr_subject = "Hindi";
            }
            else if (item.curr_subject === "3") {
                item.curr_subject = "Maths";
            }
            else if (item.curr_subject === "4") {
                item.curr_subject = "Science";
            }
            else if (item.curr_subject === "5") {
                item.curr_subject = "Social Studies";
            }
            else if (item.curr_subject === "6") {
                item.curr_subject = "Comminucation Skills";
            }
            else if (item.curr_subject === "7") {
                item.curr_subject = "Participation";
            }
            else if (item.curr_subject === "8") {
                item.curr_subject = "Decision Making";
            }

            const newdata = {
                id: index,
                exam_id: item._id,
                Subject: item.curr_subject,
                Section: item.curr_section,
                Class: item.curr_class,
                Type: item.type,
                no_of_questions: item.no_of_questions,
                Number: item.number,
                Total_Marks: item.total_marks,
            }

            return newdata;
        });
    }

    return (
        <div>

            <Box
                display="flex"
                justifyContent="center"
            >
                <h1>Life Skill Details</h1>
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

        </div>
    );
};

export default T_dashboard;
