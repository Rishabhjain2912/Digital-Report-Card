const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-email');

// Create Schema
const TeacherSchema = new Schema({
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
		required: true
	},
	classes_arr: {
		type: [String],
		required: false
	},
	teacher_id: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

module.exports = Teacher = mongoose.model("Teachers", TeacherSchema);
