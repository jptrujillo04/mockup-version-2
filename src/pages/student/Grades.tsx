import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Info, X } from 'lucide-react';

// Mock data
const weightings = {
    cognitiva: 30,
    procedimental: 30,
    propositiva: 40,
};

const trimesters = [
    { id: 'T1', label: 'Primer Trimestre', active: true },
    { id: 'T2', label: 'Segundo Trimestre', active: false },
    { id: 'T3', label: 'Tercer Trimestre', active: false },
];

// Grades data by trimester
const gradesDataByTrimester: Record<string, typeof gradesDataT1> = {
    T1: [
        { id: 1, subject: 'Matemáticas', teacher: 'María González', period: 'T1', cognitiva: 4.2, procedimental: 4.0, propositiva: 4.5, final: 4.3 },
        { id: 2, subject: 'Español', teacher: 'Carlos Ruiz', period: 'T1', cognitiva: 3.8, procedimental: 4.2, propositiva: 4.0, final: 4.0 },
        { id: 3, subject: 'Ciencias', teacher: 'Ana Torres', period: 'T1', cognitiva: 4.5, procedimental: 4.3, propositiva: 4.8, final: 4.6 },
        { id: 4, subject: 'Inglés', teacher: 'Pedro Martínez', period: 'T1', cognitiva: 3.5, procedimental: 3.8, propositiva: 3.6, final: 3.6 },
        { id: 5, subject: 'Historia', teacher: 'Laura Sánchez', period: 'T1', cognitiva: 4.0, procedimental: 4.1, propositiva: 4.2, final: 4.1 },
    ],
    T2: [
        { id: 1, subject: 'Matemáticas', teacher: 'María González', period: 'T2', cognitiva: 4.0, procedimental: 4.2, propositiva: 4.3, final: 4.2 },
        { id: 2, subject: 'Español', teacher: 'Carlos Ruiz', period: 'T2', cognitiva: 4.0, procedimental: 4.0, propositiva: 4.2, final: 4.1 },
        { id: 3, subject: 'Ciencias', teacher: 'Ana Torres', period: 'T2', cognitiva: 4.2, procedimental: 4.5, propositiva: 4.6, final: 4.5 },
        { id: 4, subject: 'Inglés', teacher: 'Pedro Martínez', period: 'T2', cognitiva: 3.8, procedimental: 4.0, propositiva: 3.9, final: 3.9 },
        { id: 5, subject: 'Historia', teacher: 'Laura Sánchez', period: 'T2', cognitiva: 4.3, procedimental: 4.2, propositiva: 4.4, final: 4.3 },
    ],
    T3: [], // No grades yet for T3
};

const gradesDataT1 = gradesDataByTrimester.T1;

// Mock detail data per subject (for T1)
const gradeDetails: Record<string, Record<number, { activities: { name: string; type: string; dimension: string; grade: number; date: string; weight: number }[] }>> = {
    T1: {
        1: {
            activities: [
                { name: 'Quiz 1 - Ecuaciones lineales', type: 'Quiz', dimension: 'Cognitiva', grade: 4.5, date: '2026-01-15', weight: 15 },
                { name: 'Taller práctico - Funciones', type: 'Taller', dimension: 'Procedimental', grade: 4.0, date: '2026-01-20', weight: 15 },
                { name: 'Examen parcial', type: 'Examen', dimension: 'Cognitiva', grade: 4.0, date: '2026-01-25', weight: 15 },
                { name: 'Proyecto final - Modelación', type: 'Proyecto', dimension: 'Propositiva', grade: 4.5, date: '2026-02-01', weight: 20 },
                { name: 'Participación en clase', type: 'Participación', dimension: 'Propositiva', grade: 4.5, date: '2026-02-05', weight: 20 },
                { name: 'Ejercicios en clase', type: 'Trabajo', dimension: 'Procedimental', grade: 4.0, date: '2026-02-08', weight: 15 },
            ]
        },
        2: {
            activities: [
                { name: 'Ensayo literario', type: 'Ensayo', dimension: 'Propositiva', grade: 4.0, date: '2026-01-18', weight: 25 },
                { name: 'Análisis de lectura', type: 'Taller', dimension: 'Cognitiva', grade: 3.8, date: '2026-01-22', weight: 25 },
                { name: 'Exposición oral', type: 'Exposición', dimension: 'Procedimental', grade: 4.2, date: '2026-01-28', weight: 25 },
                { name: 'Trabajo escrito', type: 'Trabajo', dimension: 'Propositiva', grade: 4.0, date: '2026-02-02', weight: 25 },
            ]
        },
        3: {
            activities: [
                { name: 'Laboratorio - Reacciones químicas', type: 'Laboratorio', dimension: 'Procedimental', grade: 4.3, date: '2026-01-16', weight: 30 },
                { name: 'Informe de laboratorio', type: 'Informe', dimension: 'Propositiva', grade: 4.8, date: '2026-01-23', weight: 30 },
                { name: 'Examen teórico', type: 'Examen', dimension: 'Cognitiva', grade: 4.5, date: '2026-01-30', weight: 40 },
            ]
        },
        4: {
            activities: [
                { name: 'Reading comprehension', type: 'Quiz', dimension: 'Cognitiva', grade: 3.5, date: '2026-01-17', weight: 25 },
                { name: 'Listening exercise', type: 'Taller', dimension: 'Procedimental', grade: 3.8, date: '2026-01-24', weight: 25 },
                { name: 'Essay writing', type: 'Ensayo', dimension: 'Propositiva', grade: 3.6, date: '2026-02-01', weight: 25 },
                { name: 'Oral presentation', type: 'Exposición', dimension: 'Procedimental', grade: 3.8, date: '2026-02-07', weight: 25 },
            ]
        },
        5: {
            activities: [
                { name: 'Línea de tiempo', type: 'Proyecto', dimension: 'Propositiva', grade: 4.2, date: '2026-01-19', weight: 30 },
                { name: 'Ensayo histórico', type: 'Ensayo', dimension: 'Cognitiva', grade: 4.0, date: '2026-01-26', weight: 35 },
                { name: 'Debate grupal', type: 'Participación', dimension: 'Procedimental', grade: 4.1, date: '2026-02-03', weight: 35 },
            ]
        },
    },
    T2: {
        1: {
            activities: [
                { name: 'Quiz 2 - Ecuaciones cuadráticas', type: 'Quiz', dimension: 'Cognitiva', grade: 4.0, date: '2026-04-10', weight: 20 },
                { name: 'Proyecto grupal', type: 'Proyecto', dimension: 'Propositiva', grade: 4.3, date: '2026-04-20', weight: 30 },
                { name: 'Examen trimestral', type: 'Examen', dimension: 'Cognitiva', grade: 4.0, date: '2026-05-01', weight: 30 },
                { name: 'Talleres en clase', type: 'Taller', dimension: 'Procedimental', grade: 4.2, date: '2026-05-10', weight: 20 },
            ]
        },
        2: {
            activities: [
                { name: 'Análisis poético', type: 'Taller', dimension: 'Cognitiva', grade: 4.0, date: '2026-04-12', weight: 25 },
                { name: 'Obra de teatro', type: 'Proyecto', dimension: 'Propositiva', grade: 4.2, date: '2026-04-25', weight: 35 },
                { name: 'Exposición', type: 'Exposición', dimension: 'Procedimental', grade: 4.0, date: '2026-05-05', weight: 40 },
            ]
        },
        3: {
            activities: [
                { name: 'Laboratorio - Células', type: 'Laboratorio', dimension: 'Procedimental', grade: 4.5, date: '2026-04-15', weight: 35 },
                { name: 'Proyecto de investigación', type: 'Proyecto', dimension: 'Propositiva', grade: 4.6, date: '2026-04-28', weight: 35 },
                { name: 'Examen', type: 'Examen', dimension: 'Cognitiva', grade: 4.2, date: '2026-05-08', weight: 30 },
            ]
        },
        4: {
            activities: [
                { name: 'Grammar test', type: 'Quiz', dimension: 'Cognitiva', grade: 3.8, date: '2026-04-11', weight: 25 },
                { name: 'Conversation practice', type: 'Taller', dimension: 'Procedimental', grade: 4.0, date: '2026-04-22', weight: 25 },
                { name: 'Writing assignment', type: 'Ensayo', dimension: 'Propositiva', grade: 3.9, date: '2026-05-02', weight: 25 },
                { name: 'Final presentation', type: 'Exposición', dimension: 'Procedimental', grade: 4.0, date: '2026-05-12', weight: 25 },
            ]
        },
        5: {
            activities: [
                { name: 'Investigación histórica', type: 'Proyecto', dimension: 'Propositiva', grade: 4.4, date: '2026-04-14', weight: 35 },
                { name: 'Quiz de fechas', type: 'Quiz', dimension: 'Cognitiva', grade: 4.3, date: '2026-04-26', weight: 30 },
                { name: 'Exposición grupal', type: 'Exposición', dimension: 'Procedimental', grade: 4.2, date: '2026-05-06', weight: 35 },
            ]
        },
    },
    T3: {},
};

const Grades: React.FC = () => {
    const [selectedTrimester, setSelectedTrimester] = useState('T1');
    const [selectedSubject, setSelectedSubject] = useState<typeof gradesDataT1[0] | null>(null);

    const gradesData = gradesDataByTrimester[selectedTrimester] || [];
    const average = gradesData.length > 0
        ? (gradesData.reduce((acc, g) => acc + g.final, 0) / gradesData.length).toFixed(1)
        : '–';

    const getDimensionColor = (dimension: string) => {
        switch (dimension) {
            case 'Cognitiva': return 'text-blue-600 bg-blue-50';
            case 'Procedimental': return 'text-green-600 bg-green-50';
            case 'Propositiva': return 'text-purple-600 bg-purple-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Notas</h1>
                    <p className="text-gray-500">Calificaciones por materia - 2026</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Promedio {selectedTrimester}</p>
                    <p className="text-2xl font-bold text-primary">{average}</p>
                </div>
            </div>

            {/* Trimester Selector */}
            <div className="flex gap-2">
                {trimesters.map((trim) => (
                    <button
                        key={trim.id}
                        onClick={() => setSelectedTrimester(trim.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTrimester === trim.id
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-white border border-border text-gray-600 hover:border-primary hover:text-primary'
                            }`}
                    >
                        {trim.label}
                    </button>
                ))}
            </div>

            {/* Weightings Card */}
            <Card title="Ponderaciones" className="!p-4">
                <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Cognitiva: <strong>{weightings.cognitiva}%</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Procedimental: <strong>{weightings.procedimental}%</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span>Propositiva: <strong>{weightings.propositiva}%</strong></span>
                    </div>
                </div>
            </Card>

            {/* Grades Table */}
            <Card>
                {gradesData.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Asignatura</th>
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Docente</th>
                                    <th className="text-center py-3 px-2 font-medium text-gray-500">Período</th>
                                    <th className="text-center py-3 px-2 font-medium text-blue-500">Cognitiva</th>
                                    <th className="text-center py-3 px-2 font-medium text-green-500">Procedimental</th>
                                    <th className="text-center py-3 px-2 font-medium text-purple-500">Propositiva</th>
                                    <th className="text-center py-3 px-2 font-medium text-gray-500">Definitiva</th>
                                    <th className="text-center py-3 px-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {gradesData.map((grade) => (
                                    <tr key={grade.id} className="border-b border-border/50 hover:bg-gray-50">
                                        <td className="py-3 px-2 font-medium">{grade.subject}</td>
                                        <td className="py-3 px-2 text-gray-500">{grade.teacher}</td>
                                        <td className="py-3 px-2 text-center">
                                            <Badge variant="info">{grade.period}</Badge>
                                        </td>
                                        <td className="py-3 px-2 text-center">{grade.cognitiva.toFixed(1)}</td>
                                        <td className="py-3 px-2 text-center">{grade.procedimental.toFixed(1)}</td>
                                        <td className="py-3 px-2 text-center">{grade.propositiva.toFixed(1)}</td>
                                        <td className="py-3 px-2 text-center">
                                            <span className={`font-bold ${grade.final >= 3.0 ? 'text-success' : 'text-alert'}`}>
                                                {grade.final.toFixed(1)}
                                            </span>
                                        </td>
                                        <td className="py-3 px-2 text-center">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="p-1 h-8 w-8"
                                                title="Ver detalle"
                                                onClick={() => setSelectedSubject(grade)}
                                            >
                                                <Info className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Info className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-text-main mb-1">Sin notas registradas</h3>
                        <p className="text-gray-500 text-sm max-w-sm">
                            Aún no hay calificaciones disponibles para el {trimesters.find(t => t.id === selectedTrimester)?.label}.
                        </p>
                    </div>
                )}
            </Card>

            {/* Detail Modal */}
            {selectedSubject && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-card shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-border">
                            <div>
                                <h3 className="text-xl font-semibold text-text-main">{selectedSubject.subject}</h3>
                                <p className="text-sm text-gray-500">{selectedSubject.teacher} · {selectedSubject.period}</p>
                            </div>
                            <button
                                onClick={() => setSelectedSubject(null)}
                                className="text-gray-400 hover:text-gray-600 p-2"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto flex-1">
                            {/* Summary */}
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                <div className="text-center p-3 bg-blue-50 rounded-lg">
                                    <p className="text-xs text-blue-600 mb-1">Cognitiva</p>
                                    <p className="text-xl font-bold text-blue-700">{selectedSubject.cognitiva.toFixed(1)}</p>
                                </div>
                                <div className="text-center p-3 bg-green-50 rounded-lg">
                                    <p className="text-xs text-green-600 mb-1">Procedimental</p>
                                    <p className="text-xl font-bold text-green-700">{selectedSubject.procedimental.toFixed(1)}</p>
                                </div>
                                <div className="text-center p-3 bg-purple-50 rounded-lg">
                                    <p className="text-xs text-purple-600 mb-1">Propositiva</p>
                                    <p className="text-xl font-bold text-purple-700">{selectedSubject.propositiva.toFixed(1)}</p>
                                </div>
                                <div className="text-center p-3 bg-primary/10 rounded-lg">
                                    <p className="text-xs text-primary mb-1">Definitiva</p>
                                    <p className="text-xl font-bold text-primary">{selectedSubject.final.toFixed(1)}</p>
                                </div>
                            </div>

                            {/* Activities Detail */}
                            <h4 className="font-medium text-text-main mb-3">Detalle de actividades</h4>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-border bg-gray-50">
                                            <th className="text-left py-2 px-3 font-medium text-gray-500">Actividad</th>
                                            <th className="text-left py-2 px-3 font-medium text-gray-500">Tipo</th>
                                            <th className="text-left py-2 px-3 font-medium text-gray-500">Dimensión</th>
                                            <th className="text-center py-2 px-3 font-medium text-gray-500">Peso</th>
                                            <th className="text-center py-2 px-3 font-medium text-gray-500">Nota</th>
                                            <th className="text-left py-2 px-3 font-medium text-gray-500">Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gradeDetails[selectedTrimester]?.[selectedSubject.id]?.activities.map((activity, idx) => (
                                            <tr key={idx} className="border-b border-border/50">
                                                <td className="py-2 px-3 font-medium">{activity.name}</td>
                                                <td className="py-2 px-3 text-gray-500">{activity.type}</td>
                                                <td className="py-2 px-3">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDimensionColor(activity.dimension)}`}>
                                                        {activity.dimension}
                                                    </span>
                                                </td>
                                                <td className="py-2 px-3 text-center text-gray-500">{activity.weight}%</td>
                                                <td className="py-2 px-3 text-center">
                                                    <span className={`font-bold ${activity.grade >= 3.0 ? 'text-success' : 'text-alert'}`}>
                                                        {activity.grade.toFixed(1)}
                                                    </span>
                                                </td>
                                                <td className="py-2 px-3 text-gray-500">{activity.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-border bg-gray-50">
                            <Button variant="primary" onClick={() => setSelectedSubject(null)} className="w-full">
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Grades;
