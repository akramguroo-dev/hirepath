const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "employer", "admin"],
      default: "student",
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      required: false,
    },
    college: {
      type: String,
      required: false,
    },
    skills: {
      type: [String],
      default: [],
    },
    education: {
      type: [
        {
          degree: String,
          school: String,
          year: String,
        },
      ],
    },
    resume: {
      type: String,
      required: false,
    },
    internships: {
      type: Array,
      default: [],
    },
    jobs: {
      type: Array,
      default: [],
    },
    projects: {
      type: Array,
      default: [],
    },
    accomplishments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
