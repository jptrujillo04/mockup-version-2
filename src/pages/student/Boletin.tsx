import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
    Download,
    MessageSquare,
    TrendingUp,
    Users,
    Calendar,
    AlertCircle,
    CheckCircle,
    User
} from 'lucide-react';

// Types
interface GradeRecord {
    id: number;
    subject: string;
    absences: number;
    grade: number;
    performance: 'superior' | 'alto' | 'basico' | 'bajo';
    observation: string;
}

interface PeriodData {
    grades: GradeRecord[];
    average: number;
    attendance: number;
    failingSubjects: number;
    rank: string;
    available: boolean;
}

// Mock Data by Period
const periodData: Record<string, PeriodData> = {
    p1: {
        grades: [
            { id: 1, subject: 'Matemáticas', absences: 1, grade: 4.1, performance: 'alto', observation: 'Buen inicio de año. Participación activa en clase.' },
            { id: 2, subject: 'Español', absences: 0, grade: 3.8, performance: 'basico', observation: 'Debe mejorar la ortografía en sus textos escritos.' },
            { id: 3, subject: 'Ciencias', absences: 2, grade: 4.4, performance: 'alto', observation: 'Excelente desempeño en laboratorios prácticos.' },
            { id: 4, subject: 'Inglés', absences: 1, grade: 3.5, performance: 'basico', observation: 'Necesita practicar más la pronunciación.' },
            { id: 5, subject: 'Historia', absences: 0, grade: 4.0, performance: 'alto', observation: 'Buen análisis de documentos históricos.' },
        ],
        average: 3.96,
        attendance: 96,
        failingSubjects: 0,
        rank: '8/32',
        available: true
    },
    p2: {
        grades: [
            { id: 1, subject: 'Matemáticas', absences: 2, grade: 4.2, performance: 'alto', observation: 'Mejora notable en resolución de problemas.' },
            { id: 2, subject: 'Español', absences: 0, grade: 4.0, performance: 'alto', observation: 'Buen progreso en expresión escrita.' },
            { id: 3, subject: 'Ciencias', absences: 1, grade: 4.5, performance: 'superior', observation: 'Destaca en investigación científica.' },
            { id: 4, subject: 'Inglés', absences: 3, grade: 3.9, performance: 'basico', observation: 'Ha mejorado fluidez en conversación.' },
            { id: 5, subject: 'Historia', absences: 0, grade: 4.3, performance: 'alto', observation: 'Excelente exposición sobre la Independencia.' },
        ],
        average: 4.18,
        attendance: 94,
        failingSubjects: 0,
        rank: '6/32',
        available: true
    },
    p3: {
        grades: [
            { id: 1, subject: 'Matemáticas', absences: 2, grade: 4.3, performance: 'alto', observation: 'Excelente participación en clase. Destaca en álgebra.' },
            { id: 2, subject: 'Español', absences: 0, grade: 4.0, performance: 'alto', observation: 'Buen desempeño en comprensión lectora y escritura creativa.' },
            { id: 3, subject: 'Ciencias', absences: 1, grade: 4.6, performance: 'superior', observation: 'Sobresaliente en prácticas de laboratorio. Líder de grupo.' },
            { id: 4, subject: 'Inglés', absences: 3, grade: 3.6, performance: 'basico', observation: 'Debe reforzar pronunciación y vocabulario avanzado.' },
            { id: 5, subject: 'Historia', absences: 0, grade: 4.1, performance: 'alto', observation: 'Buen análisis crítico de eventos históricos.' },
        ],
        average: 4.12,
        attendance: 98,
        failingSubjects: 0,
        rank: '5/32',
        available: true
    },
    p4: {
        grades: [],
        average: 0,
        attendance: 0,
        failingSubjects: 0,
        rank: '-',
        available: false
    },
    final: {
        grades: [],
        average: 0,
        attendance: 0,
        failingSubjects: 0,
        rank: '-',
        available: false
    }
};

const periodTabs = [
    { value: 'p1', label: 'Periodo 1', isCurrent: false, disabled: false },
    { value: 'p2', label: 'Periodo 2', isCurrent: false, disabled: false },
    { value: 'p3', label: 'Periodo 3', isCurrent: true, disabled: false },
    { value: 'p4', label: 'Periodo 4', isCurrent: false, disabled: true },
    { value: 'final', label: 'Final', isCurrent: false, disabled: true },
];

const Boletin: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('p3');
    const [isDownloading, setIsDownloading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [hoveredObservation, setHoveredObservation] = useState<number | null>(null);

    const currentData = periodData[selectedPeriod];

    // Get performance badge
    const getPerformanceBadge = (performance: GradeRecord['performance']) => {
        const styles = {
            superior: 'bg-primary/10 text-primary border border-primary/20',
            alto: 'bg-green-50 text-green-700 border border-green-200',
            basico: 'bg-orange-50 text-orange-700 border border-orange-200',
            bajo: 'bg-red-50 text-red-700 border border-red-200',
        };
        const labels = {
            superior: 'Superior',
            alto: 'Alto',
            basico: 'Básico',
            bajo: 'Bajo',
        };
        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[performance]}`}>
                {labels[performance]}
            </span>
        );
    };

    // Handle PDF download simulation
    const handleDownloadPDF = () => {
        setIsDownloading(true);

        // Simulate PDF generation
        setTimeout(() => {
            setIsDownloading(false);
            setShowToast(true);

            // Hide toast after 3 seconds
            setTimeout(() => setShowToast(false), 3000);
        }, 1500);
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Mi Boletín Académico</h1>
                    <p className="text-gray-500 mt-1">Año académico 2026 - Juan Pérez - Grado 9°A</p>
                </div>
                <Button
                    variant="outline"
                    icon={Download}
                    onClick={handleDownloadPDF}
                    disabled={isDownloading || !currentData.available}
                >
                    {isDownloading ? 'Generando...' : 'Descargar PDF'}
                </Button>
            </div>

            {/* Period Tabs */}
            <div className="border-b border-border">
                <nav className="flex gap-1" aria-label="Periodos">
                    {periodTabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => !tab.disabled && setSelectedPeriod(tab.value)}
                            disabled={tab.disabled}
                            className={`
                                relative px-5 py-3 font-medium text-sm rounded-t-lg transition-all duration-200 ease-in-out
                                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-0
                                ${tab.disabled
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : selectedPeriod === tab.value
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-text-main hover:bg-primary/5 hover:text-primary'
                                }
                            `}
                        >
                            <span className="flex items-center gap-2">
                                {tab.label}
                                {tab.isCurrent && !tab.disabled && (
                                    <span className={`
                                        px-1.5 py-0.5 text-[10px] font-semibold rounded-full transition-colors
                                        ${selectedPeriod === tab.value
                                            ? 'bg-white/20 text-white'
                                            : 'bg-primary/10 text-primary'
                                        }
                                    `}>
                                        Actual
                                    </span>
                                )}
                            </span>
                            {selectedPeriod === tab.value && (
                                <span
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                                    style={{ transform: 'translateY(1px)' }}
                                />
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {currentData.available ? (
                <>
                    {/* Metrics Dashboard */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Average */}
                        <Card className="!p-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Promedio</p>
                                    <p className="text-2xl font-bold text-primary">{currentData.average.toFixed(1)}</p>
                                </div>
                            </div>
                        </Card>

                        {/* Attendance */}
                        <Card className="!p-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Asistencia</p>
                                    <p className="text-2xl font-bold text-green-600">{currentData.attendance}%</p>
                                </div>
                            </div>
                        </Card>

                        {/* Failing Subjects */}
                        <Card className="!p-5">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${currentData.failingSubjects === 0 ? 'bg-green-50' : 'bg-orange-50'
                                    }`}>
                                    {currentData.failingSubjects === 0 ? (
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    ) : (
                                        <AlertCircle className="w-6 h-6 text-orange-600" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Materias Pendientes</p>
                                    <p className={`text-2xl font-bold ${currentData.failingSubjects === 0 ? 'text-green-600' : 'text-orange-600'
                                        }`}>
                                        {currentData.failingSubjects}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Rank */}
                        <Card className="!p-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Puesto en el Curso</p>
                                    <p className="text-2xl font-bold text-blue-600">{currentData.rank}</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Grades Table */}
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border bg-gray-50/50">
                                        <th className="text-left py-4 px-4 font-semibold text-gray-600">Asignatura</th>
                                        <th className="text-center py-4 px-4 font-semibold text-gray-600">Inasistencias</th>
                                        <th className="text-center py-4 px-4 font-semibold text-gray-600">Calificación</th>
                                        <th className="text-center py-4 px-4 font-semibold text-gray-600">Desempeño</th>
                                        <th className="text-center py-4 px-4 font-semibold text-gray-600">Observaciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.grades.map((record, idx) => (
                                        <tr
                                            key={record.id}
                                            className={`border-b border-border/50 hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                                                }`}
                                        >
                                            <td className="py-4 px-4 font-medium text-text-main">{record.subject}</td>
                                            <td className="py-4 px-4 text-center">
                                                <span className={`font-medium ${record.absences > 2 ? 'text-orange-600' : 'text-gray-600'}`}>
                                                    {record.absences}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <span className={`text-lg font-bold ${record.grade >= 4.5 ? 'text-primary' :
                                                        record.grade >= 4.0 ? 'text-green-600' :
                                                            record.grade >= 3.0 ? 'text-orange-600' : 'text-red-600'
                                                    }`}>
                                                    {record.grade.toFixed(1)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                {getPerformanceBadge(record.performance)}
                                            </td>
                                            <td className="py-4 px-4 text-center relative">
                                                <button
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-primary relative"
                                                    onMouseEnter={() => setHoveredObservation(record.id)}
                                                    onMouseLeave={() => setHoveredObservation(null)}
                                                >
                                                    <MessageSquare className="w-5 h-5" />
                                                </button>

                                                {/* Tooltip */}
                                                {hoveredObservation === record.id && (
                                                    <div className="absolute z-10 right-0 top-full mt-1 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg text-left">
                                                        <div className="font-medium mb-1">Observación del docente:</div>
                                                        <div className="text-gray-300">{record.observation}</div>
                                                        <div className="absolute -top-1 right-6 w-2 h-2 bg-gray-900 rotate-45"></div>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    {/* Director's Comment */}
                    <Card className="border-l-4 border-l-primary">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                                    <User className="w-7 h-7 text-primary" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-text-main">Comentario del Director de Grupo</h3>
                                    <Badge variant="info">Prof. María González</Badge>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    Juan ha demostrado un excelente compromiso con su formación académica durante este periodo.
                                    Se destaca por su participación activa en clase y su capacidad para trabajar en equipo.
                                    Recomendamos continuar fortaleciendo las habilidades de comunicación en inglés.
                                    ¡Felicitaciones por el esfuerzo y dedicación! Seguimos confiando en tu potencial.
                                </p>
                            </div>
                        </div>
                    </Card>
                </>
            ) : (
                /* Empty State for unavailable periods */
                <Card className="py-16">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-text-main mb-2">
                            Periodo no disponible
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            Las calificaciones de este periodo aún no han sido publicadas.
                            Consulta nuevamente cuando el periodo haya finalizado.
                        </p>
                    </div>
                </Card>
            )}

            {/* Success Toast */}
            {showToast && (
                <div className="fixed bottom-4 right-4 bg-primary text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up z-50">
                    <CheckCircle className="w-5 h-5" />
                    <div>
                        <p className="font-medium">Documento generado</p>
                        <p className="text-sm text-white/80">Tu boletín oficial está listo para descargar</p>
                    </div>
                </div>
            )}

            {/* Loading Overlay */}
            {isDownloading && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 shadow-xl flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-text-main font-medium">Generando documento oficial...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Boletin;
