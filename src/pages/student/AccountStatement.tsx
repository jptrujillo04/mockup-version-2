import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Search, Printer, Calendar } from 'lucide-react';

// Mock data
const accountData = [
    { id: 1, date: '2026-01-15', concept: 'Pensión Enero', dueDate: '2026-01-20', value: 450000, discount: 0, paid: 450000, balance: 0, status: 'paid' },
    { id: 2, date: '2026-01-15', concept: 'Seguro Estudiantil', dueDate: '2026-01-30', value: 85000, discount: 0, paid: 85000, balance: 0, status: 'paid' },
    { id: 3, date: '2026-02-01', concept: 'Pensión Febrero', dueDate: '2026-02-20', value: 450000, discount: 50000, paid: 100000, balance: 300000, status: 'partial' },
    { id: 4, date: '2026-02-01', concept: 'Materiales Febrero', dueDate: '2026-02-15', value: 50000, discount: 0, paid: 0, balance: 50000, status: 'pending' },
];

const AccountStatement: React.FC = () => {
    const totalBalance = accountData.reduce((acc, item) => acc + item.balance, 0);

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Estado de Cuenta</h1>
                    <p className="text-gray-500">Historial de pagos y saldos pendientes</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Saldo total pendiente</p>
                    <p className="text-2xl font-bold text-alert">${totalBalance.toLocaleString()}</p>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <Input placeholder="Buscar concepto..." icon={Search} />
                    </div>
                    <Select
                        options={[
                            { value: '', label: 'Todos los estados' },
                            { value: 'paid', label: 'Pagado' },
                            { value: 'pending', label: 'Pendiente' },
                            { value: 'partial', label: 'Pago parcial' },
                        ]}
                        className="w-40"
                    />
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <Input type="date" className="w-36" />
                        <span className="text-gray-400">-</span>
                        <Input type="date" className="w-36" />
                    </div>
                    <Select
                        options={[
                            { value: '10', label: '10 por página' },
                            { value: '25', label: '25 por página' },
                            { value: '50', label: '50 por página' },
                        ]}
                        className="w-36"
                    />
                </div>
            </Card>

            {/* Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Fecha</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Concepto</th>
                                <th className="text-left py-3 px-2 font-medium text-gray-500">Fecha límite</th>
                                <th className="text-right py-3 px-2 font-medium text-gray-500">Valor</th>
                                <th className="text-right py-3 px-2 font-medium text-gray-500">Descuento</th>
                                <th className="text-right py-3 px-2 font-medium text-gray-500">Pago realizado</th>
                                <th className="text-right py-3 px-2 font-medium text-gray-500">Saldo</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500">Estado</th>
                                <th className="text-center py-3 px-2 font-medium text-gray-500"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {accountData.map((item) => (
                                <tr key={item.id} className="border-b border-border/50 hover:bg-gray-50">
                                    <td className="py-3 px-2 text-gray-500">{item.date}</td>
                                    <td className="py-3 px-2 font-medium">{item.concept}</td>
                                    <td className="py-3 px-2 text-gray-500">{item.dueDate}</td>
                                    <td className="py-3 px-2 text-right">${item.value.toLocaleString()}</td>
                                    <td className="py-3 px-2 text-right text-success">
                                        {item.discount > 0 ? `-$${item.discount.toLocaleString()}` : '-'}
                                    </td>
                                    <td className="py-3 px-2 text-right">${item.paid.toLocaleString()}</td>
                                    <td className="py-3 px-2 text-right font-medium">
                                        <span className={item.balance > 0 ? 'text-alert' : 'text-success'}>
                                            ${item.balance.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="py-3 px-2 text-center">
                                        <Badge variant={
                                            item.status === 'paid' ? 'success' :
                                                item.status === 'partial' ? 'warning' : 'error'
                                        }>
                                            {item.status === 'paid' ? 'Pagado' :
                                                item.status === 'partial' ? 'Parcial' : 'Pendiente'}
                                        </Badge>
                                    </td>
                                    <td className="py-3 px-2 text-center">
                                        <Button size="sm" variant="ghost" className="p-1 h-8 w-8" title="Imprimir recibo">
                                            <Printer className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AccountStatement;
