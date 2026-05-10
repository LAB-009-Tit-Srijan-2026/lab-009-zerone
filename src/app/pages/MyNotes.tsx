import { useState, useEffect } from 'react';
import { FileText, Plus, Search, Calendar, Sparkles, X } from 'lucide-react';

interface Note {
  title: string;
  content: string;
  course: string;
  date: string;
  tags: string[];
}

const STORAGE_KEY = 'learnai_notes';

const defaultNotes: Note[] = [
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

export function MyNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      setNotes(defaultNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const resetForm = () => {
    setTitle('');
    setCourse('');
    setContent('');
    setTags('');
  };

  const handleAddNote = () => {
    if (!title.trim() || !content.trim() || !course.trim()) {
      return;
    }

    const newNote: Note = {
      title: title.trim(),
      content: content.trim(),
      course: course.trim(),
      date: 'Just now',
      tags: tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean),
    };

    setNotes([newNote, ...notes]);
    resetForm();
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Notes</h1>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Your learning notes, AI-enhanced and organized
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={() => setShowForm(prev => !prev)}
            className="px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-glow)] text-white font-semibold transition-all duration-200 hover:scale-105 glow-purple-sm flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>{showForm ? 'Cancel' : 'New Note'}</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="glass-hover rounded-2xl p-6 border border-[var(--color-border)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Add a new note</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Add a note for your current lesson or course with tags to keep it organized.
              </p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-[var(--color-text-secondary)]" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Note title"
              className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-all duration-200"
            />
            <input
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="Course name"
              className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-all duration-200"
            />
          </div>

          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={5}
            placeholder="Write your note here..."
            className="w-full mt-4 px-4 py-3 rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-all duration-200"
          />

          <input
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="w-full mt-4 px-4 py-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-all duration-200"
          />

          <div className="flex justify-end mt-4">
            <button
              onClick={handleAddNote}
              className="px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-glow)] text-white font-semibold transition-all duration-200"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

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
