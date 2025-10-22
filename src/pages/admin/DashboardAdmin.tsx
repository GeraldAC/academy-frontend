import { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  DollarSign,
  UserCheck,
  AlertCircle,
  BarChart3,
  Settings,
  Bell,
  Search,
  Download,
  Plus,
  MoreVertical
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Datos de ejemplo
  const enrollmentData = [
    { month: 'Ene', estudiantes: 245, docentes: 6 },
    { month: 'Feb', estudiantes: 268, docentes: 6 },
    { month: 'Mar', estudiantes: 192, docentes: 4 },
    { month: 'Abr', estudiantes: 215, docentes: 4 },
    { month: 'May', estudiantes: 238, docentes: 6 },
    { month: 'Jun', estudiantes: 267, docentes: 6 }
  ];

  const revenueData = [
    { month: 'Ene', ingresos: 6000 },
    { month: 'Feb', ingresos: 5000 },
    { month: 'Mar', ingresos: 4800 },
    { month: 'Abr', ingresos: 4500 },
    { month: 'May', ingresos: 5500 },
    { month: 'Jun', ingresos: 6000 }
  ];

  const coursesData = [
    { name: 'Activos', value: 45, color: '#3b82f6' },
    { name: 'En desarrollo', value: 12, color: '#f59e0b' },
    { name: 'Finalizados', value: 78, color: '#10b981' }
  ];

const recentActivities = [
  { id: 1, user: 'Carlos Mamani', action: 'se matriculó en Matemática I', time: '5 min', type: 'matrícula' },
  { id: 2, user: 'Prof. Luis Ramos', action: 'registró notas de Física II', time: '20 min', type: 'evaluación' },
  { id: 3, user: 'María Quispe', action: 'descargó su constancia de estudios', time: '1 hora', type: 'documento' },
  { id: 4, user: 'Sistema', action: 'respaldo automático completado', time: '3 horas', type: 'sistema' },
  { id: 5, user: 'Prof. Ana Vargas', action: 'publicó horario de Química', time: '4 horas', type: 'curso' }
];

const topCourses = [
  { name: 'Matemática I', students: 340, rating: 4.9, progress: 92 },
  { name: 'Comunicación', students: 285, rating: 4.8, progress: 88 },
  { name: 'Razonamiento Matemático', students: 260, rating: 4.7, progress: 85 },
  { name: 'Física II', students: 210, rating: 4.6, progress: 80 }
];


  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          <div className="flex items-center mt-2">
            <TrendingUp className={`w-4 h-4 ${change > 0 ? 'text-green-500' : 'text-red-500'} mr-1`} />
            <span className={`text-sm font-medium ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change > 0 ? '+' : ''}{change}%
            </span>
            <span className="text-xs text-gray-500 ml-1">vs mes anterior</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const handleLogout = () => {
  localStorage.removeItem('token'); // o 'user', según cómo guardes la sesión
  window.location.href = '/login'; // redirige al login
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-sm text-gray-500 mt-1">Gestión completa de la plataforma educativa</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
              <div className="relative group">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <img
                    src="https://ui-avatars.com/api/?name=Admin&background=3b82f6&color=fff"
                    alt="Admin"
                    className="w-10 h-10 rounded-full"
                  />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
              </div>

                {/* Menú desplegable */}
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
.
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Filtros rápidos */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Mes
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === 'year' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Año
            </button>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Curso
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            icon={Users}
            title="Total Estudiantes"
            value="247"
            change={12.5}
            color="bg-blue-500"
          />
          <StatCard
            icon={GraduationCap}
            title="Docentes Activos"
            value="12"
            change={8.3}
            color="bg-purple-500"
          />
          <StatCard
            icon={BookOpen}
            title="Cursos Totales"
            value="12"
            change={15.2}
            color="bg-green-500"
          />
          <StatCard
            icon={DollarSign}
            title="Ingresos Mensuales"
            value="$6700"
            change={23.1}
            color="bg-orange-500"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Enrollment Trend */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Tendencia de Inscripciones</h3>
                <p className="text-sm text-gray-500">Últimos 6 meses</p>
              </div>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="estudiantes" stroke="#3b82f6" strokeWidth={3} name="Estudiantes" />
                <Line type="monotone" dataKey="docentes" stroke="#8b5cf6" strokeWidth={3} name="Docentes" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Course Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Estado de Cursos</h3>
                <p className="text-sm text-gray-500">Distribución actual</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={coursesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {coursesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {coursesData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Ingresos Mensuales</h3>
              <p className="text-sm text-gray-500">Evolución financiera</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Bar dataKey="ingresos" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Courses */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cursos Más Populares</h3>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{course.name}</h4>
                      <div className="flex items-center mt-1 space-x-4">
                        <span className="text-sm text-gray-600 flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.students} estudiantes
                        </span>
                        <span className="text-sm text-gray-600">⭐ {course.rating}</span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Completado</span>
                      <span className="font-medium text-gray-900">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'enrollment' ? 'bg-blue-100' :
                    activity.type === 'course' ? 'bg-purple-100' :
                    activity.type === 'completion' ? 'bg-green-100' :
                    activity.type === 'certificate' ? 'bg-orange-100' :
                    'bg-gray-100'
                  }`}>
                    {activity.type === 'enrollment' && <UserCheck className="w-5 h-5 text-blue-600" />}
                    {activity.type === 'course' && <BookOpen className="w-5 h-5 text-purple-600" />}
                    {activity.type === 'completion' && <GraduationCap className="w-5 h-5 text-green-600" />}
                    {activity.type === 'certificate' && <AlertCircle className="w-5 h-5 text-orange-600" />}
                    {activity.type === 'system' && <Settings className="w-5 h-5 text-gray-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>
                      {' '}{activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;