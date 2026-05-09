import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Play, Clock, BookOpen, Award, Users, Star, CheckCircle } from 'lucide-react';

export function CourseDetail() {
  const { courseId } = useParams();

  const courseData = {
    title: 'Advanced Machine Learning',
    instructor: 'Dr. Sarah Chen',
    rating: 4.8,
    students: 12450,
    description: 'Master deep learning, neural networks, and AI algorithms with hands-on projects. This comprehensive course covers everything from basics to advanced concepts in machine learning.',
    duration: '8 weeks',
    lessons: 24,
    icon: '🤖',
    gradient: 'from-purple-600 to-blue-600',
  };

  const modules = [
    {
      title: 'Introduction to Neural Networks',
      lessons: [
        { id: 1, title: 'What are Neural Networks?', duration: '8:30', completed: true },
        { id: 2, title: 'History and Evolution of AI', duration: '10:15', completed: true },
        { id: 3, title: 'Setting Up Your Environment', duration: '12:45', completed: true },
      ],
    },
    {
      title: 'Forward Propagation',
      lessons: [
        { id: 4, title: 'Understanding Data Flow', duration: '11:20', completed: true },
        { id: 5, title: 'Neural Networks - Forward Propagation', duration: '10:45', completed: false, current: true },
        { id: 6, title: 'Matrix Operations', duration: '9:30', completed: false },
      ],
    },
    {
      title: 'Backpropagation & Training',
      lessons: [
        { id: 7, title: 'Backpropagation Algorithm', duration: '15:20', completed: false },
        { id: 8, title: 'Gradient Descent', duration: '13:15', completed: false },
        { id: 9, title: 'Learning Rate Optimization', duration: '10:00', completed: false },
      ],
    },
    {
      title: 'Activation Functions',
      lessons: [
        { id: 10, title: 'ReLU and Its Variants', duration: '11:00', completed: false },
        { id: 11, title: 'Sigmoid and Tanh', duration: '9:45', completed: false },
        { id: 12, title: 'Advanced Activation Functions', duration: '12:30', completed: false },
      ],
    },
  ];

  const skills = [
    'Deep Learning',
    'Neural Networks',
    'Python Programming',
    'TensorFlow & PyTorch',
    'Computer Vision',
    'Natural Language Processing',
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link to="/courses" className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-white transition-colors duration-200">
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Courses</span>
      </Link>

      {/* Course Header */}
      <div className="glass-hover rounded-2xl p-8 border border-[var(--color-border)]">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Course Icon */}
          <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${courseData.gradient} flex items-center justify-center text-6xl flex-shrink-0`}>
            {courseData.icon}
          </div>

          {/* Course Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-3">{courseData.title}</h1>
            <p className="text-lg text-[var(--color-text-secondary)] mb-4 leading-relaxed">
              {courseData.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--color-text-secondary)] mb-6">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{courseData.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{courseData.rating} rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{courseData.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{courseData.lessons} lessons</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to={`/course/${courseId}/lesson/5`}
                className="px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-glow)] text-white font-semibold transition-all duration-200 hover:scale-105 glow-purple-sm flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                <span>Continue Learning</span>
              </Link>
              <span className="text-sm text-[var(--color-text-secondary)]">
                Instructor: {courseData.instructor}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Course Content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-hover rounded-2xl p-6 border border-[var(--color-border)]">
            <h2 className="text-2xl font-bold mb-6">Course Content</h2>

            <div className="space-y-4">
              {modules.map((module, moduleIndex) => (
                <div
                  key={moduleIndex}
                  className="glass-hover rounded-xl border border-[var(--color-border)] overflow-hidden"
                >
                  <div className="p-4 bg-white/5">
                    <h3 className="font-bold">{module.title}</h3>
                  </div>

                  <div className="divide-y divide-[var(--color-border)]">
                    {module.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        to={`/course/${courseId}/lesson/${lesson.id}`}
                        className={`flex items-center justify-between p-4 hover:bg-white/5 transition-all duration-200 group ${
                          lesson.current ? 'bg-[var(--color-primary)]/10' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            lesson.completed
                              ? 'bg-green-500/20'
                              : lesson.current
                              ? 'bg-[var(--color-primary)]/20'
                              : 'bg-white/5'
                          }`}>
                            {lesson.completed ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Play className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)]" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium group-hover:text-[var(--color-primary)] transition-colors duration-200">
                              {lesson.title}
                            </div>
                            {lesson.current && (
                              <span className="text-xs text-[var(--color-primary)]">Currently watching</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                          <Clock className="w-4 h-4" />
                          <span>{lesson.duration}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Skills You'll Learn */}
          <div className="glass-hover rounded-2xl p-6 border border-[var(--color-border)]">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-[var(--color-primary)]" />
              <h3 className="text-lg font-bold">Skills You'll Learn</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium border border-[var(--color-primary)]/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Course Progress */}
          <div className="glass-hover rounded-2xl p-6 border border-[var(--color-border)]">
            <h3 className="text-lg font-bold mb-4">Your Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[var(--color-text-secondary)]">Completion</span>
                  <span className="text-sm font-semibold text-[var(--color-primary)]">42%</span>
                </div>
                <div className="w-full h-2 bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-cyan)] rounded-full"
                    style={{ width: '42%' }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)] space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Lessons Completed</span>
                  <span className="font-semibold">10 / 24</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Time Spent</span>
                  <span className="font-semibold">8.5 hours</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Quizzes Passed</span>
                  <span className="font-semibold">7 / 12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate */}
          <div className="glass-hover rounded-2xl p-6 border border-[var(--color-border)]">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-[var(--color-primary)]" />
              <h3 className="font-bold">Certificate</h3>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Complete all lessons and pass the final exam to earn your certificate.
            </p>
            <div className="text-xs text-[var(--color-text-muted)]">
              58% to completion
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
