import { Brain, Trash2 } from 'lucide-react';

interface Topic {
  id: number;
  title: string;
  active: boolean;
}

interface SessionMemoryProps {
  topics: Topic[];
}

export default function SessionMemory({ topics }: SessionMemoryProps) {
  return (
    <div className="w-64 bg-[#12131f] border-l border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="text-purple-400" size={20} />
          <h3 className="font-semibold">AI Session Memory</h3>
        </div>
        <p className="text-xs text-gray-400">
          Your conversation context is saved for this session.
        </p>
      </div>

      {/* Topics */}
      <div className="flex-1 p-4">
        <h4 className="text-sm font-medium text-gray-400 mb-3">Topics in this session:</h4>
        <ul className="space-y-2">
          {topics.map((topic) => (
            <li
              key={topic.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                topic.active ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span className="text-sm">{topic.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Clear Session */}
      <div className="p-4 border-t border-gray-800">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded-lg transition-colors">
          <Trash2 size={16} />
          <span className="text-sm">Clear Session</span>
        </button>
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-gray-900/50 border-t border-gray-800">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span>⚡</span>
            <span className="text-gray-400">RAG + LLM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🧠</span>
            <span className="text-gray-400">Context AI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>💾</span>
            <span className="text-gray-400">Memory</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🔒</span>
            <span className="text-gray-400">Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
