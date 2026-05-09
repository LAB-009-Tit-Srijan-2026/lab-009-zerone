import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, ChevronLeft, CheckCircle, Sparkles } from 'lucide-react';
import { AIVideoChat } from '../components/AIVideoChat';
import { LessonQuiz } from '../components/LessonQuiz';
import { getCourseById, getLessonById } from '../data/courses';

export function VideoPlayer() {
  const { courseId, lessonId } = useParams();
  const [currentTime, setCurrentTime] = useState(0);
  const [activeTab, setActiveTab] = useState<'chat' | 'quiz'>('chat');
  const videoRef = useRef<HTMLIFrameElement>(null);

  const course = getCourseById(courseId || '1');
  const lesson = getLessonById(courseId || '1', parseInt(lessonId || '1'));

  if (!course || !lesson) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Lesson not found</h2>
        <Link to="/courses" className="text-[var(--color-primary)] hover:underline">
          Back to Courses
        </Link>
      </div>
    );
  }

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : '';
  };

  const videoId = getYouTubeId(lesson.videoUrl);

  // Generate course-specific transcript based on lesson content
  const generateTranscript = (lessonTitle: string, keyTopics: string[] = []) => {
    const baseTranscripts: { [key: string]: { time: number; text: string }[] } = {
      'But what is a neural network?': [
        { time: 0, text: 'Welcome! Today we will explore neural networks by looking at how they recognize handwritten digits.' },
        { time: 60, text: 'A neural network is made up of layers of neurons, each neuron holding a number called its activation.' },
        { time: 120, text: 'Neurons in one layer are connected to all neurons in the next layer through weights and biases.' },
        { time: 180, text: 'The network learns by adjusting these weights and biases to minimize the difference between predicted and actual outputs.' },
        { time: 240, text: 'We use activation functions like sigmoid or ReLU to introduce non-linearity into the network.' },
        { time: 300, text: 'The final layer outputs probabilities for each possible digit from 0 to 9.' },
      ],
      'Gradient descent, how neural networks learn': [
        { time: 0, text: 'Today we explore how neural networks actually learn through gradient descent.' },
        { time: 60, text: 'We define a cost function that measures how wrong the network\'s predictions are.' },
        { time: 120, text: 'Gradient descent tells us how to adjust weights and biases to reduce this cost.' },
        { time: 180, text: 'The gradient is a vector pointing in the direction of steepest increase of the cost function.' },
        { time: 240, text: 'We take small steps in the opposite direction of the gradient to find a local minimum.' },
        { time: 300, text: 'The learning rate determines how big each step is during gradient descent.' },
      ],
      'What is backpropagation really doing?': [
        { time: 0, text: 'Backpropagation is the algorithm that efficiently computes the gradient of the cost function.' },
        { time: 60, text: 'It works backwards from the output layer to the input layer, applying the chain rule repeatedly.' },
        { time: 120, text: 'For each weight, backpropagation calculates how sensitive the cost is to changes in that weight.' },
        { time: 180, text: 'This sensitivity tells us which direction to nudge each weight to decrease the cost.' },
        { time: 240, text: 'The chain rule from calculus is the mathematical foundation of backpropagation.' },
      ],
    };

    // Return specific transcript if available, otherwise generate generic one
    if (baseTranscripts[lessonTitle]) {
      return baseTranscripts[lessonTitle];
    }

    // Generate generic transcript based on key topics
    const genericTranscript = [
      { time: 0, text: `Welcome to this lesson: ${lessonTitle}. Let's dive into the key concepts.` },
      { time: 60, text: `In this video, we'll cover ${keyTopics.slice(0, 2).join(' and ')}.` },
      { time: 120, text: `Understanding ${keyTopics[0] || 'these concepts'} is fundamental to mastering this topic.` },
      { time: 180, text: `We'll also explore ${keyTopics.slice(2, 4).join(' and ')}.` },
      { time: 240, text: 'Let\'s see how these concepts work together in practice.' },
      { time: 300, text: 'By the end of this lesson, you\'ll have a solid understanding of these principles.' },
    ];

    return genericTranscript;
  };

  const transcript = generateTranscript(lesson.title, lesson.keyTopics);

  // Update current time from YouTube player (simplified)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link to={`/course/${courseId}`} className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-white transition-colors duration-200">
        <ChevronLeft className="w-4 h-4" />
        <span>Back to {course.title}</span>
      </Link>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video Player Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Video Player */}
          <div className="glass-hover rounded-2xl overflow-hidden border border-[var(--color-border)]">
            {/* YouTube Embed */}
            <div className="relative aspect-video bg-black">
              {videoId ? (
                <iframe
                  ref={videoRef}
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`}
                  title={lesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <p>Video not available</p>
                </div>
              )}
            </div>
          </div>

          {/* Video Info */}
          <div className="glass-hover rounded-2xl p-6 border border-[var(--color-border)]">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent-cyan)] flex items-center justify-center flex-shrink-0 text-2xl">
                {course.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-[var(--color-primary)] px-2 py-1 rounded-full bg-[var(--color-primary)]/10">
                    {course.theme}
                  </span>
                </div>
                <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
                <p className="text-[var(--color-text-secondary)] mb-3">{lesson.description}</p>
              </div>
            </div>

            {/* Key Topics */}
            {lesson.keyTopics && lesson.keyTopics.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
                  Key Topics Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lesson.keyTopics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] text-xs border border-[var(--color-border)]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] pt-4 border-t border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{course.title}</span>
              </div>
              <span>•</span>
              <span>Instructor: {course.instructor}</span>
              <span>•</span>
              <span>{lesson.duration}</span>
            </div>
          </div>

          {/* AI Chat Interface / Quiz Tab */}
          <div className="glass-hover rounded-2xl border border-[var(--color-border)] overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b border-[var(--color-border)] bg-[var(--color-bg-surface)]">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 px-4 py-3 font-semibold transition-all duration-200 ${
                  activeTab === 'chat'
                    ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:text-white'
                }`}
              >
                💬 AI Assistant
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex-1 px-4 py-3 font-semibold transition-all duration-200 ${
                  activeTab === 'quiz'
                    ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:text-white'
                }`}
              >
                ✓ Quiz {lesson.quiz && lesson.quiz.length > 0 ? `(${lesson.quiz.length})` : ''}
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 h-[600px]">
              {activeTab === 'chat' ? (
                <AIVideoChat
                  currentTime={currentTime}
                  videoTitle={lesson.title}
                  transcript={transcript}
                  courseTitle={course.title}
                  lessonDescription={lesson.description}
                  keyTopics={lesson.keyTopics}
                  courseTheme={course.theme}
                />
              ) : (
                <div className="overflow-y-auto h-full pr-4">
                  {lesson.quiz && lesson.quiz.length > 0 ? (
                    <LessonQuiz
                      questions={lesson.quiz}
                      lessonTitle={lesson.title}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-center">
                      <div>
                        <p className="text-[var(--color-text-muted)] mb-2">No quiz available yet for this lesson.</p>
                        <p className="text-sm text-[var(--color-text-secondary)]">Check back soon!</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lessons Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-hover rounded-2xl p-6 border border-[var(--color-border)] sticky top-24">
            <h3 className="text-lg font-bold mb-4">Course Lessons</h3>
            <div className="space-y-4">
              {course.modules.map((module, moduleIndex) => (
                <div key={moduleIndex}>
                  <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-2">
                    {module.title}
                  </h4>
                  <div className="space-y-2">
                    {module.lessons.map((moduleLesson) => (
                      <Link
                        key={moduleLesson.id}
                        to={`/course/${courseId}/lesson/${moduleLesson.id}`}
                        className={`block p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                          moduleLesson.id === parseInt(lessonId || '0')
                            ? 'bg-[var(--color-primary)] text-white glow-purple-sm'
                            : 'glass-hover border border-[var(--color-border)] hover:border-[var(--color-primary)]'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {moduleLesson.completed && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                          <span className="text-sm font-semibold flex-1">{moduleLesson.title}</span>
                        </div>
                        <span className="text-xs opacity-70">{moduleLesson.duration}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
