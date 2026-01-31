import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import {
    Save,
    AlertCircle,
    CheckCircle
} from 'lucide-react';

// Mock students
const studentsData = [
    { id: 1, name: 'Juan Pérez', grade: '9°A' },
    { id: 2, name: 'María García', grade: '9°A' },
    { id: 3, name: 'Carlos López', grade: '10°B' },
    { id: 4, name: 'Ana Torres', grade: '8°C' },
];

const DiagnosticoPage: React.FC = () => {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-text-main">Notas de Diagnóstico</h1>
                <p className="text-gray-500">Registro de sesiones y observaciones psicológicas</p>
            </div>

            {/* Success Message */}
            {saved && (
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg text-success text-sm flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    ¡Nota de diagnóstico guardada exitosamente!
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form */}
                <div className="lg:col-span-2">
                    <Card title="Nueva nota de diagnóstico">
                        <div className="space-y-6">
                            {/* Student Selection */}
                            <Select
                                label="Estudiante"
                                options={[
                                    { value: '', label: 'Seleccionar estudiante...' },
                                    ...studentsData.map(s => ({ value: s.id.toString(), label: `${s.name} - ${s.grade}` }))
                                ]}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Select
                                    label="Tipo de sesión"
                                    options={[
                                        { value: 'individual', label: 'Individual' },
                                        { value: 'familiar', label: 'Familiar' },
                                        { value: 'grupal', label: 'Grupal' },
                                    ]}
                                />
                                <Input label="Fecha de la sesión" type="date" />
                            </div>

                            <Select
                                label="Área de atención"
                                options={[
                                    { value: '', label: 'Seleccionar área...' },
                                    { value: 'emocional', label: 'Emocional' },
                                    { value: 'conductual', label: 'Conductual' },
                                    { value: 'academico', label: 'Académico' },
                                    { value: 'social', label: 'Social' },
                                    { value: 'familiar', label: 'Familiar' },
                                ]}
                            />

                            <div>
                                <label className="block text-sm font-medium text-text-main mb-1">
                                    Motivo de consulta
                                </label>
                                <textarea
                                    className="w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary text-sm p-3 min-h-[80px]"
                                    placeholder="Describe el motivo por el cual el estudiante asiste a la sesión..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-main mb-1">
                                    Observaciones de la sesión
                                </label>
                                <textarea
                                    className="w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary text-sm p-3 min-h-[120px]"
                                    placeholder="Registra las observaciones, comportamientos y aspectos relevantes de la sesión..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-main mb-1">
                                    Recomendaciones
                                </label>
                                <textarea
                                    className="w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary text-sm p-3 min-h-[80px]"
                                    placeholder="Indica las recomendaciones o acciones a seguir..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Select
                                    label="Requiere seguimiento"
                                    options={[
                                        { value: 'yes', label: 'Sí, programar siguiente sesión' },
                                        { value: 'no', label: 'No requiere seguimiento inmediato' },
                                    ]}
                                />
                                <Input label="Próxima cita" type="date" />
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="notifyParents" className="rounded text-primary" />
                                <label htmlFor="notifyParents" className="text-sm text-gray-600">
                                    Notificar a los acudientes sobre esta sesión
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button variant="outline" className="flex-1">
                                    Cancelar
                                </Button>
                                <Button variant="primary" icon={Save} className="flex-1" onClick={handleSave}>
                                    Guardar nota
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <Card title="Información importante">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-start gap-2">
                                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-blue-800">
                                    <p className="font-medium mb-1">Confidencialidad</p>
                                    <p>Todas las notas de diagnóstico son confidenciales y solo pueden ser accedidas por personal autorizado del departamento de psicología.</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card title="Últimas notas">
                        <div className="space-y-3">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="font-medium text-sm text-text-main">Juan Pérez</p>
                                <p className="text-xs text-gray-500">2026-01-25 · Individual</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="font-medium text-sm text-text-main">María García</p>
                                <p className="text-xs text-gray-500">2026-01-20 · Familiar</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="font-medium text-sm text-text-main">Carlos López</p>
                                <p className="text-xs text-gray-500">2026-01-18 · Individual</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DiagnosticoPage;
