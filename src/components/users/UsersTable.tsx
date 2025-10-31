// src/components/users/UsersTable.tsx
import { Edit, Trash2, ToggleLeft, ToggleRight, Key, CheckCircle, XCircle } from 'lucide-react';
import { User } from '../../services/api/usersService';

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onToggleStatus: (userId: string) => void;
  onResetPassword: (userId: string) => void;
}

export const UsersTable = ({ users, onEdit, onDelete, onToggleStatus, onResetPassword }: UsersTableProps) => {
  const getRoleBadge = (role: string) => {
    const styles = {
      STUDENT: 'bg-blue-100 text-blue-700',
      TEACHER: 'bg-purple-100 text-purple-700',
      ADMIN: 'bg-red-100 text-red-700'
    };
    const labels = {
      STUDENT: 'Estudiante',
      TEACHER: 'Docente',
      ADMIN: 'Admin'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[role as keyof typeof styles]}`}>
        {labels[role as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DNI</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                    <div className="text-sm text-gray-500">{user.phone || 'Sin teléfono'}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.dni}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{getRoleBadge(user.role)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.isActive ? (
                  <span className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Activo
                  </span>
                ) : (
                  <span className="flex items-center text-red-600">
                    <XCircle className="w-4 h-4 mr-1" />
                    Inactivo
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button onClick={() => onEdit(user)} className="text-blue-600 hover:text-blue-900" title="Editar">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button onClick={() => onToggleStatus(user.id)} className={`${user.isActive ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'}`} title={user.isActive ? 'Desactivar' : 'Activar'}>
                    {user.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                  </button>
                  <button onClick={() => onResetPassword(user.id)} className="text-purple-600 hover:text-purple-900" title="Resetear contraseña">
                    <Key className="w-5 h-5" />
                  </button>
                  <button onClick={() => onDelete(user.id)} className="text-red-600 hover:text-red-900" title="Eliminar">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};