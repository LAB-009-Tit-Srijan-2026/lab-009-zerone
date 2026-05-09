import { Search, Filter, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function LectureLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Lectures' },
    { id: 'data-structures', label: 'Data Structures' },
    { id: 'algorithms', label: 'Algorithms' },
    { id: 'networks', label: 'Networks' },
    { id: 'databases', label: 'Databases' },
    { id: 'ml', label: 'Machine Learning' }
  ];

  const lectures = [
    { id: 1, title: 'Trees in Data Structures', category: 'data-structures', duration: '45:30', views: '12.5k', thumbnail: '🌳' },
    { id: 2, title: 'Graph Algorithms', category: 'algorithms', duration: '52:15', views: '10.2k', thumbnail: '📊' },
    { id: 3, title: 'Dynamic Programming Introduction', category: 'algorithms', duration: '38:20', views: '15.8k', thumbnail: '💡' },
    { id: 4, title: 'Hash Tables and Hashing', category: 'data-structures', duration: '41:10', views: '9.7k', thumbnail: '🔑' },
    { id: 5, title: 'Network Protocols', category: 'networks', duration: '48:45', views: '8.3k', thumbnail: '🌐' },
    { id: 6, title: 'TCP/IP Stack', category: 'networks', duration: '55:30', views: '11.2k', thumbnail: '📡' },
    { id: 7, title: 'SQL Fundamentals', category: 'databases', duration: '43:20', views: '14.1k', thumbnail: '💾' },
    { id: 8, title: 'Indexing and Optimization', category: 'databases', duration: '39:50', views: '7.9k', thumbnail: '⚡' },
    { id: 9, title: 'Linear Regression', category: 'ml', duration: '46:15', views: '13.4k', thumbnail: '📈' },
    { id: 10, title: 'Neural Networks Basics', category: 'ml', duration: '51:40', views: '16.7k', thumbnail: '🧠' },
    { id: 11, title: 'Linked Lists', category: 'data-structures', duration: '37:25', views: '10.8k', thumbnail: '⛓️' },
    { id: 12, title: 'Sorting Algorithms', category: 'algorithms', duration: '44:55', views: '12.3k', thumbnail: '🔄' }
  ];

  const filteredLectures = lectures.filter(lecture => {
    const matchesSearch = lecture.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || lecture.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Lecture Library</h2>
        <p className="text-muted-foreground">Browse all available lectures</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search lectures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-3 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border hover:border-primary'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredLectures.length} lecture{filteredLectures.length !== 1 ? 's' : ''}
      </div>

      {/* Lectures Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredLectures.map((lecture) => (
          <Link
            key={lecture.id}
            to={`/lecture/${lecture.id}`}
            className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-all hover:shadow-lg group"
          >
            <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-6xl relative">
              {lecture.thumbnail}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                  <Play className="text-black ml-1" size={24} />
                </div>
              </div>
            </div>

            <div className="p-4">
              <h4 className="font-semibold mb-2 line-clamp-2">{lecture.title}</h4>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{lecture.duration}</span>
                <span>{lecture.views} views</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredLectures.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No lectures found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
