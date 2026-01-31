import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import {
    Search,
    Download,
    DollarSign,
    Phone,
    Mail,
    Eye,
    AlertCircle,
    CheckCircle
} from 'lucide-react';

// Mock data
const carteraData = [
    { id: 1, name: 'Juan Pérez', document: '1234567890', grade: '9°A', balance: 350000, lastPayment: '2026-01-15', status: 'mora' },
    { id: 2, name: 'María García', document: '0987654321', grade: '9°A', balance: 0, lastPayment: '2026-01-28', status: 'al_dia' },
    { id: 3, name: 'Carlos López', document: '1122334455', grade: '10°B', balance: 175000, lastPayment: '2026-01-20', status: 'pendiente' },
    { id: 4, name: 'Ana Torres', document: '5544332211', grade: '8°C', balance: 700000, lastPayment: '2025-12-15', status: 'mora' },
    { id: 5, name: 'Pedro Martínez', document: '6677889900', grade: '11°A', balance: 0, lastPayment: '2026-01-25', status: 'al_dia' },
    { id: 6, name: 'Laura Sánchez', document: '7788990011', grade: '7°B', balance: 350000, lastPayment: '2026-01-10', status: 'pendiente' },
];

const CarteraPage: React.FC = () => {
    const [filter, setFilter] = useState('');

    const filteredData = carteraData.filter(s =>
        filter === '' || s.status === filter
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'al_dia': return <Badge variant="success">Al día</Badge>;
            case 'pendiente': return <Badge variant="warning">Pendiente</Badge>;
            case 'mora': return <Badge variant="error">En mora</Badge>;
            default: return <Badge variant="default">{status}</Badge>;
        }
    };

    const totalBalance = carteraData.reduce((acc, s) => acc + s.balance, 0);
    const moraCount = carteraData.filter(s => s.status === 'mora').length;
    const alDiaCount = carteraData.filter(s => s.status === 'al_dia').length;

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Cartera de Estudiantes</h1>
                    <p className="text-gray-500">Gestión de pagos y estados de cuenta</p>
                </div>
                <Button variant="outline" icon={Download}>Exportar reporte</Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="!p-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-text-main">${totalBalance.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Cartera total</p>
                        </div>
                    </div>
                </Card>
                <Card className="!p-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-text-main">{moraCount}</p>
                            <p className="text-xs text-gray-500">En mora</p>
                        </div>
                    </div>
                </Card>
                <Card className="!p-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-text-main">{carteraData.filter(s => s.status === 'pendiente').length}</p>
                            <p className="text-xs text-gray-500">Pendientes</p>
                        </div>
                    </div>
                </Card>
                <Card className="!p-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-success" />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-text-main">{alDiaCount}</p>
                            <p className="text-xs text-gray-500">Al día</p>
                        </div>
                    </div>
                </Card>
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
                            { value: '6', label: '6°' },
                            { value: '7', label: '7°' },
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
                            { value: 'al_dia', label: 'Al día' },
                            { value: 'pendiente', label: 'Pendiente' },
                            { value: 'mora', label: 'En mora' },
                        ]}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
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
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Estudiante</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Documento</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Grado</th>
                                <th className="text-right py-3 px-2 font-medium text-gray-500">Saldo pendiente</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Último pago</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Estado</th>
                                <th className="text-right py-3 px-2 font-medium text-gray-500">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((student) => (
                                <tr key={student.id} className="border-b border-border/50 hover:bg-gray-50">
                                    <td className="py-3 px-2 font-medium">{student.name}</td>
                                    <td className="py-3 px-2 text-gray-500">{student.document}</td>
                                    <td className="py-3 px-2">{student.grade}</td>
                                    <td className="py-3 px-2 text-right">
                                        <span className={student.balance > 0 ? 'text-alert font-bold' : 'text-success font-medium'}>
                                            ${student.balance.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="py-3 px-2 text-gray-500">{student.lastPayment}</td>
                                    <td className="py-3 px-2 text-center">{getStatusBadge(student.status)}</td>
                                    <td className="py-3 px-2 text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button size="sm" variant="ghost" className="p-1 h-8 w-8" title="Ver detalle">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="p-1 h-8 w-8" title="Llamar">
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

export default CarteraPage;
