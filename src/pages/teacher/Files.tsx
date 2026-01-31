import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Upload, Download, Trash2, FileText, Video, File } from 'lucide-react';

// Mock data
const materialsData = [
    { id: 1, name: 'Guía de Ecuaciones Cuadráticas', type: 'pdf', subject: 'Matemáticas 9°A', date: '2026-01-20' },
    { id: 2, name: 'Video: Funciones Lineales', type: 'video', subject: 'Matemáticas 9°B', date: '2026-01-18' },
    { id: 3, name: 'Ejercicios Prácticos - Unidad 3', type: 'doc', subject: 'Matemáticas 10°A', date: '2026-01-15' },
];

const activitiesData = [
    { id: 1, name: 'Taller 1 - Ecuaciones', subject: 'Matemáticas 9°A', dueDate: '2026-02-05', submissions: 28 },
    { id: 2, name: 'Quiz Funciones', subject: 'Matemáticas 9°B', dueDate: '2026-02-03', submissions: 25 },
];

const getFileIcon = (type: string) => {
    switch (type) {
        case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
        case 'video': return <Video className="w-5 h-5 text-purple-500" />;
        default: return <File className="w-5 h-5 text-blue-500" />;
    }
};

const Files: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materials' | 'activities'>('materials');

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-text-main">Archivos</h1>
                <p className="text-gray-500">Gestiona materiales y actividades</p>
            </div>

            {/* Upload Form */}
            <Card title="Subir Archivo">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Select
                        label="Materia / Curso"
                        options={[
                            { value: 'math-9a', label: 'Matemáticas 9°A' },
                            { value: 'math-9b', label: 'Matemáticas 9°B' },
                            { value: 'math-10a', label: 'Matemáticas 10°A' },
                        ]}
                    />
                    <Select
                        label="Período"
                        options={[
                            { value: 't1', label: 'Primer Trimestre' },
                            { value: 't2', label: 'Segundo Trimestre' },
                            { value: 't3', label: 'Tercer Trimestre' },
                        ]}
                    />
                    <Select
                        label="Tipo"
                        options={[
                            { value: 'material', label: 'Material de apoyo' },
                            { value: 'activity', label: 'Actividad' },
                        ]}
                    />
                    <div className="flex items-end">
                        <Button variant="primary" icon={Upload} className="w-full">
                            Subir Archivo
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Tabs */}
            <div className="border-b border-border">
                <div className="flex gap-1">
                    <button
                        onClick={() => setActiveTab('materials')}
                        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'materials'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-text-main'
                            }`}
                    >
                        Materiales de apoyo
                    </button>
                    <button
                        onClick={() => setActiveTab('activities')}
                        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'activities'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-text-main'
                            }`}
                    >
                        Actividades
                    </button>
                </div>
            </div>

            {/* Materials Table */}
            {activeTab === 'materials' && (
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Archivo</th>
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Materia</th>
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Fecha</th>
                                    <th className="text-right py-3 px-2 font-medium text-gray-500">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {materialsData.map((material) => (
                                    <tr key={material.id} className="border-b border-border/50 hover:bg-gray-50">
                                        <td className="py-3 px-2">
                                            <div className="flex items-center gap-2">
                                                {getFileIcon(material.type)}
                                                <span className="font-medium">{material.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-2 text-gray-500">{material.subject}</td>
                                        <td className="py-3 px-2 text-gray-500">{material.date}</td>
                                        <td className="py-3 px-2 text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button size="sm" variant="ghost" className="p-1 h-8 w-8" title="Descargar">
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                                <Button size="sm" variant="ghost" className="p-1 h-8 w-8 text-red-500" title="Eliminar">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {/* Activities Table */}
            {activeTab === 'activities' && (
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Actividad</th>
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Materia</th>
                                    <th className="text-left py-3 px-2 font-medium text-gray-500">Fecha límite</th>
                                    <th className="text-center py-3 px-2 font-medium text-gray-500">Entregas</th>
                                    <th className="text-right py-3 px-2 font-medium text-gray-500">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activitiesData.map((activity) => (
                                    <tr key={activity.id} className="border-b border-border/50 hover:bg-gray-50">
                                        <td className="py-3 px-2 font-medium">{activity.name}</td>
                                        <td className="py-3 px-2 text-gray-500">{activity.subject}</td>
                                        <td className="py-3 px-2 text-gray-500">{activity.dueDate}</td>
                                        <td className="py-3 px-2 text-center">
                                            <Badge variant="info">{activity.submissions}</Badge>
                                        </td>
                                        <td className="py-3 px-2 text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button size="sm" variant="outline">Ver entregas</Button>
                                                <Button size="sm" variant="ghost" className="p-1 h-8 w-8 text-red-500" title="Eliminar">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default Files;
