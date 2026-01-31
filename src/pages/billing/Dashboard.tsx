import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import {
    Search,
    Plus,
    Send,
    FileText,
    CheckCircle,
    X,
    Filter,
    Inbox
} from 'lucide-react';

// Mock data
const mockStudent = {
    id: 'EST-2024-001',
    name: 'Juan Pérez',
    grade: '9°',
    document: '1234567890',
};

const carteraData = [
    { id: 1, student: 'Juan Pérez', document: '1234567890', grade: '9°', type: 'Pensión', status: 'pending', balance: 350000 },
    { id: 2, student: 'María García', document: '0987654321', grade: '9°', type: 'Seguro', status: 'paid', balance: 0 },
    { id: 3, student: 'Carlos López', document: '1122334455', grade: '10°', type: 'Pensión', status: 'pending', balance: 175000 },
    { id: 4, student: 'Ana Torres', document: '5544332211', grade: '8°', type: 'Materiales', status: 'overdue', balance: 50000 },
];

const BillingDashboard: React.FC = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [debtorsOnly, setDebtorsOnly] = useState(false);

    const handleCreateCharge = (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuccessModal(true);
    };

    const filteredCartera = debtorsOnly
        ? carteraData.filter(item => item.balance > 0)
        : carteraData;

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-text-main">Facturación</h1>
                <p className="text-gray-500">Gestión de cobros y cartera</p>
            </div>

            {/* Create Charge Form */}
            <Card title="Generar Cobro">
                <form onSubmit={handleCreateCharge} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Input
                            label="Buscar Estudiante"
                            placeholder="Nombre o documento del estudiante..."
                            icon={Search}
                        />
                    </div>

                    <Select
                        label="Tipo de cobro"
                        options={[
                            { value: 'pension', label: 'Pensión' },
                            { value: 'seguro', label: 'Seguro' },
                            { value: 'materiales', label: 'Materiales' },
                            { value: 'uniformes', label: 'Uniformes' },
                            { value: 'otros', label: 'Otros' },
                        ]}
                    />

                    <Input
                        label="Valor"
                        placeholder="$0"
                        type="number"
                    />

                    <Input
                        label="Fecha de vencimiento"
                        type="date"
                    />

                    <div>
                        <label className="block text-sm font-medium text-text-main mb-1">Notas (opcional)</label>
                        <textarea
                            className="w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary text-sm p-3 h-[42px]"
                            placeholder="Notas adicionales..."
                        />
                    </div>

                    <div className="lg:col-span-3 flex gap-4 pt-4 border-t border-border">
                        <Button type="button" variant="outline">Limpiar</Button>
                        <Button type="submit" variant="primary" icon={Plus}>Crear concepto</Button>
                    </div>
                </form>
            </Card>

            {/* Cartera de Estudiantes */}
            <Card
                title="Cartera de Estudiantes"
                actions={
                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={debtorsOnly}
                                onChange={(e) => setDebtorsOnly(e.target.checked)}
                                className="rounded border-border text-primary focus:ring-primary"
                            />
                            Solo deudores
                        </label>
                        <Button size="sm" variant="outline" icon={Filter}>Filtros</Button>
                    </div>
                }
            >
                {/* Filters Row */}
                <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-border">
                    <div className="flex-1 min-w-[200px]">
                        <Input placeholder="Buscar por nombre..." icon={Search} />
                    </div>
                    <Input placeholder="Documento" className="w-40" />
                    <Select
                        options={[
                            { value: '', label: 'Todos los grados' },
                            { value: '9', label: '9°' },
                            { value: '10', label: '10°' },
                            { value: '11', label: '11°' },
                        ]}
                        className="w-40"
                    />
                    <Select
                        options={[
                            { value: '', label: 'Todos los estados' },
                            { value: 'paid', label: 'Pagado' },
                            { value: 'pending', label: 'Pendiente' },
                            { value: 'overdue', label: 'Vencido' },
                        ]}
                        className="w-40"
                    />
                </div>

                {/* Table */}
                {filteredCartera.length > 0 ? (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-3 px-2 font-medium text-gray-500">Estudiante</th>
                                        <th className="text-left py-3 px-2 font-medium text-gray-500">Documento</th>
                                        <th className="text-left py-3 px-2 font-medium text-gray-500">Grado</th>
                                        <th className="text-left py-3 px-2 font-medium text-gray-500">Tipo</th>
                                        <th className="text-left py-3 px-2 font-medium text-gray-500">Estado</th>
                                        <th className="text-right py-3 px-2 font-medium text-gray-500">Saldo</th>
                                        <th className="text-right py-3 px-2 font-medium text-gray-500">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCartera.map((item) => (
                                        <tr key={item.id} className="border-b border-border/50 hover:bg-gray-50">
                                            <td className="py-3 px-2 font-medium">{item.student}</td>
                                            <td className="py-3 px-2 text-gray-500">{item.document}</td>
                                            <td className="py-3 px-2">{item.grade}</td>
                                            <td className="py-3 px-2">{item.type}</td>
                                            <td className="py-3 px-2">
                                                <Badge variant={
                                                    item.status === 'paid' ? 'success' :
                                                        item.status === 'overdue' ? 'error' : 'warning'
                                                }>
                                                    {item.status === 'paid' ? 'Pagado' :
                                                        item.status === 'overdue' ? 'Vencido' : 'Pendiente'}
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-2 text-right font-medium">
                                                <span className={item.balance > 0 ? 'text-alert' : 'text-success'}>
                                                    ${item.balance.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="py-3 px-2 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button size="sm" variant="ghost" className="p-1 h-8 w-8" title="Enviar recordatorio">
                                                        <Send className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="sm" variant="ghost" className="p-1 h-8 w-8" title="Ver historial">
                                                        <FileText className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                            <p className="text-sm text-gray-500">Mostrando 1-{filteredCartera.length} de {filteredCartera.length}</p>
                            <div className="flex gap-1">
                                <Button size="sm" variant="outline" disabled>Anterior</Button>
                                <Button size="sm" variant="outline" disabled>Siguiente</Button>
                            </div>
                        </div>
                    </>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Inbox className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-text-main mb-1">No hay registros</h3>
                        <p className="text-gray-500 text-sm max-w-sm">
                            No se encontraron estudiantes con los filtros seleccionados.
                        </p>
                    </div>
                )}
            </Card>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-card shadow-xl p-8 max-w-sm w-full mx-4 text-center">
                        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-10 h-10 text-success" />
                        </div>
                        <h3 className="text-xl font-semibold text-text-main mb-2">¡Cobro creado!</h3>
                        <p className="text-gray-500 mb-6">El concepto de cobro ha sido registrado exitosamente.</p>
                        <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
                            Entendido
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillingDashboard;
