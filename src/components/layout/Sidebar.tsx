import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
    Users,
    BookOpen,
    FileText,
    Settings,
    LogOut,
    Home,
    GraduationCap,
    Briefcase,
    Receipt,
    ClipboardList,
    Mail,
    Eye,
    Calendar,
    FolderOpen,
    Brain,
    UserCircle,
    DollarSign
} from 'lucide-react';
import { Button } from '../ui/Button';

// Navigation items per role
const navigationByRole = {
    rector: [
        { icon: Home, label: 'Inicio 360', path: '/rector/dashboard' },
        { icon: Users, label: 'Aspirantes', path: '/rector/aspirantes' },
        { icon: GraduationCap, label: 'Estudiantes', path: '/rector/estudiantes' },
        { icon: Briefcase, label: 'Profesores', path: '/rector/profesores' },
        { icon: Settings, label: 'Gestión de usuarios', path: '/rector/usuarios' },
        { icon: BookOpen, label: 'Ajuste de horarios', path: '/rector/horarios' },
        { icon: FileText, label: 'Observador inst.', path: '/rector/observador' },
        { icon: Mail, label: 'Correo interno', path: '/rector/correo' },
    ],
    billing: [
        { icon: Home, label: 'Inicio', path: '/billing/dashboard' },
        { icon: Receipt, label: 'Generar cobro', path: '/billing/crear-cobro' },
        { icon: DollarSign, label: 'Cartera', path: '/billing/cartera' },
        { icon: Mail, label: 'Correo interno', path: '/billing/correo' },
    ],
    student: [
        { icon: Home, label: 'Inicio', path: '/student/dashboard' },
        { icon: UserCircle, label: 'Perfil', path: '/student/perfil' },
        { icon: DollarSign, label: 'Estado de cuenta', path: '/student/cuenta' },
        { icon: ClipboardList, label: 'Notas', path: '/student/notas' },
        { icon: Calendar, label: 'Actividades', path: '/student/actividades' },
        { icon: Eye, label: 'Observador', path: '/student/observador' },
        { icon: FolderOpen, label: 'Material de apoyo', path: '/student/material' },
        { icon: Mail, label: 'Correo interno', path: '/student/correo' },
    ],
    teacher: [
        { icon: Home, label: 'Inicio', path: '/teacher/dashboard' },
        { icon: ClipboardList, label: 'Calificar', path: '/teacher/calificar' },
        { icon: Calendar, label: 'Asistencia', path: '/teacher/asistencia' },
        { icon: FolderOpen, label: 'Archivos', path: '/teacher/archivos' },
        { icon: Eye, label: 'Observador', path: '/teacher/observador' },
        { icon: Mail, label: 'Correo interno', path: '/teacher/correo' },
    ],
    psychologist: [
        { icon: Home, label: 'Inicio', path: '/psychologist/dashboard' },
        { icon: Brain, label: 'Notas de diagnóstico', path: '/psychologist/diagnostico' },
        { icon: FileText, label: 'Historial', path: '/psychologist/historial' },
    ],
};

const roleLabels: Record<string, { title: string; email: string }> = {
    rector: { title: 'Rector General', email: 'rector@talentos.edu' },
    billing: { title: 'Facturación', email: 'facturacion@talentos.edu' },
    student: { title: 'Juan Pérez', email: 'juan.perez@talentos.edu' },
    teacher: { title: 'Prof. María González', email: 'maria.gonzalez@talentos.edu' },
    psychologist: { title: 'Psicólogo', email: 'psicologia@talentos.edu' },
};

interface SidebarProps {
    className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
    const location = useLocation();

    // Determine role from current path
    const pathSegments = location.pathname.split('/');
    const currentRole = pathSegments[1] as keyof typeof navigationByRole || 'rector';

    const navItems = navigationByRole[currentRole] || navigationByRole.rector;
    const userInfo = roleLabels[currentRole] || roleLabels.rector;

    return (
        <aside className={`w-64 bg-surface border-r border-border flex flex-col h-screen fixed left-0 top-0 z-20 ${className}`}>
            {/* Logo Area */}
            <Link to="/login" className="h-16 flex items-center px-6 border-b border-border hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                        T
                    </div>
                    <span className="font-bold text-xl text-primary">Talentos 360</span>
                </div>
            </Link>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Menu Principal</div>

                {navItems.map((item) => (
                    <SidebarItem
                        key={item.path}
                        icon={item.icon}
                        label={item.label}
                        path={item.path}
                        active={location.pathname === item.path || location.pathname.startsWith(item.path + '/')}
                    />
                ))}
            </nav>

            {/* User Profile / Logout */}
            <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <Users className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-main truncate">{userInfo.title}</p>
                        <p className="text-xs text-gray-500 truncate">{userInfo.email}</p>
                    </div>
                </div>
                <Link to="/login">
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700" size="sm" icon={LogOut}>
                        Cerrar Sesión
                    </Button>
                </Link>
            </div>
        </aside>
    );
};

interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    path: string;
    active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, path, active }) => {
    return (
        <Link
            to={path}
            className={`
        w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${active
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-text-main'}
      `}
        >
            <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-gray-400'}`} />
            {label}
        </Link>
    );
};
