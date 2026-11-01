export interface CreateMeetingDTO {
  title: string;
  startTime: Date;
  endTime: Date;
  userId: number;
}

export interface UpdateMeetingDTO {
  title?: string;
  startTime?: Date;
  endTime?: Date;
  userId?: number;
}

export interface MeetingFilters {
  userId?: number;
  startDate?: Date;
  endDate?: Date;
}