const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-email');

// Create Schema
const StudentscoreSchema = new Schema({
	student__id: {
		type: String,
		required: true,
	},
	exam__id: {
		type: String,
		required: true
	},
	teacher__id: {
		type: String,
		required: true
	},
	exam_type: {
		type: String,
		required: true
	},
	present: {
		type: String,
		required: true
	},
	grade: {
		type: String,
		required: false
	},
	marks_arr: {
		type: [String],
		required: false
	},
	marks_obtained: {
		type: String,
		required: false
	}
});

module.exports = Studentscore = mongoose.model("Studentscores", StudentscoreSchema);
