const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const applicationController = require("../controllers/applicationController");
const roleCheck = require("../middleware/roleCheck");

const router = express.Router();

router.post("/", authMiddleware, roleCheck(["student"]), applicationController.applyToJob);

router.get("/student", authMiddleware, applicationController.getMyApplications);

router.get(
  "/job/:jobId",
  authMiddleware,
  roleCheck(["employer"]),
  applicationController.getJobApplications,
);

router.patch(
  "/:id/status",
  authMiddleware,
  roleCheck(["employer"]),
  applicationController.updateApplicationStatus,
);
module.exports = router;
