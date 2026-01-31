import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { CheckCircle } from 'lucide-react';

// Mock data
const students = [
    { id: 1, name: 'Juan Pérez', grade: null },
    { id: 2, name: 'María García', grade: null },
    { id: 3, name: 'Carlos López', grade: null },
    { id: 4, name: 'Ana Torres', grade: null },
    { id: 5, name: 'Pedro Martínez', grade: null },
];

const Grading: React.FC = () => {
    const [grades, setGrades] = useState<Record<number, number>>({});
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSave = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-text-main">Calificar</h1>
                <p className="text-gray-500">Ingresa las notas por actividad</p>
            </div>

            {/* Filters */}
            <Card className="!p-4">
                <div className="flex gap-4">
                    <Select
                        label="Materia"
                        options={[
                            { value: 'math', label: 'Matemáticas - 9°A' },
                            { value: 'math-b', label: 'Matemáticas - 9°B' },
                            { value: 'math-10', label: 'Matemáticas - 10°A' },
                        ]}
                        className="w-64"
                    />
                    <Select
                        label="Actividad"
                        options={[
                            { value: 'quiz1', label: 'Quiz 1 - Ecuaciones' },
                            { value: 'taller1', label: 'Taller - Funciones' },
                            { value: 'examen1', label: 'Examen Trimestral' },
                        ]}
                        className="w-64"
                    />
                </div>
            </Card>

            {/* Grading Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-2 font-medium text-gray-500 w-12">#</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Estudiante</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500 w-32">Nota (0-5)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, idx) => (
                                <tr key={student.id} className="border-b border-border/50 hover:bg-gray-50">
                                    <td className="py-3 px-2 text-gray-500">{idx + 1}</td>
                                    <td className="py-3 px-2 font-medium">{student.name}</td>
                                    <td className="py-3 px-2">
                                        <input
                                            type="number"
                                            min="0"
                                            max="5"
                                            step="0.1"
                                            value={grades[student.id] || ''}
                                            onChange={(e) => setGrades({ ...grades, [student.id]: parseFloat(e.target.value) })}
                                            className="w-full text-center rounded-md border-border shadow-sm focus:border-primary focus:ring-primary text-sm py-2"
                                            placeholder="0.0"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end pt-4 border-t border-border mt-4">
                    <Button variant="primary" onClick={handleSave}>Guardar Notas</Button>
                </div>
            </Card>

            {/* Success Toast */}
            {showSuccess && (
                <div className="fixed bottom-4 right-4 bg-success text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Notas guardadas correctamente
                </div>
            )}
        </div>
    );
};

export default Grading;
