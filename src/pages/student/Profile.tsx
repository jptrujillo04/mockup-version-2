import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Camera, Shield } from 'lucide-react';

// Mock data - Juan Pérez
const mockStudent = {
    id: 'EST-2024-001',
    name: 'Juan Pérez',
    grade: '9°',
    section: 'A',
    school: 'Colegio Talentos 360',
    code: '2024-9A-001',
};

const studentData = {
    firstName: 'Juan',
    lastName: 'Pérez García',
    birthDate: '2010-05-15',
    documentType: 'TI',
    document: '1234567890',
    email: 'juan.perez@talentos.edu',
    phone: '3001234567',
    address: 'Calle 123 #45-67',
    bloodType: 'O+',
    eps: 'Sura',
};

const momData = {
    firstName: 'María',
    lastName: 'García López',
    documentType: 'CC',
    document: '51234567',
    email: 'maria.garcia@email.com',
    phone: '3109876543',
    occupation: 'Contadora',
    company: 'Empresa ABC',
};

const dadData = {
    firstName: 'Carlos',
    lastName: 'Pérez Rodríguez',
    documentType: 'CC',
    document: '79876543',
    email: 'carlos.perez@email.com',
    phone: '3201234567',
    occupation: 'Ingeniero',
    company: 'Tech Solutions',
};

const StudentProfile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'student' | 'mom' | 'dad'>('student');

    const tabs = [
        { id: 'student', label: 'Estudiante' },
        { id: 'mom', label: 'Mamá' },
        { id: 'dad', label: 'Papá' },
    ] as const;

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-text-main">Mi Perfil</h1>
                <p className="text-gray-500">Información personal y de acudientes</p>
            </div>

            {/* Profile Summary */}
            <Card>
                <div className="flex items-center gap-6">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-400">
                            JP
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-text-main">{mockStudent.name}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                            <div>
                                <span className="text-gray-500">Código:</span>
                                <p className="font-medium">{mockStudent.code}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Colegio:</span>
                                <p className="font-medium">{mockStudent.school}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Grado:</span>
                                <p className="font-medium">{mockStudent.grade} {mockStudent.section}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Aula:</span>
                                <p className="font-medium">Salón 9A</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Tabs */}
            <div className="border-b border-border">
                <div className="flex gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-text-main'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'student' && (
                <Card title="Datos del Estudiante">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Nombres" defaultValue={studentData.firstName} readOnly />
                        <Input label="Apellidos" defaultValue={studentData.lastName} readOnly />
                        <Input label="Fecha de nacimiento" defaultValue={studentData.birthDate} type="date" readOnly />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Tipo Doc." defaultValue={studentData.documentType} readOnly />
                            <Input label="Número" defaultValue={studentData.document} readOnly />
                        </div>
                        <Input label="Correo electrónico" defaultValue={studentData.email} readOnly />
                        <Input label="Teléfono" defaultValue={studentData.phone} readOnly />
                        <Input label="Dirección" defaultValue={studentData.address} readOnly className="md:col-span-2" />
                        <Input label="Tipo de sangre" defaultValue={studentData.bloodType} readOnly />
                        <Input label="EPS" defaultValue={studentData.eps} readOnly />
                    </div>
                </Card>
            )}

            {activeTab === 'mom' && (
                <Card title="Datos de la Madre">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Nombres" defaultValue={momData.firstName} readOnly />
                        <Input label="Apellidos" defaultValue={momData.lastName} readOnly />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Tipo Doc." defaultValue={momData.documentType} readOnly />
                            <Input label="Número" defaultValue={momData.document} readOnly />
                        </div>
                        <Input label="Correo electrónico" defaultValue={momData.email} readOnly />
                        <Input label="Teléfono" defaultValue={momData.phone} readOnly />
                        <Input label="Ocupación" defaultValue={momData.occupation} readOnly />
                        <Input label="Empresa" defaultValue={momData.company} readOnly />
                    </div>
                </Card>
            )}

            {activeTab === 'dad' && (
                <Card title="Datos del Padre">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Nombres" defaultValue={dadData.firstName} readOnly />
                        <Input label="Apellidos" defaultValue={dadData.lastName} readOnly />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Tipo Doc." defaultValue={dadData.documentType} readOnly />
                            <Input label="Número" defaultValue={dadData.document} readOnly />
                        </div>
                        <Input label="Correo electrónico" defaultValue={dadData.email} readOnly />
                        <Input label="Teléfono" defaultValue={dadData.phone} readOnly />
                        <Input label="Ocupación" defaultValue={dadData.occupation} readOnly />
                        <Input label="Empresa" defaultValue={dadData.company} readOnly />
                    </div>
                </Card>
            )}

            {/* Data Protection Notice */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p>
                    <strong>Protección de datos:</strong> La información aquí mostrada está protegida según la ley de habeas data.
                    Para modificar cualquier dato, por favor comuníquese con la secretaría del colegio.
                </p>
            </div>
        </div>
    );
};

export default StudentProfile;
