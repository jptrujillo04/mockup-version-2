import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Plus, X } from 'lucide-react';

// Mock data
const observationsData = [
    {
        id: 1,
        student: 'Juan Pérez',
        period: 'T1',
        type: 'positive',
        description: 'Excelente participación en clase',
        date: '2026-01-25',
        requiresSignature: true,
        signed: true,
    },
    {
        id: 2,
        student: 'Carlos López',
        period: 'T1',
        type: 'negative',
        description: 'No presentó tarea sin justificación',
        date: '2026-01-20',
        requiresSignature: true,
        signed: false,
    },
];

const TeacherObserver: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Observador Docente</h1>
                    <p className="text-gray-500">Registra observaciones de estudiantes</p>
                </div>
                <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
                    Nueva Anotación
                </Button>
            </div>

            {/* Observations Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Estudiante</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Período</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Tipo</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Descripción</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Fecha</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Firmado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {observationsData.map((obs) => (
                                <tr key={obs.id} className="border-b border-border/50 hover:bg-gray-50">
                                    <td className="py-3 px-2 font-medium">{obs.student}</td>
                                    <td className="py-3 px-2 text-center">
                                        <Badge variant="info">{obs.period}</Badge>
                                    </td>
                                    <td className="py-3 px-2">
                                        <Badge variant={obs.type === 'positive' ? 'success' : 'error'}>
                                            {obs.type === 'positive' ? 'Positivo' : 'Negativo'}
                                        </Badge>
                                    </td>
                                    <td className="py-3 px-2 text-gray-600 max-w-xs truncate">{obs.description}</td>
                                    <td className="py-3 px-2 text-gray-500">{obs.date}</td>
                                    <td className="py-3 px-2 text-center">
                                        <Badge variant={obs.signed ? 'success' : 'warning'}>
                                            {obs.signed ? 'Sí' : 'Pendiente'}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* New Annotation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-card shadow-xl p-6 max-w-lg w-full mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-text-main">Nueva Anotación</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <Select
                                label="Período"
                                options={[
                                    { value: 't1', label: 'Primer Trimestre' },
                                    { value: 't2', label: 'Segundo Trimestre' },
                                    { value: 't3', label: 'Tercer Trimestre' },
                                ]}
                            />

                            <Select
                                label="Estudiante"
                                options={[
                                    { value: '1', label: 'Juan Pérez - 9°A' },
                                    { value: '2', label: 'María García - 9°A' },
                                    { value: '3', label: 'Carlos López - 9°B' },
                                ]}
                            />

                            <Select
                                label="Tipo"
                                options={[
                                    { value: 'positive', label: 'Positivo' },
                                    { value: 'neutral', label: 'Neutral' },
                                    { value: 'negative', label: 'Negativo' },
                                ]}
                            />

                            <div>
                                <label className="block text-sm font-medium text-text-main mb-1">Descripción</label>
                                <textarea
                                    className="w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary text-sm p-3 min-h-[100px]"
                                    placeholder="Describe la observación..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-main mb-1">Descargos (opcional)</label>
                                <textarea
                                    className="w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary text-sm p-3"
                                    placeholder="Notas adicionales..."
                                    rows={2}
                                />
                            </div>

                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                                <span className="text-sm text-gray-600">Solicitar firma del acudiente</span>
                            </label>
                        </div>

                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                            <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
                            <Button variant="primary" onClick={() => setShowModal(false)}>Guardar</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherObserver;
