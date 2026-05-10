import { User, Bell, Lock, Palette, Globe, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [captions, setCaptions] = useState(true);

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold mb-2">Settings</h2>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="text-primary" size={24} />
          <h3 className="text-xl font-semibold">Profile</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="Alex Kumar"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              defaultValue="alex.kumar@email.com"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              rows={3}
              defaultValue="Computer Science student passionate about AI and algorithms"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="text-primary" size={24} />
          <h3 className="text-xl font-semibold">Notifications</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Push Notifications</div>
              <div className="text-sm text-muted-foreground">Receive notifications about new lectures</div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Email Notifications</div>
              <div className="text-sm text-muted-foreground">Get weekly learning summaries</div>
            </div>
            <button className="relative w-12 h-6 rounded-full bg-primary">
              <div className="absolute top-0.5 translate-x-6 w-5 h-5 bg-white rounded-full" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Preferences */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="text-primary" size={24} />
          <h3 className="text-xl font-semibold">Video Preferences</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Autoplay Next Lecture</div>
              <div className="text-sm text-muted-foreground">Automatically play the next lecture</div>
            </div>
            <button
              onClick={() => setAutoplay(!autoplay)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                autoplay ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  autoplay ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Show Captions</div>
              <div className="text-sm text-muted-foreground">Display subtitles by default</div>
            </div>
            <button
              onClick={() => setCaptions(!captions)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                captions ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  captions ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Default Playback Speed</label>
            <select className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>0.5x</option>
              <option>0.75x</option>
              <option selected>1x (Normal)</option>
              <option>1.25x</option>
              <option>1.5x</option>
              <option>2x</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Video Quality</label>
            <select className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Auto</option>
              <option>1080p</option>
              <option selected>720p</option>
              <option>480p</option>
              <option>360p</option>
            </select>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="text-primary" size={24} />
          <h3 className="text-xl font-semibold">Privacy & Security</h3>
        </div>

        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition-colors">
            Change Password
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition-colors">
            Two-Factor Authentication
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition-colors">
            Privacy Settings
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition-colors">
            Data Export
          </button>
        </div>
      </div>

      {/* About */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="text-primary" size={24} />
          <h3 className="text-xl font-semibold">Help & About</h3>
        </div>

        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition-colors">
            Help Center
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition-colors">
            Terms of Service
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition-colors">
            Privacy Policy
          </button>
          <div className="px-4 py-3 text-sm text-muted-foreground">
            Version 1.0.0 • Made with ❤️ by StudyAI Team
          </div>
        </div>
      </div>
    </div>
  );
}
