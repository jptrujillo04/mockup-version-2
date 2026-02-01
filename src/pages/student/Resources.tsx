import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import {
    FileText,
    Video,
    Image,
    Link2,
    Download,
    Eye,
    Search,
    ChevronDown,
    ChevronUp,
    X,
    Calendar,
    FolderOpen,
    ExternalLink
} from 'lucide-react';

// Types
interface Resource {
    id: number;
    name: string;
    type: 'pdf' | 'video' | 'image' | 'link';
    size: string;
    uploadDate: string;
    url: string;
    previewUrl?: string;
}

interface ActivityResources {
    id: number;
    activityName: string;
    activityType: 'quiz' | 'taller' | 'proyecto' | 'examen';
    subject: string;
    subjectCode: string;
    period: string;
    dueDate: string;
    resources: Resource[];
}

// Mock Data - coherente con Teacher Files
const activityResourcesData: ActivityResources[] = [
    {
        id: 1,
        activityName: 'Quiz 1 - Ecuaciones',
        activityType: 'quiz',
        subject: 'Matemáticas',
        subjectCode: 'math',
        period: 'p3',
        dueDate: '2026-02-05',
        resources: [
            { id: 1, name: 'Guía de ecuaciones lineales', type: 'pdf', size: '2.4 MB', uploadDate: '2026-01-28', url: '#', previewUrl: 'https://www.africau.edu/images/default/sample.pdf' },
            { id: 2, name: 'Fórmulas permitidas', type: 'pdf', size: '450 KB', uploadDate: '2026-01-28', url: '#' },
        ]
    },
    {
        id: 2,
        activityName: 'Taller - Funciones',
        activityType: 'taller',
        subject: 'Matemáticas',
        subjectCode: 'math',
        period: 'p3',
        dueDate: '2026-02-10',
        resources: [
            { id: 3, name: 'Ejercicios de funciones lineales', type: 'pdf', size: '1.8 MB', uploadDate: '2026-02-01', url: '#' },
            { id: 4, name: 'Video explicativo - Graficación', type: 'video', size: '45 MB', uploadDate: '2026-02-01', url: '#', previewUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        ]
    },
    {
        id: 3,
        activityName: 'Laboratorio - Reacciones Químicas',
        activityType: 'proyecto',
        subject: 'Ciencias',
        subjectCode: 'science',
        period: 'p3',
        dueDate: '2026-02-12',
        resources: [
            { id: 5, name: 'Manual de laboratorio', type: 'pdf', size: '3.2 MB', uploadDate: '2026-02-02', url: '#' },
            { id: 6, name: 'Video de seguridad', type: 'video', size: '28 MB', uploadDate: '2026-02-02', url: '#', previewUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 7, name: 'Tabla periódica interactiva', type: 'link', size: '-', uploadDate: '2026-02-02', url: 'https://ptable.com' },
        ]
    },
    {
        id: 4,
        activityName: 'Ensayo literario',
        activityType: 'taller',
        subject: 'Español',
        subjectCode: 'spanish',
        period: 'p3',
        dueDate: '2026-02-08',
        resources: [
            { id: 8, name: 'Lectura complementaria - Cien años de soledad', type: 'pdf', size: '1.5 MB', uploadDate: '2026-01-30', url: '#' },
        ]
    },
    {
        id: 5,
        activityName: 'Examen Trimestral',
        activityType: 'examen',
        subject: 'Matemáticas',
        subjectCode: 'math',
        period: 'p2',
        dueDate: '2026-01-15',
        resources: [
            { id: 9, name: 'Temario del examen', type: 'pdf', size: '320 KB', uploadDate: '2026-01-10', url: '#' },
            { id: 10, name: 'Ejercicios de práctica', type: 'pdf', size: '2.1 MB', uploadDate: '2026-01-10', url: '#' },
        ]
    },
    {
        id: 6,
        activityName: 'Proyecto - Movimiento Parabólico',
        activityType: 'proyecto',
        subject: 'Ciencias',
        subjectCode: 'science',
        period: 'p2',
        dueDate: '2026-01-20',
        resources: [
            { id: 11, name: 'Instrucciones del proyecto', type: 'pdf', size: '890 KB', uploadDate: '2026-01-05', url: '#' },
            { id: 12, name: 'Video tutorial', type: 'video', size: '65 MB', uploadDate: '2026-01-05', url: '#' },
        ]
    },
    {
        id: 7,
        activityName: 'Evaluación Diagnóstica',
        activityType: 'examen',
        subject: 'Matemáticas',
        subjectCode: 'math',
        period: 'p1',
        dueDate: '2026-01-05',
        resources: [
            { id: 13, name: 'Repaso de conceptos básicos', type: 'pdf', size: '1.2 MB', uploadDate: '2025-12-20', url: '#' },
        ]
    },
];

// Recursos Generales (sin actividad específica)
const generalResources: Resource[] = [
    { id: 100, name: 'Guía de estudio - Matemáticas Unidad 3', type: 'pdf', size: '4.5 MB', uploadDate: '2026-01-15', url: '#' },
    { id: 101, name: 'Video: Reacciones químicas explicadas', type: 'video', size: '120 MB', uploadDate: '2026-01-20', url: '#', previewUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 102, name: 'Diccionario de términos científicos', type: 'link', size: '-', uploadDate: '2026-01-10', url: 'https://example.com' },
    { id: 103, name: 'Infografía: Sistema Solar', type: 'image', size: '2.8 MB', uploadDate: '2026-01-22', url: '#' },
];

const subjectOptions = [
    { value: 'all', label: 'Todas las materias' },
    { value: 'math', label: 'Matemáticas' },
    { value: 'science', label: 'Ciencias' },
    { value: 'spanish', label: 'Español' },
    { value: 'english', label: 'Inglés' },
    { value: 'history', label: 'Historia' },
];

const periodTabs = [
    { value: 'p1', label: 'Periodo 1', isCurrent: false },
    { value: 'p2', label: 'Periodo 2', isCurrent: false },
    { value: 'p3', label: 'Periodo 3', isCurrent: true },
    { value: 'p4', label: 'Periodo 4', isCurrent: false },
];

const Resources: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('p3');
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedActivities, setExpandedActivities] = useState<number[]>([1, 2, 3, 4]);
    const [previewResource, setPreviewResource] = useState<Resource | null>(null);
    const [showGeneralResources, setShowGeneralResources] = useState(true);

    // Get file icon
    const getFileIcon = (type: Resource['type']) => {
        const icons = {
            pdf: { icon: FileText, color: 'text-red-500 bg-red-50' },
            video: { icon: Video, color: 'text-purple-500 bg-purple-50' },
            image: { icon: Image, color: 'text-green-500 bg-green-50' },
            link: { icon: Link2, color: 'text-blue-500 bg-blue-50' },
        };
        return icons[type];
    };

    // Get activity type badge
    const getActivityBadge = (type: ActivityResources['activityType']) => {
        const variants: Record<string, 'info' | 'success' | 'warning' | 'error'> = {
            quiz: 'info',
            taller: 'success',
            proyecto: 'warning',
            examen: 'error',
        };
        const labels = {
            quiz: 'Quiz',
            taller: 'Taller',
            proyecto: 'Proyecto',
            examen: 'Examen',
        };
        return <Badge variant={variants[type]}>{labels[type]}</Badge>;
    };

    // Toggle activity expansion
    const toggleActivity = (id: number) => {
        setExpandedActivities(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    // Filter activities
    const filteredActivities = activityResourcesData.filter(activity => {
        if (activity.period !== selectedPeriod) return false;
        if (selectedSubject !== 'all' && activity.subjectCode !== selectedSubject) return false;
        if (searchQuery) {
            const hasMatchingResource = activity.resources.some(r =>
                r.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            if (!hasMatchingResource && !activity.activityName.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
        }
        return true;
    });

    // Filter general resources
    const filteredGeneralResources = generalResources.filter(resource => {
        if (searchQuery) {
            return resource.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
    });

    // Handle download simulation
    const handleDownload = (resource: Resource) => {
        // Simulate download
        alert(`Descargando: ${resource.name}`);
    };

    // Handle preview
    const handlePreview = (resource: Resource) => {
        setPreviewResource(resource);
    };

    // Render resource card
    const renderResourceCard = (resource: Resource) => {
        const iconInfo = getFileIcon(resource.type);
        const IconComponent = iconInfo.icon;

        return (
            <div
                key={resource.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconInfo.color}`}>
                        <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-medium text-text-main text-sm">{resource.name}</p>
                        <p className="text-xs text-gray-500">
                            {resource.uploadDate} · {resource.size}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        size="sm"
                        variant="ghost"
                        icon={Eye}
                        onClick={() => handlePreview(resource)}
                        className="h-8 w-8 p-0"
                        title="Ver"
                    />
                    <Button
                        size="sm"
                        variant="ghost"
                        icon={Download}
                        onClick={() => handleDownload(resource)}
                        className="h-8 w-8 p-0"
                        title="Descargar"
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-text-main">Material de Apoyo</h1>
                <p className="text-gray-500 mt-1">Recursos educativos compartidos por tus profesores</p>
            </div>

            {/* Filters */}
            <Card className="!p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <Select
                        label="Materia"
                        options={subjectOptions}
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="w-full md:w-64"
                    />
                    <Input
                        label="Buscar archivo"
                        placeholder="Nombre del recurso..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:flex-1"
                        icon={Search}
                    />
                </div>
            </Card>

            {/* Period Tabs */}
            <div className="border-b border-border">
                <nav className="flex gap-1" aria-label="Periodos">
                    {periodTabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setSelectedPeriod(tab.value)}
                            className={`
                                relative px-5 py-3 font-medium text-sm rounded-t-lg transition-all duration-200 ease-in-out
                                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-0
                                ${selectedPeriod === tab.value
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-text-main hover:bg-primary/5 hover:text-primary'
                                }
                            `}
                        >
                            <span className="flex items-center gap-2">
                                {tab.label}
                                {tab.isCurrent && (
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

            {/* Content */}
            {filteredActivities.length > 0 || (selectedPeriod === 'p3' && filteredGeneralResources.length > 0) ? (
                <div className="space-y-4">
                    {/* Activity Resources */}
                    {filteredActivities.map((activity) => (
                        <Card key={activity.id} className="overflow-hidden">
                            {/* Accordion Header */}
                            <button
                                onClick={() => toggleActivity(activity.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <FolderOpen className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-text-main">{activity.activityName}</h3>
                                            {getActivityBadge(activity.activityType)}
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {activity.subject} · <Calendar className="w-3 h-3 inline" /> Entrega: {activity.dueDate}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-500">{activity.resources.length} archivos</span>
                                    {expandedActivities.includes(activity.id) ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                            </button>

                            {/* Accordion Content */}
                            {expandedActivities.includes(activity.id) && (
                                <div className="px-4 pb-4 space-y-2 border-t border-border pt-3">
                                    {activity.resources.map(resource => renderResourceCard(resource))}
                                </div>
                            )}
                        </Card>
                    ))}

                    {/* General Resources Section */}
                    {selectedPeriod === 'p3' && filteredGeneralResources.length > 0 && (
                        <Card className="overflow-hidden">
                            <button
                                onClick={() => setShowGeneralResources(!showGeneralResources)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <FolderOpen className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-text-main">Recursos Generales</h3>
                                        <p className="text-sm text-gray-500">Material de referencia general</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-500">{filteredGeneralResources.length} archivos</span>
                                    {showGeneralResources ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                            </button>

                            {showGeneralResources && (
                                <div className="px-4 pb-4 space-y-2 border-t border-border pt-3">
                                    {filteredGeneralResources.map(resource => renderResourceCard(resource))}
                                </div>
                            )}
                        </Card>
                    )}
                </div>
            ) : (
                /* Empty State */
                <Card className="py-16">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FolderOpen className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-text-main mb-2">
                            Sin recursos disponibles
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            Aún no hay recursos compartidos para esta materia en el periodo seleccionado.
                            Consulta nuevamente cuando tus profesores suban nuevo material.
                        </p>
                    </div>
                </Card>
            )}

            {/* Preview Modal */}
            {previewResource && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-4 border-b border-border">
                            <div className="flex items-center gap-3">
                                {(() => {
                                    const iconInfo = getFileIcon(previewResource.type);
                                    const IconComponent = iconInfo.icon;
                                    return (
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconInfo.color}`}>
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                    );
                                })()}
                                <div>
                                    <h3 className="font-semibold text-text-main">{previewResource.name}</h3>
                                    <p className="text-sm text-gray-500">{previewResource.size}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setPreviewResource(null)}
                                className="text-gray-400 hover:text-gray-600 p-2"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-auto p-4 bg-gray-50 min-h-[400px]">
                            {previewResource.type === 'pdf' && previewResource.previewUrl ? (
                                <iframe
                                    src={previewResource.previewUrl}
                                    className="w-full h-[500px] rounded-lg border border-border"
                                    title={previewResource.name}
                                />
                            ) : previewResource.type === 'video' && previewResource.previewUrl ? (
                                <div className="aspect-video">
                                    <iframe
                                        src={previewResource.previewUrl}
                                        className="w-full h-full rounded-lg"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={previewResource.name}
                                    />
                                </div>
                            ) : previewResource.type === 'image' ? (
                                <div className="flex items-center justify-center">
                                    <img
                                        src="https://via.placeholder.com/800x600?text=Preview+de+Imagen"
                                        alt={previewResource.name}
                                        className="max-w-full max-h-[500px] rounded-lg shadow-lg"
                                    />
                                </div>
                            ) : previewResource.type === 'link' ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <Link2 className="w-16 h-16 text-blue-500 mb-4" />
                                    <p className="text-text-main font-medium mb-4">Este es un enlace externo</p>
                                    <Button
                                        variant="primary"
                                        icon={ExternalLink}
                                        onClick={() => window.open(previewResource.url, '_blank')}
                                    >
                                        Abrir enlace
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <FileText className="w-16 h-16 text-gray-400 mb-4" />
                                    <p className="text-gray-500 mb-4">Vista previa no disponible para este archivo</p>
                                    <Button
                                        variant="primary"
                                        icon={Download}
                                        onClick={() => handleDownload(previewResource)}
                                    >
                                        Descargar archivo
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-between items-center p-4 border-t border-border bg-white">
                            <p className="text-sm text-gray-500">
                                Subido el {previewResource.uploadDate}
                            </p>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => setPreviewResource(null)}>
                                    Cerrar
                                </Button>
                                <Button
                                    variant="primary"
                                    icon={Download}
                                    onClick={() => handleDownload(previewResource)}
                                >
                                    Descargar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Resources;
