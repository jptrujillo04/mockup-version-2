import React from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Select } from '../components/ui/Select';
import { Bell, Search, User } from 'lucide-react';

const StyleGuide: React.FC = () => {
    return (
        <div className="min-h-screen bg-background p-8 space-y-8">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Talentos 360 - Style Guide</h1>
                    <p className="text-gray-600">Design System & Component Library</p>
                </div>
                <div className="flex gap-4">
                    <Bell className="text-gray-500" />
                    <User className="text-gray-500" />
                </div>
            </header>

            {/* Colors */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-secondary">Colors</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-primary text-white">Primary<br />#1B4B8C</div>
                    <div className="p-4 rounded-lg bg-secondary text-white">Secondary<br />#143669</div>
                    <div className="p-4 rounded-lg bg-success text-white">Success<br />#10B981</div>
                    <div className="p-4 rounded-lg bg-alert text-white">Alert<br />#F97316</div>
                </div>
            </section>

            {/* Buttons */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-secondary">Buttons</h2>
                <Card>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button variant="primary">Primary Button</Button>
                        <Button variant="secondary">Secondary Button</Button>
                        <Button variant="outline">Outline Button</Button>
                        <Button variant="ghost">Ghost Button</Button>
                        <Button variant="danger">Danger Button</Button>
                        <Button variant="primary" icon={Search}>With Icon</Button>
                        <Button variant="primary" disabled>Disabled</Button>
                        <Button variant="primary" isLoading>Loading</Button>
                    </div>
                </Card>
            </section>

            {/* Inputs & Selects */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-secondary">Form Elements</h2>
                <Card className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Username" placeholder="Enter username" />
                    <Input label="Search" placeholder="Search..." icon={Search} />
                    <Input label="Error State" placeholder="Invalid input" error="This field is required" />
                    <Select
                        label="Role"
                        options={[
                            { value: 'student', label: 'Estudiante' },
                            { value: 'teacher', label: 'Profesor' },
                            { value: 'admin', label: 'Rector' }
                        ]}
                    />
                </Card>
            </section>

            {/* Badges */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-secondary">Badges Data</h2>
                <Card>
                    <div className="flex gap-4">
                        <Badge variant="default">Pendiente</Badge>
                        <Badge variant="success">Pagado</Badge>
                        <Badge variant="warning">Alerta</Badge>
                        <Badge variant="error">Rechazado</Badge>
                        <Badge variant="info">Nuevo</Badge>
                    </div>
                </Card>
            </section>

            {/* Cards */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-secondary">Generic Card</h2>
                <Card title="Card Title" actions={<Button size="sm" variant="outline">Action</Button>}>
                    <p className="text-gray-600">
                        This is a generic card component used throughout the application.
                        It has a standard padding, border radius, and shadow.
                    </p>
                </Card>
            </section>
        </div>
    );
};

export default StyleGuide;
