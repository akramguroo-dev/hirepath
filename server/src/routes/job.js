const express = require("express");
const jobController = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleCheck");

const router = express.Router();

router.post("/", authMiddleware, roleCheck(["employer"]), jobController.createJob);

router.get("/", jobController.getAllJobs);

router.get("/employer", authMiddleware, roleCheck(["employer"]), jobController.getEmployerJobs);

router.get("/:id", jobController.getJobById);

router.delete("/:id", authMiddleware, roleCheck(["employer"]), jobController.deleteJobById);

router.patch("/:id", authMiddleware, roleCheck(["employer"]), jobController.updateJobById);
module.exports = router;
