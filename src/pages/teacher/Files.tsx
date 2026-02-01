import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import {
    Upload,
    Download,
    Trash2,
    FileText,
    Video,
    File,
    X,
    CheckCircle,
    AlertCircle,
    Search
} from 'lucide-react';

// Types
interface Material {
    id: number;
    name: string;
    type: 'pdf' | 'video' | 'doc';
    subjectCode: string;
    subject: string;
    period: string;
    date: string;
}

// Mock data
const initialMaterialsData: Material[] = [
    { id: 1, name: 'Guía de Ecuaciones Cuadráticas', type: 'pdf', subjectCode: 'math-9a', subject: 'Matemáticas 9°A', period: 't1', date: '2026-01-20' },
    { id: 2, name: 'Video: Funciones Lineales', type: 'video', subjectCode: 'math-9b', subject: 'Matemáticas 9°B', period: 't1', date: '2026-01-18' },
    { id: 3, name: 'Ejercicios Prácticos - Unidad 3', type: 'doc', subjectCode: 'math-10a', subject: 'Matemáticas 10°A', period: 't1', date: '2026-01-15' },
    { id: 4, name: 'Taller de Repaso - Trimestre 2', type: 'pdf', subjectCode: 'math-9a', subject: 'Matemáticas 9°A', period: 't2', date: '2026-03-10' },
    { id: 5, name: 'Video: Álgebra Avanzada', type: 'video', subjectCode: 'math-10a', subject: 'Matemáticas 10°A', period: 't2', date: '2026-03-05' },
    { id: 6, name: 'Guía de Trigonometría', type: 'pdf', subjectCode: 'math-9b', subject: 'Matemáticas 9°B', period: 't3', date: '2026-05-12' },
];

const getFileIcon = (type: string) => {
    switch (type) {
        case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
        case 'video': return <Video className="w-5 h-5 text-purple-500" />;
        default: return <File className="w-5 h-5 text-blue-500" />;
    }
};

const subjectOptions = [
    { value: 'math-9a', label: 'Matemáticas 9°A' },
    { value: 'math-9b', label: 'Matemáticas 9°B' },
    { value: 'math-10a', label: 'Matemáticas 10°A' },
];

const periodOptions = [
    { value: 't1', label: 'Primer Trimestre' },
    { value: 't2', label: 'Segundo Trimestre' },
    { value: 't3', label: 'Tercer Trimestre' },
];

const typeOptions = [
    { value: 'material', label: 'Material de apoyo' },
    { value: 'activity', label: 'Actividad' },
];

const Files: React.FC = () => {
    const [materials, setMaterials] = useState<Material[]>(initialMaterialsData);

    // Upload form state
    const [selectedSubject, setSelectedSubject] = useState('math-9a');
    const [selectedPeriod, setSelectedPeriod] = useState('t1');
    const [selectedType, setSelectedType] = useState('material');

    // Table filter state
    const [filterPeriod, setFilterPeriod] = useState('t1');
    const [filterSubject, setFilterSubject] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Period tabs for table
    const periodTabs = [
        { value: 't1', label: 'Periodo 1' },
        { value: 't2', label: 'Periodo 2' },
        { value: 't3', label: 'Periodo 3' },
    ];

    // Filter materials
    const filteredMaterials = materials.filter(m => {
        const matchesPeriod = m.period === filterPeriod;
        const matchesSubject = filterSubject === 'all' || m.subjectCode === filterSubject;
        const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.subject.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesPeriod && matchesSubject && matchesSearch;
    });

    // Modal state
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [dragActive, setDragActive] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);

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

    // Handle upload button click
    const handleUploadClick = () => {
        setIsUploadModalOpen(true);
        setUploadedFiles([]);
        setUploadSuccess(false);
        setUploadError(false);
    };

    // Handle actual upload
    const handleUpload = () => {
        if (uploadedFiles.length === 0) {
            setUploadError(true);
            setTimeout(() => setUploadError(false), 3000);
            return;
        }

        setIsUploading(true);

        // Simulate upload
        setTimeout(() => {
            // Add new materials
            const newMaterials = uploadedFiles.map((fileName, idx) => ({
                id: materials.length + idx + 1,
                name: fileName.replace(/\.[^/.]+$/, ''), // Remove extension from name
                type: fileName.endsWith('.pdf') ? 'pdf' as const :
                    fileName.endsWith('.mp4') || fileName.endsWith('.mov') ? 'video' as const : 'doc' as const,
                subjectCode: selectedSubject,
                subject: subjectOptions.find(s => s.value === selectedSubject)?.label || 'Matemáticas 9°A',
                period: selectedPeriod,
                date: new Date().toISOString().split('T')[0],
            }));

            setMaterials(prev => [...newMaterials, ...prev]);
            setIsUploading(false);
            setUploadSuccess(true);

            // Close modal after success
            setTimeout(() => {
                setIsUploadModalOpen(false);
                setUploadedFiles([]);
                setUploadSuccess(false);
            }, 2000);
        }, 1500);
    };

    // Close modal
    const closeModal = () => {
        if (!isUploading) {
            setIsUploadModalOpen(false);
            setUploadedFiles([]);
            setUploadSuccess(false);
            setUploadError(false);
        }
    };

    // Handle delete material
    const handleDeleteMaterial = (id: number) => {
        setMaterials(prev => prev.filter(m => m.id !== id));
    };

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
                        options={subjectOptions}
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                    />
                    <Select
                        label="Período"
                        options={periodOptions}
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                    />
                    <Select
                        label="Tipo"
                        options={typeOptions}
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    />
                    <div className="flex items-end">
                        <Button
                            variant="primary"
                            icon={Upload}
                            className="w-full"
                            onClick={handleUploadClick}
                        >
                            Subir Archivo
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Period Tabs */}
            <div className="flex items-center gap-4 border-b border-border">
                <nav className="flex">
                    {periodTabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setFilterPeriod(tab.value)}
                            className={`relative px-4 py-3 text-sm font-medium transition-colors ${filterPeriod === tab.value
                                ? 'text-primary'
                                : 'text-gray-500 hover:text-text-main'
                                }`}
                        >
                            {tab.label}
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

            {/* Filters */}
            <Card className="!p-4">
                <div className="flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Buscar</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar archivo..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                            />
                        </div>
                    </div>
                    <div className="w-48">
                        <Select
                            label="Materia"
                            options={[{ value: 'all', label: 'Todas las materias' }, ...subjectOptions]}
                            value={filterSubject}
                            onChange={(e) => setFilterSubject(e.target.value)}
                        />
                    </div>
                </div>
            </Card>

            {/* Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-4 font-medium text-gray-500">Archivo</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500">Materia</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500">Fecha</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-500">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMaterials.map((material) => (
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
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="p-1 h-8 w-8 text-red-500"
                                                title="Eliminar"
                                                onClick={() => handleDeleteMaterial(material.id)}
                                            >
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

            {/* Upload Modal */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-5 border-b border-border">
                            <div>
                                <h3 className="text-lg font-semibold text-text-main">Subir Archivo</h3>
                                <p className="text-sm text-gray-500">
                                    {subjectOptions.find(s => s.value === selectedSubject)?.label} · {periodOptions.find(p => p.value === selectedPeriod)?.label}
                                </p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 p-2"
                                disabled={isUploading}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-5 space-y-5">
                            {/* Success State */}
                            {uploadSuccess ? (
                                <div className="py-8 text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-text-main mb-2">¡Archivo subido exitosamente!</h4>
                                    <p className="text-gray-500">Tu material ya está disponible para los estudiantes.</p>
                                </div>
                            ) : isUploading ? (
                                /* Loading State */
                                <div className="py-8 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 relative">
                                        <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
                                        <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                    <h4 className="text-lg font-semibold text-text-main mb-2">Subiendo archivo...</h4>
                                    <p className="text-gray-500">Por favor espera mientras se sube tu material.</p>
                                </div>
                            ) : (
                                <>
                                    {/* File Dropzone */}
                                    <div
                                        className={`
                                            border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer
                                            ${dragActive
                                                ? 'border-primary bg-primary/5'
                                                : uploadError
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-border hover:border-primary/50'
                                            }
                                        `}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                        onClick={() => document.getElementById('upload-file-input')?.click()}
                                    >
                                        <input
                                            id="upload-file-input"
                                            type="file"
                                            multiple
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        <Upload className={`w-12 h-12 mx-auto mb-3 ${uploadError ? 'text-red-400' : 'text-gray-400'}`} />
                                        <p className="text-sm text-gray-600">
                                            Arrastra tus archivos aquí o <span className="text-primary font-medium">haz clic para seleccionar</span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">PDF, Word, PowerPoint, Videos (máx. 50MB)</p>
                                        {uploadError && (
                                            <div className="flex items-center justify-center gap-2 mt-3 text-red-600 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>Debes seleccionar al menos un archivo</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Uploaded Files List */}
                                    {uploadedFiles.length > 0 && (
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-text-main">
                                                Archivos seleccionados ({uploadedFiles.length})
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
                                </>
                            )}
                        </div>

                        {/* Modal Footer */}
                        {!uploadSuccess && !isUploading && (
                            <div className="flex justify-end gap-3 p-5 border-t border-border bg-gray-50">
                                <Button variant="outline" onClick={closeModal}>
                                    Cancelar
                                </Button>
                                <Button
                                    variant="primary"
                                    icon={Upload}
                                    onClick={handleUpload}
                                    disabled={uploadedFiles.length === 0}
                                >
                                    Subir {uploadedFiles.length > 0 ? `(${uploadedFiles.length})` : ''}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Files;
