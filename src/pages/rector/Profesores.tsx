import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import {
    Search,
    Download,
    Eye,
    Mail,
    FileText,
    UserPlus
} from 'lucide-react';

// Mock data
const profesoresData = [
    { id: 1, name: 'María González', document: '51234567', subject: 'Matemáticas', weeklyHours: 24, status: 'active' },
    { id: 2, name: 'Carlos Ruiz', document: '79876543', subject: 'Español', weeklyHours: 20, status: 'active' },
    { id: 3, name: 'Ana Torres', document: '52345678', subject: 'Ciencias', weeklyHours: 22, status: 'active' },
    { id: 4, name: 'Pedro Martínez', document: '80123456', subject: 'Inglés', weeklyHours: 18, status: 'inactive' },
    { id: 5, name: 'Laura Sánchez', document: '53456789', subject: 'Historia', weeklyHours: 16, status: 'active' },
];

const ProfesoresPage: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Profesores</h1>
                    <p className="text-gray-500">Gestión del cuerpo docente</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" icon={Download}>Exportar</Button>
                    <Button variant="primary" icon={UserPlus}>Nuevo profesor</Button>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Input placeholder="Buscar por nombre o documento..." icon={Search} />
                    </div>
                    <Select
                        options={[
                            { value: '', label: 'Todas las materias' },
                            { value: 'math', label: 'Matemáticas' },
                            { value: 'spanish', label: 'Español' },
                            { value: 'science', label: 'Ciencias' },
                            { value: 'english', label: 'Inglés' },
                            { value: 'history', label: 'Historia' },
                        ]}
                        className="w-48"
                    />
                    <Select
                        options={[
                            { value: '', label: 'Todos los estados' },
                            { value: 'active', label: 'Activo' },
                            { value: 'inactive', label: 'Inactivo' },
                        ]}
                        className="w-40"
                    />
                </div>
            </Card>

            {/* Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Nombre</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Documento</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Materia principal</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Horas/Semana</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Estado</th>
                                <th className="text-right py-3 px-2 font-medium text-gray-500">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profesoresData.map((profesor) => (
                                <tr key={profesor.id} className="border-b border-border/50 hover:bg-gray-50">
                                    <td className="py-3 px-2 font-medium">{profesor.name}</td>
                                    <td className="py-3 px-2 text-gray-500">{profesor.document}</td>
                                    <td className="py-3 px-2">{profesor.subject}</td>
                                    <td className="py-3 px-2 text-center">
                                        <Badge variant="info">{profesor.weeklyHours}h</Badge>
                                    </td>
                                    <td className="py-3 px-2 text-center">
                                        <Badge variant={profesor.status === 'active' ? 'success' : 'error'}>
                                            {profesor.status === 'active' ? 'Activo' : 'Inactivo'}
                                        </Badge>
                                    </td>
                                    <td className="py-3 px-2 text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button size="sm" variant="ghost" className="p-1 h-8 w-8" title="Ver perfil">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="p-1 h-8 w-8" title="Ver CV">
                                                <FileText className="w-4 h-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="p-1 h-8 w-8" title="Enviar correo">
                                                <Mail className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ProfesoresPage;
