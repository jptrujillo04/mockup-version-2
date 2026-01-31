import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import {
    Search,
    Calendar,
    User,
    Clock,
    CheckCircle,
    AlertCircle,
    X,
    Share2,
    Save
} from 'lucide-react';

// Mock data
const studentsData = [
    {
        id: 1,
        name: 'Juan Pérez',
        document: '1234567890',
        grade: '9°A',
        lastSession: '2026-01-25',
        status: 'active',
        hasPlan: true,
        plan: {
            title: 'Plan de acompañamiento - Juan Pérez',
            description: 'Seguimiento por dificultades de atención en clase. Se recomienda trabajo conjunto con docentes para implementar estrategias de concentración.',
            objectives: [
                'Mejorar tiempos de atención en clase',
                'Implementar técnicas de estudio',
                'Reuniones quincenales con acudientes',
            ],
            startDate: '2026-01-15',
            nextReview: '2026-02-15',
        }
    },
    {
        id: 2,
        name: 'María García',
        document: '0987654321',
        grade: '9°A',
        lastSession: '2026-01-20',
        status: 'pending',
        hasPlan: false,
        plan: null
    },
    {
        id: 3,
        name: 'Carlos López',
        document: '1122334455',
        grade: '10°B',
        lastSession: '2026-01-18',
        status: 'active',
        hasPlan: true,
        plan: {
            title: 'Plan de acompañamiento - Carlos López',
            description: 'Apoyo emocional por situación familiar. Seguimiento semanal.',
            objectives: [
                'Sesiones semanales de apoyo',
                'Coordinación con orientación familiar',
                'Evaluación mensual de progreso',
            ],
            startDate: '2026-01-10',
            nextReview: '2026-02-10',
        }
    },
    {
        id: 4,
        name: 'Ana Torres',
        document: '5544332211',
        grade: '8°C',
        lastSession: null,
        status: 'new',
        hasPlan: false,
        plan: null
    },
];

const historyData = [
    { id: 1, date: '2026-01-25', type: 'Individual', student: 'Juan Pérez', summary: 'Sesión de seguimiento. Mejora en atención.', by: 'Dra. Ana Martínez' },
    { id: 2, date: '2026-01-20', type: 'Familiar', student: 'María García', summary: 'Reunión con padres sobre rendimiento académico.', by: 'Dra. Ana Martínez' },
    { id: 3, date: '2026-01-18', type: 'Individual', student: 'Carlos López', summary: 'Sesión de apoyo emocional.', by: 'Dra. Ana Martínez' },
    { id: 4, date: '2026-01-15', type: 'Grupal', student: 'Varios (9°A)', summary: 'Taller de manejo del estrés.', by: 'Dra. Ana Martínez' },
    { id: 5, date: '2026-01-10', type: 'Individual', student: 'Juan Pérez', summary: 'Evaluación inicial. Se inicia plan de acompañamiento.', by: 'Dra. Ana Martínez' },
];

const PsychologistDashboard: React.FC = () => {
    const [selectedStudent, setSelectedStudent] = useState<typeof studentsData[0] | null>(null);
    const [showPlanModal, setShowPlanModal] = useState(false);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active': return <Badge variant="success">Activo</Badge>;
            case 'pending': return <Badge variant="warning">Pendiente</Badge>;
            case 'new': return <Badge variant="info">Nuevo</Badge>;
            default: return <Badge variant="default">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-text-main">Psicología</h1>
                <p className="text-gray-500">Gestión de atenciones y seguimiento estudiantil</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="flex items-center gap-4 !p-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-text-main">{studentsData.length}</p>
                        <p className="text-xs text-gray-500">Estudiantes en seguimiento</p>
                    </div>
                </Card>
                <Card className="flex items-center gap-4 !p-4">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-text-main">{studentsData.filter(s => s.hasPlan).length}</p>
                        <p className="text-xs text-gray-500">Con plan activo</p>
                    </div>
                </Card>
                <Card className="flex items-center gap-4 !p-4">
                    <div className="w-10 h-10 bg-alert/10 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-alert" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-text-main">{studentsData.filter(s => s.status === 'pending').length}</p>
                        <p className="text-xs text-gray-500">Pendientes</p>
                    </div>
                </Card>
                <Card className="flex items-center gap-4 !p-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-text-main">{historyData.length}</p>
                        <p className="text-xs text-gray-500">Atenciones este mes</p>
                    </div>
                </Card>
            </div>

            {/* Student Search */}
            <Card title="Buscador de Estudiantes">
                <div className="flex gap-4 mb-6">
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
                            { value: 'pending', label: 'Pendiente' },
                            { value: 'new', label: 'Nuevo' },
                        ]}
                        className="w-40"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Nombre</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Documento</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Grado</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Última sesión</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Estado</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Plan</th>
                                <th className="text-right py-3 px-2 font-medium text-gray-500">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsData.map((student) => (
                                <tr key={student.id} className="border-b border-border/50 hover:bg-gray-50">
                                    <td className="py-3 px-2 font-medium">{student.name}</td>
                                    <td className="py-3 px-2 text-gray-500">{student.document}</td>
                                    <td className="py-3 px-2">{student.grade}</td>
                                    <td className="py-3 px-2 text-gray-500">{student.lastSession || '—'}</td>
                                    <td className="py-3 px-2 text-center">{getStatusBadge(student.status)}</td>
                                    <td className="py-3 px-2 text-center">
                                        {student.hasPlan ? (
                                            <CheckCircle className="w-5 h-5 text-success mx-auto" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-gray-300 mx-auto" />
                                        )}
                                    </td>
                                    <td className="py-3 px-2 text-right">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                setSelectedStudent(student);
                                                if (student.hasPlan) {
                                                    setShowPlanModal(true);
                                                }
                                            }}
                                        >
                                            {student.hasPlan ? 'Ver plan' : 'Crear plan'}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Diagnosis Form */}
                <Card title="Notas de Diagnóstico">
                    <div className="space-y-4">
                        <Select
                            label="Estudiante"
                            options={[
                                { value: '', label: 'Seleccionar estudiante...' },
                                ...studentsData.map(s => ({ value: s.id.toString(), label: `${s.name} - ${s.grade}` }))
                            ]}
                        />
                        <Select
                            label="Tipo de sesión"
                            options={[
                                { value: 'individual', label: 'Individual' },
                                { value: 'familiar', label: 'Familiar' },
                                { value: 'grupal', label: 'Grupal' },
                            ]}
                        />
                        <div>
                            <label className="block text-sm font-medium text-text-main mb-1">Notas privadas</label>
                            <textarea
                                className="w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary text-sm p-3 min-h-[120px]"
                                placeholder="Registra las observaciones de la sesión..."
                            />
                        </div>
                        <Input label="Próximo encuentro" type="date" />
                        <Button variant="primary" icon={Save} className="w-full">
                            Guardar Nota
                        </Button>
                    </div>
                </Card>

                {/* History Timeline */}
                <Card title="Historial de Atenciones">
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {historyData.map((item, idx) => (
                            <div key={item.id} className="relative pl-6 pb-4">
                                {/* Timeline line */}
                                {idx < historyData.length - 1 && (
                                    <div className="absolute left-[9px] top-6 bottom-0 w-0.5 bg-border" />
                                )}
                                {/* Timeline dot */}
                                <div className={`absolute left-0 top-1 w-5 h-5 rounded-full flex items-center justify-center ${item.type === 'Individual' ? 'bg-primary' :
                                    item.type === 'Familiar' ? 'bg-success' : 'bg-purple-500'
                                    }`}>
                                    <User className="w-3 h-3 text-white" />
                                </div>
                                {/* Content */}
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-medium text-text-main text-sm">{item.student}</span>
                                        <span className="text-xs text-gray-400">{item.date}</span>
                                    </div>
                                    <Badge
                                        variant={item.type === 'Individual' ? 'info' : item.type === 'Familiar' ? 'success' : 'default'}
                                        className="mb-2"
                                    >
                                        {item.type}
                                    </Badge>
                                    <p className="text-sm text-gray-600">{item.summary}</p>
                                    <p className="text-xs text-gray-400 mt-1">{item.by}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Plan Modal */}
            {showPlanModal && selectedStudent?.plan && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-card shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-border">
                            <div>
                                <h3 className="text-lg font-semibold text-text-main">{selectedStudent.plan.title}</h3>
                                <p className="text-sm text-gray-500">Iniciado: {selectedStudent.plan.startDate}</p>
                            </div>
                            <button
                                onClick={() => setShowPlanModal(false)}
                                className="text-gray-400 hover:text-gray-600 p-2"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto flex-1 space-y-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Descripción</h4>
                                <p className="text-text-main">{selectedStudent.plan.description}</p>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Objetivos</h4>
                                <ul className="space-y-2">
                                    {selectedStudent.plan.objectives.map((obj, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-text-main">{obj}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <span className="text-sm text-blue-800">
                                    Próxima revisión: <strong>{selectedStudent.plan.nextReview}</strong>
                                </span>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-between gap-3 p-6 border-t border-border bg-gray-50">
                            <Button variant="outline" icon={Share2}>
                                Compartir con familia
                            </Button>
                            <Button variant="primary" onClick={() => setShowPlanModal(false)}>
                                Actualizar plan
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PsychologistDashboard;
