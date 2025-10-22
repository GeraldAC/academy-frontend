import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Clock, 
  CheckCircle,
  TrendingUp,
  Calendar,
  MessageSquare,
  FileText,
  Video,
  Upload,
  Edit,
  Eye,
  Award,
  AlertCircle,
  Search,
  Bell,
  Settings,
  Plus,
  BarChart2
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const TeacherDashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Datos de ejemplo
  const myCourses = [
    { id: 1, name: 'React Avanzado', students: 145, progress: 76, status: 'active', rating: 4.8 },
    { id: 2, name: 'JavaScript Moderno', students: 98, progress: 89, status: 'active', rating: 4.7 },
    { id: 3, name: 'TypeScript Básico', students: 67, progress: 45, status: 'active', rating: 4.9 },
    { id: 4, name: 'Node.js + Express', students: 123, progress: 92, status: 'completed', rating: 4.6 }
  ];

  const studentEngagement = [
    { week: 'Sem 1', participacion: 85, tareas: 78, asistencia: 92 },
    { week: 'Sem 2', participacion: 88, tareas: 82, asistencia: 90 },
    { week: 'Sem 3', participacion: 82, tareas: 85, asistencia: 88 },
    { week: 'Sem 4', participacion: 90, tareas: 88, asistencia: 94 }
  ];

  const performanceData = [
    { subject: 'Participación', value: 85 },
    { subject: 'Tareas', value: 78 },
    { subject: 'Exámenes', value: 82 },
    { subject: 'Asistencia', value: 92 },
    { subject: 'Proyectos', value: 88 }
  ];

  const recentSubmissions = [
    { id: 1, student: 'Ana García', assignment: 'Proyecto Final React', time: '15 min', status: 'pending' },
    { id: 2, student: 'Carlos Ruiz', assignment: 'Tarea 5: Hooks', time: '1 hora', status: 'pending' },
    { id: 3, student: 'María López', assignment: 'Quiz TypeScript', time: '2 horas', status: 'reviewed' },
    { id: 4, student: 'Juan Pérez', assignment: 'Proyecto API REST', time: '3 horas', status: 'pending' }
  ];

  const upcomingClasses = [
    { id: 1, course: 'React Avanzado', topic: 'Redux Toolkit', date: 'Hoy', time: '14:00', students: 45 },
    { id: 2, course: 'JavaScript Moderno', topic: 'Async/Await', date: 'Mañana', time: '10:00', students: 38 },
    { id: 3, course: 'TypeScript Básico', topic: 'Interfaces', date: '21 Oct', time: '16:00', students: 28 }
  ];

  const messages = [
    { id: 1, from: 'Ana García', message: '¿Puedo entregar la tarea un día tarde?', time: '10 min', unread: true },
    { id: 2, from: 'Carlos Ruiz', message: 'Gracias por la retroalimentación', time: '1 hora', unread: false },
    { id: 3, from: 'Sistema', message: 'Nueva inscripción en React Avanzado', time: '2 horas', unread: true }
  ];

  interface StatCardProps {
    icon: React.ElementType;
    title: string;
    value: string | number;
    subtitle?: string;
    color: string;
    trend?: string;
  }

  const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, subtitle, color, trend }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`p-2 rounded-lg ${color}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
          {trend && (
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500 font-medium">{trend}</span>
            </div>
          )}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel del Docente</h1>
              <p className="text-sm text-gray-500 mt-1">Bienvenido de nuevo, Prof. García</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar estudiantes, tareas..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <img src="https://ui-avatars.com/api/?name=Prof+Garcia&background=8b5cf6&color=fff" alt="Teacher" className="w-10 h-10 rounded-full" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Prof. García</p>
                  <p className="text-xs text-gray-500">Docente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Quick Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Clase
            </button>
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
              <Upload className="w-4 h-4 mr-2" />
              Subir Material
            </button>
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
              <FileText className="w-4 h-4 mr-2" />
              Crear Tarea
            </button>
          </div>
          <select 
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Todos los cursos</option>
            {myCourses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            icon={Users}
            title="Total Estudiantes"
            value="433"
            trend="+12 este mes"
            color="bg-purple-500"
          />
          <StatCard
            icon={BookOpen}
            title="Cursos Activos"
            value="4"
            subtitle="3 en progreso"
            color="bg-blue-500"
          />
          <StatCard
            icon={Clock}
            title="Tareas Pendientes"
            value="23"
            subtitle="Revisar hoy"
            color="bg-orange-500"
          />
          <StatCard
            icon={Award}
            title="Rating Promedio"
            value="4.8"
            subtitle="⭐⭐⭐⭐⭐"
            color="bg-green-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Student Engagement Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Engagement de Estudiantes</h3>
                <p className="text-sm text-gray-500">Últimas 4 semanas</p>
              </div>
              <BarChart2 className="w-5 h-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentEngagement}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Bar dataKey="participacion" fill="#8b5cf6" name="Participación" radius={[4, 4, 0, 0]} />
                <Bar dataKey="tareas" fill="#3b82f6" name="Tareas" radius={[4, 4, 0, 0]} />
                <Bar dataKey="asistencia" fill="#10b981" name="Asistencia" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Radar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Desempeño General</h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={performanceData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
                <Radar name="Promedio" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* My Courses */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mis Cursos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {myCourses.map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      course.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {course.status === 'active' ? 'Activo' : 'Completado'}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{course.name}</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students} estudiantes
                    </span>
                    <span className="text-gray-600">⭐ {course.rating}</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600">Progreso</span>
                      <span className="font-medium text-gray-900">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Classes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Próximas Clases</h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {upcomingClasses.map((clase) => (
                <div key={clase.id} className="border border-gray-200 rounded-lg p-3 hover:border-purple-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{clase.course}</h4>
                      <p className="text-xs text-gray-600 mt-1">{clase.topic}</p>
                    </div>
                    <Video className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-600">
                      <Clock className="w-3 h-3 mr-1" />
                      {clase.date} • {clase.time}
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <Users className="w-3 h-3 mr-1" />
                      {clase.students}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 text-sm font-medium">
              Ver Calendario Completo
            </button>
          </div>

          {/* Recent Submissions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Entregas Recientes</h3>
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {recentSubmissions.map((submission) => (
                <div key={submission.id} className="border border-gray-200 rounded-lg p-3 hover:border-purple-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{submission.student}</h4>
                      <p className="text-xs text-gray-600 mt-1">{submission.assignment}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      submission.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {submission.status === 'pending' ? 'Pendiente' : 'Revisado'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-500">{submission.time}</span>
                    {submission.status === 'pending' && (
                      <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                        Revisar →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Mensajes</h3>
              <MessageSquare className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`border rounded-lg p-3 transition-colors ${
                  message.unread ? 'border-purple-200 bg-purple-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${message.from}&background=random`} 
                        alt={message.from} 
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{message.from}</h4>
                        <span className="text-xs text-gray-500">{message.time}</span>
                      </div>
                    </div>
                    {message.unread && (
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700">{message.message}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
              Ver Todos los Mensajes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;