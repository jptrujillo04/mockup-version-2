import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Select } from '../../components/ui/Select';
import {
    Save,
    RefreshCw,
    GripVertical
} from 'lucide-react';

// Mock schedule data
const scheduleData = [
    { id: 1, time: '7:00 - 7:50', monday: 'Matemáticas', tuesday: 'Español', wednesday: 'Inglés', thursday: 'Ciencias', friday: 'Historia' },
    { id: 2, time: '7:50 - 8:40', monday: 'Matemáticas', tuesday: 'Español', wednesday: 'Inglés', thursday: 'Ciencias', friday: 'Historia' },
    { id: 3, time: '8:40 - 9:30', monday: 'Español', tuesday: 'Matemáticas', wednesday: 'Ciencias', thursday: 'Historia', friday: 'Inglés' },
    { id: 4, time: 'Descanso', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '' },
    { id: 5, time: '10:00 - 10:50', monday: 'Inglés', tuesday: 'Ciencias', wednesday: 'Matemáticas', thursday: 'Español', friday: 'Educación Física' },
    { id: 6, time: '10:50 - 11:40', monday: 'Ciencias', tuesday: 'Historia', wednesday: 'Español', thursday: 'Inglés', friday: 'Educación Física' },
    { id: 7, time: '11:40 - 12:30', monday: 'Historia', tuesday: 'Inglés', wednesday: 'Historia', thursday: 'Matemáticas', friday: 'Arte' },
];

const HorariosPage: React.FC = () => {
    const [selectedGrade, setSelectedGrade] = useState('9A');

    const getSubjectColor = (subject: string) => {
        const colors: Record<string, string> = {
            'Matemáticas': 'bg-blue-100 text-blue-700 border-blue-200',
            'Español': 'bg-green-100 text-green-700 border-green-200',
            'Inglés': 'bg-purple-100 text-purple-700 border-purple-200',
            'Ciencias': 'bg-yellow-100 text-yellow-700 border-yellow-200',
            'Historia': 'bg-pink-100 text-pink-700 border-pink-200',
            'Educación Física': 'bg-orange-100 text-orange-700 border-orange-200',
            'Arte': 'bg-cyan-100 text-cyan-700 border-cyan-200',
        };
        return colors[subject] || 'bg-gray-100 text-gray-600';
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Ajuste de Horarios</h1>
                    <p className="text-gray-500">Configuración de horarios académicos por grado</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" icon={RefreshCw}>Restablecer</Button>
                    <Button variant="primary" icon={Save}>Guardar cambios</Button>
                </div>
            </div>

            {/* Grade Selector */}
            <Card className="!p-4">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-500">Grado:</span>
                    <div className="flex gap-2">
                        {['6A', '7A', '8A', '9A', '10A', '11A'].map((grade) => (
                            <button
                                key={grade}
                                onClick={() => setSelectedGrade(grade)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedGrade === grade
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {grade}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Info */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm text-blue-800">
                💡 Arrastra las materias para reorganizar el horario. Los cambios se aplican en tiempo real.
            </div>

            {/* Schedule Grid */}
            <Card title={`Horario ${selectedGrade}`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-2 font-medium text-gray-500 w-24">Hora</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Lunes</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Martes</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Miércoles</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Jueves</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Viernes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheduleData.map((row) => (
                                <tr key={row.id} className={`border-b border-border/50 ${row.time === 'Descanso' ? 'bg-gray-50' : ''}`}>
                                    <td className="py-2 px-2 font-medium text-gray-500 text-xs">{row.time}</td>
                                    {row.time === 'Descanso' ? (
                                        <td colSpan={5} className="py-4 px-2 text-center text-gray-400 italic">
                                            Descanso (9:30 - 10:00)
                                        </td>
                                    ) : (
                                        <>
                                            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                                                <td key={day} className="py-2 px-1">
                                                    <div
                                                        className={`p-2 rounded-lg border cursor-move flex items-center gap-2 ${getSubjectColor(row[day as keyof typeof row] as string)}`}
                                                    >
                                                        <GripVertical className="w-3 h-3 opacity-50" />
                                                        <span className="text-xs font-medium truncate">{row[day as keyof typeof row]}</span>
                                                    </div>
                                                </td>
                                            ))}
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Legend */}
            <Card title="Leyenda de materias" className="!p-4">
                <div className="flex flex-wrap gap-2">
                    {Object.entries({
                        'Matemáticas': 'bg-blue-100 text-blue-700',
                        'Español': 'bg-green-100 text-green-700',
                        'Inglés': 'bg-purple-100 text-purple-700',
                        'Ciencias': 'bg-yellow-100 text-yellow-700',
                        'Historia': 'bg-pink-100 text-pink-700',
                        'Educación Física': 'bg-orange-100 text-orange-700',
                        'Arte': 'bg-cyan-100 text-cyan-700',
                    }).map(([subject, color]) => (
                        <span key={subject} className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
                            {subject}
                        </span>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default HorariosPage;
