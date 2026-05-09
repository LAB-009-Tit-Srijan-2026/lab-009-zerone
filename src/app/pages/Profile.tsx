import { User, Mail, MapPin, Calendar, Award, Settings, Edit2, Camera } from 'lucide-react';

export function Profile() {
  const achievements = [
    { title: 'Fast Learner', description: 'Completed 5 courses in 30 days', icon: '🚀', color: 'from-purple-500 to-pink-600' },
    { title: 'Streak Master', description: '30-day learning streak', icon: '🔥', color: 'from-orange-500 to-red-600' },
    { title: 'AI Explorer', description: 'Completed all AI courses', icon: '🤖', color: 'from-blue-500 to-cyan-600' },
    { title: 'Perfect Score', description: 'Scored 100% on 3 exams', icon: '⭐', color: 'from-yellow-500 to-orange-600' },
  ];

  const skills = [
    { name: 'Machine Learning', level: 85 },
    { name: 'Web Development', level: 75 },
    { name: 'Data Science', level: 70 },
    { name: 'Cloud Computing', level: 60 },
    { name: 'UI/UX Design', level: 55 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">My Profile</h1>
        <p className="text-[var(--color-text-secondary)] text-lg">
          Manage your account and track your achievements
        </p>
      </div>

      {/* Profile Card */}
      <div className="glass-hover rounded-2xl p-8 border border-[var(--color-border)]">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent-cyan)] flex items-center justify-center text-white text-4xl font-bold">
              AS
            </div>
            <button className="absolute bottom-0 right-0 p-2 rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-glow)] transition-all duration-200 opacity-0 group-hover:opacity-100">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Info Section */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">Anuj Sharma</h2>
                <p className="text-[var(--color-text-secondary)]">AI & Machine Learning Enthusiast</p>
              </div>
              <button className="px-4 py-2 rounded-xl glass-hover border border-[var(--color-border)] text-white font-semibold transition-all duration-200 hover:scale-105 flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <Mail className="w-5 h-5 text-[var(--color-primary)]" />
                <span>anuj.sharma@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
                <span>Joined March 2024</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <Award className="w-5 h-5 text-[var(--color-primary)]" />
                <span>8 Certificates Earned</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="glass-hover rounded-2xl p-8 border border-[var(--color-border)]">
        <h3 className="text-2xl font-bold mb-6">My Skills</h3>
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{skill.name}</span>
                <span className="text-[var(--color-primary)]">{skill.level}%</span>
              </div>
              <div className="w-full h-3 bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-cyan)] rounded-full transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="glass-hover rounded-2xl p-8 border border-[var(--color-border)]">
        <h3 className="text-2xl font-bold mb-6">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="glass-hover rounded-xl p-6 border border-[var(--color-border)] transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-1">{achievement.title}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Section */}
      <div className="glass-hover rounded-2xl p-8 border border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-6 h-6 text-[var(--color-primary)]" />
          <h3 className="text-2xl font-bold">Settings</h3>
        </div>
        <div className="space-y-4">
          <button className="w-full text-left px-6 py-4 rounded-xl hover:bg-white/5 text-[var(--color-text-secondary)] hover:text-white transition-all duration-200 border border-[var(--color-border)]">
            Account Settings
          </button>
          <button className="w-full text-left px-6 py-4 rounded-xl hover:bg-white/5 text-[var(--color-text-secondary)] hover:text-white transition-all duration-200 border border-[var(--color-border)]">
            Privacy & Security
          </button>
          <button className="w-full text-left px-6 py-4 rounded-xl hover:bg-white/5 text-[var(--color-text-secondary)] hover:text-white transition-all duration-200 border border-[var(--color-border)]">
            Notifications
          </button>
          <button className="w-full text-left px-6 py-4 rounded-xl hover:bg-white/5 text-[var(--color-text-secondary)] hover:text-white transition-all duration-200 border border-[var(--color-border)]">
            Billing & Subscription
          </button>
        </div>
      </div>
    </div>
  );
}
