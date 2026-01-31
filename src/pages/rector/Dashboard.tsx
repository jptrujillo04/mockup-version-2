import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import {
    Search,
    Users,
    GraduationCap,
    Briefcase,
    Download,
    MessageCircle,
    Mail,
    FileText,
    AlertCircle,
    Calendar,
    DollarSign
} from 'lucide-react';

// Mock data - Juan Pérez consistent across all views
const mockStudent = {
    id: 'EST-2024-001',
    name: 'Juan Pérez',
    grade: '9°',
    section: 'A',
    balance: 350000,
    status: 'active',
    photo: null,
};

const mockTeacher = {
    id: 'DOC-2024-015',
    name: 'María González',
    subject: 'Matemáticas',
    weeklyHours: 24,
    status: 'active',
};

const aspirantes = [
    { id: 1, name: 'Carlos Rodríguez', grade: '6°', date: '2026-01-15', status: 'pending' },
    { id: 2, name: 'Ana María López', grade: '7°', date: '2026-01-18', status: 'approved' },
    { id: 3, name: 'Pedro Sánchez', grade: '9°', date: '2026-01-20', status: 'pending' },
];

const students = [
    { ...mockStudent },
    { id: 'EST-2024-002', name: 'María García', grade: '9°', section: 'B', balance: 0, status: 'active' },
    { id: 'EST-2024-003', name: 'Carlos López', grade: '10°', section: 'A', balance: 175000, status: 'active' },
];

const teachers = [
    { ...mockTeacher },
    { id: 'DOC-2024-016', name: 'Carlos Ruiz', subject: 'Español', weeklyHours: 20, status: 'active' },
    { id: 'DOC-2024-017', name: 'Ana Torres', subject: 'Ciencias', weeklyHours: 18, status: 'inactive' },
];

const RectorDashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-text-main">Visión 360</h1>
                <p className="text-gray-500">Panel de control del Rector</p>
            </div>

            {/* Global Search Card */}
            <Card title="Buscador Global">
                <div className="flex gap-4 items-end">
                    <div className="flex-1">
                        <Input placeholder="Buscar por nombre, documento o código..." icon={Search} />
                    </div>
                    <Select
                        options={[
                            { value: 'all', label: 'Todos' },
                            { value: 'students', label: 'Estudiantes' },
                            { value: 'teachers', label: 'Profesores' },
                            { value: 'family', label: 'Familia' },
                        ]}
                        className="w-48"
                    />
                    <Button variant="primary">Buscar</Button>
                </div>
            </Card>

            {/* Quick Profile Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Card */}
                <Card>
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <GraduationCap className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-text-main">{mockStudent.name}</h3>
                                <Badge variant="info">{mockStudent.grade}</Badge>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">Código: {mockStudent.id}</p>
                            <div className="flex items-center gap-2 text-sm">
                                <DollarSign className="w-4 h-4 text-alert" />
                                <span className="text-alert font-medium">
                                    Saldo pendiente: ${mockStudent.balance.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                        <Button size="sm" variant="outline" icon={MessageCircle}>WhatsApp Padres</Button>
                        <Button size="sm" variant="outline" icon={Mail}>Enviar correo</Button>
                        <Button size="sm" variant="ghost" icon={FileText}>Ver perfil</Button>
                    </div>
                </Card>

                {/* Teacher Card */}
                <Card>
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                            <Briefcase className="w-8 h-8 text-secondary" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-text-main">{mockTeacher.name}</h3>
                                <Badge variant="success">Activo</Badge>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{mockTeacher.subject}</p>
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600">Carga semanal: {mockTeacher.weeklyHours}h</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                        <Button size="sm" variant="outline" icon={Mail}>Enviar correo</Button>
                        <Button size="sm" variant="ghost" icon={FileText}>Ver CV</Button>
                    </div>
                </Card>
            </div>

            {/* Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Aspirantes Table */}
                <Card
                    title="Aspirantes"
                    actions={<Button size="sm" variant="outline" icon={Download}>Exportar</Button>}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Nombre</th>
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Grado</th>
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {aspirantes.map((asp) => (
                                    <tr key={asp.id} className="border-b border-border/50 hover:bg-gray-50">
                                        <td className="py-3 px-2">{asp.name}</td>
                                        <td className="py-3 px-2">{asp.grade}</td>
                                        <td className="py-3 px-2">
                                            <Badge variant={asp.status === 'approved' ? 'success' : 'warning'}>
                                                {asp.status === 'approved' ? 'Aprobado' : 'Pendiente'}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Students Table */}
                <Card title="Estudiantes">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Nombre</th>
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Grado</th>
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Saldo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id} className="border-b border-border/50 hover:bg-gray-50">
                                        <td className="py-3 px-2">{student.name}</td>
                                        <td className="py-3 px-2">{student.grade} {student.section}</td>
                                        <td className="py-3 px-2">
                                            <span className={student.balance > 0 ? 'text-alert' : 'text-success'}>
                                                ${student.balance.toLocaleString()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* Teachers & User Management */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Teachers Table */}
                <Card title="Profesores">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Nombre</th>
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Materia</th>
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachers.map((teacher) => (
                                    <tr key={teacher.id} className="border-b border-border/50 hover:bg-gray-50">
                                        <td className="py-3 px-2">{teacher.name}</td>
                                        <td className="py-3 px-2">{teacher.subject}</td>
                                        <td className="py-3 px-2">
                                            <Badge variant={teacher.status === 'active' ? 'success' : 'default'}>
                                                {teacher.status === 'active' ? 'Activo' : 'Inactivo'}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Observador Institucional */}
                <Card title="Observador Institucional">
                    <div className="space-y-4">
                        <Select
                            label="Estudiante"
                            options={students.map(s => ({ value: s.id, label: `${s.name} - ${s.grade}` }))}
                        />
                        <div>
                            <label className="block text-sm font-medium text-text-main mb-1">Descripción</label>
                            <textarea
                                className="w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary text-sm p-3 min-h-[100px]"
                                placeholder="Describe la observación..."
                            />
                        </div>
                        <Button variant="primary" icon={AlertCircle}>Reportar</Button>
                    </div>
                </Card>
            </div>

            {/* Schedule Adjustment Section */}
            <Card title="Ajuste de Horarios">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Schedule Table */}
                    <div className="lg:col-span-2 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Bloque</th>
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Curso</th>
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Profesor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border/50">
                                    <td className="py-3 px-2">7:00 - 8:00</td>
                                    <td className="py-3 px-2">9° A - Matemáticas</td>
                                    <td className="py-3 px-2">María González</td>
                                </tr>
                                <tr className="border-b border-border/50">
                                    <td className="py-3 px-2">8:00 - 9:00</td>
                                    <td className="py-3 px-2">10° B - Física</td>
                                    <td className="py-3 px-2">Carlos Ruiz</td>
                                </tr>
                                <tr className="border-b border-border/50">
                                    <td className="py-3 px-2">9:00 - 10:00</td>
                                    <td className="py-3 px-2">9° B - Español</td>
                                    <td className="py-3 px-2">Ana Torres</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Drag & Drop Zone */}
                    <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center bg-gray-50">
                        <Users className="w-10 h-10 text-gray-300 mb-3" />
                        <p className="text-sm text-gray-500">Arrastra profesores aquí para reasignar</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default RectorDashboard;
