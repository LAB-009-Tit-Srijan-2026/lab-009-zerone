import { BookOpen, Clock, CheckCircle, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function MyLearning() {
  const [activeTab, setActiveTab] = useState('in-progress');

  const inProgressCourses = [
    {
      courseId: '1',
      lessonId: '5',
      title: 'Advanced Machine Learning',
      progress: 65,
      completedLessons: 16,
      totalLessons: 24,
      lastAccessed: '2 hours ago',
      icon: '🤖',
      gradient: 'from-purple-600 to-blue-600',
    },
    {
      courseId: '2',
      lessonId: '8',
      title: 'Full Stack Web Development',
      progress: 42,
      completedLessons: 13,
      totalLessons: 32,
      lastAccessed: '1 day ago',
      icon: '💻',
      gradient: 'from-cyan-600 to-teal-600',
    },
    {
      courseId: '3',
      lessonId: '12',
      title: 'Data Science Fundamentals',
      progress: 78,
      completedLessons: 22,
      totalLessons: 28,
      lastAccessed: '3 hours ago',
      icon: '📊',
      gradient: 'from-orange-600 to-red-600',
    },
  ];

  const completedCourses = [
    {
      title: 'Introduction to Python',
      completedDate: 'Completed 2 weeks ago',
      certificate: true,
      icon: '🐍',
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      title: 'Git & GitHub Basics',
      completedDate: 'Completed 1 month ago',
      certificate: true,
      icon: '🔀',
      gradient: 'from-gray-600 to-slate-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">My Learning</h1>
        <p className="text-[var(--color-text-secondary)] text-lg">
          Track your progress and continue where you left off
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-[var(--color-border)]">
        <button
          onClick={() => setActiveTab('in-progress')}
          className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
            activeTab === 'in-progress'
              ? 'border-[var(--color-primary)] text-white'
              : 'border-transparent text-[var(--color-text-secondary)] hover:text-white'
          }`}
        >
          In Progress ({inProgressCourses.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
            activeTab === 'completed'
              ? 'border-[var(--color-primary)] text-white'
              : 'border-transparent text-[var(--color-text-secondary)] hover:text-white'
          }`}
        >
          Completed ({completedCourses.length})
        </button>
      </div>

      {/* In Progress Tab */}
      {activeTab === 'in-progress' && (
        <div className="space-y-4">
          {inProgressCourses.map((course, index) => (
            <div
              key={index}
              className="glass-hover rounded-2xl p-6 border border-[var(--color-border)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-start gap-6">
                {/* Course Icon */}
                <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center text-3xl flex-shrink-0`}>
                  {course.icon}
                </div>

                {/* Course Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>

                  <div className="flex items-center gap-6 text-sm text-[var(--color-text-secondary)] mb-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{course.lastAccessed}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--color-text-secondary)]">Progress</span>
                      <span className="font-semibold text-[var(--color-primary)]">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-cyan)] rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <Link
                  to={`/course/${course.courseId}/lesson/${course.lessonId}`}
                  className="px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-glow)] text-white font-semibold transition-all duration-200 hover:scale-105 glow-purple-sm flex items-center gap-2 flex-shrink-0"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>Continue</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed Tab */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {completedCourses.map((course, index) => (
            <div
              key={index}
              className="glass-hover rounded-2xl p-6 border border-[var(--color-border)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center gap-6">
                {/* Course Icon */}
                <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center text-3xl flex-shrink-0`}>
                  {course.icon}
                </div>

                {/* Course Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{course.completedDate}</span>
                    </div>
                    {course.certificate && (
                      <span className="px-3 py-1 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-xs font-semibold">
                        Certificate Earned
                      </span>
                    )}
                  </div>
                </div>

                {/* View Certificate Button */}
                <button className="px-6 py-3 rounded-xl glass-hover border border-[var(--color-border)] text-white font-semibold transition-all duration-200 hover:scale-105">
                  View Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
