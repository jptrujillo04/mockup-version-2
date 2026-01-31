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
    Phone,
    UserPlus
} from 'lucide-react';

// Mock data - includes Juan Pérez
const estudiantesData = [
    { id: 1, name: 'Juan Pérez', document: '1234567890', grade: '9°A', status: 'active', balance: 350000 },
    { id: 2, name: 'María García', document: '0987654321', grade: '9°A', status: 'active', balance: 0 },
    { id: 3, name: 'Carlos López', document: '1122334455', grade: '10°B', status: 'active', balance: 175000 },
    { id: 4, name: 'Ana Torres', document: '5544332211', grade: '8°C', status: 'inactive', balance: 0 },
    { id: 5, name: 'Pedro Martínez', document: '6677889900', grade: '11°A', status: 'active', balance: 0 },
];

const EstudiantesPage: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Estudiantes</h1>
                    <p className="text-gray-500">Gestión de estudiantes matriculados</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" icon={Download}>Exportar</Button>
                    <Button variant="primary" icon={UserPlus}>Nuevo estudiante</Button>
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
                            { value: '', label: 'Todos los grados' },
                            { value: '8', label: '8°' },
                            { value: '9', label: '9°' },
                            { value: '10', label: '10°' },
                            { value: '11', label: '11°' },
                        ]}
                        className="w-40"
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
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Grado</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Estado</th>
                                <th className="text-right py-3 px-2 font-medium text-gray-500">Saldo</th>
                                <th className="text-right py-3 px-2 font-medium text-gray-500">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estudiantesData.map((estudiante) => (
                                <tr key={estudiante.id} className="border-b border-border/50 hover:bg-gray-50">
                                    <td className="py-3 px-2 font-medium">{estudiante.name}</td>
                                    <td className="py-3 px-2 text-gray-500">{estudiante.document}</td>
                                    <td className="py-3 px-2">{estudiante.grade}</td>
                                    <td className="py-3 px-2 text-center">
                                        <Badge variant={estudiante.status === 'active' ? 'success' : 'error'}>
                                            {estudiante.status === 'active' ? 'Activo' : 'Inactivo'}
                                        </Badge>
                                    </td>
                                    <td className="py-3 px-2 text-right">
                                        <span className={estudiante.balance > 0 ? 'text-alert font-medium' : 'text-gray-500'}>
                                            ${estudiante.balance.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="py-3 px-2 text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button size="sm" variant="ghost" className="p-1 h-8 w-8" title="Ver perfil">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="p-1 h-8 w-8" title="Llamar acudiente">
                                                <Phone className="w-4 h-4" />
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

export default EstudiantesPage;
