import { FileText, Plus, Search, Calendar, Sparkles } from 'lucide-react';

export function MyNotes() {
  const notes = [
    {
      title: 'Neural Network Basics',
      content: 'Key concepts: Forward propagation, backpropagation, activation functions...',
      course: 'Advanced Machine Learning',
      date: '2 hours ago',
      tags: ['AI', 'Deep Learning'],
    },
    {
      title: 'React Hooks Best Practices',
      content: 'useState, useEffect, useContext patterns and common pitfalls to avoid...',
      course: 'Full Stack Web Development',
      date: '1 day ago',
      tags: ['React', 'Frontend'],
    },
    {
      title: 'Data Visualization Tips',
      content: 'Choosing the right chart types, color schemes, and storytelling with data...',
      course: 'Data Science Fundamentals',
      date: '2 days ago',
      tags: ['Data Science', 'Visualization'],
    },
    {
      title: 'Docker Commands Cheatsheet',
      content: 'Essential Docker commands for containers, images, volumes, and networks...',
      course: 'Cloud Architecture & DevOps',
      date: '3 days ago',
      tags: ['DevOps', 'Docker'],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Notes</h1>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Your learning notes, AI-enhanced and organized
          </p>
        </div>
        <button className="px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-glow)] text-white font-semibold transition-all duration-200 hover:scale-105 glow-purple-sm flex items-center gap-2">
          <Plus className="w-5 h-5" />
          <span>New Note</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="glass-hover rounded-2xl p-6 border border-[var(--color-border)]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search your notes..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:glow-purple-sm transition-all duration-200"
          />
        </div>
      </div>

      {/* AI Summary Card */}
      <div className="glass-hover rounded-2xl p-6 border border-[var(--color-border)]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold mb-1">AI-Generated Summary</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              You've been focusing on neural networks and deep learning this week. Great progress on understanding backpropagation!
            </p>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notes.map((note, index) => (
          <div
            key={index}
            className="glass-hover rounded-2xl p-6 border border-[var(--color-border)] transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold mb-1 group-hover:text-[var(--color-primary)] transition-colors duration-200">
                  {note.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {note.course}
                </p>
              </div>
            </div>

            <p className="text-[var(--color-text-secondary)] mb-4 line-clamp-2">
              {note.content}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                <Calendar className="w-3 h-3" />
                <span>{note.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
