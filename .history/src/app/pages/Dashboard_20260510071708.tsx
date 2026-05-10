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
