import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyCourses() {
  const courses = [
    {
      id: 1,
      title: 'Data Structures and Algorithms',
      instructor: 'Dr. Sarah Johnson',
      progress: 65,
      totalLectures: 48,
      completedLectures: 31,
      totalHours: 24,
      thumbnail: '🌳',
      color: 'from-purple-600 to-blue-600'
    },
    {
      id: 2,
      title: 'Advanced Algorithms',
      instructor: 'Prof. Michael Chen',
      progress: 30,
      totalLectures: 36,
      completedLectures: 11,
      totalHours: 18,
      thumbnail: '📊',
      color: 'from-green-600 to-teal-600'
    },
    {
      id: 3,
      title: 'Algorithm Design and Analysis',
      instructor: 'Dr. Emily Brown',
      progress: 80,
      totalLectures: 42,
      completedLectures: 34,
      totalHours: 21,
      thumbnail: '💡',
      color: 'from-orange-600 to-red-600'
    },
    {
      id: 4,
      title: 'Computer Networks',
      instructor: 'Prof. David Lee',
      progress: 45,
      totalLectures: 32,
      completedLectures: 14,
      totalHours: 16,
      thumbnail: '🌐',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 5,
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Lisa Wang',
      progress: 55,
      totalLectures: 40,
      completedLectures: 22,
      totalHours: 20,
      thumbnail: '🤖',
      color: 'from-pink-600 to-purple-600'
    },
    {
      id: 6,
      title: 'Database Systems',
      instructor: 'Prof. Robert Kim',
      progress: 70,
      totalLectures: 30,
      completedLectures: 21,
      totalHours: 15,
      thumbnail: '💾',
      color: 'from-yellow-600 to-orange-600'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">My Courses</h2>
        <p className="text-muted-foreground">Track your enrolled courses and progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-all hover:shadow-lg"
          >
            <div className={`aspect-video bg-gradient-to-br ${course.color} flex items-center justify-center text-7xl`}>
              {course.thumbnail}
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                <BookOpen size={14} />
                {course.instructor}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={16} />
                  <span>{course.totalHours}h total</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp size={16} />
                  <span>{course.completedLectures}/{course.totalLectures} lectures</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-primary">{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <Link
                to={`/lecture/${course.id}`}
                className="w-full block text-center px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium"
              >
                Continue Learning
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
