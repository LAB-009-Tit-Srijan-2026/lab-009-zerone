import { CourseCard } from '../components/CourseCard';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function Courses() {
  const [category, setCategory] = useState('All Categories');
  const [difficulty, setDifficulty] = useState('All Levels');

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
    {
      courseId: '4',
      title: 'Cloud Architecture & DevOps',
      description: 'Master AWS, Docker, Kubernetes, and modern infrastructure practices',
      category: 'Cloud',
      lessons: 20,
      duration: '6 weeks',
      icon: '☁️',
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      courseId: '5',
      title: 'UI/UX Design Mastery',
      description: 'Create beautiful, user-centered designs with Figma and design systems',
      category: 'Design',
      lessons: 18,
      duration: '5 weeks',
      icon: '🎨',
      gradient: 'from-pink-600 to-purple-600',
    },
    {
      courseId: '6',
      title: 'Blockchain & Web3',
      description: 'Build decentralized apps, smart contracts, and understand crypto fundamentals',
      category: 'Blockchain',
      lessons: 22,
      duration: '7 weeks',
      icon: '⛓️',
      gradient: 'from-yellow-600 to-orange-600',
    },
    {
      courseId: '7',
      title: 'Cybersecurity Essentials',
      description: 'Learn ethical hacking, penetration testing, and security best practices',
      category: 'Security',
      lessons: 26,
      duration: '9 weeks',
      icon: '🔒',
      gradient: 'from-red-600 to-pink-600',
    },
    {
      courseId: '8',
      title: 'Mobile App Development',
      description: 'Build native iOS and Android apps with React Native and Flutter',
      category: 'Development',
      lessons: 30,
      duration: '11 weeks',
      icon: '📱',
      gradient: 'from-green-600 to-teal-600',
    },
    {
      courseId: '9',
      title: 'Digital Marketing & SEO',
      description: 'Master content marketing, social media strategy, and search optimization',
      category: 'Marketing',
      lessons: 16,
      duration: '4 weeks',
      icon: '📈',
      gradient: 'from-indigo-600 to-purple-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Course Catalog</h1>
        <p className="text-[var(--color-text-secondary)] text-lg">
          Explore our AI-curated collection of courses
        </p>
      </div>

      {/* Search and Filters */}
      <div className="glass-hover rounded-2xl p-6 border border-[var(--color-border)]">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search for courses, topics, or skills..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:glow-purple-sm transition-all duration-200"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-white hover:border-[var(--color-primary)] transition-all duration-200 min-w-[180px] justify-between">
              <Filter className="w-5 h-5" />
              <span>{category}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Difficulty Filter */}
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-white hover:border-[var(--color-primary)] transition-all duration-200 min-w-[150px] justify-between">
              <span>{difficulty}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
}
