import { Clock, Play, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function History() {
  const history = [
    { date: '2026-05-09', lectures: [
      { id: 1, title: 'Trees in Data Structures', course: 'Data Structures', duration: '28:45', thumbnail: '🌳', completed: false },
      { id: 2, title: 'Graph Algorithms', course: 'Advanced Algorithms', duration: '15:30', thumbnail: '📊', completed: false }
    ]},
    { date: '2026-05-08', lectures: [
      { id: 3, title: 'Dynamic Programming', course: 'Algorithm Design', duration: '38:20', thumbnail: '💡', completed: true },
      { id: 4, title: 'Hash Tables', course: 'Data Structures', duration: '41:10', thumbnail: '🔑', completed: true }
    ]},
    { date: '2026-05-07', lectures: [
      { id: 5, title: 'Network Protocols', course: 'Computer Networks', duration: '48:45', thumbnail: '🌐', completed: true },
      { id: 6, title: 'TCP/IP Stack', course: 'Computer Networks', duration: '22:15', thumbnail: '📡', completed: false }
    ]},
    { date: '2026-05-06', lectures: [
      { id: 7, title: 'SQL Fundamentals', course: 'Databases', duration: '43:20', thumbnail: '💾', completed: true }
    ]},
    { date: '2026-05-05', lectures: [
      { id: 8, title: 'Indexing and Optimization', course: 'Databases', duration: '39:50', thumbnail: '⚡', completed: true },
      { id: 9, title: 'Linear Regression', course: 'Machine Learning', duration: '46:15', thumbnail: '📈', completed: true }
    ]}
  ];

  const totalWatched = history.reduce((acc, day) => acc + day.lectures.length, 0);
  const totalCompleted = history.reduce((acc, day) =>
    acc + day.lectures.filter(l => l.completed).length, 0
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Watch History</h2>
        <p className="text-muted-foreground">Track your learning journey</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Play className="text-blue-500" size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{totalWatched}</div>
          <div className="text-sm text-muted-foreground">Videos Watched</div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Clock className="text-green-500" size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{totalCompleted}</div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Calendar className="text-purple-500" size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{history.length}</div>
          <div className="text-sm text-muted-foreground">Days Active</div>
        </div>
      </div>

      {/* History Timeline */}
      <div className="space-y-6">
        {history.map((day, dayIndex) => (
          <div key={dayIndex}>
            <div className="flex items-center gap-3 mb-4">
              <Calendar size={18} className="text-muted-foreground" />
              <h3 className="font-semibold">
                {new Date(day.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </h3>
              <span className="text-sm text-muted-foreground">
                ({day.lectures.length} lecture{day.lectures.length !== 1 ? 's' : ''})
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
              {day.lectures.map((lecture) => (
                <Link
                  key={lecture.id}
                  to={`/lecture/${lecture.id}`}
                  className="bg-card border border-border rounded-xl p-4 hover:border-primary transition-all hover:shadow-lg flex gap-4"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                    {lecture.thumbnail}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold truncate">{lecture.title}</h4>
                      {lecture.completed && (
                        <span className="text-green-500 flex-shrink-0">✓</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{lecture.course}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock size={12} />
                      <span>{lecture.duration}</span>
                      {lecture.completed ? (
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-500 rounded-full">
                          Completed
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded-full">
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
