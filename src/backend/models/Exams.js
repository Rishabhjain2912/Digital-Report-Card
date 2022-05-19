const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-email');

// SUBJECT CODES
/*
ENGLISH - 1
HINDI - 2
MATHEMATICS - 3
SCIENCE - 4	
SOCIAL STUDIES - 5
COMMUNICATION SKILLS - 6
PARTICIPATION - 7
DECISION MAKING - 8
*/

// Create Schema
const ExamSchema = new Schema({
	type: {
		type: String,
		required: true
	},
	teacher__id: {
		type: String,
		required: true
	},
	curr_class: {
		type: String,
		required: true
	},
	curr_section: {
		type: String,
		required: true
	},
	curr_subject: {
		type: String,
		required: true
	},
	number: {
		type: String,
		required: true
	},
	total_marks: {
		type: String,
		required: false
	},
	no_of_questions: {
		type: String,
		required: false
	},
	questions_arr: {
		type: [String],
		required: false
	},
	toughness_arr: {
		type: [String],
		required: false
	},
	chapter_arr: {
		type: [String],
		required: false
	},
	marks_arr: {
		type: [String],
		required: false
	}
});

module.exports = Exam = mongoose.model("Exams", ExamSchema);
