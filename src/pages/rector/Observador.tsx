import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import {
    Search,
    Plus,
    Eye,
    X,
    Save
} from 'lucide-react';

// Mock data
const observacionesData = [
    { id: 1, date: '2026-01-28', student: 'Juan Pérez', grade: '9°A', type: 'Positiva', description: 'Excelente desempeño en olimpiadas de matemáticas.', by: 'María González' },
    { id: 2, date: '2026-01-27', student: 'María García', grade: '9°A', type: 'Negativa', description: 'Inasistencia reiterada sin justificación.', by: 'Coordinación' },
    { id: 3, date: '2026-01-25', student: 'Carlos López', grade: '10°B', type: 'Neutral', description: 'Se solicita cita con acudientes.', by: 'Psicología' },
    { id: 4, date: '2026-01-24', student: 'Ana Torres', grade: '8°C', type: 'Positiva', description: 'Liderazgo en actividades extracurriculares.', by: 'Coord. Convivencia' },
    { id: 5, date: '2026-01-22', student: 'Pedro Martínez', grade: '11°A', type: 'Negativa', description: 'Incumplimiento del uniforme institucional.', by: 'Coordinación' },
];

const ObservadorPage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'Positiva': return <Badge variant="success">Positiva</Badge>;
            case 'Negativa': return <Badge variant="error">Negativa</Badge>;
            default: return <Badge variant="info">Neutral</Badge>;
        }
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Observador Institucional</h1>
                    <p className="text-gray-500">Registro de observaciones y seguimiento de estudiantes</p>
                </div>
                <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
                    Nueva observación
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="!p-4 text-center">
                    <p className="text-3xl font-bold text-success">{observacionesData.filter(o => o.type === 'Positiva').length}</p>
                    <p className="text-sm text-gray-500">Observaciones positivas</p>
                </Card>
                <Card className="!p-4 text-center">
                    <p className="text-3xl font-bold text-alert">{observacionesData.filter(o => o.type === 'Negativa').length}</p>
                    <p className="text-sm text-gray-500">Observaciones negativas</p>
                </Card>
                <Card className="!p-4 text-center">
                    <p className="text-3xl font-bold text-blue-600">{observacionesData.filter(o => o.type === 'Neutral').length}</p>
                    <p className="text-sm text-gray-500">Observaciones neutrales</p>
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
                            { value: '', label: 'Todos los tipos' },
                            { value: 'positive', label: 'Positiva' },
                            { value: 'negative', label: 'Negativa' },
                            { value: 'neutral', label: 'Neutral' },
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
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Fecha</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Estudiante</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Grado</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Tipo</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Descripción</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Registrado por</th>
                                <th className="text-right py-3 px-2 font-medium text-gray-500">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {observacionesData.map((obs) => (
                                <tr key={obs.id} className="border-b border-border/50 hover:bg-gray-50">
                                    <td className="py-3 px-2 text-gray-500">{obs.date}</td>
                                    <td className="py-3 px-2 font-medium">{obs.student}</td>
                                    <td className="py-3 px-2">{obs.grade}</td>
                                    <td className="py-3 px-2 text-center">{getTypeBadge(obs.type)}</td>
                                    <td className="py-3 px-2 text-gray-600 max-w-xs truncate" title={obs.description}>
                                        {obs.description}
                                    </td>
                                    <td className="py-3 px-2 text-gray-500">{obs.by}</td>
                                    <td className="py-3 px-2 text-right">
                                        <Button size="sm" variant="ghost" className="p-1 h-8 w-8" title="Ver detalle">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-card shadow-xl max-w-lg w-full">
                        <div className="flex justify-between items-center p-6 border-b border-border">
                            <h3 className="text-lg font-semibold text-text-main">Nueva Observación</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 p-2">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <Input label="Estudiante" placeholder="Buscar estudiante..." />
                            <Select
                                label="Tipo de observación"
                                options={[
                                    { value: 'positive', label: 'Positiva' },
                                    { value: 'negative', label: 'Negativa' },
                                    { value: 'neutral', label: 'Neutral' },
                                ]}
                            />
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-1">Descripción</label>
                                <textarea
                                    className="w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary text-sm p-3 min-h-[100px]"
                                    placeholder="Describe la observación..."
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="notify" className="rounded text-primary" />
                                <label htmlFor="notify" className="text-sm text-gray-600">Notificar a acudientes</label>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 p-6 border-t border-border bg-gray-50">
                            <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
                            <Button variant="primary" icon={Save} onClick={() => setShowModal(false)}>Guardar</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ObservadorPage;
