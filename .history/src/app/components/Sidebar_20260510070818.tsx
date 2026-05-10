import { Home, BookOpen, GraduationCap, Search, Bookmark, FileText, BarChart3, Sparkles, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: BookOpen, label: 'Courses', path: '/courses' },
  { icon: GraduationCap, label: 'My Learning', path: '/my-learning' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks' },
  { icon: FileText, label: 'My Notes', path: '/my-notes' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen glass border-r border-[var(--color-border)] transition-all duration-300 z-50 ${
        collapsed ? 'w-20' : 'w-[260px]'
      }`}
      style={{ background: 'var(--color-bg-sidebar)' }}
    >
      <div className="flex flex-col h-full p-4">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent-cyan)] flex items-center justify-center glow-purple-sm">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <div className="font-bold text-lg">LearnAI</div>
              <div className="text-xs text-[var(--color-text-muted)]">Smart Learning</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-[var(--color-primary)] text-white shadow-lg glow-purple-sm'
                    : 'text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* AI Assistant Card */}
        {!collapsed && (
          <div className="mt-auto glass-hover rounded-2xl p-4 border border-[var(--color-border)] transition-all duration-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white animate-pulse-glow" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm mb-1">AI Tutor</div>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  Ask me anything about your courses
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mt-4 w-full flex items-center justify-center py-2 rounded-lg hover:bg-white/5 transition-all duration-200 text-[var(--color-text-muted)] hover:text-white"
        >
          <ChevronLeft className={`w-5 h-5 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </aside>
  );
}
