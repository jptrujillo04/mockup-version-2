import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import {
    ArrowLeft,
    Download,
    FileText,
    CheckCircle,
    Clock,
    User,
    Save,
    Search,
    Filter,
    Calendar,
    BookOpen,
    Image,
    Video,
    File,
    X,
    Eye
} from 'lucide-react';

// Types
interface StudentSubmission {
    id: number;
    studentId: string;
    studentName: string;
    studentPhoto?: string;
    submittedAt: string;
    files: { name: string; size: string; type: string }[];
    grade: number | null;
    feedback: string;
    status: 'entregado' | 'pendiente' | 'calificado' | 'tarde';
}

interface Activity {
    id: number;
    title: string;
    subject: string;
    type: string;
    description: string;
    closeDate: string;
    totalStudents: number;
}

// Mock activity data
const mockActivity: Record<string, Activity> = {
    '1': {
        id: 1,
        title: 'Quiz 1 - Ecuaciones',
        subject: 'Matemáticas - 9°A',
        type: 'Examen',
        description: 'Evaluación de ecuaciones lineales y cuadráticas. Incluye 10 preguntas de selección múltiple y 2 problemas de desarrollo.',
        closeDate: '2026-02-05T23:59',
        totalStudents: 32
    },
    '2': {
        id: 2,
        title: 'Taller - Funciones',
        subject: 'Matemáticas - 9°A',
        type: 'Taller',
        description: 'Taller práctico de graficación de funciones lineales y cuadráticas.',
        closeDate: '2026-02-10T23:59',
        totalStudents: 32
    }
};

// Mock submissions data
const mockSubmissions: Record<string, StudentSubmission[]> = {
    '1': [
        { id: 1, studentId: 'EST-001', studentName: 'Juan Pérez', submittedAt: '2026-02-04 14:30', files: [{ name: 'quiz_respuestas.pdf', size: '1.2 MB', type: 'pdf' }], grade: null, feedback: '', status: 'entregado' },
        { id: 2, studentId: 'EST-002', studentName: 'María García', submittedAt: '2026-02-03 09:15', files: [{ name: 'matematicas_quiz1.pdf', size: '890 KB', type: 'pdf' }], grade: 4.5, feedback: 'Excelente trabajo. Buen manejo de ecuaciones cuadráticas.', status: 'calificado' },
        { id: 3, studentId: 'EST-003', studentName: 'Carlos López', submittedAt: '2026-02-05 23:45', files: [{ name: 'quiz_carlos.pdf', size: '1.5 MB', type: 'pdf' }], grade: null, feedback: '', status: 'tarde' },
        { id: 4, studentId: 'EST-004', studentName: 'Ana Martínez', submittedAt: '', files: [], grade: null, feedback: '', status: 'pendiente' },
        { id: 5, studentId: 'EST-005', studentName: 'Luis Rodríguez', submittedAt: '2026-02-04 16:20', files: [{ name: 'respuestas_luis.pdf', size: '2.1 MB', type: 'pdf' }], grade: 4.0, feedback: 'Buen trabajo, revisar ejercicio 5.', status: 'calificado' },
        { id: 6, studentId: 'EST-006', studentName: 'Sofía Hernández', submittedAt: '2026-02-04 10:00', files: [{ name: 'sofia_quiz.pdf', size: '980 KB', type: 'pdf' }], grade: null, feedback: '', status: 'entregado' },
        { id: 7, studentId: 'EST-007', studentName: 'Diego Torres', submittedAt: '', files: [], grade: null, feedback: '', status: 'pendiente' },
        { id: 8, studentId: 'EST-008', studentName: 'Valentina Ruiz', submittedAt: '2026-02-03 15:45', files: [{ name: 'quiz_valentina.pdf', size: '1.1 MB', type: 'pdf' }], grade: 5.0, feedback: '¡Excelente! Trabajo perfecto.', status: 'calificado' },
    ],
    '2': [
        { id: 9, studentId: 'EST-001', studentName: 'Juan Pérez', submittedAt: '2026-02-08 10:00', files: [{ name: 'taller_funciones.pdf', size: '3.2 MB', type: 'pdf' }, { name: 'graficas.png', size: '450 KB', type: 'image' }], grade: null, feedback: '', status: 'entregado' },
        { id: 10, studentId: 'EST-002', studentName: 'María García', submittedAt: '', files: [], grade: null, feedback: '', status: 'pendiente' },
        { id: 11, studentId: 'EST-003', studentName: 'Carlos López', submittedAt: '2026-02-07 20:30', files: [{ name: 'funciones_taller.pdf', size: '1.8 MB', type: 'pdf' }], grade: null, feedback: '', status: 'entregado' },
    ],
};

const ActivitySubmissions: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const activity = mockActivity[id || '1'];
    const [submissions, setSubmissions] = useState<StudentSubmission[]>(mockSubmissions[id || '1'] || []);

    // State
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [selectedStudent, setSelectedStudent] = useState<StudentSubmission | null>(null);
    const [gradeInput, setGradeInput] = useState('');
    const [feedbackInput, setFeedbackInput] = useState('');
    const [isSavingGrade, setIsSavingGrade] = useState(false);
    const [showGradeSuccess, setShowGradeSuccess] = useState(false);
    const [previewFile, setPreviewFile] = useState<{ name: string; type: string } | null>(null);

    // Filter submissions
    const filteredSubmissions = submissions.filter(s => {
        const matchesSearch = s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.studentId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Stats
    const stats = {
        total: submissions.length,
        submitted: submissions.filter(s => s.status !== 'pendiente').length,
        graded: submissions.filter(s => s.status === 'calificado').length,
        pending: submissions.filter(s => s.status === 'pendiente').length,
        late: submissions.filter(s => s.status === 'tarde').length,
        avgGrade: submissions.filter(s => s.grade !== null).length > 0
            ? (submissions.filter(s => s.grade !== null).reduce((acc, s) => acc + (s.grade || 0), 0) / submissions.filter(s => s.grade !== null).length).toFixed(1)
            : '-'
    };

    // Start grading
    const startGrading = (student: StudentSubmission) => {
        setSelectedStudent(student);
        setGradeInput(student.grade?.toString() || '');
        setFeedbackInput(student.feedback || '');
        setShowGradeSuccess(false);
    };

    // Save grade
    const saveGrade = () => {
        if (!selectedStudent || !gradeInput) return;

        setIsSavingGrade(true);

        setTimeout(() => {
            setSubmissions(prev => prev.map(s =>
                s.id === selectedStudent.id
                    ? { ...s, grade: parseFloat(gradeInput), feedback: feedbackInput, status: 'calificado' as const }
                    : s
            ));
            setIsSavingGrade(false);
            setShowGradeSuccess(true);

            setTimeout(() => {
                setShowGradeSuccess(false);
            }, 2000);
        }, 800);
    };

    // Get file icon
    const getFileIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
            case 'image': return <Image className="w-5 h-5 text-blue-500" />;
            case 'video': return <Video className="w-5 h-5 text-purple-500" />;
            default: return <File className="w-5 h-5 text-gray-500" />;
        }
    };

    // Get status badge
    const getStatusBadge = (status: StudentSubmission['status']) => {
        switch (status) {
            case 'entregado':
                return <Badge variant="success">Entregado</Badge>;
            case 'pendiente':
                return <Badge variant="warning">Pendiente</Badge>;
            case 'calificado':
                return <Badge variant="info">Calificado</Badge>;
            case 'tarde':
                return <Badge variant="error">Entrega Tardía</Badge>;
            default:
                return <Badge>-</Badge>;
        }
    };

    // Format date
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

    if (!activity) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-text-main mb-2">Actividad no encontrada</h2>
                    <Button variant="outline" onClick={() => navigate('/teacher/actividades')}>
                        Volver a Actividades
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4">
                <button
                    onClick={() => navigate('/teacher/actividades')}
                    className="mt-1 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                </button>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl font-bold text-text-main">{activity.title}</h1>
                        <Badge variant="default">{activity.type}</Badge>
                    </div>
                    <p className="text-gray-500">{activity.subject}</p>
                    <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Fecha límite: {formatDate(activity.closeDate)}
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card className="!p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{stats.submitted}/{stats.total}</p>
                    <p className="text-xs text-gray-500">Entregas recibidas</p>
                </Card>
                <Card className="!p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{stats.graded}</p>
                    <p className="text-xs text-gray-500">Calificados</p>
                </Card>
                <Card className="!p-4 text-center">
                    <p className="text-2xl font-bold text-amber-500">{stats.pending}</p>
                    <p className="text-xs text-gray-500">Sin entregar</p>
                </Card>
                <Card className="!p-4 text-center">
                    <p className="text-2xl font-bold text-red-500">{stats.late}</p>
                    <p className="text-xs text-gray-500">Entregas tardías</p>
                </Card>
                <Card className="!p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{stats.avgGrade}</p>
                    <p className="text-xs text-gray-500">Promedio</p>
                </Card>
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Students List */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Search and Filter */}
                    <Card className="!p-4">
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[200px]">
                                <Input
                                    type="text"
                                    placeholder="Buscar estudiante..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    icon={Search}
                                />
                            </div>
                            <div className="flex gap-2">
                                {['all', 'entregado', 'calificado', 'pendiente', 'tarde'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${filterStatus === status
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {status === 'all' ? 'Todos' :
                                            status === 'entregado' ? 'Entregados' :
                                                status === 'calificado' ? 'Calificados' :
                                                    status === 'pendiente' ? 'Pendientes' : 'Tardíos'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Students Table */}
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-3 px-4 font-medium text-gray-500">Estudiante</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500">Entrega</th>
                                        <th className="text-center py-3 px-4 font-medium text-gray-500">Estado</th>
                                        <th className="text-center py-3 px-4 font-medium text-gray-500">Nota</th>
                                        <th className="text-center py-3 px-4 font-medium text-gray-500">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSubmissions.map((student) => (
                                        <tr
                                            key={student.id}
                                            className={`border-b border-border/50 hover:bg-gray-50 transition-colors cursor-pointer ${selectedStudent?.id === student.id ? 'bg-primary/5' : ''
                                                }`}
                                            onClick={() => student.status !== 'pendiente' && startGrading(student)}
                                        >
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${student.status === 'calificado' ? 'bg-blue-100' :
                                                            student.status === 'entregado' ? 'bg-green-100' :
                                                                student.status === 'tarde' ? 'bg-red-100' :
                                                                    'bg-gray-100'
                                                        }`}>
                                                        <User className={`w-5 h-5 ${student.status === 'calificado' ? 'text-blue-600' :
                                                                student.status === 'entregado' ? 'text-green-600' :
                                                                    student.status === 'tarde' ? 'text-red-600' :
                                                                        'text-gray-400'
                                                            }`} />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-text-main">{student.studentName}</p>
                                                        <p className="text-xs text-gray-500">{student.studentId}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-gray-500">
                                                {student.submittedAt ? (
                                                    <span className="flex items-center gap-1.5 text-xs">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        {student.submittedAt}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400 text-xs">Sin entregar</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                {getStatusBadge(student.status)}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                {student.grade !== null ? (
                                                    <span className={`text-lg font-bold ${student.grade >= 4.0 ? 'text-green-600' :
                                                            student.grade >= 3.0 ? 'text-amber-500' :
                                                                'text-red-500'
                                                        }`}>{student.grade}</span>
                                                ) : (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                {student.status !== 'pendiente' && (
                                                    <Button
                                                        size="sm"
                                                        variant={selectedStudent?.id === student.id ? 'primary' : 'outline'}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            startGrading(student);
                                                        }}
                                                    >
                                                        {student.status === 'calificado' ? 'Ver/Editar' : 'Calificar'}
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {filteredSubmissions.length === 0 && (
                                <div className="py-12 text-center">
                                    <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">No se encontraron estudiantes con estos filtros</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Grading Panel */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-6">
                        {selectedStudent ? (
                            <div className="space-y-5">
                                {/* Student Header */}
                                <div className="flex items-center gap-3 pb-4 border-b border-border">
                                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                                        <User className="w-7 h-7 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-text-main text-lg">{selectedStudent.studentName}</h3>
                                        <p className="text-sm text-gray-500">ID: {selectedStudent.studentId}</p>
                                    </div>
                                </div>

                                {/* Submitted Files */}
                                <div>
                                    <label className="block text-sm font-medium text-text-main mb-3">
                                        Archivos entregados ({selectedStudent.files.length})
                                    </label>
                                    {selectedStudent.files.length > 0 ? (
                                        <div className="space-y-2">
                                            {selectedStudent.files.map((file, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                                            {getFileIcon(file.type)}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-text-main truncate">{file.name}</p>
                                                            <p className="text-xs text-gray-500">{file.size}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <button
                                                            className="p-2 hover:bg-white rounded-lg transition-colors"
                                                            title="Vista previa"
                                                            onClick={() => setPreviewFile(file)}
                                                        >
                                                            <Eye className="w-4 h-4 text-gray-500" />
                                                        </button>
                                                        <button
                                                            className="p-2 hover:bg-white rounded-lg transition-colors"
                                                            title="Descargar"
                                                        >
                                                            <Download className="w-4 h-4 text-gray-500" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-400 text-center py-4">Sin archivos adjuntos</p>
                                    )}
                                </div>

                                {/* Grading Form */}
                                {showGradeSuccess ? (
                                    <div className="py-6 text-center bg-green-50 rounded-lg">
                                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                                        <p className="font-semibold text-green-700">¡Calificación guardada!</p>
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-text-main mb-2">
                                                Calificación
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="5"
                                                step="0.1"
                                                value={gradeInput}
                                                onChange={(e) => setGradeInput(e.target.value)}
                                                className="w-full px-4 py-4 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-3xl font-bold text-center"
                                                placeholder="0.0 - 5.0"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-text-main mb-2">
                                                Retroalimentación
                                            </label>
                                            <textarea
                                                value={feedbackInput}
                                                onChange={(e) => setFeedbackInput(e.target.value)}
                                                rows={4}
                                                className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none text-sm"
                                                placeholder="Escribe comentarios para el estudiante..."
                                            />
                                        </div>

                                        <Button
                                            variant="primary"
                                            icon={Save}
                                            onClick={saveGrade}
                                            disabled={!gradeInput || isSavingGrade}
                                            className="w-full"
                                        >
                                            {isSavingGrade ? 'Guardando...' : 'Guardar Calificación'}
                                        </Button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="font-medium text-text-main mb-2">Selecciona un estudiante</h3>
                                <p className="text-sm text-gray-500">
                                    Haz clic en un estudiante de la lista para ver su entrega y calificarlo
                                </p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>

            {/* File Preview Modal */}
            {previewFile && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-border">
                            <div className="flex items-center gap-3">
                                {getFileIcon(previewFile.type)}
                                <span className="font-medium">{previewFile.name}</span>
                            </div>
                            <button
                                onClick={() => setPreviewFile(null)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-8 flex items-center justify-center min-h-[400px] bg-gray-50">
                            <div className="text-center">
                                {getFileIcon(previewFile.type)}
                                <p className="mt-4 text-gray-500">Vista previa del archivo</p>
                                <p className="text-sm text-gray-400 mb-4">{previewFile.name}</p>
                                <Button variant="primary" icon={Download}>
                                    Descargar archivo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivitySubmissions;
