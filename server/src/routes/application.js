const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const applicationController = require("../controllers/applicationController");

const router = express.Router();

router.post("/", authMiddleware, applicationController.applyToJob);

router.get("/student", authMiddleware, applicationController.getMyApplications);

router.get(
  "/job/:jobId",
  authMiddleware,
  applicationController.getJobApplications,
);

router.patch('/:id/status', authMiddleware, applicationController.updateApplicationStatus);
module.exports = router;
