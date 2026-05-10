import { AnalyticsCard } from '../components/AnalyticsCard';
import { CourseCard } from '../components/CourseCard';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

export function Dashboard() {
  const analyticsData = [
    {
      title: 'Courses Enrolled',
      value: '12',
      trend: '+3 this month',
      icon: BookOpen,
      gradient: 'from-purple-500 to-purple-700',
    },
    {
      title: 'Watch Time',
      value: '48h',
      trend: '+12h this week',
      icon: Clock,
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'Lessons Done',
      value: '156',
      trend: '+24 this week',
      icon: CheckCircle,
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      title: 'AI Interactions',
      value: '234',
      trend: '+45 this week',
      icon: Sparkles,
      gradient: 'from-pink-500 to-rose-600',
    },
  ];

  const courses = [
    {
      courseId: '1',
      title: 'Advanced Machine Learning',
      description: 'Master deep learning, neural networks, and AI algorithms with hands-on projects',
      category: 'AI & ML',
      lessons: 24,
      duration: '8 weeks',
      icon: '🤖',
      gradient: 'from-purple-600 to-blue-600',
    },
    {
      courseId: '2',
      title: 'Full Stack Web Development',
      description: 'Build modern web applications with React, Node.js, and cloud deployment',
      category: 'Development',
      lessons: 32,
      duration: '12 weeks',
      icon: '💻',
      gradient: 'from-cyan-600 to-teal-600',
    },
    {
      courseId: '3',
      title: 'Data Science Fundamentals',
      description: 'Learn Python, statistics, data visualization, and predictive modeling',
      category: 'Data Science',
      lessons: 28,
      duration: '10 weeks',
      icon: '📊',
      gradient: 'from-orange-600 to-red-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative glass-hover rounded-3xl p-12 border border-[var(--color-border)] overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20 pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-float"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '3s' }}></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-[var(--color-primary)]" />
            <span className="text-sm font-medium text-[var(--color-primary)]">AI-Powered Learning</span>
          </div>

          <h1 className="text-5xl font-bold mb-4">
            Welcome back, Anuj
          </h1>

          <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-2xl leading-relaxed">
            Your AI companion is ready to help you learn. Pick up where you left off or explore new courses.
          </p>

          <div className="flex items-center gap-4">
            <Link to="/courses" className="px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-glow)] text-white font-semibold transition-all duration-200 hover:scale-105 glow-purple-sm flex items-center gap-2">
              <span>Browse Courses</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/my-learning" className="px-6 py-3 rounded-xl glass-hover border border-[var(--color-border)] text-white font-semibold transition-all duration-200 hover:scale-105">
              Continue Learning
            </Link>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((data, index) => (
          <AnalyticsCard key={index} {...data} />
        ))}
      </div>

      {/* Featured Courses */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Featured Courses</h2>
            <p className="text-[var(--color-text-secondary)]">
              AI-recommended courses based on your learning path
            </p>
          </div>
          <Link to="/courses" className="text-[var(--color-primary)] hover:text-[var(--color-primary-glow)] font-medium transition-colors duration-200 flex items-center gap-2">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
=======
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
>>>>>>> dd389dfef8810a6390c2959c0d88349de8a7124a
          ))}
        </div>
      </div>

<<<<<<< HEAD
      {/* AI Insights Section */}
      <div className="glass-hover rounded-2xl p-8 border border-[var(--color-border)]">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 glow-purple-sm">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">AI Learning Insights</h3>
            <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">
              Based on your progress, I recommend focusing on "Advanced Machine Learning" next.
              You've mastered the fundamentals and are ready for neural networks and deep learning concepts.
            </p>
            <button className="text-[var(--color-primary)] hover:text-[var(--color-primary-glow)] font-medium transition-colors duration-200 flex items-center gap-2">
              <span>Get Personalized Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="glass-hover rounded-2xl p-8 border border-[var(--color-border)]">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 glow-purple-sm">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">AI Learning Insights</h3>
            <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">
              Based on your progress, I recommend focusing on "Advanced Machine Learning" next.
              You've mastered the fundamentals and are ready for neural networks and deep learning concepts.
            </p>
            <button className="text-[var(--color-primary)] hover:text-[var(--color-primary-glow)] font-medium transition-colors duration-200 flex items-center gap-2">
              <span>Get Personalized Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
