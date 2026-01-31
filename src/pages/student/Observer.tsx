import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Download, FileText, CheckCircle } from 'lucide-react';

// Mock data
const observerData = [
    {
        id: 1,
        period: 'T1',
        type: 'positive',
        description: 'Excelente participación en clase de ciencias. Demostró liderazgo en el proyecto grupal.',
        date: '2026-01-25',
        descargos: 'N/A',
        annotatedBy: 'Prof. Ana Torres',
        guardianSigned: true,
        studentSigned: true,
    },
    {
        id: 2,
        period: 'T1',
        type: 'neutral',
        description: 'Llegada tarde al aula (10 minutos). Primera vez en el trimestre.',
        date: '2026-01-20',
        descargos: 'El bus escolar tuvo retraso por tráfico.',
        annotatedBy: 'Prof. Carlos Ruiz',
        guardianSigned: true,
        studentSigned: true,
    },
    {
        id: 3,
        period: 'T1',
        type: 'negative',
        description: 'No presentó tarea de matemáticas sin justificación.',
        date: '2026-01-18',
        descargos: 'Pendiente',
        annotatedBy: 'Prof. María González',
        guardianSigned: false,
        studentSigned: false,
    }
];

const Observer: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Observador</h1>
                    <p className="text-gray-500">Registro de observaciones y seguimiento</p>
                </div>
                <Button variant="outline" icon={Download}>Descargar PDF</Button>
            </div>

            {/* Observer Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-2 font-medium text-gray-500 w-16">Per.</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Tipo / Descripción</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500 w-28">Fecha</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500 w-40">Descargos / Acción</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500 w-36">Anota</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500 w-24">Firma Acud.</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500 w-24">Firma Est.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {observerData.map((obs) => (
                                <tr key={obs.id} className="border-b border-border/50 hover:bg-gray-50 align-top">
                                    <td className="py-3 px-2">
                                        <Badge variant="info">{obs.period}</Badge>
                                    </td>
                                    <td className="py-3 px-2">
                                        <div className="flex items-start gap-2">
                                            <Badge
                                                variant={obs.type === 'positive' ? 'success' : obs.type === 'neutral' ? 'warning' : 'error'}
                                                className="flex-shrink-0 mt-0.5"
                                            >
                                                {obs.type === 'positive' ? 'Positivo' : obs.type === 'neutral' ? 'Neutral' : 'Negativo'}
                                            </Badge>
                                            <p className="text-text-main">{obs.description}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-2 text-gray-500">{obs.date}</td>
                                    <td className="py-3 px-2">
                                        {obs.descargos === 'Pendiente' ? (
                                            <Button size="sm" variant="outline" icon={FileText}>Agregar</Button>
                                        ) : (
                                            <span className="text-gray-600 text-xs">{obs.descargos}</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-2 text-gray-500 text-xs">{obs.annotatedBy}</td>
                                    <td className="py-3 px-2 text-center">
                                        {obs.guardianSigned ? (
                                            <CheckCircle className="w-5 h-5 text-success mx-auto" />
                                        ) : (
                                            <div className="w-5 h-5 border-2 border-gray-300 rounded mx-auto" />
                                        )}
                                    </td>
                                    <td className="py-3 px-2 text-center">
                                        {obs.studentSigned ? (
                                            <CheckCircle className="w-5 h-5 text-success mx-auto" />
                                        ) : (
                                            <div className="w-5 h-5 border-2 border-gray-300 rounded mx-auto" />
                                        )}
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

export default Observer;
