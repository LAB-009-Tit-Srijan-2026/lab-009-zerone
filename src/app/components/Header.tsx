import { Moon, Sun, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { useState } from 'react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  const navigate = useNavigate();
  const { setShowNotifications, showNotifications } = useAppContext();
  const [notifications] = useState([
    { id: 1, title: 'New lecture available', message: 'Advanced Trees lecture is now available', time: '5 min ago' },
    { id: 2, title: 'Quiz completed', message: 'You scored 85% on Binary Trees quiz', time: '1 hour ago' },
    { id: 3, title: 'Course update', message: 'New content added to Data Structures course', time: '2 hours ago' }
  ]);

  return (
    <header className="px-6 py-4 border-b border-border flex items-center justify-between bg-card relative">
      <div>
        <h1 className="text-xl font-semibold">Welcome back, Student!</h1>
        <p className="text-sm text-muted-foreground">Continue your learning journey</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/ai-assistant')}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center gap-2 transition-colors"
        >
          <span className="text-sm">💬</span>
          <span>Ask AI anything</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-accent rounded-lg transition-colors relative"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-xl z-50">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-4 border-b border-border hover:bg-accent transition-colors cursor-pointer">
                    <h4 className="font-medium text-sm mb-1">{notif.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{notif.message}</p>
                    <span className="text-xs text-muted-foreground">{notif.time}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-border">
                <button className="text-sm text-primary hover:underline">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-accent hover:bg-accent/80 rounded-lg flex items-center gap-2 transition-colors"
        >
          {darkMode ? <Moon size={18} /> : <Sun size={18} />}
          <span>{darkMode ? 'Dark' : 'Light'}</span>
        </button>
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-semibold cursor-pointer hover:opacity-80 transition-opacity">
          AK
        </div>
      </div>
    </header>
  );
}
