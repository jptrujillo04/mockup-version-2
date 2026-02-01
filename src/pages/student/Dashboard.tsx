import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
    ClipboardList,
    FolderOpen,
    Eye,
    Download,
    Calendar,
    Clock,
    BookOpen
} from 'lucide-react';

// Mock data - Juan Pérez
const mockStudent = {
    id: 'EST-2024-001',
    name: 'Juan Pérez',
    grade: '9°',
    section: 'A',
};

const upcomingEvaluations = [
    { id: 1, subject: 'Matemáticas', topic: 'Ecuaciones cuadráticas', date: '2026-02-05', type: 'Examen' },
    { id: 2, subject: 'Español', topic: 'Análisis literario', date: '2026-02-08', type: 'Quiz' },
    { id: 3, subject: 'Ciencias', topic: 'Química orgánica', date: '2026-02-10', type: 'Laboratorio' },
];

const recentObservations = [
    { id: 1, type: 'positive', description: 'Excelente participación en clase de ciencias', date: '2026-01-25' },
    { id: 2, type: 'neutral', description: 'Llegada tarde al aula', date: '2026-01-20' },
];

const weeklySchedule = [
    { day: 'Lunes', classes: ['Matemáticas', 'Español', 'Ed. Física', 'Ciencias', 'Inglés'] },
    { day: 'Martes', classes: ['Ciencias', 'Matemáticas', 'Español', 'Historia', 'Arte'] },
    { day: 'Miércoles', classes: ['Inglés', 'Matemáticas', 'Ciencias', 'Español', 'Música'] },
    { day: 'Jueves', classes: ['Historia', 'Español', 'Matemáticas', 'Ed. Física', 'Ciencias'] },
    { day: 'Viernes', classes: ['Matemáticas', 'Inglés', 'Arte', 'Español', 'Orientación'] },
];

const StudentDashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">¡Hola, {mockStudent.name}!</h1>
                    <p className="text-gray-500">{mockStudent.grade} {mockStudent.section} · Período: 2026 - Primer Trimestre</p>
                </div>
                <Button variant="outline" icon={Download}>Descargar Diploma</Button>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <ClipboardList className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-text-main">3</p>
                        <p className="text-sm text-gray-500">Evaluaciones próximas</p>
                    </div>
                </Card>

                <Card className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                        <FolderOpen className="w-6 h-6 text-success" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-text-main">12</p>
                        <p className="text-sm text-gray-500">Materiales disponibles</p>
                    </div>
                </Card>

                <Card className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-alert/10 rounded-lg flex items-center justify-center">
                        <Eye className="w-6 h-6 text-alert" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-text-main">2</p>
                        <p className="text-sm text-gray-500">Observaciones</p>
                    </div>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Evaluations */}
                <Card
                    title="Próximas Evaluaciones"
                    actions={<Button size="sm" variant="ghost">Ver todas</Button>}
                >
                    <div className="space-y-3">
                        {upcomingEvaluations.map((evaluation) => (
                            <div
                                key={evaluation.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-text-main">{evaluation.subject}</p>
                                        <p className="text-sm text-gray-500">{evaluation.topic}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Badge variant="info">{evaluation.type}</Badge>
                                    <p className="text-xs text-gray-500 mt-1">
                                        <Calendar className="w-3 h-3 inline mr-1" />
                                        {evaluation.date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Material de Apoyo */}
                <Card
                    title="Material de Apoyo"
                    actions={<Link to="/student/material"><Button size="sm" variant="primary">Ver</Button></Link>}
                >
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <FolderOpen className="w-5 h-5 text-gray-400" />
                                <span className="text-sm">Guía de Matemáticas - Unidad 3</span>
                            </div>
                            <Button size="sm" variant="ghost" icon={Download} className="p-1 h-8 w-8" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <FolderOpen className="w-5 h-5 text-gray-400" />
                                <span className="text-sm">Lectura complementaria - Español</span>
                            </div>
                            <Button size="sm" variant="ghost" icon={Download} className="p-1 h-8 w-8" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <FolderOpen className="w-5 h-5 text-gray-400" />
                                <span className="text-sm">Video: Reacciones químicas</span>
                            </div>
                            <Button size="sm" variant="ghost" icon={Download} className="p-1 h-8 w-8" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Observations */}
            <Card
                title="Observaciones Recientes"
                actions={<Button size="sm" variant="ghost">Ver historial</Button>}
            >
                <div className="space-y-3">
                    {recentObservations.map((obs) => (
                        <div
                            key={obs.id}
                            className={`p-4 rounded-lg border-l-4 ${obs.type === 'positive'
                                ? 'bg-green-50 border-success'
                                : 'bg-orange-50 border-alert'
                                }`}
                        >
                            <div className="flex justify-between items-start">
                                <p className="text-sm text-text-main">{obs.description}</p>
                                <span className="text-xs text-gray-500">{obs.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Weekly Schedule */}
            <Card title="Horario Semanal">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Hora</th>
                                {weeklySchedule.map((day) => (
                                    <th key={day.day} className="text-left py-3 px-2 font-medium text-gray-500">{day.day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {['7:00', '8:00', '9:00', '10:00', '11:00'].map((time, idx) => (
                                <tr key={time} className="border-b border-border/50">
                                    <td className="py-2 px-2 text-gray-500">
                                        <Clock className="w-3 h-3 inline mr-1" />
                                        {time}
                                    </td>
                                    {weeklySchedule.map((day) => (
                                        <td key={`${day.day}-${idx}`} className="py-2 px-2">
                                            <span className="px-2 py-1 bg-primary/5 text-primary text-xs rounded">
                                                {day.classes[idx]}
                                            </span>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default StudentDashboard;
