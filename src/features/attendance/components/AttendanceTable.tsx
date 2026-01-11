// src/features/attendance/components/AttendanceTable.tsx
import { CheckCircle, XCircle, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/Button";
import type { Attendance } from "../types/types";

interface AttendanceTableProps {
  attendances: Attendance[];
  onEdit?: (attendance: Attendance) => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

export const AttendanceTable = ({
  attendances,
  onEdit,
  onDelete,
  isLoading,
}: AttendanceTableProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">Cargando registros de asistencia...</div>
    );
  }

  if (!attendances || attendances.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay registros de asistencia disponibles
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estudiante
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Curso
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notas
            </th>
            {(onEdit || onDelete) && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {attendances.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {format(new Date(record.classDate), "dd/MM/yyyy", { locale: es })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {record.student?.firstName} {record.student?.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{record.student?.dni}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {record.course?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {record.present ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Presente
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <XCircle className="w-4 h-4 mr-1" />
                    Ausente
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{record.notes || "-"}</td>
              {(onEdit || onDelete) && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {onEdit && (
                      <Button variant="ghost" size="sm" onClick={() => onEdit(record)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button variant="ghost" size="sm" onClick={() => onDelete(record.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
