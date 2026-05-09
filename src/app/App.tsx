import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Courses } from './pages/Courses';
import { MyLearning } from './pages/MyLearning';
import { SearchPage } from './pages/SearchPage';
import { MyNotes } from './pages/MyNotes';
import { Analytics } from './pages/Analytics';
import { Profile } from './pages/Profile';
import { CourseDetail } from './pages/CourseDetail';
import { VideoPlayer } from './pages/VideoPlayer';
import { motion, AnimatePresence } from 'motion/react';

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>
        <Sidebar />

        <div className="ml-[260px] transition-all duration-300">
          <Navbar />

          <main className="p-8">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<PageLayout><Dashboard /></PageLayout>} />
                <Route path="/courses" element={<PageLayout><Courses /></PageLayout>} />
                <Route path="/course/:courseId" element={<PageLayout><CourseDetail /></PageLayout>} />
                <Route path="/course/:courseId/lesson/:lessonId" element={<PageLayout><VideoPlayer /></PageLayout>} />
                <Route path="/my-learning" element={<PageLayout><MyLearning /></PageLayout>} />
                <Route path="/search" element={<PageLayout><SearchPage /></PageLayout>} />
                <Route path="/bookmarks" element={<PageLayout><Dashboard /></PageLayout>} />
                <Route path="/my-notes" element={<PageLayout><MyNotes /></PageLayout>} />
                <Route path="/analytics" element={<PageLayout><Analytics /></PageLayout>} />
                <Route path="/profile" element={<PageLayout><Profile /></PageLayout>} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
