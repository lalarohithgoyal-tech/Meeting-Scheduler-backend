import Meeting from "../module/meeting.model";
import User from "../../user/model/user.model";
import { Op } from "sequelize";

// CREATE MEETING
export const createMeeting = async (data: {
  title: string;
  startTime: string;
  endTime: string;
  userId: number;
}) => {
  const startTime = new Date(data.startTime);
  const endTime = new Date(data.endTime);

  // Validate date range
  if (
    Number.isNaN(startTime.getTime()) ||
    Number.isNaN(endTime.getTime()) ||
    startTime >= endTime
  ) {
    throw new Error("Invalid meeting time. Start time must be before end time");
  }

  // Check if user exists
  const user = await User.findByPk(data.userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Check overlapping meetings
  const overlappingMeeting = await Meeting.findOne({
    where: {
      userId: data.userId,
      startTime: { [Op.lt]: endTime },
      endTime: { [Op.gt]: startTime }
    }
  });

  if (overlappingMeeting) {
    throw new Error("This user already has a meeting during this time");
  }

  return await Meeting.create({
    title: data.title,
    startTime,
    endTime,
    userId: data.userId
  });
};


// GET MEETING BY ID
export const getMeetingById = async (id: number) => {
  const meeting = await Meeting.findByPk(id);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  return meeting;
};


// GET ALL MEETINGS WITH OPTIONAL FILTERS
export const getAllMeetings = async (filters: {
  userId?: number | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
}) => {
  const where: any = {};

  if (filters.userId) {
    where.userId = filters.userId;
  }

  if (filters.startDate || filters.endDate) {
    where.startTime = {};

    if (filters.startDate) {
      where.startTime[Op.gte] = new Date(filters.startDate);
    }

    if (filters.endDate) {
      where.startTime[Op.lte] = new Date(filters.endDate);
    }
  }

  return await Meeting.findAll({
    where,
    order: [["startTime", "ASC"]]
  });
};


// UPDATE MEETING
export const updateMeeting = async (
  id: number,
  data: {
    title?: string;
    startTime?: string;
    endTime?: string;
    userId?: number;
  }
) => {
  const meeting = await Meeting.findByPk(id);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  const startTime = data.startTime
    ? new Date(data.startTime)
    : meeting.startTime;

  const endTime = data.endTime
    ? new Date(data.endTime)
    : meeting.endTime;

  const userId = data.userId ?? meeting.userId;

  // Validate time range
  if (
    Number.isNaN(startTime.getTime()) ||
    Number.isNaN(endTime.getTime()) ||
    startTime >= endTime
  ) {
    throw new Error("Start time must be before end time");
  }

  // Check if the new user exists
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Check overlapping meetings, excluding current meeting
  const overlappingMeeting = await Meeting.findOne({
    where: {
      id: { [Op.ne]: id },
      userId,
      startTime: { [Op.lt]: endTime },
      endTime: { [Op.gt]: startTime }
    }
  });

  if (overlappingMeeting) {
    throw new Error("This user already has a meeting during this time");
  }

  await meeting.update({
    title: data.title ?? meeting.title,
    startTime,
    endTime,
    userId
  });

  return meeting;
};


// DELETE MEETING
export const deleteMeeting = async (id: number) => {
  const meeting = await Meeting.findByPk(id);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  await meeting.destroy();

  return { message: "Meeting deleted successfully" };
};
