import { Clock, BookOpen, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  title: string;
  description: string;
  category: string;
  lessons: number;
  duration: string;
  icon: string;
  gradient: string;
  courseId?: string;
}

export function CourseCard({ title, description, category, lessons, duration, icon, gradient, courseId = '1' }: CourseCardProps) {
  return (
    <Link to={`/course/${courseId}`} className="glass-hover rounded-2xl overflow-hidden border border-[var(--color-border)] transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group block">
      {/* Thumbnail */}
      <div className={`relative h-48 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <div className="text-6xl">{icon}</div>
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-xs font-medium text-white border border-white/20">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{lessons} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
          </div>

          <Sparkles className="w-4 h-4 text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </div>
    </Link>
  );
}
