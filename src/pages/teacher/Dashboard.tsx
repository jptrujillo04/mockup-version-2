import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Link } from 'react-router-dom';
import {
    Users,
    ClipboardList,
    Calendar,
    FolderOpen,
    BookOpen
} from 'lucide-react';

// Mock data
const assignedCourses = [
    { id: 1, name: '9° A', subject: 'Matemáticas', students: 32, pending: 5 },
    { id: 2, name: '9° B', subject: 'Matemáticas', students: 30, pending: 3 },
    { id: 3, name: '10° A', subject: 'Matemáticas', students: 28, pending: 8 },
];

const quickStats = [
    { label: 'Clases hoy', value: 6, icon: BookOpen },
    { label: 'Asistencia promedio', value: '94%', icon: Users },
    { label: 'Actividades pendientes', value: 16, icon: ClipboardList },
];

const TeacherDashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div>
                <h1 className="text-2xl font-bold text-text-main">¡Bienvenido, Prof. María González!</h1>
                <p className="text-gray-500">Panel de Profesor · 2026 - Primer Trimestre</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quickStats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.label} className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-text-main">{stat.value}</p>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Assigned Courses */}
            <Card title="Cursos Asignados">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {assignedCourses.map((course) => (
                        <div
                            key={course.id}
                            className="p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-text-main">{course.name}</h3>
                                <Badge variant="info">{course.subject}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                <span><Users className="w-4 h-4 inline mr-1" />{course.students} estudiantes</span>
                            </div>
                            {course.pending > 0 && (
                                <p className="text-xs text-alert mb-3">
                                    {course.pending} actividades por calificar
                                </p>
                            )}
                            <div className="flex gap-2">
                                <Link to="/teacher/calificar" className="flex-1">
                                    <Button size="sm" variant="primary" className="w-full">Calificar</Button>
                                </Link>
                                <Link to="/teacher/asistencia">
                                    <Button size="sm" variant="outline" icon={Calendar} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Quick Access */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Link to="/teacher/calificar">
                    <Card className="flex flex-col items-center gap-3 hover:border-primary transition-colors cursor-pointer !p-6">
                        <ClipboardList className="w-8 h-8 text-primary" />
                        <span className="font-medium">Calificar</span>
                    </Card>
                </Link>
                <Link to="/teacher/asistencia">
                    <Card className="flex flex-col items-center gap-3 hover:border-primary transition-colors cursor-pointer !p-6">
                        <Calendar className="w-8 h-8 text-primary" />
                        <span className="font-medium">Asistencia</span>
                    </Card>
                </Link>
                <Link to="/teacher/archivos">
                    <Card className="flex flex-col items-center gap-3 hover:border-primary transition-colors cursor-pointer !p-6">
                        <FolderOpen className="w-8 h-8 text-primary" />
                        <span className="font-medium">Archivos</span>
                    </Card>
                </Link>
                <Link to="/teacher/observador">
                    <Card className="flex flex-col items-center gap-3 hover:border-primary transition-colors cursor-pointer !p-6">
                        <Users className="w-8 h-8 text-primary" />
                        <span className="font-medium">Observador</span>
                    </Card>
                </Link>
            </div>
        </div>
    );
};

export default TeacherDashboard;
