const express = require("express");
const jobController = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, jobController.createJob);

router.get("/", jobController.getAllJobs);

router.get("/employer", authMiddleware, jobController.getEmployerJobs);

router.get("/:id", jobController.getJobById);

router.delete("/:id", authMiddleware, jobController.deleteJobById);

router.patch("/:id", authMiddleware, jobController.updateJobById);
module.exports = router;
