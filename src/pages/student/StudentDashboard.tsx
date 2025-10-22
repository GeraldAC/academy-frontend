import { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp,
  Calendar,
  CheckCircle,
  Play,
  FileText,
  Target,
  Trophy,
  Star,
  Search,
  Bell,
  Settings,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Datos de ejemplo
  const enrolledCourses = [
    { 
      id: 1, 
      name: 'React Avanzado', 
      instructor: 'Prof. García',
      progress: 76, 
      nextLesson: 'Redux Toolkit',
      lessonsCompleted: 23,
      totalLessons: 30,
      dueDate: '25 Oct'
    },
    { 
      id: 2, 
      name: 'JavaScript Moderno', 
      instructor: 'Prof. Martínez',
      progress: 45, 
      nextLesson: 'Async/Await',
      lessonsCompleted: 12,
      totalLessons: 28,
      dueDate: '30 Oct'
    },
    { 
      id: 3, 
      name: 'TypeScript Básico', 
      instructor: 'Prof. López',
      progress: 92, 
      nextLesson: 'Proyecto Final',
      lessonsCompleted: 18,
      totalLessons: 20,
      dueDate: '22 Oct'
    }
  ];

  const progressData = [
    { week: 'Sem 1', horas: 8, lecciones: 12 },
    { week: 'Sem 2', horas: 12, lecciones: 18 },
    { week: 'Sem 3', horas: 10, lecciones: 15 },
    { week: 'Sem 4', horas: 15, lecciones: 22 }
  ];

  const gradesData = [
    { subject: 'React', grade: 85 },
    { subject: 'JavaScript', grade: 78 },
    { subject: 'TypeScript', grade: 92 },
    { subject: 'Node.js', grade: 88 }
  ];

  const skillsData = [
    { name: 'Completado', value: 53, color: '#10b981' },
    { name: 'En Progreso', value: 35, color: '#3b82f6' },
    { name: 'Pendiente', value: 12, color: '#e5e7eb' }
  ];

  const upcomingAssignments = [
    { id: 1, course: 'React Avanzado', title: 'Proyecto Final: App con Redux', dueDate: '22 Oct', priority: 'high', points: 100 },
    { id: 2, course: 'JavaScript Moderno', title: 'Quiz: Promesas y Async', dueDate: '24 Oct', priority: 'medium', points: 50 },
    { id: 3, course: 'TypeScript Básico', title: 'Ejercicios: Interfaces', dueDate: '26 Oct', priority: 'low', points: 30 }
  ];

  const achievements = [
    { id: 1, title: 'Primera Semana', description: 'Completaste tu primera semana', icon: Star, earned: true },
    { id: 2, title: 'Racha de 7 días', description: 'Estudiaste 7 días seguidos', icon: Trophy, earned: true },
    { id: 3, title: 'Curso Completado', description: 'Terminaste tu primer curso', icon: Award, earned: true },
    { id: 4, title: 'Top Estudiante', description: 'Entre los 10 mejores', icon: Target, earned: false }
  ];

  const recentActivity = [
    { id: 1, action: 'Completaste', detail: 'Lección: Redux Toolkit', course: 'React Avanzado', time: '2 horas' },
    { id: 2, action: 'Entregaste', detail: 'Tarea: Hooks Avanzados', course: 'React Avanzado', time: '5 horas' },
    { id: 3, action: 'Comentaste en', detail: 'Foro: Mejores prácticas', course: 'JavaScript Moderno', time: '1 día' }
  ];

  interface StatCardProps {
    icon: React.ElementType;
    title: string;
    value: string | number;
    subtitle?: string;
    color: string;
    action?: string;
  }

  const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, subtitle, color, action }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {action && (
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            {action}
          </button>
        )}
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mi Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">¡Bienvenido de nuevo, Ana! Continúa aprendiendo</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar cursos, lecciones..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
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
                <img src="https://ui-avatars.com/api/?name=Ana+Garcia&background=3b82f6&color=fff" alt="Student" className="w-10 h-10 rounded-full" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Ana García</p>
                  <p className="text-xs text-gray-500">Estudiante</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 border border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Vista General
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'courses' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Mis Cursos
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'progress' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Mi Progreso
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            icon={BookOpen}
            title="Cursos Activos"
            value="3"
            subtitle="2 por completar este mes"
            color="bg-blue-500"
          />
          <StatCard
            icon={Clock}
            title="Horas Estudiadas"
            value="45h"
            subtitle="15h esta semana"
            color="bg-purple-500"
          />
          <StatCard
            icon={Award}
            title="Certificados"
            value="8"
            subtitle="2 nuevos este mes"
            color="bg-green-500"
            action="Ver todos →"
          />
          <StatCard
            icon={Target}
            title="Promedio"
            value="86%"
            subtitle="⭐ Excelente desempeño"
            color="bg-orange-500"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Continue Learning */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">¡Continúa Aprendiendo!</h3>
                  <p className="text-blue-100">Estás muy cerca de completar React Avanzado</p>
                </div>
                <Trophy className="w-12 h-12 text-yellow-300" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Progreso General</span>
                  <span className="font-bold">71%</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-3">
                  <div className="bg-white h-3 rounded-full" style={{ width: '71%' }}></div>
                </div>
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Mis Cursos</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Ver todos →
                </button>
              </div>
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex">
                      <div className="w-32 h-24 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{course.name}</h4>
                            <p className="text-xs text-gray-600 mt-1">{course.instructor}</p>
                          </div>
                          <button className="p-2 hover:bg-blue-50 rounded-full text-blue-600">
                            <Play className="w-5 h-5" fill="currentColor" />
                          </button>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-600 mb-2">
                          <span>{course.lessonsCompleted}/{course.totalLessons} lecciones</span>
                          <span>•</span>
                          <span>Vence: {course.dueDate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex-1 mr-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{course.progress}%</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          Siguiente: {course.nextLesson}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Tu Actividad</h3>
                  <p className="text-sm text-gray-500">Últimas 4 semanas</p>
                </div>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="horas" stroke="#3b82f6" strokeWidth={3} name="Horas" />
                  <Line type="monotone" dataKey="lecciones" stroke="#8b5cf6" strokeWidth={3} name="Lecciones" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Assignments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Tareas Pendientes</h3>
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className={`border rounded-lg p-3 ${
                    assignment.priority === 'high' ? 'border-red-200 bg-red-50' :
                    assignment.priority === 'medium' ? 'border-orange-200 bg-orange-50' :
                    'border-blue-200 bg-blue-50'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 mb-1">{assignment.course}</p>
                        <h4 className="text-sm font-medium text-gray-900">{assignment.title}</h4>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        assignment.priority === 'high' ? 'bg-red-100 text-red-700' :
                        assignment.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {assignment.points} pts
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                      <div className="flex items-center text-xs text-gray-600">
                        <Clock className="w-3 h-3 mr-1" />
                        Vence: {assignment.dueDate}
                      </div>
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                        Iniciar →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado de Aprendizaje</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={skillsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {skillsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {skillsData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Logros</h3>
                <Trophy className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className={`border rounded-lg p-3 text-center ${
                    achievement.earned ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200 bg-gray-50 opacity-50'
                  }`}>
                    <achievement.icon className={`w-8 h-8 mx-auto mb-2 ${
                      achievement.earned ? 'text-yellow-500' : 'text-gray-400'
                    }`} />
                    <h4 className="text-xs font-medium text-gray-900 mb-1">{achievement.title}</h4>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                Ver Todos los Logros
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grades Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Mis Calificaciones</h3>
                <p className="text-sm text-gray-500">Promedio por curso</p>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Ver detalles →
              </button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={gradesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" domain={[0, 100]} stroke="#9ca3af" />
                <YAxis dataKey="subject" type="category" stroke="#9ca3af" width={100} />
                <Tooltip />
                <Bar dataKey="grade" fill="#3b82f6" radius={[0, 8, 8, 0]}>
                  {gradesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                      entry.grade >= 90 ? '#10b981' :
                      entry.grade >= 80 ? '#3b82f6' :
                      entry.grade >= 70 ? '#f59e0b' : '#ef4444'
                    } />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Promedio General</span>
                <span className="text-2xl font-bold text-gray-900">86%</span>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500 font-medium">+5% vs mes anterior</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.action}</span>
                      {' '}{activity.detail}
                    </p>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-xs text-gray-600">{activity.course}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
              Ver Toda la Actividad
            </button>
          </div>
        </div>

        {/* Study Tips Banner */}
        <div className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">¡Sigue así!</h3>
                <p className="text-purple-100">Has estudiado 15 horas esta semana. Tu meta es 20 horas.</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold mb-1">75%</p>
              <p className="text-sm text-purple-100">de tu meta</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-full h-3">
            <div className="bg-white h-3 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;