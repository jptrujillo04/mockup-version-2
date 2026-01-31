import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import {
    Save,
    Calculator,
    Receipt,
    Send
} from 'lucide-react';

const CrearCobroPage: React.FC = () => {
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-text-main">Generar Cobro</h1>
                <p className="text-gray-500">Crear nuevos cobros para estudiantes</p>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg text-success text-sm flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    ¡Cobro generado exitosamente! Se ha notificado al acudiente.
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form */}
                <div className="lg:col-span-2">
                    <Card title="Información del cobro">
                        <div className="space-y-6">
                            {/* Student Selection */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Buscar estudiante" placeholder="Nombre o documento..." />
                                <Select
                                    label="Grado"
                                    options={[
                                        { value: '', label: 'Seleccionar grado' },
                                        { value: '6', label: '6°' },
                                        { value: '7', label: '7°' },
                                        { value: '8', label: '8°' },
                                        { value: '9', label: '9°' },
                                        { value: '10', label: '10°' },
                                        { value: '11', label: '11°' },
                                    ]}
                                />
                            </div>

                            {/* Billing Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Select
                                    label="Concepto"
                                    options={[
                                        { value: '', label: 'Seleccionar concepto' },
                                        { value: 'pension', label: 'Pensión mensual' },
                                        { value: 'matricula', label: 'Matrícula' },
                                        { value: 'seguro', label: 'Seguro estudiantil' },
                                        { value: 'salida', label: 'Salida pedagógica' },
                                        { value: 'certificado', label: 'Certificado' },
                                        { value: 'uniformes', label: 'Uniformes' },
                                        { value: 'otro', label: 'Otro' },
                                    ]}
                                />
                                <Select
                                    label="Período"
                                    options={[
                                        { value: '', label: 'Seleccionar período' },
                                        { value: 'enero', label: 'Enero 2026' },
                                        { value: 'febrero', label: 'Febrero 2026' },
                                        { value: 'marzo', label: 'Marzo 2026' },
                                        { value: 'abril', label: 'Abril 2026' },
                                        { value: 'mayo', label: 'Mayo 2026' },
                                    ]}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Valor base" type="number" placeholder="0" />
                                <Input label="Descuento (%)" type="number" placeholder="0" />
                            </div>

                            <Input label="Fecha de vencimiento" type="date" />

                            <div>
                                <label className="block text-sm font-medium text-text-main mb-1">Descripción adicional</label>
                                <textarea
                                    className="w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary text-sm p-3 min-h-[80px]"
                                    placeholder="Información adicional del cobro..."
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="notify" className="rounded text-primary" defaultChecked />
                                <label htmlFor="notify" className="text-sm text-gray-600">Enviar notificación al acudiente</label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button variant="outline" className="flex-1">
                                    Cancelar
                                </Button>
                                <Button variant="primary" icon={Save} className="flex-1" onClick={handleSubmit}>
                                    Generar cobro
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <Card title="Resumen" className="sticky top-6">
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-3">
                                    <Calculator className="w-5 h-5 text-gray-400" />
                                    <span className="font-medium text-text-main">Cálculo</span>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Valor base:</span>
                                        <span className="font-medium">$350,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Descuento (10%):</span>
                                        <span className="text-success">-$35,000</span>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex justify-between text-base">
                                        <span className="font-medium">Total a cobrar:</span>
                                        <span className="font-bold text-primary">$315,000</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Send className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-medium text-blue-800">Notificación</span>
                                </div>
                                <p className="text-sm text-blue-700">
                                    Se enviará un correo electrónico al acudiente con los detalles del cobro y opciones de pago.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CrearCobroPage;
