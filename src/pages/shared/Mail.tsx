import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import {
    Search,
    Mail,
    Send,
    Inbox,
    Star,
    Trash2,
    X,
    Paperclip,
    ChevronLeft
} from 'lucide-react';

// Mock data
const mailData = [
    {
        id: 1,
        from: 'Prof. María González',
        subject: 'Recuperación examen de Matemáticas',
        preview: 'Estimado estudiante, le informo que la fecha de recuperación del último examen será el próximo viernes...',
        date: '2026-01-28',
        read: false,
        starred: true,
        body: `Estimado Juan,

Le informo que la fecha de recuperación del último examen de Matemáticas será el próximo viernes 31 de enero a las 10:00 AM en el salón 201.

Por favor traer calculadora científica y los materiales de estudio necesarios.

Cualquier duda, no dude en contactarme.

Saludos cordiales,
Prof. María González
Departamento de Matemáticas`
    },
    {
        id: 2,
        from: 'Secretaría Académica',
        subject: 'Recordatorio: Entrega de documentos',
        preview: 'Se recuerda a los estudiantes que deben entregar los documentos pendientes antes del 15 de febrero...',
        date: '2026-01-27',
        read: true,
        starred: false,
        body: `Estimado estudiante,

Se recuerda que debe entregar los siguientes documentos antes del 15 de febrero:
- Fotocopia del documento de identidad actualizado
- Certificado médico vigente
- Formato de autorización firmado por los acudientes

Puede entregarlos en la oficina de Secretaría Académica en horario de 8:00 AM a 4:00 PM.

Atentamente,
Secretaría Académica`
    },
    {
        id: 3,
        from: 'Prof. Carlos Ruiz',
        subject: 'Trabajo de investigación - Español',
        preview: 'Buenos días, adjunto encontrarás las instrucciones para el trabajo de investigación que debes presentar...',
        date: '2026-01-25',
        read: true,
        starred: false,
        body: `Buenos días Juan,

Adjunto encontrarás las instrucciones para el trabajo de investigación que debes presentar la próxima semana.

El tema asignado a tu grupo es: "La literatura colombiana en el siglo XX".

Recuerda que el trabajo debe tener:
- Mínimo 5 páginas
- Bibliografía citada en formato APA
- Incluir al menos 3 autores colombianos

Fecha de entrega: 5 de febrero

Saludos,
Prof. Carlos Ruiz`
    },
    {
        id: 4,
        from: 'Coordinación',
        subject: 'Horario de actividades extracurriculares',
        preview: 'Se informa el nuevo horario de actividades extracurriculares para el primer trimestre...',
        date: '2026-01-20',
        read: true,
        starred: true,
        body: `Estimados estudiantes,

Se informa el nuevo horario de actividades extracurriculares para el primer trimestre 2026:

- Fútbol: Lunes y Miércoles 3:00 PM - 5:00 PM
- Música: Martes y Jueves 3:00 PM - 4:30 PM
- Arte: Viernes 2:00 PM - 4:00 PM
- Teatro: Sábados 9:00 AM - 12:00 PM

Las inscripciones están abiertas hasta el 31 de enero.

Coordinación Académica`
    },
];

interface MailPageProps {
    userRole?: 'student' | 'teacher' | 'billing';
}

const MailPage: React.FC<MailPageProps> = ({ userRole = 'student' }) => {
    const [selectedMail, setSelectedMail] = useState<typeof mailData[0] | null>(null);
    const [showCompose, setShowCompose] = useState(false);
    const [filter, setFilter] = useState<'inbox' | 'starred' | 'sent'>('inbox');

    const filteredMail = filter === 'starred'
        ? mailData.filter(m => m.starred)
        : mailData;

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Correo Interno</h1>
                    <p className="text-gray-500">Comunicación institucional</p>
                </div>
                <Button variant="primary" icon={Send} onClick={() => setShowCompose(true)}>
                    Redactar
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-2">
                    <button
                        onClick={() => { setFilter('inbox'); setSelectedMail(null); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${filter === 'inbox' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 text-gray-600'
                            }`}
                    >
                        <Inbox className="w-5 h-5" />
                        <span className="font-medium">Bandeja de entrada</span>
                        <Badge variant="info" className="ml-auto">{mailData.filter(m => !m.read).length}</Badge>
                    </button>
                    <button
                        onClick={() => { setFilter('starred'); setSelectedMail(null); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${filter === 'starred' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 text-gray-600'
                            }`}
                    >
                        <Star className="w-5 h-5" />
                        <span className="font-medium">Destacados</span>
                    </button>
                    <button
                        onClick={() => { setFilter('sent'); setSelectedMail(null); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${filter === 'sent' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 text-gray-600'
                            }`}
                    >
                        <Send className="w-5 h-5" />
                        <span className="font-medium">Enviados</span>
                    </button>
                </div>

                {/* Mail List / Content */}
                <div className="lg:col-span-3">
                    {!selectedMail ? (
                        <Card>
                            {/* Search */}
                            <div className="mb-4">
                                <Input placeholder="Buscar correos..." icon={Search} />
                            </div>

                            {/* Mail List */}
                            {filter === 'sent' ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <Send className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-text-main mb-1">Sin mensajes enviados</h3>
                                    <p className="text-gray-500 text-sm">Los correos que envíes aparecerán aquí.</p>
                                </div>
                            ) : filteredMail.length > 0 ? (
                                <div className="divide-y divide-border">
                                    {filteredMail.map((mail) => (
                                        <button
                                            key={mail.id}
                                            onClick={() => setSelectedMail(mail)}
                                            className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${!mail.read ? 'bg-blue-50/50' : ''
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${!mail.read ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                                                    }`}>
                                                    <Mail className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className={`font-medium ${!mail.read ? 'text-text-main' : 'text-gray-600'}`}>
                                                            {mail.from}
                                                        </span>
                                                        <div className="flex items-center gap-2">
                                                            {mail.starred && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                                                            <span className="text-xs text-gray-400">{mail.date}</span>
                                                        </div>
                                                    </div>
                                                    <p className={`text-sm ${!mail.read ? 'font-medium text-text-main' : 'text-gray-600'}`}>
                                                        {mail.subject}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate mt-1">{mail.preview}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <Inbox className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-text-main mb-1">Sin correos</h3>
                                    <p className="text-gray-500 text-sm">No hay mensajes en esta carpeta.</p>
                                </div>
                            )}
                        </Card>
                    ) : (
                        /* Mail Detail View */
                        <Card>
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedMail(null)}
                                    className="p-2"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </Button>
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-text-main">{selectedMail.subject}</h2>
                                    <p className="text-sm text-gray-500">De: {selectedMail.from} · {selectedMail.date}</p>
                                </div>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="sm" className="p-2" title="Destacar">
                                        <Star className={`w-5 h-5 ${selectedMail.starred ? 'text-yellow-500 fill-yellow-500' : ''}`} />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="p-2 text-red-500" title="Eliminar">
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            <div className="prose prose-sm max-w-none">
                                <pre className="whitespace-pre-wrap font-sans text-text-main bg-transparent p-0 m-0">
                                    {selectedMail.body}
                                </pre>
                            </div>

                            <div className="flex gap-3 mt-8 pt-4 border-t border-border">
                                <Button variant="primary" icon={Send}>Responder</Button>
                                <Button variant="outline">Reenviar</Button>
                            </div>
                        </Card>
                    )}
                </div>
            </div>

            {/* Compose Modal */}
            {showCompose && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-card shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-4 border-b border-border">
                            <h3 className="text-lg font-semibold text-text-main">Nuevo mensaje</h3>
                            <button
                                onClick={() => setShowCompose(false)}
                                className="text-gray-400 hover:text-gray-600 p-2"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                            <Input label="Para" placeholder="Buscar destinatario..." />
                            <Input label="Asunto" placeholder="Escribe el asunto del mensaje..." />
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-1">Mensaje</label>
                                <textarea
                                    className="w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary text-sm p-3 min-h-[200px]"
                                    placeholder="Escribe tu mensaje aquí..."
                                />
                            </div>
                            <Button variant="ghost" size="sm" icon={Paperclip}>
                                Adjuntar archivo
                            </Button>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-3 p-4 border-t border-border bg-gray-50">
                            <Button variant="outline" onClick={() => setShowCompose(false)}>Descartar</Button>
                            <Button variant="primary" icon={Send} onClick={() => setShowCompose(false)}>Enviar</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MailPage;
