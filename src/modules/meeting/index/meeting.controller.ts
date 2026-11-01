
import { Request, Response } from "express";
import * as meetingService from "../service/meeting.service";

// CREATE MEETING
export const createMeetingController = async (
  req: Request,
  res: Response
) => {
  try {
    const meeting = await meetingService.createMeeting(req.body);

    return res.status(201).json({
      success: true,
      message: "Meeting created successfully",
      data: meeting
    });
  } catch (error: any) {
    const status =
      error.message === "User not found" ? 404 :
      error.message.includes("already has a meeting") ? 409 : 400;

    return res.status(status).json({
      success: false,
      message: error.message
    });
  }
};

// GET MEETING BY ID
export const getMeetingController = async (
  req: Request,
  res: Response
) => {
  try {
    const meeting = await meetingService.getMeetingById(
      Number(req.params.id)
    );

    return res.status(200).json({
      success: true,
      data: meeting
    });
  } catch (error: any) {
    return res.status(
      error.message === "Meeting not found" ? 404 : 500
    ).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL MEETINGS
export const getAllMeetingsController = async (
  req: Request,
  res: Response
) => {
  try {
    const filters = {
      userId: req.query.userId
        ? Number(req.query.userId)
        : undefined,
      startDate: req.query.startDate
        ? String(req.query.startDate)
        : undefined,
      endDate: req.query.endDate
        ? String(req.query.endDate)
        : undefined
    };

    const meetings = await meetingService.getAllMeetings(filters);

    return res.status(200).json({
      success: true,
      count: meetings.length,
      data: meetings
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE MEETING
export const updateMeetingController = async (
  req: Request,
  res: Response
) => {
  try {
    const meeting = await meetingService.updateMeeting(
      Number(req.params.id),
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Meeting updated successfully",
      data: meeting
    });
  } catch (error: any) {
    const status =
      error.message === "Meeting not found" ? 404 :
      error.message === "User not found" ? 404 :
      error.message.includes("already has a meeting") ? 409 : 400;

    return res.status(status).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE MEETING
export const deleteMeetingController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await meetingService.deleteMeeting(
      Number(req.params.id)
    );

    return res.status(200).json({
      success: true,
      ...result
    });
  } catch (error: any) {
    return res.status(
      error.message === "Meeting not found" ? 404 : 500
    ).json({
      success: false,
      message: error.message
    });
  }
};
