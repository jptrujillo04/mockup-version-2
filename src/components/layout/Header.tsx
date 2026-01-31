import React from 'react';
import { Bell, Search, Command } from 'lucide-react';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface HeaderProps {
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
    return (
        <header className={`h-16 bg-surface border-b border-border flex items-center justify-between px-6 sticky top-0 z-10 ${className}`}>

            {/* Search Bar (Command+K) */}
            <div className="w-96">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar (Cmd+K)..."
                        className="block w-full rounded-md border-border bg-gray-50 pl-10 pr-12 py-2 text-sm focus:bg-white focus:border-primary focus:ring-primary"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 text-xs border border-gray-200 rounded px-1.5 py-0.5"><Command className="w-3 h-3 inline" /> K</span>
                    </div>
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                {/* Period Selector */}
                <div className="w-48">
                    <Select
                        options={[
                            { value: '2026-t1', label: '2026 · Primer Trimestre' },
                            { value: '2026-t2', label: '2026 · Segundo Trimestre' },
                            { value: '2025-final', label: '2025 · Final' }
                        ]}
                        className="!py-1.5 !text-sm"
                    />
                </div>

                <div className="h-6 w-px bg-gray-200 mx-1"></div>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative text-gray-500 w-10 h-10 p-0 rounded-full">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </Button>
            </div>
        </header>
    );
};
