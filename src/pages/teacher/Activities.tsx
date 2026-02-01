import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Select } from '../../components/ui/Select';
import { Input } from '../../components/ui/Input';
import {
    Plus,
    X,
    Pencil,
    Trash2,
    Upload,
    FileText,
    Calendar,
    BookOpen,
    Eye
} from 'lucide-react';

// Types
interface Activity {
    id: number;
    title: string;
    subject: string;
    subjectCode: string;
    period: string;
    type: 'tarea' | 'examen' | 'proyecto' | 'taller';
    dimension: string;
    description: string;
    openDate: string;
    closeDate: string;
    status: 'borrador' | 'abierta' | 'cerrada' | 'calificada';
    isPublished: boolean;
    submissionProgress: number;
    attachments: string[];
}

// Mock Data - coherent with Grading.tsx
const mockActivities: Activity[] = [
    {
        id: 1,
        title: 'Quiz 1 - Ecuaciones',
        subject: 'Matemáticas - 9°A',
        subjectCode: 'math-9a',
        period: 'p3',
        type: 'examen',
        dimension: 'cognitiva',
        description: 'Evaluación de ecuaciones lineales y cuadráticas. Incluye 10 preguntas de selección múltiple y 2 problemas de desarrollo.',
        openDate: '2026-02-01T08:00',
        closeDate: '2026-02-05T23:59',
        status: 'abierta',
        isPublished: true,
        submissionProgress: 75,
        attachments: ['guia_ecuaciones.pdf']
    },
    {
        id: 2,
        title: 'Taller - Funciones',
        subject: 'Matemáticas - 9°A',
        subjectCode: 'math-9a',
        period: 'p3',
        type: 'taller',
        dimension: 'procedimental',
        description: 'Taller práctico de graficación de funciones lineales y cuadráticas.',
        openDate: '2026-02-03T08:00',
        closeDate: '2026-02-10T23:59',
        status: 'abierta',
        isPublished: true,
        submissionProgress: 45,
        attachments: []
    },
    {
        id: 3,
        title: 'Examen Trimestral',
        subject: 'Matemáticas - 9°A',
        subjectCode: 'math-9a',
        period: 'p3',
        type: 'examen',
        dimension: 'cognitiva',
        description: 'Examen comprensivo del primer trimestre. Cubre todos los temas vistos.',
        openDate: '2026-02-15T08:00',
        closeDate: '2026-02-15T10:00',
        status: 'borrador',
        isPublished: false,
        submissionProgress: 0,
        attachments: ['temario_examen.pdf', 'formulas_permitidas.pdf']
    },
    {
        id: 4,
        title: 'Proyecto - Laboratorio de Física',
        subject: 'Física - 11°B',
        subjectCode: 'physics-11b',
        period: 'p2',
        type: 'proyecto',
        dimension: 'propositiva',
        description: 'Diseñar y ejecutar un experimento de movimiento parabólico.',
        openDate: '2026-01-20T08:00',
        closeDate: '2026-01-30T23:59',
        status: 'calificada',
        isPublished: true,
        submissionProgress: 100,
        attachments: ['instrucciones_proyecto.pdf']
    },
    {
        id: 5,
        title: 'Tarea - Vectores',
        subject: 'Física - 11°B',
        subjectCode: 'physics-11b',
        period: 'p2',
        type: 'tarea',
        dimension: 'procedimental',
        description: 'Resolver ejercicios de suma y resta de vectores.',
        openDate: '2026-01-25T08:00',
        closeDate: '2026-01-28T23:59',
        status: 'cerrada',
        isPublished: true,
        submissionProgress: 92,
        attachments: []
    },
    {
        id: 6,
        title: 'Examen Diagnóstico',
        subject: 'Matemáticas - 9°A',
        subjectCode: 'math-9a',
        period: 'p1',
        type: 'examen',
        dimension: 'cognitiva',
        description: 'Evaluación diagnóstica inicial del curso.',
        openDate: '2026-01-05T08:00',
        closeDate: '2026-01-05T10:00',
        status: 'calificada',
        isPublished: true,
        submissionProgress: 100,
        attachments: []
    },
    {
        id: 7,
        title: 'Taller Introductorio',
        subject: 'Física - 11°B',
        subjectCode: 'physics-11b',
        period: 'p1',
        type: 'taller',
        dimension: 'procedimental',
        description: 'Introducción a las unidades de medida y conversiones.',
        openDate: '2026-01-08T08:00',
        closeDate: '2026-01-15T23:59',
        status: 'calificada',
        isPublished: true,
        submissionProgress: 100,
        attachments: ['guia_unidades.pdf']
    }
];

const subjectOptions = [
    { value: 'all', label: 'Todas las materias' },
    { value: 'math-9a', label: 'Matemáticas - 9°A' },
    { value: 'math-9b', label: 'Matemáticas - 9°B' },
    { value: 'math-10a', label: 'Matemáticas - 10°A' },
    { value: 'physics-11b', label: 'Física - 11°B' },
];

const periodTabs = [
    { value: 'p1', label: 'Periodo 1', isCurrent: false },
    { value: 'p2', label: 'Periodo 2', isCurrent: false },
    { value: 'p3', label: 'Periodo 3', isCurrent: true },
    { value: 'p4', label: 'Periodo 4', isCurrent: false },
];

const typeOptions = [
    { value: 'tarea', label: 'Tarea' },
    { value: 'examen', label: 'Examen' },
    { value: 'proyecto', label: 'Proyecto' },
    { value: 'taller', label: 'Taller' },
];

const dimensionOptions = [
    { value: 'cognitiva', label: 'Cognitiva (30%)' },
    { value: 'procedimental', label: 'Procedimental (30%)' },
    { value: 'propositiva', label: 'Propositiva (40%)' },
];

const Activities: React.FC = () => {
    const navigate = useNavigate();
    const [activities, setActivities] = useState<Activity[]>(mockActivities);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterSubject, setFilterSubject] = useState('all');
    const [filterPeriod, setFilterPeriod] = useState('p3'); // Default to current period

    // Form state
    const [formData, setFormData] = useState({
        subject: 'math-9a',
        title: '',
        type: 'tarea',
        dimension: 'cognitiva',
        description: '',
        openDate: '',
        closeDate: '',
        isPublished: false,
    });
    const [dateError, setDateError] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    // Filter activities
    const filteredActivities = activities.filter(activity => {
        if (filterSubject !== 'all' && activity.subjectCode !== filterSubject) return false;
        if (activity.period !== filterPeriod) return false;
        return true;
    });

    // Get status badge variant
    const getStatusBadge = (status: Activity['status']) => {
        switch (status) {
            case 'borrador':
                return <Badge variant="default">Borrador</Badge>;
            case 'abierta':
                return <Badge variant="success">Abierta</Badge>;
            case 'cerrada':
                return <Badge variant="warning">Cerrada</Badge>;
            case 'calificada':
                return <Badge variant="info">Calificada</Badge>;
            default:
                return <Badge>-</Badge>;
        }
    };

    // Get type label
    const getTypeLabel = (type: Activity['type']) => {
        const labels = {
            tarea: 'Tarea',
            examen: 'Examen',
            proyecto: 'Proyecto',
            taller: 'Taller'
        };
        return labels[type];
    };

    // Handle form input change
    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Validate dates
        if (field === 'openDate' || field === 'closeDate') {
            const openDate = field === 'openDate' ? value as string : formData.openDate;
            const closeDate = field === 'closeDate' ? value as string : formData.closeDate;

            if (openDate && closeDate && new Date(closeDate) < new Date(openDate)) {
                setDateError('La fecha de cierre no puede ser anterior a la fecha de apertura');
            } else {
                setDateError('');
            }
        }
    };

    // Handle file drop
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const fileNames = Array.from(e.dataTransfer.files).map(f => f.name);
            setUploadedFiles(prev => [...prev, ...fileNames]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileNames = Array.from(e.target.files).map(f => f.name);
            setUploadedFiles(prev => [...prev, ...fileNames]);
        }
    };

    // Handle form submit
    const handleSubmit = () => {
        if (dateError) return;

        const newActivity: Activity = {
            id: activities.length + 1,
            title: formData.title,
            subject: subjectOptions.find(s => s.value === formData.subject)?.label || '',
            subjectCode: formData.subject,
            period: filterPeriod, // Assign to currently selected period
            type: formData.type as Activity['type'],
            dimension: formData.dimension,
            description: formData.description,
            openDate: formData.openDate,
            closeDate: formData.closeDate,
            status: formData.isPublished ? 'abierta' : 'borrador',
            isPublished: formData.isPublished,
            submissionProgress: 0,
            attachments: uploadedFiles
        };

        setActivities(prev => [newActivity, ...prev]);
        setIsModalOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            subject: 'math-9a',
            title: '',
            type: 'tarea',
            dimension: 'cognitiva',
            description: '',
            openDate: '',
            closeDate: '',
            isPublished: false,
        });
        setUploadedFiles([]);
        setDateError('');
    };

    // Handle delete activity
    const handleDelete = (id: number) => {
        setActivities(prev => prev.filter(a => a.id !== id));
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CO', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Gestión de Actividades</h1>
                    <p className="text-gray-500 mt-1">Crea y organiza las evaluaciones por materia y periodo</p>
                </div>
                <Button variant="primary" icon={Plus} onClick={() => setIsModalOpen(true)}>
                    Nueva Actividad
                </Button>
            </div>

            {/* Filters */}
            <Card className="!p-4">
                <div className="flex items-end gap-4">
                    <Select
                        label="Materia"
                        options={subjectOptions}
                        value={filterSubject}
                        onChange={(e) => setFilterSubject(e.target.value)}
                        className="w-64"
                    />
                </div>
            </Card>

            {/* Period Tabs */}
            <div className="border-b border-border">
                <nav className="flex gap-1" aria-label="Periodos">
                    {periodTabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setFilterPeriod(tab.value)}
                            className={`
                                relative px-5 py-3 font-medium text-sm rounded-t-lg transition-all duration-200 ease-in-out
                                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-0
                                ${filterPeriod === tab.value
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
                                        ${filterPeriod === tab.value
                                            ? 'bg-white/20 text-white'
                                            : 'bg-primary/10 text-primary'
                                        }
                                    `}>
                                        Actual
                                    </span>
                                )}
                            </span>
                            {/* Active indicator line */}
                            {filterPeriod === tab.value && (
                                <span
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                                    style={{ transform: 'translateY(1px)' }}
                                />
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Activities Table */}
            {filteredActivities.length > 0 ? (
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-4 font-medium text-gray-500">Título</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-500">Materia</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-500">Tipo</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-500">Fecha Entrega</th>
                                    <th className="text-center py-3 px-4 font-medium text-gray-500">Estado</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-500">Progreso</th>
                                    <th className="text-center py-3 px-4 font-medium text-gray-500">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredActivities.map((activity) => (
                                    <tr key={activity.id} className="border-b border-border/50 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="font-medium text-text-main">{activity.title}</div>
                                        </td>
                                        <td className="py-4 px-4 text-gray-600">{activity.subject}</td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center gap-1.5 text-gray-600">
                                                <BookOpen className="w-4 h-4" />
                                                {getTypeLabel(activity.type)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-gray-600">
                                            <span className="inline-flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" />
                                                {formatDate(activity.closeDate)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            {getStatusBadge(activity.status)}
                                        </td>
                                        <td className="py-4 px-4">
                                            <button
                                                onClick={() => navigate(`/teacher/actividades/${activity.id}/entregas`)}
                                                className="w-32 cursor-pointer hover:opacity-80 transition-opacity"
                                                title="Ver entregas"
                                            >
                                                <div className="flex items-center justify-between text-xs mb-1">
                                                    <span className="text-gray-500">Entregas</span>
                                                    <span className="font-medium text-primary">{activity.submissionProgress}%</span>
                                                </div>
                                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                                                        style={{ width: `${activity.submissionProgress}%` }}
                                                    />
                                                </div>
                                            </button>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-primary"
                                                    title="Editar"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-500 hover:text-red-600"
                                                    title="Eliminar"
                                                    onClick={() => handleDelete(activity.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-gray-500 hover:text-primary"
                                                    title="Ver Entregas"
                                                    onClick={() => navigate(`/teacher/actividades/${activity.id}/entregas`)}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            ) : (
                /* Empty State */
                <Card className="py-16">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-text-main mb-2">
                            No hay actividades creadas
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            Aún no has creado actividades para este curso. Crea tu primera tarea, examen o proyecto para comenzar.
                        </p>
                        <Button variant="primary" icon={Plus} onClick={() => setIsModalOpen(true)}>
                            Crear primera actividad
                        </Button>
                    </div>
                </Card>
            )}

            {/* Modal / Slide-over */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    />

                    {/* Slide-over Panel */}
                    <div className="absolute inset-y-0 right-0 flex max-w-full">
                        <div className="w-screen max-w-xl transform transition-transform duration-300 ease-in-out">
                            <div className="flex h-full flex-col bg-surface shadow-xl">
                                {/* Header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                                    <div>
                                        <h2 className="text-lg font-semibold text-text-main">Nueva Actividad</h2>
                                        <p className="text-sm text-gray-500">Completa los campos para crear una actividad</p>
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>

                                {/* Form Content */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                    {/* Subject */}
                                    <Select
                                        label="Materia"
                                        options={subjectOptions.filter(s => s.value !== 'all')}
                                        value={formData.subject}
                                        onChange={(e) => handleInputChange('subject', e.target.value)}
                                    />

                                    {/* Title */}
                                    <Input
                                        label="Título de la Actividad"
                                        placeholder="Ej: Quiz 1 - Ecuaciones"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                    />

                                    {/* Type & Dimension Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <Select
                                            label="Tipo"
                                            options={typeOptions}
                                            value={formData.type}
                                            onChange={(e) => handleInputChange('type', e.target.value)}
                                        />
                                        <Select
                                            label="Dimensión de Nota"
                                            options={dimensionOptions}
                                            value={formData.dimension}
                                            onChange={(e) => handleInputChange('dimension', e.target.value)}
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-text-main mb-1">
                                            Descripción
                                        </label>
                                        <textarea
                                            rows={4}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                                            placeholder="Instrucciones detalladas para los estudiantes..."
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                        />
                                    </div>

                                    {/* Date Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-text-main mb-1">
                                                Fecha de Apertura
                                            </label>
                                            <input
                                                type="datetime-local"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                                                value={formData.openDate}
                                                onChange={(e) => handleInputChange('openDate', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-main mb-1">
                                                Fecha de Cierre
                                            </label>
                                            <input
                                                type="datetime-local"
                                                className={`block w-full rounded-md shadow-sm sm:text-sm p-2 border ${dateError
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                    : 'border-gray-300 focus:border-primary focus:ring-primary'
                                                    }`}
                                                value={formData.closeDate}
                                                onChange={(e) => handleInputChange('closeDate', e.target.value)}
                                            />
                                            {dateError && (
                                                <p className="mt-1 text-sm text-red-600">{dateError}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Publish Toggle */}
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-text-main">Publicar actividad</p>
                                            <p className="text-sm text-gray-500">
                                                {formData.isPublished
                                                    ? 'Los estudiantes podrán ver y entregar la actividad'
                                                    : 'La actividad quedará como borrador (no visible)'}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked={formData.isPublished}
                                            onClick={() => handleInputChange('isPublished', !formData.isPublished)}
                                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${formData.isPublished ? 'bg-primary' : 'bg-gray-200'
                                                }`}
                                        >
                                            <span
                                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.isPublished ? 'translate-x-5' : 'translate-x-0'
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    {/* File Dropzone */}
                                    <div>
                                        <label className="block text-sm font-medium text-text-main mb-2">
                                            Material de Apoyo
                                        </label>
                                        <div
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={handleDrop}
                                            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragActive
                                                ? 'border-primary bg-primary/5'
                                                : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                        >
                                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600 mb-1">
                                                Arrastra archivos aquí o{' '}
                                                <label className="text-primary cursor-pointer hover:underline">
                                                    selecciona
                                                    <input
                                                        type="file"
                                                        multiple
                                                        className="hidden"
                                                        onChange={handleFileInput}
                                                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                                                    />
                                                </label>
                                            </p>
                                            <p className="text-xs text-gray-400">PDF, DOC, PPT hasta 10MB</p>
                                        </div>

                                        {/* Uploaded Files List */}
                                        {uploadedFiles.length > 0 && (
                                            <div className="mt-3 space-y-2">
                                                {uploadedFiles.map((file, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                                                        <FileText className="w-4 h-4 text-primary" />
                                                        <span className="text-sm text-text-main flex-1">{file}</span>
                                                        <button
                                                            onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== idx))}
                                                            className="p-1 hover:bg-gray-200 rounded"
                                                        >
                                                            <X className="w-4 h-4 text-gray-400" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-gray-50">
                                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                                        Cancelar
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={handleSubmit}
                                        disabled={!formData.title || !formData.openDate || !formData.closeDate || !!dateError}
                                    >
                                        Crear Actividad
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Activities;
