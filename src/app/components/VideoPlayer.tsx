import { useState } from 'react';
import { Play, SkipForward, Volume2, Settings, Maximize, FileText } from 'lucide-react';

interface VideoPlayerProps {
  video: {
    id: number;
    title: string;
    subtitle: string;
    url: string;
    transcript: Array<{
      time: string;
      text: string;
      content: string;
    }>;
  };
  onTimeUpdate?: (time: number) => void;
}

export default function VideoPlayer({ video, onTimeUpdate }: VideoPlayerProps) {
  const [activeTab, setActiveTab] = useState<'transcript' | 'summaries' | 'jump' | 'notes'>('summaries');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
    onTimeUpdate?.(time);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="flex flex-col h-full p-6">
      {/* Video Container */}
      <div className="bg-gray-900 rounded-xl overflow-hidden mb-4">
        <div className="aspect-video bg-gray-800 flex items-center justify-center relative">
          <iframe
            src={video.url}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Controls */}
        <div className="p-4 bg-gray-900">
          <div className="flex items-center gap-4 mb-3">
            <button className="hover:text-purple-400 transition-colors">
              <Play size={20} />
            </button>
            <button className="hover:text-purple-400 transition-colors">
              <SkipForward size={20} />
            </button>
            <span className="text-sm text-gray-400">12:45 / 45:30</span>
            <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-[28%] bg-purple-600 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
            <button className="hover:text-purple-400 transition-colors">
              <Volume2 size={20} />
            </button>
            <span className="text-sm">1x</span>
            <button className="hover:text-purple-400 transition-colors">
              <Settings size={20} />
            </button>
            <button className="hover:text-purple-400 transition-colors">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-800 mb-4">
        {(['transcript', 'summaries', 'jump', 'notes'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 capitalize transition-colors relative ${
              activeTab === tab
                ? 'text-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'jump' ? 'Jump to Moment' : tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'summaries' && (
          <div className="grid grid-cols-2 gap-4">
            {/* Smart Summaries */}
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">✨</span>
                <h3 className="font-semibold">Smart Summaries</h3>
              </div>

              {/* Topic-wise Summary */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-purple-400 mb-2">
                  <span className="text-lg">➕</span>
                  <h4 className="font-medium">Topic-wise Summary</h4>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  This section explains Binary Trees, their properties, representation and types. It covers the structure where each node has at most two children.
                </p>
                <button
                  onClick={handleGenerate}
                  className="px-4 py-1.5 bg-purple-600/20 text-purple-400 rounded-lg text-sm border border-purple-600/30 hover:bg-purple-600/30 transition-colors"
                >
                  {isGenerating ? 'Generating...' : 'Generate for this topic'}
                </button>
              </div>

              {/* Last 5-Minute Summary */}
              <div>
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <span className="text-lg">ℹ️</span>
                  <h4 className="font-medium">Last 5-Minute Summary</h4>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  In the last 5 minutes, we learned about Binary Tree properties, node relationships, and a simple example of a binary tree.
                </p>
                <button
                  onClick={handleGenerate}
                  className="px-4 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg text-sm border border-blue-600/30 hover:bg-blue-600/30 transition-colors"
                >
                  Generate again
                </button>
              </div>
            </div>

            {/* Jump to Moment */}
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">⏱️</span>
                <h3 className="font-semibold">Jump to Moment</h3>
              </div>

              <div className="space-y-2">
                {video.transcript.map((item, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      item.time === '12:10'
                        ? 'bg-purple-600 text-white'
                        : 'hover:bg-gray-800 text-gray-300'
                    }`}
                  >
                    <span className="text-sm text-gray-400 font-mono">{item.time}</span>
                    <span className="text-sm flex-1">{item.text}</span>
                    {item.time === '12:10' && <span>▶</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transcript' && (
          <div className="bg-gray-900/50 rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileText size={20} />
              Full Transcript
            </h3>
            <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
              {video.transcript.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <span className="text-purple-400 font-mono font-semibold min-w-[60px]">
                    {item.time}
                  </span>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'jump' && (
          <div className="bg-gray-900/50 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Jump to Any Moment</h3>
            <div className="space-y-2">
              {video.transcript.map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    item.time === '12:10'
                      ? 'bg-purple-600 text-white'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  <span className="text-sm text-gray-400 font-mono min-w-[60px]">{item.time}</span>
                  <span className="text-sm flex-1">{item.text}</span>
                  {item.time === '12:10' && <Play size={16} />}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="bg-gray-900/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">My Notes</h3>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm transition-colors">
                + Add Note
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-400 font-mono">12:10</span>
                  <span className="text-xs text-gray-500">2 min ago</span>
                </div>
                <p className="text-sm text-gray-300">
                  Binary trees are fundamental - each node has at most 2 children. Remember: left child = 0 or 1, right child = 0 or 1.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-400 font-mono">06:40</span>
                  <span className="text-xs text-gray-500">15 min ago</span>
                </div>
                <p className="text-sm text-gray-300">
                  Types of trees: Binary, BST, AVL, Red-Black, B-trees. Each has specific use cases.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
