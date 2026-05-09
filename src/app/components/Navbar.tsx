import { Search, Bell, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 glass-hover border-b border-[var(--color-border)] backdrop-blur-xl">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search courses, topics, concepts..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:glow-purple-sm transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-8">
          {/* Notification */}
          <button className="relative p-2 rounded-xl hover:bg-white/5 transition-all duration-200 text-[var(--color-text-muted)] hover:text-white">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-primary)] rounded-full"></span>
          </button>

          {/* User Profile */}
          <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer">
            <div className="text-right">
              <div className="text-sm font-semibold">Anuj Sharma</div>
              <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                <Sparkles className="w-3 h-3 text-[var(--color-primary)]" />
                <span>AI Active</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent-cyan)] flex items-center justify-center text-white font-bold">
              AS
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
