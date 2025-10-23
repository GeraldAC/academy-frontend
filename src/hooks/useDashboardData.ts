// src/hooks/useDashboardData.ts
import { useState, useEffect } from 'react';
import { dashboardService } from '../services/api/dashboardService';

export const useAdminDashboard = () => {
  const [data, setData] = useState({
    stats: null,
    enrollmentTrend: [],
    coursesDistribution: [],
    topCourses: [],
    recentActivities: [],
    revenueData: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [stats, enrollmentTrend, coursesDistribution, topCourses, recentActivities, revenueData] = await Promise.all([
          dashboardService.admin.getStats(),
          dashboardService.admin.getEnrollmentTrend(),
          dashboardService.admin.getCoursesDistribution(),
          dashboardService.admin.getTopCourses(),
          dashboardService.admin.getRecentActivities(),
          dashboardService.admin.getRevenueData()
        ]);

        setData({
          stats,
          enrollmentTrend,
          coursesDistribution,
          topCourses,
          recentActivities,
          revenueData
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useTeacherDashboard = (teacherId: string) => {
  const [data, setData] = useState({
    stats: null,
    courses: [],
    engagement: [],
    submissions: [],
    upcomingClasses: [],
    messages: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!teacherId) return;

      try {
        setLoading(true);
        const [stats, courses, engagement, submissions, upcomingClasses, messages] = await Promise.all([
          dashboardService.teacher.getStats(teacherId),
          dashboardService.teacher.getCourses(teacherId),
          dashboardService.teacher.getEngagement(teacherId),
          dashboardService.teacher.getSubmissions(teacherId),
          dashboardService.teacher.getUpcomingClasses(teacherId),
          dashboardService.teacher.getMessages(teacherId)
        ]);

        setData({
          stats,
          courses,
          engagement,
          submissions,
          upcomingClasses,
          messages
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherId]);

  return { data, loading, error };
};

export const useStudentDashboard = (studentId: string) => {
  const [data, setData] = useState({
    stats: null,
    courses: [],
    progressData: [],
    assignments: [],
    grades: [],
    achievements: [],
    recentActivity: [],
    skillsData: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!studentId) return;

      try {
        setLoading(true);
        const [stats, courses, progressData, assignments, grades, achievements, recentActivity, skillsData] = await Promise.all([
          dashboardService.student.getStats(studentId),
          dashboardService.student.getCourses(studentId),
          dashboardService.student.getProgressData(studentId),
          dashboardService.student.getAssignments(studentId),
          dashboardService.student.getGrades(studentId),
          dashboardService.student.getAchievements(studentId),
          dashboardService.student.getRecentActivity(studentId),
          dashboardService.student.getSkillsData(studentId)
        ]);

        setData({
          stats,
          courses,
          progressData,
          assignments,
          grades,
          achievements,
          recentActivity,
          skillsData
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  return { data, loading, error };
};