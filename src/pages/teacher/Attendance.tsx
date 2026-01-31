import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CheckCircle, X, Clock, Users } from 'lucide-react';

// Mock data
const courses = [
    { id: 1, name: '9° A', subject: 'Matemáticas', students: 32, time: '7:00 AM' },
    { id: 2, name: '9° B', subject: 'Matemáticas', students: 30, time: '8:00 AM' },
    { id: 3, name: '10° A', subject: 'Matemáticas', students: 28, time: '10:00 AM' },
];

const studentsData = [
    { id: 1, name: 'Juan Pérez', status: 'present' },
    { id: 2, name: 'María García', status: 'present' },
    { id: 3, name: 'Carlos López', status: 'late' },
    { id: 4, name: 'Ana Torres', status: 'present' },
    { id: 5, name: 'Pedro Martínez', status: 'absent' },
    { id: 6, name: 'Laura Sánchez', status: 'present' },
];

type AttendanceStatus = 'present' | 'late' | 'absent';

const Attendance: React.FC = () => {
    const [selectedCourse, setSelectedCourse] = useState(courses[0]);
    const [attendance, setAttendance] = useState<Record<number, AttendanceStatus>>(
        Object.fromEntries(studentsData.map(s => [s.id, s.status as AttendanceStatus]))
    );
    const [showSuccess, setShowSuccess] = useState(false);

    const handleStatusChange = (studentId: number, status: AttendanceStatus) => {
        setAttendance({ ...attendance, [studentId]: status });
    };

    const handleSave = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const counts = {
        present: Object.values(attendance).filter(s => s === 'present').length,
        late: Object.values(attendance).filter(s => s === 'late').length,
        absent: Object.values(attendance).filter(s => s === 'absent').length,
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-text-main">Asistencia</h1>
                <p className="text-gray-500">Registra la asistencia por curso</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Course List (Left) */}
                <div className="lg:col-span-1 space-y-2">
                    {courses.map((course) => (
                        <button
                            key={course.id}
                            onClick={() => setSelectedCourse(course)}
                            className={`w-full text-left p-4 rounded-lg border transition-colors ${selectedCourse.id === course.id
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border bg-surface hover:border-gray-300'
                                }`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium text-text-main">{course.name}</h3>
                                    <p className="text-sm text-gray-500">{course.subject}</p>
                                </div>
                                <Badge variant="info">{course.time}</Badge>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">
                                <Users className="w-3 h-3 inline mr-1" />{course.students} estudiantes
                            </p>
                        </button>
                    ))}
                </div>

                {/* Attendance Panel (Right) */}
                <div className="lg:col-span-3">
                    <Card title={`${selectedCourse.name} - ${selectedCourse.subject}`}>
                        {/* Counters */}
                        <div className="flex gap-4 mb-6 pb-4 border-b border-border">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-success"></div>
                                <span className="text-sm">Presentes: <strong>{counts.present}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-alert"></div>
                                <span className="text-sm">Retardos: <strong>{counts.late}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="text-sm">Ausentes: <strong>{counts.absent}</strong></span>
                            </div>
                        </div>

                        {/* Students List */}
                        <div className="space-y-2">
                            {studentsData.map((student) => (
                                <div
                                    key={student.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <span className="font-medium">{student.name}</span>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handleStatusChange(student.id, 'present')}
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${attendance[student.id] === 'present'
                                                    ? 'bg-success text-white'
                                                    : 'bg-white border border-border text-gray-400 hover:border-success hover:text-success'
                                                }`}
                                            title="Presente"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(student.id, 'late')}
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${attendance[student.id] === 'late'
                                                    ? 'bg-alert text-white'
                                                    : 'bg-white border border-border text-gray-400 hover:border-alert hover:text-alert'
                                                }`}
                                            title="Retardo"
                                        >
                                            <Clock className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(student.id, 'absent')}
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${attendance[student.id] === 'absent'
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-white border border-border text-gray-400 hover:border-red-500 hover:text-red-500'
                                                }`}
                                            title="Ausente"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end pt-4 border-t border-border mt-4">
                            <Button variant="primary" onClick={handleSave}>Guardar Asistencia</Button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-card shadow-xl p-8 max-w-sm w-full mx-4 text-center">
                        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-10 h-10 text-success" />
                        </div>
                        <h3 className="text-xl font-semibold text-text-main mb-2">Asistencia registrada</h3>
                        <p className="text-gray-500 mb-6">La asistencia de {selectedCourse.name} ha sido guardada.</p>
                        <Button variant="primary" onClick={() => setShowSuccess(false)}>
                            Entendido
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Attendance;
