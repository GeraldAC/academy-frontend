// src/features/attendance/components/AttendanceStatsCard.tsx
import { CheckCircle, XCircle, BarChart3, TrendingUp } from "lucide-react";
import type { AttendanceStats } from "../types/types";

interface AttendanceStatsCardProps {
  stats: AttendanceStats;
  isLoading?: boolean;
}

export const AttendanceStatsCard = ({ stats, isLoading }: AttendanceStatsCardProps) => {
  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return "bg-green-500";
    if (rate >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getAttendanceTextColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse"
          >
            <div className="h-10 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{stats.totalClasses}</h3>
          <p className="text-sm text-gray-600 mt-1">Clases totales</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-500">Presentes</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{stats.presentClasses}</h3>
          <p className="text-sm text-gray-600 mt-1">Asistencias</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm text-gray-500">Ausentes</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{stats.absentClasses}</h3>
          <p className="text-sm text-gray-600 mt-1">Inasistencias</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">Porcentaje</span>
          </div>
          <h3 className={`text-3xl font-bold ${getAttendanceTextColor(stats.attendanceRate)}`}>
            {stats.attendanceRate.toFixed(1)}%
          </h3>
          <p className="text-sm text-gray-600 mt-1">Asistencia</p>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Progreso de Asistencia</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              stats.attendanceRate >= 90
                ? "bg-green-100 text-green-800"
                : stats.attendanceRate >= 75
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {stats.attendanceRate.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all ${getAttendanceColor(
              stats.attendanceRate
            )}`}
            style={{ width: `${stats.attendanceRate}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </>
  );
};
