var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt")
var jwt = require("jsonwebtoken")

// Load the required models
const Exam = require("../models/Exams");
const Student = require("../models/Students");
const Teacher = require("../models/Teachers");
const Studentscore = require("../models/Studentscores");

// Load the middleware function
var fetchuser = require("../middleware/Fetchuser");

// GET request 
// Getting all the Exams
// Just for the service purposes
router.get("/exams", (req, res) => {
    Exam.find((err, exams) => {
        if (err) {
            res.send(err);
        } else {
            res.json(exams);
        }
    })
});

// GET request 
// Getting all the Studentscores
// Just for the service purposes
router.get("/studentscores", (req, res) => {
    Studentscore.find((err, exams) => {
        if (err) {
            res.send(err);
        } else {
            res.json(exams);
        }
    })
});

// POST request
// Login required
// API endpoint for adding an exam
router.post("/addexam", fetchuser, async (req, res) => {

    try {

        if (req.user.type == "teacher") {

            user_id = req.user.user_id;
            newExam = await Exam.create({
                type: req.body.type,
                teacher__id: user_id,
                number: req.body.number,
                marks_arr: req.body.marks_arr,
                curr_class: req.body.curr_class,
                chapter_arr: req.body.chapter_arr,
                total_marks: req.body.total_marks,
                curr_section: req.body.curr_section,
                curr_subject: req.body.curr_subject,
                questions_arr: req.body.questions_arr,
                toughness_arr: req.body.toughness_arr,
                no_of_questions: req.body.no_of_questions
            });

            res.send("Done!");

        } else {
            return res.status(401).send("Access denied!");
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }
});

// GET request
// Login required
// Getting exams with given class, section, subject, number
router.get("/getexam", fetchuser, async (req, res) => {

    try {

        let exam = await Exam.find({
            curr_class: req.body.curr_class,
            curr_section: req.body.curr_section,
            curr_subject: req.body.curr_subject,
            number: req.body.number
        });
        res.json(exam)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }
})

// GET request
// Login required
// Getting all the exams of a teacher
router.post("/getteacherexamsex", fetchuser, async (req, res) => {

    try {

        if (req.user.type == "teacher") {

            teacher_id = req.user.user_id;

            let exams = await Exam.find({
                $or:
                    [{ teacher__id: teacher_id, type: "fa" },
                    { teacher__id: teacher_id, type: "sa" }]
            });
            res.json(exams)

        } else {
            return res.status(401).send("Access denied!");
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }
});

// GET request
// Login required
// Getting all the Life Skills of a teacher
router.post("/getteacherexamsls", fetchuser, async (req, res) => {

    try {

        if (req.user.type == "teacher") {

            teacher_id = req.user.user_id;

            let exams = await Exam.find({
                teacher__id: teacher_id,
                type: "ls"
            });
            res.json(exams)

        } else {
            return res.status(401).send("Access denied!");
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }
});

// POST request
// Login required
// Get exam by exam_id
router.post("/getexambyid", fetchuser, async (req, res) => {

    try {
        let exam = await Exam.findById(req.body.exam_id);
        res.json(exam)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }
});

// POST request
// Login required
// Delete exam by exam_id
router.post("/deleteexam", fetchuser, async (req, res) => {

    try {

        if (req.user.type === "teacher") {

            let exam = await Exam.findByIdAndDelete(req.body.exam_id);
            res.send("Deleted!")

            let grades = Studentscore.find({ exam__id: req.body.exam_id }).remove().exec();

        } else {
            return res.status(401).send("Access denied!");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }
});

// POST request
// Login required
// API endpoint for adding a grade
router.post("/addstudentgrade", fetchuser, async (req, res) => {

    try {

        if (req.user.type == "teacher") {

            user_id = req.user.user_id;

            let grade = await Studentscore.create({
                teacher__id: user_id,
                grade: req.body.grade,
                present: req.body.present,
                exam__id: req.body.exam_id,
                marks_arr: req.body.marks_arr,
                exam_type: req.body.exam_type,
                student__id: req.body.student_id,
            });

            console.log(grade)
            res.send("Done!")

        } else {
            return res.status(401).send("Access denied!");
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }
});

// POST request
// Login required
// Getting all scores of a student
router.post("/getstudentgrades", fetchuser, async (req, res) => {

    try {
        if (req.user.type === "student") {

            student_id = req.user.user_id;

            let grades = await Studentscore.find({
                student__id: student_id
            });
            res.json(grades)

        } else {
            return res.status(401).send("Access denied!");
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }
});

// POST request
// Login required
// Getting all entries for an exam from Studentscore table
router.post("/getexamgrades", fetchuser, async (req, res) => {

    try {
        let grades = await Studentscore.find({
            exam__id: req.body.exam_id
        });
        res.json(grades)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }

});

// POST request
// Login required
// Getting all students with an exam
router.post("/getstudentbyexamid", fetchuser, async (req, res) => {

    try {
        if (req.user.type === "teacher") {

            exam_id = req.body.exam_id;

            let student_ids = await Studentscore.find({
                exam__id: exam_id
            }).select("student__id");
            console.log(student_ids)

            var students = [];
            for (let i = 0; student_ids[i] != null; i++) {
                let temp = await Student.findById(student_ids[i].student__id).select("name + curr_class + section");
                students.push(temp);
            }
            res.json(students)
            console.log(students)

        } else {
            return res.status(401).send("Access denied!");
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }
});

// POST request
// Login required
// Getting all students with a class, section
router.post("/getstudentbyclasssection", fetchuser, async (req, res) => {

    try {
        if (req.user.type === "teacher") {

            exam_id = req.body.exam_id;
            let exam = await Exam.findById(exam_id);

            console.log(exam_id);

            let student = await Student.find({
                curr_class: exam.curr_class,
                section: exam.curr_section
            }).select("name + curr_class + section");

            console.log(student);
            res.json(student)

        } else {
            return res.status(401).send("Access denied!");
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }
});

// POST request
// Login required
// Getting all exams with a student_id, subject
router.post("/getexamsbysubject", fetchuser, async (req, res) => {

    try {
        if (req.user.type === "student") {

            user_id = req.user.user_id;

            let exam_ids = await Studentscore.find({
                student__id: user_id
            }).select("exam__id");

            // console.log(exam_ids);

            var exams = [];
            for (let i = 0; exam_ids[i] != null; i++) {
                let temp = await Exam.find({
                    curr_subject: req.body.subject,
                    _id: exam_ids[i]._id
                });
                exams.push(temp);
            }
            // console.log(exams);

            res.json(exams)

        } else {
            return res.status(401).send("Access denied!");
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }
});

// GET request
// Login required
// Getting all the grades of a student by subject
router.post("/getgradesbysubject", fetchuser, async (req, res) => {

    try {
        if (req.user.type === "student") {

            user_id = req.user.user_id;

            let exams = await Exam.find({
                curr_subject: req.body.subject,
            })

            console.log(exams);

            var grades = [];
            for (let i = 0; exams[i] != null; i++) {
                let temp = await Studentscore.findOne({
                    student__id: user_id,
                    exam__id: exams[i]._id
                });
                if (temp) {
                    grades.push(temp);
                }
            }
            console.log(grades);

            res.json(grades)

        } else {
            return res.status(401).send("Access denied!");
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred!");
    }
});

module.exports = router;
