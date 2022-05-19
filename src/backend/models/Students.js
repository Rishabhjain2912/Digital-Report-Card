const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-email');

// Create Schema
const StudentSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: mongoose.SchemaTypes.Email,
		required: true,
		unique: true
	},
	type: {
		type: String,
		required: true
	},
	contact: {
		type: String,
		length: 10,
		required: true
	},
	curr_class: {
		type: String,
		required: true
	},
	section: {
		type: String,
		required: true
	},
	student_id: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

module.exports = Student = mongoose.model("Students", StudentSchema);
