import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Search, Upload, CheckCircle, Clock } from 'lucide-react';

// Mock data
const activitiesData = [
    { id: 1, subject: 'Matemáticas', title: 'Taller ecuaciones cuadráticas', dueDate: '2026-02-05', status: 'pending' },
    { id: 2, subject: 'Español', title: 'Ensayo literario', dueDate: '2026-02-03', status: 'submitted' },
    { id: 3, subject: 'Ciencias', title: 'Informe de laboratorio', dueDate: '2026-02-08', status: 'pending' },
    { id: 4, subject: 'Inglés', title: 'Reading comprehension', dueDate: '2026-01-28', status: 'submitted' },
    { id: 5, subject: 'Historia', title: 'Línea de tiempo Revolución', dueDate: '2026-02-10', status: 'pending' },
];

const Activities: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-text-main">Actividades</h1>
                <p className="text-gray-500">Tareas y trabajos pendientes</p>
            </div>

            {/* Search */}
            <Card className="!p-4">
                <Input placeholder="Buscar por materia o actividad..." icon={Search} />
            </Card>

            {/* Activities List */}
            <div className="space-y-4">
                {activitiesData.map((activity) => (
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
                                <Button variant="primary" size="sm" icon={Upload}>
                                    Entregar
                                </Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Activities;
