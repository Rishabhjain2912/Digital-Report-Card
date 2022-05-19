var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt")
var jwt = require("jsonwebtoken")

// Load Student and Teacher model
const Student = require("../models/Students");
const Teacher = require("../models/Teachers");
const Studentscore = require("../models/Studentscores");
const Exam = require("../models/Exams");

// Load the middleware function
var fetchuser = require("../middleware/Fetchuser");

// GET request 
// Getting all the Students
// Just for the service purposes
router.get("/students", (req, res) => {
    Student.find((err, students) => {
        if (err) {
            res.send(err);
        } else {
            res.json(students);
        }
    })
});

// GET request 
// Getting all the Teachers
// Just for the service purposes
router.get("/teachers", (req, res) => {
    Teacher.find((err, teachers) => {
        if (err) {
            res.send(err);
        } else {
            res.json(teachers);
        }
    })
});

// POST request 
// API endpoint for registration
router.post("/register", async (req, res) => {

    try {

        const contact = req.body.contact;

        let student = await Student.findOne({ contact });
        let teacher = await Teacher.findOne({ contact });

        if (student || teacher) {
            return res.send("This Phone Number already taken!");
        }

        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(req.body.password, salt);

        if (req.body.type === "student") {

            newStudent = await Student.create({
                type: req.body.type,
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                section: req.body.section,
                password: hashed_password,
                student_id: req.body.student_id,
                curr_class: req.body.curr_class
            });
        }

        if (req.body.type === "teacher") {

            newTeacher = await Teacher.create({
                type: req.body.type,
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                password: hashed_password,
                teacher_id: req.body.teacher_id,
                classes_arr: req.body.classes_arr
            });
        }

        return res.send("Registration Successful!");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }
});

// POST request 
// API endpoint for login
router.post("/login", async (req, res) => {

    try {

        const contact = await req.body.contact;
        const password = await req.body.password;

        let student = await Student.findOne({ contact });
        let teacher = await Teacher.findOne({ contact });

        if (!student && !teacher) {
            return res.status(400).json({ error: "Please enter valid credentials!" });
        }

        if (student) {
            const compare_password = await bcrypt.compare(password, student.password);
            if (!compare_password) {
                return res.status(400).json({ error: "Please enter valid credentials!" });
            }
            const data = {
                user_id: student._id,
                type: student.type
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET);
            res.json({ authToken });
        }
        if (teacher) {
            console.log(teacher)
            const compare_password = await bcrypt.compare(password, teacher.password);
            if (!compare_password) {
                return res.status(400).json({ error: "Please enter valid credentials!" });
            }
            const data = {
                user_id: teacher._id,
                type: teacher.type
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET);
            res.json({ authToken });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }
});

// POST request
// Login required
// Get the loggedin user's details
router.post("/getuser", fetchuser, async (req, res) => {

    try {
        user_id = req.user.user_id;
        user_type = req.user.type;

        if (user_type == "student") {
            const student = await Student.findById(user_id).select("-password")
            res.send(student)
        }
        if (user_type == "teacher") {
            const teacher = await Teacher.findById(user_id).select("-password")
            res.send(teacher)
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// POST request
// Login required
// get student details by id
router.post("/getstudentbyid", fetchuser, async (req, res) => {

    try {
        user_id = req.body.user_id;
        user_type = req.body.type;

        if (user_type == "teacher") {
            const student = await Student.findById(user_id).select("name");
            res.send(student);
        } else {
            return res.status(401).send("Access denied!");
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// POST request
// Login required
// Getting students with given class, section
router.post("/getstudentbydetails", fetchuser, async (req, res) => {
    
    try {

        let student = await Student.find({
            curr_class: req.body.curr_class,
            section: req.body.section,
            name: req.body.name
        });
        // res.json(student)

        // get user_id from token
        let user_id = req.user.user_id;
        
        // check if student exists
        if (student) {
            // add student grade to Grade collection
            
            // store student id
            let student_id = student[0]._id;

            // check if an entry with the same student id, teacher id and exam id exists
            let score_exists = await Studentscore.findOne({
                student_id: student._id,
                teacher_id: user_id,
                exam_id: req.body.exam_id
            });

            // get exam details from Exam collection
            let exam = await Exam.findById(req.body.exam_id);
            let exam_type = exam.type;

            if (score_exists) {
                return res.send("Student already exists!");
            }
            else
            {
                // let newGrade = {
                //     teacher__id: user_id,
                //     student__id: student_id,
                //     grade: req.body.grade,
                //     present: req.body.present,
                //     exam__id: req.body.exam_id,
                //     exam_type: exam_type
                // }
                // console.log(student_id);
                // console.log(newGrade);

                // add student grade to Grade collection
                newGrade = await Studentscore.create({
                    teacher__id: user_id,
                    student__id: student_id,
                    grade: req.body.grade,
                    present: req.body.present,
                    exam__id: req.body.exam_id,
                    exam_type: exam_type
                });
                res.send("Student added!");
            }
        }
        

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }
})

// POST request
// Login required
// Updating user details
router.post("/update", fetchuser, async (req, res) => {

    try {

        user_id = req.user.user_id;
        user_type = req.user.type;

        const contact = req.body.contact;

        let student = await Student.findById(user_id);
        let teacher = await Teacher.findById(user_id);

        if (user_type === "student") {

            student.name = req.body.name;
            student.email = req.body.email;
            student.contact = req.body.contact;
            student.section = req.body.section;
            student.curr_class = req.body.curr_class;
            student.student_id = req.body.student_id;

            student.save();
        }

        if (user_type === "teacher") {

            teacher.name = req.body.name;
            teacher.email = req.body.email;
            teacher.contact = req.body.contact;
            teacher.teacher_id = req.body.teacher_id;

            teacher.save();
        }

        return res.send("Updated Successfully!");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }
});

// POST request 
// Login required 
// API endpoint for registration
router.post("/addclass", fetchuser, async (req, res) => {

    try {

        user_id = req.user.user_id;
        user_type = req.user.type;

        const contact = req.body.contact;


        if (user_type === "teacher") {

            let teacher = await Teacher.findById(user_id);
            teacher.classes_arr.push(req.body.curr_class + req.body.section + req.body.subject);
            teacher.save();

            return res.send("Updated Successfully!");

        } else {
            return res.status(401).send("Access denied!");
        }


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }
});

module.exports = router;
