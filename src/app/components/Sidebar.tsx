import { Home, BookOpen, Video, MessageSquare, FileText, Bookmark, Clock, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: BookOpen, label: 'My Courses', path: '/courses' },
    { icon: Video, label: 'Lecture Library', path: '/library' },
    { icon: MessageSquare, label: 'AI Assistant', path: '/ai-assistant' },
    { icon: FileText, label: 'Notes', path: '/notes' },
    { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks' },
    { icon: Clock, label: 'History', path: '/history' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-xl">🤖</span>
          </div>
          <div>
            <h2 className="font-bold text-lg">StudyAI</h2>
            <p className="text-xs text-muted-foreground">AI Learning Companion</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
