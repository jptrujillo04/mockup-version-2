import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { GraduationCap, Briefcase, Shield, Brain, Receipt, ArrowRight, X, Mail, CheckCircle } from 'lucide-react';

const roles = [
    { id: 'student', label: 'Estudiante', icon: GraduationCap, path: '/student/dashboard' },
    { id: 'teacher', label: 'Profesor', icon: Briefcase, path: '/teacher/dashboard' },
    { id: 'rector', label: 'Rector', icon: Shield, path: '/rector/dashboard' },
    { id: 'psychologist', label: 'Psicólogo', icon: Brain, path: '/psychologist/dashboard' },
    { id: 'billing', label: 'Facturación', icon: Receipt, path: '/billing/dashboard' },
];

const Login: React.FC = () => {
    const [selectedRole, setSelectedRole] = useState('rector');
    const navigate = useNavigate();

    // Forgot password state
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [isSendingReset, setIsSendingReset] = useState(false);
    const [resetEmailSent, setResetEmailSent] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const role = roles.find(r => r.id === selectedRole);
        if (role) {
            navigate(role.path);
        }
    };

    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (!forgotEmail) return;

        setIsSendingReset(true);

        // Simulate API call
        setTimeout(() => {
            setIsSendingReset(false);
            setResetEmailSent(true);
        }, 1500);
    };

    const closeForgotPasswordModal = () => {
        setShowForgotPassword(false);
        setForgotEmail('');
        setResetEmailSent(false);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left: Image Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-secondary items-center justify-center p-12">
                <div className="text-center text-white">
                    <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
                        <GraduationCap className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Talentos 360</h1>
                    <p className="text-xl text-white/80 max-w-md">
                        Plataforma administrativa integral para la gestión educativa moderna
                    </p>
                </div>
            </div>

            {/* Right: Login Form */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 bg-background">
                <div className="max-w-md w-full mx-auto">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                            <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-primary">Talentos 360</h1>
                    </div>

                    <h2 className="text-2xl font-semibold text-text-main mb-2">Iniciar Sesión</h2>
                    <p className="text-gray-500 mb-8">Ingresa tus credenciales institucionales</p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <Input
                            label="Usuario institucional"
                            placeholder="usuario@talentos.edu"
                            type="email"
                            id="email"
                        />
                        <Input
                            label="Contraseña"
                            placeholder="••••••••"
                            type="password"
                            id="password"
                        />

                        {/* Role Selector */}
                        <div>
                            <label className="block text-sm font-medium text-text-main mb-2">Selecciona tu rol</label>
                            <div className="grid grid-cols-5 gap-2">
                                {roles.map((role) => {
                                    const Icon = role.icon;
                                    return (
                                        <button
                                            key={role.id}
                                            type="button"
                                            onClick={() => setSelectedRole(role.id)}
                                            className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${selectedRole === role.id
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-border bg-white text-gray-500 hover:border-gray-300'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5 mb-1" />
                                            <span className="text-xs font-medium truncate w-full text-center">{role.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <Button type="submit" variant="primary" className="w-full" icon={ArrowRight}>
                            Ingresar
                        </Button>

                        <button
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="block w-full text-center text-sm text-primary hover:underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                    </form>

                    {/* Direct Routes Banner */}
                    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-sm text-blue-800 font-medium mb-2">
                            Rutas directas de desarrollo
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {roles.map((role) => (
                                <a
                                    key={role.id}
                                    href={role.path}
                                    className="text-xs px-2 py-1 bg-white rounded border border-blue-200 text-blue-600 hover:bg-blue-100"
                                >
                                    {role.path}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-5 border-b border-border">
                            <div>
                                <h3 className="text-lg font-semibold text-text-main">Recuperar Contraseña</h3>
                                <p className="text-sm text-gray-500">Te enviaremos un enlace de recuperación</p>
                            </div>
                            <button
                                onClick={closeForgotPasswordModal}
                                className="text-gray-400 hover:text-gray-600 p-2"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-5">
                            {resetEmailSent ? (
                                /* Success State */
                                <div className="py-8 text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-text-main mb-2">¡Correo enviado!</h4>
                                    <p className="text-gray-500 mb-6">
                                        Hemos enviado un enlace de recuperación a<br />
                                        <span className="font-medium text-text-main">{forgotEmail}</span>
                                    </p>
                                    <p className="text-sm text-gray-400 mb-6">
                                        Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
                                    </p>
                                    <Button variant="primary" onClick={closeForgotPasswordModal} className="w-full">
                                        Volver al inicio de sesión
                                    </Button>
                                </div>
                            ) : (
                                /* Email Form */
                                <form onSubmit={handleForgotPassword} className="space-y-5">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Mail className="w-8 h-8 text-primary" />
                                    </div>
                                    <p className="text-center text-gray-600 mb-4">
                                        Ingresa tu correo electrónico institucional y te enviaremos un enlace para restablecer tu contraseña.
                                    </p>
                                    <Input
                                        label="Correo electrónico"
                                        placeholder="usuario@talentos.edu"
                                        type="email"
                                        id="forgot-email"
                                        value={forgotEmail}
                                        onChange={(e) => setForgotEmail(e.target.value)}
                                        required
                                    />
                                    <div className="flex gap-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={closeForgotPasswordModal}
                                            className="flex-1"
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="flex-1"
                                            disabled={!forgotEmail || isSendingReset}
                                        >
                                            {isSendingReset ? 'Enviando...' : 'Enviar enlace'}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
