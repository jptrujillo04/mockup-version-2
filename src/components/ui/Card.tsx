import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    actions?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    title,
    actions
}) => {
    return (
        <div className={`bg-surface rounded-card shadow-sm border border-border p-6 ${className}`}>
            {(title || actions) && (
                <div className="flex justify-between items-center mb-4">
                    {title && <h3 className="text-lg font-semibold text-text-main">{title}</h3>}
                    {actions && <div className="flex gap-2">{actions}</div>}
                </div>
            )}
            {children}
        </div>
    );
};
