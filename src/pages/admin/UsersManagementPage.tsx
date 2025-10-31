// src/pages/admin/UsersManagementPage.tsx
import { useState, useEffect } from 'react';
import { 
  Users as UsersIcon, 
  UserPlus,
  Search, 
  RefreshCw,
  Download
} from 'lucide-react';
import { usersService, User, UsersFilters } from '../../services/api/usersService';
import { UserRegistrationModal, UserFormData } from '../../components/users/UserRegistrationModal';
import { UsersTable } from '../../components/users/UsersTable';
import { EditUserModal } from '../../components/users/EditUserModal';

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<UsersFilters>({
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    byRole: {
      students: 0,
      teachers: 0,
      admins: 0
    }
  });

  // Modales
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Cargar usuarios
  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await usersService.getUsers(filters);
      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  // Cargar estadísticas
  const loadStats = async () => {
    try {
      const response = await usersService.getUserStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  useEffect(() => {
    loadUsers();
    loadStats();
  }, [filters]);

  // Crear usuario
  const handleCreateUser = async (userData: UserFormData) => {
    try {
      await usersService.createUser(userData);
      alert('Usuario creado exitosamente');
      loadUsers();
      loadStats();
      setShowRegisterModal(false);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error al crear usuario');
      throw error;
    }
  };

  // Editar usuario
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleUpdateUser = async (userId: string, updateData: any) => {
    try {
      await usersService.updateUser(userId, updateData);
      alert('Usuario actualizado exitosamente');
      loadUsers();
      setShowEditModal(false);
      setSelectedUser(null);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error al actualizar usuario');
      throw error;
    }
  };

  // Cambiar estado
  const handleToggleStatus = async (userId: string) => {
    try {
      const response = await usersService.toggleUserStatus(userId);
      alert(response.message);
      loadUsers();
      loadStats();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error al cambiar estado');
    }
  };

  // Eliminar usuario
  const handleDeleteUser = async (userId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;

    try {
      const response = await usersService.deleteUser(userId);
      alert(response.message);
      loadUsers();
      loadStats();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error al eliminar usuario');
    }
  };

  // Resetear contraseña
  const handleResetPassword = async (userId: string) => {
    const newPassword = prompt('Ingresa la nueva contraseña (mínimo 6 caracteres):');
    
    if (!newPassword) return;
    
    if (newPassword.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const response = await usersService.resetPassword(userId, newPassword);
      alert(response.message);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error al resetear contraseña');
    }
  };

  // Cambiar filtros
  const handleFilterChange = (key: keyof UsersFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }));
  };

  // Exportar usuarios
  const handleExport = () => {
    alert('Funcionalidad de exportación en desarrollo');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <UsersIcon className="w-8 h-8 mr-3 text-blue-600" />
                Gestión de Usuarios
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Administra los usuarios del sistema
              </p>
            </div>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Nuevo Usuario
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Usuarios</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.totalUsers}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Estudiantes</p>
                <h3 className="text-3xl font-bold text-blue-600">{stats.byRole.students}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Docentes</p>
                <h3 className="text-3xl font-bold text-purple-600">{stats.byRole.teachers}</h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <UsersIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Activos</p>
                <h3 className="text-3xl font-bold text-green-600">{stats.activeUsers}</h3>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <UsersIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Inactivos</p>
                <h3 className="text-3xl font-bold text-red-600">{stats.inactiveUsers}</h3>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <UsersIcon className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4 flex-1">
              {/* Búsqueda */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, email o DNI..."
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filtro por rol */}
              <select
                value={filters.role || ''}
                onChange={(e) => handleFilterChange('role', e.target.value || undefined)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los roles</option>
                <option value="STUDENT">Estudiantes</option>
                <option value="TEACHER">Docentes</option>
                <option value="ADMIN">Administradores</option>
              </select>

              {/* Filtro por estado */}
              <select
                value={filters.isActive === undefined ? '' : filters.isActive.toString()}
                onChange={(e) => handleFilterChange('isActive', e.target.value === '' ? undefined : e.target.value === 'true')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los estados</option>
                <option value="true">Activos</option>
                <option value="false">Inactivos</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={loadUsers}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="Recargar"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleExport}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-5 h-5 mr-2 text-gray-600" />
                Exportar
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de usuarios */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <UsersIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay usuarios</h3>
              <p className="text-gray-500">No se encontraron usuarios con los filtros aplicados</p>
            </div>
          ) : (
            <>
              <UsersTable
                users={users}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onToggleStatus={handleToggleStatus}
                onResetPassword={handleResetPassword}
              />

              {/* Paginación */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Mostrando {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} de {pagination.total} usuarios
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleFilterChange('page', filters.page! - 1)}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Anterior
                  </button>
                  <span className="text-sm text-gray-600">
                    Página {pagination.page} de {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => handleFilterChange('page', filters.page! + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modales */}
      <UserRegistrationModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSubmit={handleCreateUser}
      />

      {selectedUser && (
        <EditUserModal
          isOpen={showEditModal}
          user={selectedUser}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onSubmit={handleUpdateUser}
        />
      )}
    </div>
  );
}