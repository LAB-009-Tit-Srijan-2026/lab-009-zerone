import { TrendingUp, Clock, BookOpen, Award, Play, MessageSquare, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const recentLectures = [
    { id: 1, title: 'Binary Trees', course: 'Data Structures', progress: 65, duration: '45:30', thumbnail: '🌳' },
    { id: 2, title: 'Graph Algorithms', course: 'Advanced Algorithms', progress: 30, duration: '52:15', thumbnail: '📊' },
    { id: 3, title: 'Dynamic Programming', course: 'Algorithm Design', progress: 80, duration: '38:20', thumbnail: '💡' },
    { id: 4, title: 'Hash Tables', course: 'Data Structures', progress: 45, duration: '41:10', thumbnail: '🔑' }
  ];

  const stats = [
    { label: 'Hours Learned', value: '124', icon: Clock, color: 'bg-blue-500' },
    { label: 'Courses Enrolled', value: '8', icon: BookOpen, color: 'bg-green-500' },
    { label: 'Certificates', value: '3', icon: Award, color: 'bg-yellow-500' },
    { label: 'Study Streak', value: '12 days', icon: TrendingUp, color: 'bg-purple-500' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
        <p className="text-muted-foreground">Your learning overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Continue Learning */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Continue Learning</h3>
          <Link to="/library" className="text-primary hover:underline text-sm">View all</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentLectures.map((lecture) => (
            <Link
              key={lecture.id}
              to={`/lecture/${lecture.id}`}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-all hover:shadow-lg"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-6xl">
                {lecture.thumbnail}
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-1 truncate">{lecture.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{lecture.course}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>{lecture.progress}% complete</span>
                  <span>{lecture.duration}</span>
                </div>

                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${lecture.progress}%` }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/library"
            className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white hover:shadow-xl transition-all"
          >
            <Play size={32} className="mb-3" />
            <h4 className="font-semibold mb-1">Browse Lectures</h4>
            <p className="text-sm opacity-90">Explore available courses</p>
          </Link>

          <Link
            to="/ai-assistant"
            className="bg-gradient-to-br from-green-600 to-teal-600 rounded-xl p-6 text-white hover:shadow-xl transition-all"
          >
            <MessageSquare size={32} className="mb-3" />
            <h4 className="font-semibold mb-1">Ask AI Assistant</h4>
            <p className="text-sm opacity-90">Get instant help</p>
          </Link>

          <Link
            to="/notes"
            className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-6 text-white hover:shadow-xl transition-all"
          >
            <FileText size={32} className="mb-3" />
            <h4 className="font-semibold mb-1">Review Notes</h4>
            <p className="text-sm opacity-90">Access your study notes</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
