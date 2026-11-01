
import { Router } from "express";

import {
  createMeetingController,
  getMeetingController,
  getAllMeetingsController,
  updateMeetingController,
  deleteMeetingController
} from "../index/meeting.controller";

import validateDto from "../../../middlewares/validate";
import { CreateMeetingDto } from "../dto/create-meeting.dto";

const router = Router();

// Create meeting
router.post("/", validateDto(CreateMeetingDto), createMeetingController);

// Get all meetings
router.get("/", getAllMeetingsController);

// Get meeting by ID
router.get("/:id", getMeetingController);

// Update meeting
router.put("/:id", updateMeetingController);

// Delete meeting
router.delete("/:id", deleteMeetingController);

export default router;
