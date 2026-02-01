import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import {
    Search,
    Upload,
    CheckCircle,
    Clock,
    X,
    FileText,
    Trash2,
    Send
} from 'lucide-react';

// Types
interface Activity {
    id: number;
    subject: string;
    title: string;
    dueDate: string;
    status: 'pending' | 'submitted';
    description?: string;
}

// Mock data
const initialActivitiesData: Activity[] = [
    { id: 1, subject: 'Matemáticas', title: 'Taller ecuaciones cuadráticas', dueDate: '2026-02-05', status: 'pending', description: 'Resolver los ejercicios 1 al 15 de la guía de ecuaciones cuadráticas. Mostrar todos los procedimientos.' },
    { id: 2, subject: 'Español', title: 'Ensayo literario', dueDate: '2026-02-03', status: 'submitted', description: 'Escribir un ensayo de 500 palabras sobre la obra asignada.' },
    { id: 3, subject: 'Ciencias', title: 'Informe de laboratorio', dueDate: '2026-02-08', status: 'pending', description: 'Elaborar el informe de la práctica de reacciones químicas siguiendo el formato establecido.' },
    { id: 4, subject: 'Inglés', title: 'Reading comprehension', dueDate: '2026-01-28', status: 'submitted', description: 'Complete the reading comprehension exercises from pages 45-50.' },
    { id: 5, subject: 'Historia', title: 'Línea de tiempo Revolución', dueDate: '2026-02-10', status: 'pending', description: 'Crear una línea de tiempo ilustrada de los eventos principales de la Revolución Francesa.' },
];

const Activities: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>(initialActivitiesData);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [dragActive, setDragActive] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Filter activities
    const filteredActivities = activities.filter(activity => {
        if (searchQuery) {
            return activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                activity.subject.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
    });

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

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const fileNames = Array.from(e.dataTransfer.files).map(f => f.name);
            setUploadedFiles(prev => [...prev, ...fileNames]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const fileNames = Array.from(e.target.files).map(f => f.name);
            setUploadedFiles(prev => [...prev, ...fileNames]);
        }
    };

    const removeFile = (fileName: string) => {
        setUploadedFiles(prev => prev.filter(f => f !== fileName));
    };

    // Handle submission
    const handleSubmit = () => {
        if (!selectedActivity || uploadedFiles.length === 0) return;

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setActivities(prev => prev.map(act =>
                act.id === selectedActivity.id
                    ? { ...act, status: 'submitted' as const }
                    : act
            ));
            setIsSubmitting(false);
            setShowSuccess(true);

            // Close modal after success
            setTimeout(() => {
                setShowSuccess(false);
                setSelectedActivity(null);
                setUploadedFiles([]);
            }, 1500);
        }, 1000);
    };

    // Close modal
    const closeModal = () => {
        setSelectedActivity(null);
        setUploadedFiles([]);
        setShowSuccess(false);
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-text-main">Actividades</h1>
                <p className="text-gray-500">Tareas y trabajos pendientes</p>
            </div>

            {/* Search */}
            <Card className="!p-4">
                <Input
                    placeholder="Buscar por materia o actividad..."
                    icon={Search}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Card>

            {/* Activities List */}
            <div className="space-y-4">
                {filteredActivities.map((activity) => (
                    <Card key={activity.id} className="!p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${activity.status === 'submitted' ? 'bg-success/10' : 'bg-alert/10'
                                    }`}>
                                    {activity.status === 'submitted'
                                        ? <CheckCircle className="w-6 h-6 text-success" />
                                        : <Clock className="w-6 h-6 text-alert" />
                                    }
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-medium text-text-main">{activity.title}</h3>
                                        <Badge variant={activity.status === 'submitted' ? 'success' : 'warning'}>
                                            {activity.status === 'submitted' ? 'Entregado' : 'Pendiente'}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-500">{activity.subject} · Fecha límite: {activity.dueDate}</p>
                                </div>
                            </div>
                            {activity.status === 'pending' && (
                                <Button
                                    variant="primary"
                                    size="sm"
                                    icon={Upload}
                                    onClick={() => setSelectedActivity(activity)}
                                >
                                    Entregar
                                </Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredActivities.length === 0 && (
                <Card className="py-12">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-text-main mb-1">Sin resultados</h3>
                        <p className="text-gray-500 text-sm">No se encontraron actividades que coincidan con tu búsqueda.</p>
                    </div>
                </Card>
            )}

            {/* Submission Modal */}
            {selectedActivity && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-5 border-b border-border">
                            <div>
                                <h3 className="text-lg font-semibold text-text-main">Entregar actividad</h3>
                                <p className="text-sm text-gray-500">{selectedActivity.subject}</p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 p-2"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-5 space-y-5">
                            {/* Activity Info */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium text-text-main mb-2">{selectedActivity.title}</h4>
                                <p className="text-sm text-gray-600">{selectedActivity.description}</p>
                                <div className="flex items-center gap-2 mt-3 text-sm">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-500">Fecha límite: {selectedActivity.dueDate}</span>
                                </div>
                            </div>

                            {/* File Dropzone */}
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">
                                    Archivos a entregar
                                </label>
                                <div
                                    className={`
                                        border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer
                                        ${dragActive
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary/50'
                                        }
                                    `}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    onClick={() => document.getElementById('file-input')?.click()}
                                >
                                    <input
                                        id="file-input"
                                        type="file"
                                        multiple
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                                    <p className="text-sm text-gray-600">
                                        Arrastra tus archivos aquí o <span className="text-primary font-medium">haz clic para seleccionar</span>
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">PDF, Word, imágenes (máx. 10MB)</p>
                                </div>
                            </div>

                            {/* Uploaded Files */}
                            {uploadedFiles.length > 0 && (
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-text-main">
                                        Archivos cargados ({uploadedFiles.length})
                                    </label>
                                    {uploadedFiles.map((file, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                                                    <FileText className="w-4 h-4 text-red-500" />
                                                </div>
                                                <span className="text-sm text-text-main">{file}</span>
                                            </div>
                                            <button
                                                onClick={() => removeFile(file)}
                                                className="text-gray-400 hover:text-red-500 p-1"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-3 p-5 border-t border-border bg-gray-50">
                            <Button variant="outline" onClick={closeModal} disabled={isSubmitting}>
                                Cancelar
                            </Button>
                            <Button
                                variant="primary"
                                icon={showSuccess ? CheckCircle : Send}
                                onClick={handleSubmit}
                                disabled={uploadedFiles.length === 0 || isSubmitting || showSuccess}
                            >
                                {isSubmitting ? 'Enviando...' : showSuccess ? '¡Entregado!' : 'Enviar entrega'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Activities;
