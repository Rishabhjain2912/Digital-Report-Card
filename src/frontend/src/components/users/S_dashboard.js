import * as React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { PieChart } from 'react-minimal-pie-chart'

var screen_width = window.innerWidth;

const columns = [
  {
    field: 'Subject',
    headerName: 'Subject',
    headerAlign: 'center',
    width: screen_width / 7.2,
    align: 'center',
    //pin this column
    pinned: true,

  },
  {
    field: 'FA1',
    headerName: 'FA1',
    headerAlign: 'center',
    width: screen_width / 7.2,
    align: 'center',
    // editable: true,  
  },
  {
    field: 'FA2',
    headerName: 'FA2',
    type: 'string',
    headerAlign: 'center',
    align: 'center',
    width: screen_width / 7.2,
    // editable: true,
  },
  {
    field: 'SA1',
    headerName: 'SA1',
    type: 'string',
    width: screen_width / 7.2,
    headerAlign: 'center',
    align: 'center',
    // editable: true,
  },
  {
    field: 'FA3',
    headerName: 'FA3',
    headerAlign: 'center',
    type: 'string',
    width: screen_width / 7.2,
    align: 'center',
    // editable: true,
  },
  {
    field: 'FA4',
    headerName: 'FA4',
    headerAlign: 'center',
    type: 'string',
    align: 'center',
    width: screen_width / 7.2,
    // editable: true,
  },
  {
    field: 'SA2',
    headerAlign: 'center',
    headerName: 'SA2',
    type: 'string',
    align: 'center',
    width: screen_width / 7.2,
    // editable: true,
  }
];

var rows;
let examDetails = [];
let final_details = [];

const S_dashboard = (props) => {

  let navigate = useNavigate();
  const auth_token = localStorage.getItem("token")
  
  const [details, setDetails] = useState([]);
  const [rows, setRows] = useState([]);
  // const [examDetails, setExamDetails] = useState([]);

  useEffect(async() => {

    let details;

    if (auth_token == null) {
      navigate("/")
    }

    const token = {
      authToken: auth_token
    }

    let response = await axios.post("http://localhost:4000/grade/getstudentgrades", token)
    setDetails(response.data);
    details = response.data;
    // console.log(details);
    if (details != null && examDetails.length == 0) {
      // get the exam details from the exam_id
      // loop through all details
      // console.log("details");
      for (var i = 0; i < details.length; i++) {
        // console.log(i);
        let response = await axios.post("http://localhost:4000/grade/getexambyid", {
          authToken: auth_token,
          exam_id: details[i].exam__id
        })
        examDetails.push(response.data);
      }
  
      
      // make a final_details dict which stores the grade and exam type from details and subject and number from examDetails
      for(var i = 0; i < details.length; i++) {
        let temp = {
          "grade": details[i].grade,
          "exam_type": details[i].exam_type,
          "subject": examDetails[i].curr_subject,
          "number": examDetails[i].number 
        }
        final_details.push(temp);
      }
      
    }
    // console.log(examDetails);
    console.log(final_details);
    let subject = [];
    // find all the entries in final_details with same subject
    subject[0] = final_details.filter(function (entry) {
      return entry.subject == "1";
    });
    // sort subject1 by number
    subject[0].sort(function (a, b) {
      return a.number - b.number;
    });
    subject[1] = final_details.filter(function (entry) {
      return entry.subject == "2";
    });
    // sort subject2 by number
    subject[1].sort(function (a, b) {
      return a.number - b.number;
    });
    subject[2] = final_details.filter(function (entry) {
      return entry.subject == "3";
    }
    );
    // sort subject3 by number
    subject[2].sort(function (a, b) {
      return a.number - b.number;
    });
    subject[3] = final_details.filter(function (entry) {
      return entry.subject == "4";
    }
    );
    // sort subject4 by number
    subject[3].sort(function (a, b) {
      return a.number - b.number;
    });
    subject[4] = final_details.filter(function (entry) {
      return entry.subject == "5";
    }
    );
    // sort subject5 by number
    subject[4].sort(function (a, b) {
      return a.number - b.number;
    });
    console.log(subject);
    let rows = subject.map((item, index) => {
      let subject = index + 1;
      if (subject == 1)
      {
        subject = "English";
      }
      else if (subject == 2)
      {
        subject = "Hindi";
      }
      else if (subject == 3)
      {
        subject = "Maths";
      }
      else if (subject == 4)
      {
        subject = "Science";
      }
      else if (subject == 5)
      {
        subject = "Social Science";
      }
      return {
        id: index,
        Subject: subject,
        FA1: item[0] ? item[0].grade: "",
        FA2: item[1] ? item[1].grade: "",
        SA1: item[2] ? item[2].grade: "",
        FA3: item[3] ? item[3].grade: "",
        FA4: item[4] ? item[4].grade: "",
        SA2: item[5] ? item[5].grade: ""
      }
    })
    setRows(rows);
    // store in local storage
    localStorage.setItem("grades", JSON.stringify(rows));
    
  }, []);

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <p>Student Dashboard</p>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  );
}

export default S_dashboard;
