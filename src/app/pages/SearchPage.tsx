import { Search, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { useState } from 'react';

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingSearches = [
    'Machine Learning',
    'Web Development',
    'Data Science',
    'Cloud Computing',
    'UI/UX Design',
    'Blockchain',
  ];

  const recentSearches = [
    'React Hooks Tutorial',
    'Python for Data Analysis',
    'AWS Certification',
    'Docker Basics',
  ];

  return (
    <div className="space-y-8">
      {/* AI Search Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-6 py-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 text-[var(--color-primary)] animate-pulse-glow" />
          <span className="text-sm font-medium text-[var(--color-primary)]">AI-Powered Semantic Search</span>
        </div>

        <h1 className="text-5xl font-bold mb-4">
          Find Your Perfect Course
        </h1>

        <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
          Search by topic, skill, or even describe what you want to learn. Our AI understands context and finds the best matches for you.
        </p>

        {/* Large Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you want to learn today?"
            className="w-full pl-16 pr-32 py-5 rounded-2xl bg-[var(--color-bg-surface)] border-2 border-[var(--color-border)] text-white text-lg placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:glow-purple transition-all duration-200"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-glow)] text-white font-semibold transition-all duration-200 hover:scale-105 glow-purple-sm flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>Search</span>
          </button>
        </div>

        {/* Search Suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <span className="text-sm text-[var(--color-text-muted)]">Try:</span>
          {['AI basics', 'web development', 'data visualization'].map((suggestion, index) => (
            <button
              key={index}
              className="px-4 py-2 rounded-full glass-hover border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Trending & Recent Searches */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Trending Searches */}
        <div className="glass-hover rounded-2xl p-6 border border-[var(--color-border)]">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[var(--color-primary)]" />
            <h3 className="text-lg font-bold">Trending Searches</h3>
          </div>
          <div className="space-y-2">
            {trendingSearches.map((search, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-[var(--color-text-secondary)] hover:text-white transition-all duration-200 flex items-center justify-between group"
              >
                <span>{search}</span>
                <Search className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </button>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        <div className="glass-hover rounded-2xl p-6 border border-[var(--color-border)]">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-[var(--color-primary)]" />
            <h3 className="text-lg font-bold">Recent Searches</h3>
          </div>
          <div className="space-y-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-[var(--color-text-secondary)] hover:text-white transition-all duration-200 flex items-center justify-between group"
              >
                <span>{search}</span>
                <Search className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Features */}
      <div className="glass-hover rounded-2xl p-8 border border-[var(--color-border)] max-w-4xl mx-auto">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 glow-purple-sm">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Smart Search Features</h3>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li>• Natural language understanding - search how you think</li>
              <li>• Contextual recommendations based on your learning history</li>
              <li>• Instant topic summaries powered by AI</li>
              <li>• Related course suggestions and learning paths</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
