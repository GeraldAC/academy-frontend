// src/features/attendance/types/types.ts

export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  classDate: string;
  present: boolean;
  notes: string | null;
  recordedBy: string | null;
  createdAt: string;
  updatedAt: string;
  student?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dni: string;
  };
  course?: {
    id: string;
    name: string;
    subject: string;
  };
}

export interface AttendanceStats {
  totalClasses: number;
  presentClasses: number;
  absentClasses: number;
  attendanceRate: number;
}

export interface StudentAttendanceRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dni: string;
  attendanceId?: string;
  present: boolean | null;
  notes?: string | null;
}

// DTOs
export interface RegisterAttendanceDto {
  courseId: string;
  classDate: string;
  attendances: {
    studentId: string;
    present: boolean;
    notes?: string;
  }[];
}

export interface AttendanceReportQuery {
  studentId?: string;
  courseId?: string;
  startDate?: string;
  endDate?: string;
}

export interface AttendanceReportData {
  attendances: Attendance[];
  stats: AttendanceStats;
}
