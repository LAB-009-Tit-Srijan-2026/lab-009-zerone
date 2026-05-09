import { LucideIcon } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  gradient: string;
}

export function AnalyticsCard({ title, value, trend, icon: Icon, gradient }: AnalyticsCardProps) {
  return (
    <div className="glass-hover rounded-2xl p-6 border border-[var(--color-border)] transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:glow-purple-sm transition-all duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-sm text-[var(--color-text-secondary)]">{title}</div>
        <div className="text-xs text-[var(--color-accent-cyan)] flex items-center gap-1">
          <span>↑</span>
          <span>{trend}</span>
        </div>
      </div>
    </div>
  );
}
