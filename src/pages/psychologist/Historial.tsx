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
    User,
    Calendar,
    X
} from 'lucide-react';

// Mock history data
const historialData = [
    {
        id: 1,
        date: '2026-01-25',
        student: 'Juan Pérez',
        grade: '9°A',
        type: 'Individual',
        area: 'Académico',
        summary: 'Seguimiento por dificultades de atención. Se observa mejora significativa en concentración.',
        by: 'Dra. Ana Martínez',
        hasFollowUp: true
    },
    {
        id: 2,
        date: '2026-01-20',
        student: 'María García',
        grade: '9°A',
        type: 'Familiar',
        area: 'Social',
        summary: 'Reunión con padres sobre integración social. Se acordaron estrategias de apoyo.',
        by: 'Dra. Ana Martínez',
        hasFollowUp: true
    },
    {
        id: 3,
        date: '2026-01-18',
        student: 'Carlos López',
        grade: '10°B',
        type: 'Individual',
        area: 'Emocional',
        summary: 'Sesión de apoyo emocional. El estudiante muestra mejor manejo del estrés.',
        by: 'Dra. Ana Martínez',
        hasFollowUp: false
    },
    {
        id: 4,
        date: '2026-01-15',
        student: 'Varios (9°A)',
        grade: '9°A',
        type: 'Grupal',
        area: 'Conductual',
        summary: 'Taller de manejo del estrés y técnicas de relajación para el grupo.',
        by: 'Dra. Ana Martínez',
        hasFollowUp: false
    },
    {
        id: 5,
        date: '2026-01-10',
        student: 'Juan Pérez',
        grade: '9°A',
        type: 'Individual',
        area: 'Académico',
        summary: 'Evaluación inicial. Se identifican dificultades de atención. Se inicia plan.',
        by: 'Dra. Ana Martínez',
        hasFollowUp: true
    },
];

const HistorialPage: React.FC = () => {
    const [selectedRecord, setSelectedRecord] = useState<typeof historialData[0] | null>(null);

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'Individual': return <Badge variant="info">Individual</Badge>;
            case 'Familiar': return <Badge variant="success">Familiar</Badge>;
            case 'Grupal': return <Badge variant="warning">Grupal</Badge>;
            default: return <Badge variant="default">{type}</Badge>;
        }
    };

    const getAreaBadge = (area: string) => {
        switch (area) {
            case 'Emocional': return <Badge variant="error">Emocional</Badge>;
            case 'Conductual': return <Badge variant="warning">Conductual</Badge>;
            case 'Académico': return <Badge variant="info">Académico</Badge>;
            case 'Social': return <Badge variant="success">Social</Badge>;
            default: return <Badge variant="default">{area}</Badge>;
        }
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Historial de Atenciones</h1>
                    <p className="text-gray-500">Registro completo de sesiones y seguimientos</p>
                </div>
                <Button variant="outline" icon={Download}>Exportar</Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="!p-4 text-center">
                    <p className="text-3xl font-bold text-primary">{historialData.length}</p>
                    <p className="text-sm text-gray-500">Total atenciones</p>
                </Card>
                <Card className="!p-4 text-center">
                    <p className="text-3xl font-bold text-blue-600">{historialData.filter(h => h.type === 'Individual').length}</p>
                    <p className="text-sm text-gray-500">Individuales</p>
                </Card>
                <Card className="!p-4 text-center">
                    <p className="text-3xl font-bold text-green-600">{historialData.filter(h => h.type === 'Familiar').length}</p>
                    <p className="text-sm text-gray-500">Familiares</p>
                </Card>
                <Card className="!p-4 text-center">
                    <p className="text-3xl font-bold text-alert">{historialData.filter(h => h.hasFollowUp).length}</p>
                    <p className="text-sm text-gray-500">Con seguimiento</p>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Input placeholder="Buscar por estudiante..." icon={Search} />
                    </div>
                    <Select
                        options={[
                            { value: '', label: 'Todos los tipos' },
                            { value: 'individual', label: 'Individual' },
                            { value: 'familiar', label: 'Familiar' },
                            { value: 'grupal', label: 'Grupal' },
                        ]}
                        className="w-40"
                    />
                    <Select
                        options={[
                            { value: '', label: 'Todas las áreas' },
                            { value: 'emocional', label: 'Emocional' },
                            { value: 'conductual', label: 'Conductual' },
                            { value: 'academico', label: 'Académico' },
                            { value: 'social', label: 'Social' },
                        ]}
                        className="w-40"
                    />
                    <Input type="date" className="w-40" />
                </div>
            </Card>

            {/* Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Fecha</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Estudiante</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Grado</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Tipo</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Área</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Resumen</th>
                                <th className="text-right py-3 px-2 font-medium text-gray-500">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historialData.map((record) => (
                                <tr key={record.id} className="border-b border-border/50 hover:bg-gray-50">
                                    <td className="py-3 px-2 text-gray-500">{record.date}</td>
                                    <td className="py-3 px-2 font-medium">{record.student}</td>
                                    <td className="py-3 px-2">{record.grade}</td>
                                    <td className="py-3 px-2 text-center">{getTypeBadge(record.type)}</td>
                                    <td className="py-3 px-2 text-center">{getAreaBadge(record.area)}</td>
                                    <td className="py-3 px-2 text-gray-600 max-w-xs truncate" title={record.summary}>
                                        {record.summary}
                                    </td>
                                    <td className="py-3 px-2 text-right">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="p-1 h-8 w-8"
                                            title="Ver detalle"
                                            onClick={() => setSelectedRecord(record)}
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Detail Modal */}
            {selectedRecord && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-card shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center p-6 border-b border-border">
                            <div>
                                <h3 className="text-lg font-semibold text-text-main">Detalle de atención</h3>
                                <p className="text-sm text-gray-500">{selectedRecord.date}</p>
                            </div>
                            <button onClick={() => setSelectedRecord(null)} className="text-gray-400 hover:text-gray-600 p-2">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium text-text-main">{selectedRecord.student}</p>
                                    <p className="text-sm text-gray-500">{selectedRecord.grade}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {getTypeBadge(selectedRecord.type)}
                                {getAreaBadge(selectedRecord.area)}
                                {selectedRecord.hasFollowUp && <Badge variant="warning">Con seguimiento</Badge>}
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Resumen</h4>
                                <p className="text-text-main">{selectedRecord.summary}</p>
                            </div>

                            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                    Registrado por: <strong>{selectedRecord.by}</strong>
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 p-6 border-t border-border bg-gray-50">
                            <Button variant="outline" onClick={() => setSelectedRecord(null)}>Cerrar</Button>
                            <Button variant="primary">Editar nota</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistorialPage;
