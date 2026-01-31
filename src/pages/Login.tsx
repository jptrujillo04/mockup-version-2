import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { GraduationCap, Briefcase, Shield, Brain, Receipt, ArrowRight } from 'lucide-react';

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

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const role = roles.find(r => r.id === selectedRole);
        if (role) {
            navigate(role.path);
        }
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

                        <a href="#" className="block text-center text-sm text-primary hover:underline">
                            ¿Olvidaste tu contraseña?
                        </a>
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
        </div>
    );
};

export default Login;
