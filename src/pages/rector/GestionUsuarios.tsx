import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import {
    Search,
    UserPlus,
    Shield,
    ShieldOff,
    Edit,
    Trash2,
    X,
    Save
} from 'lucide-react';

// Mock data
const usuariosData = [
    { id: 1, name: 'Admin General', email: 'admin@talentos.edu', role: 'admin', status: 'active', lastLogin: '2026-01-28' },
    { id: 2, name: 'Secretaria Académica', email: 'secretaria@talentos.edu', role: 'secretary', status: 'active', lastLogin: '2026-01-27' },
    { id: 3, name: 'Coord. Primaria', email: 'coord.primaria@talentos.edu', role: 'coordinator', status: 'active', lastLogin: '2026-01-25' },
    { id: 4, name: 'Coord. Bachillerato', email: 'coord.bach@talentos.edu', role: 'coordinator', status: 'inactive', lastLogin: '2026-01-10' },
    { id: 5, name: 'Tesorería', email: 'tesoreria@talentos.edu', role: 'billing', status: 'active', lastLogin: '2026-01-28' },
];

const GestionUsuariosPage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'admin': return <Badge variant="error">Admin</Badge>;
            case 'secretary': return <Badge variant="info">Secretaría</Badge>;
            case 'coordinator': return <Badge variant="warning">Coordinador</Badge>;
            case 'billing': return <Badge variant="success">Facturación</Badge>;
            default: return <Badge variant="default">{role}</Badge>;
        }
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Gestión de Usuarios</h1>
                    <p className="text-gray-500">Administración de cuentas y permisos</p>
                </div>
                <Button variant="primary" icon={UserPlus} onClick={() => setShowModal(true)}>
                    Nuevo usuario
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Input placeholder="Buscar por nombre o correo..." icon={Search} />
                    </div>
                    <Select
                        options={[
                            { value: '', label: 'Todos los roles' },
                            { value: 'admin', label: 'Admin' },
                            { value: 'secretary', label: 'Secretaría' },
                            { value: 'coordinator', label: 'Coordinador' },
                            { value: 'billing', label: 'Facturación' },
                        ]}
                        className="w-48"
                    />
                    <Select
                        options={[
                            { value: '', label: 'Todos los estados' },
                            { value: 'active', label: 'Activo' },
                            { value: 'inactive', label: 'Inactivo' },
                        ]}
                        className="w-40"
                    />
                </div>
            </Card>

            {/* Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Nombre</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Correo</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Rol</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Estado</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Último acceso</th>
                                <th className="text-right py-3 px-2 font-medium text-gray-500">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosData.map((usuario) => (
                                <tr key={usuario.id} className="border-b border-border/50 hover:bg-gray-50">
                                    <td className="py-3 px-2 font-medium">{usuario.name}</td>
                                    <td className="py-3 px-2 text-gray-500">{usuario.email}</td>
                                    <td className="py-3 px-2 text-center">{getRoleBadge(usuario.role)}</td>
                                    <td className="py-3 px-2 text-center">
                                        <Badge variant={usuario.status === 'active' ? 'success' : 'error'}>
                                            {usuario.status === 'active' ? 'Activo' : 'Inactivo'}
                                        </Badge>
                                    </td>
                                    <td className="py-3 px-2 text-gray-500">{usuario.lastLogin}</td>
                                    <td className="py-3 px-2 text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button size="sm" variant="ghost" className="p-1 h-8 w-8" title="Editar">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            {usuario.status === 'active' ? (
                                                <Button size="sm" variant="ghost" className="p-1 h-8 w-8 text-alert" title="Desactivar">
                                                    <ShieldOff className="w-4 h-4" />
                                                </Button>
                                            ) : (
                                                <Button size="sm" variant="ghost" className="p-1 h-8 w-8 text-success" title="Activar">
                                                    <Shield className="w-4 h-4" />
                                                </Button>
                                            )}
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

            {/* Modal Nuevo Usuario */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-card shadow-xl max-w-md w-full">
                        <div className="flex justify-between items-center p-6 border-b border-border">
                            <h3 className="text-lg font-semibold text-text-main">Nuevo Usuario</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 p-2">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <Input label="Nombre completo" placeholder="Ej: Juan Pérez" />
                            <Input label="Correo electrónico" type="email" placeholder="correo@talentos.edu" />
                            <Select
                                label="Rol"
                                options={[
                                    { value: '', label: 'Seleccionar rol' },
                                    { value: 'admin', label: 'Administrador' },
                                    { value: 'secretary', label: 'Secretaría' },
                                    { value: 'coordinator', label: 'Coordinador' },
                                    { value: 'billing', label: 'Facturación' },
                                    { value: 'teacher', label: 'Docente' },
                                    { value: 'psychologist', label: 'Psicólogo' },
                                ]}
                            />
                            <Input label="Contraseña temporal" type="password" placeholder="••••••••" />
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="sendEmail" className="rounded text-primary" defaultChecked />
                                <label htmlFor="sendEmail" className="text-sm text-gray-600">
                                    Enviar credenciales por correo
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 p-6 border-t border-border bg-gray-50">
                            <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
                            <Button variant="primary" icon={Save} onClick={() => setShowModal(false)}>
                                Crear usuario
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GestionUsuariosPage;
