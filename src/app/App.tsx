import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import MyCourses from './pages/MyCourses';
import LectureLibrary from './pages/LectureLibrary';
import LectureView from './pages/LectureView';
import AIAssistantPage from './pages/AIAssistantPage';
import Notes from './pages/Notes';
import Bookmarks from './pages/Bookmarks';
import History from './pages/History';
import Settings from './pages/Settings';

interface Note {
  id: number;
  title: string;
  content: string;
  course: string;
  date: string;
  tags: string[];
}

interface AppContextType {
  notes: Note[];
  addNote: (note: Omit<Note, 'id'>) => void;
  updateNote: (id: number, note: Partial<Note>) => void;
  deleteNote: (id: number) => void;
  showAIChat: boolean;
  setShowAIChat: (show: boolean) => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Binary Trees - Key Concepts',
      content: 'Binary trees are fundamental data structures where each node has at most 2 children. Key properties:\n• Each node has 0, 1, or 2 children\n• Left and right children are ordered\n• Used in heaps, search trees, and more',
      course: 'Data Structures',
      date: '2026-05-08',
      tags: ['trees', 'data-structures']
    },
    {
      id: 2,
      title: 'Graph Traversal Algorithms',
      content: 'Two main approaches for graph traversal:\n\nBFS (Breadth-First Search):\n• Uses queue data structure\n• Explores level by level\n• Good for shortest path\n\nDFS (Depth-First Search):\n• Uses stack (or recursion)\n• Explores as far as possible\n• Good for cycle detection',
      course: 'Algorithms',
      date: '2026-05-07',
      tags: ['graphs', 'algorithms', 'traversal']
    },
    {
      id: 3,
      title: 'Dynamic Programming Principles',
      content: 'DP is an optimization technique:\n\n1. Optimal Substructure: Problem can be broken into subproblems\n2. Overlapping Subproblems: Same subproblems solved multiple times\n\nApproaches:\n• Top-down (Memoization)\n• Bottom-up (Tabulation)',
      course: 'Algorithm Design',
      date: '2026-05-06',
      tags: ['dynamic-programming', 'optimization']
    }
  ]);

  const addNote = (note: Omit<Note, 'id'>) => {
    const newNote = {
      ...note,
      id: Math.max(...notes.map(n => n.id), 0) + 1
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id: number, updatedNote: Partial<Note>) => {
    setNotes(notes.map(note => note.id === id ? { ...note, ...updatedNote } : note));
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <AppContext.Provider value={{
      notes,
      addNote,
      updateNote,
      deleteNote,
      showAIChat,
      setShowAIChat,
      showNotifications,
      setShowNotifications
    }}>
      <BrowserRouter>
        <div className={darkMode ? 'dark' : ''}>
          <div className="flex h-screen bg-background text-foreground overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
              <Header darkMode={darkMode} setDarkMode={setDarkMode} />

              <main className="flex-1 overflow-y-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/courses" element={<MyCourses />} />
                  <Route path="/library" element={<LectureLibrary />} />
                  <Route path="/lecture/:id" element={<LectureView />} />
                  <Route path="/ai-assistant" element={<AIAssistantPage />} />
                  <Route path="/notes" element={<Notes />} />
                  <Route path="/bookmarks" element={<Bookmarks />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
