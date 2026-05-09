import { Bookmark as BookmarkIcon, Play, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Bookmarks() {
  const bookmarks = [
    {
      id: 1,
      lectureId: 1,
      lectureTitle: 'Trees in Data Structures',
      course: 'Data Structures',
      timestamp: '12:10',
      note: 'Binary tree definition and properties',
      date: '2026-05-08',
      thumbnail: '🌳'
    },
    {
      id: 2,
      lectureId: 2,
      lectureTitle: 'Graph Algorithms',
      course: 'Advanced Algorithms',
      timestamp: '18:45',
      note: 'Dijkstra\'s algorithm implementation',
      date: '2026-05-07',
      thumbnail: '📊'
    },
    {
      id: 3,
      lectureId: 3,
      lectureTitle: 'Dynamic Programming',
      course: 'Algorithm Design',
      timestamp: '25:30',
      note: 'Memoization vs Tabulation comparison',
      date: '2026-05-06',
      thumbnail: '💡'
    },
    {
      id: 4,
      lectureId: 4,
      lectureTitle: 'Hash Tables',
      course: 'Data Structures',
      timestamp: '15:20',
      note: 'Collision resolution techniques',
      date: '2026-05-06',
      thumbnail: '🔑'
    },
    {
      id: 5,
      lectureId: 5,
      lectureTitle: 'Network Protocols',
      course: 'Computer Networks',
      timestamp: '22:15',
      note: 'TCP three-way handshake',
      date: '2026-05-05',
      thumbnail: '🌐'
    },
    {
      id: 6,
      lectureId: 7,
      lectureTitle: 'SQL Fundamentals',
      course: 'Databases',
      timestamp: '30:40',
      note: 'Complex JOIN examples',
      date: '2026-05-04',
      thumbnail: '💾'
    },
    {
      id: 7,
      lectureId: 9,
      lectureTitle: 'Linear Regression',
      course: 'Machine Learning',
      timestamp: '19:55',
      note: 'Cost function explanation',
      date: '2026-05-03',
      thumbnail: '📈'
    },
    {
      id: 8,
      lectureId: 10,
      lectureTitle: 'Neural Networks',
      course: 'Machine Learning',
      timestamp: '27:30',
      note: 'Backpropagation algorithm',
      date: '2026-05-02',
      thumbnail: '🧠'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Bookmarks</h2>
        <p className="text-muted-foreground">Your saved lecture moments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-3xl font-bold text-primary mb-1">{bookmarks.length}</div>
          <div className="text-sm text-muted-foreground">Total Bookmarks</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-3xl font-bold text-primary mb-1">{new Set(bookmarks.map(b => b.lectureId)).size}</div>
          <div className="text-sm text-muted-foreground">Lectures</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-3xl font-bold text-primary mb-1">{new Set(bookmarks.map(b => b.course)).size}</div>
          <div className="text-sm text-muted-foreground">Courses</div>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-3">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="bg-card border border-border rounded-xl p-4 hover:border-primary transition-all hover:shadow-lg"
          >
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                {bookmark.thumbnail}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{bookmark.lectureTitle}</h3>
                    <p className="text-sm text-muted-foreground">{bookmark.course}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      to={`/lecture/${bookmark.lectureId}`}
                      className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Play size={16} />
                      <span>Watch</span>
                    </Link>
                    <button className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
                    {bookmark.timestamp}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Saved on {new Date(bookmark.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <p className="text-sm bg-muted/50 rounded-lg px-3 py-2 italic">
                  "{bookmark.note}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
