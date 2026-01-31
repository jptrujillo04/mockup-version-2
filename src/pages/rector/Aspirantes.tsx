import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import {
    Search,
    Download,
    Eye,
    CheckCircle,
    X,
    UserPlus,
    Inbox
} from 'lucide-react';

// Mock data
const aspirantesData = [
    { id: 1, name: 'Pedro Gómez', document: '1098765432', grade: '6°', status: 'pending', date: '2026-01-20' },
    { id: 2, name: 'Laura Méndez', document: '1087654321', grade: '9°', status: 'approved', date: '2026-01-18' },
    { id: 3, name: 'Diego Ramírez', document: '1076543210', grade: '7°', status: 'pending', date: '2026-01-22' },
    { id: 4, name: 'Sofía Castro', document: '1065432109', grade: '10°', status: 'rejected', date: '2026-01-15' },
    { id: 5, name: 'Andrés Vargas', document: '1054321098', grade: '8°', status: 'pending', date: '2026-01-25' },
];

const AspirantesPage: React.FC = () => {
    const [filter, setFilter] = useState('');

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved': return <Badge variant="success">Aprobado</Badge>;
            case 'rejected': return <Badge variant="error">Rechazado</Badge>;
            default: return <Badge variant="warning">Pendiente</Badge>;
        }
    };

    const filteredData = aspirantesData.filter(a =>
        filter === '' || a.status === filter
    );

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Aspirantes</h1>
                    <p className="text-gray-500">Gestión de solicitudes de admisión</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" icon={Download}>Exportar</Button>
                    <Button variant="primary" icon={UserPlus}>Nuevo aspirante</Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="!p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-alert/10 rounded-lg flex items-center justify-center">
                        <Inbox className="w-5 h-5 text-alert" />
                    </div>
                    <div>
                        <p className="text-xl font-bold">{aspirantesData.filter(a => a.status === 'pending').length}</p>
                        <p className="text-xs text-gray-500">Pendientes</p>
                    </div>
                </Card>
                <Card className="!p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                    <div>
                        <p className="text-xl font-bold">{aspirantesData.filter(a => a.status === 'approved').length}</p>
                        <p className="text-xs text-gray-500">Aprobados</p>
                    </div>
                </Card>
                <Card className="!p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <X className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                        <p className="text-xl font-bold">{aspirantesData.filter(a => a.status === 'rejected').length}</p>
                        <p className="text-xs text-gray-500">Rechazados</p>
                    </div>
                </Card>
            </div>

            {/* Table */}
            <Card>
                <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                        <Input placeholder="Buscar aspirante..." icon={Search} />
                    </div>
                    <Select
                        options={[
                            { value: '', label: 'Todos los estados' },
                            { value: 'pending', label: 'Pendiente' },
                            { value: 'approved', label: 'Aprobado' },
                            { value: 'rejected', label: 'Rechazado' },
                        ]}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-48"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Nombre</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Documento</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Grado solicitado</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Fecha solicitud</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Estado</th>
                                <th className="text-right py-3 px-2 font-medium text-gray-500">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((aspirante) => (
                                <tr key={aspirante.id} className="border-b border-border/50 hover:bg-gray-50">
                                    <td className="py-3 px-2 font-medium">{aspirante.name}</td>
                                    <td className="py-3 px-2 text-gray-500">{aspirante.document}</td>
                                    <td className="py-3 px-2">{aspirante.grade}</td>
                                    <td className="py-3 px-2 text-gray-500">{aspirante.date}</td>
                                    <td className="py-3 px-2 text-center">{getStatusBadge(aspirante.status)}</td>
                                    <td className="py-3 px-2 text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button size="sm" variant="ghost" className="p-1 h-8 w-8" title="Ver expediente">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            {aspirante.status === 'pending' && (
                                                <>
                                                    <Button size="sm" variant="ghost" className="p-1 h-8 w-8 text-success" title="Aprobar">
                                                        <CheckCircle className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="sm" variant="ghost" className="p-1 h-8 w-8 text-red-500" title="Rechazar">
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </>
                                            )}
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

export default AspirantesPage;
