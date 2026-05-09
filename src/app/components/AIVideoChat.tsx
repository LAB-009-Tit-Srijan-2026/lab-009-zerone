import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { getAIVideoResponse } from '../services/openai';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp?: string;
  isLoading?: boolean;
}

interface AIVideoChatProps {
  currentTime: number;
  videoTitle: string;
  transcript: { time: number; text: string }[];
  courseTitle?: string;
  lessonDescription?: string;
  keyTopics?: string[];
  courseTheme?: string;
}

export function AIVideoChat({
  currentTime,
  videoTitle,
  transcript,
  courseTitle = 'this course',
  lessonDescription,
  keyTopics,
  courseTheme
}: AIVideoChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I'm your AI learning assistant. I'm here to help you understand "${videoTitle}" from ${courseTitle}.\n\nI use advanced local AI models to provide personalized assistance based on the video content.\n\nI can help you with:\n• Explaining concepts from the video\n• Answering questions about the content\n• Providing summaries and key takeaways\n• Generating practice questions\n• Clarifying difficult topics\n\nWhat would you like to know about this lesson?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: formatTime(currentTime),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    // Add loading message
    const loadingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: loadingId,
      type: 'ai',
      content: '',
      isLoading: true,
    }]);

    try {
      // Get recent transcript context
      const recentTranscript = transcript
        .filter(t => t.time >= currentTime - 60 && t.time <= currentTime)
        .map(t => t.text)
        .join(' ');

      const videoContext = {
        videoTitle,
        courseTitle,
        currentTimestamp: formatTime(currentTime),
        transcript,
        recentTranscript: recentTranscript || 'Video content being analyzed...',
        lessonDescription,
        keyTopics,
        courseTheme,
      };

      // Get AI response from OpenAI
      const aiResponse = await getAIVideoResponse(userMessage.content, videoContext);

      // Remove loading message and add real response
      setMessages(prev => prev.filter(msg => msg.id !== loadingId));

      const aiMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: formatTime(currentTime),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Remove loading message
      setMessages(prev => prev.filter(msg => msg.id !== loadingId));

      // Show error message
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again.',
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        type: 'ai',
        content: `Hello! I'm your AI learning assistant. I'm here to help you understand "${videoTitle}" from ${courseTitle}.\n\nI use advanced local AI models to provide personalized assistance based on the video content.\n\nI can help you with:\n• Explaining concepts from the video\n• Answering questions about the content\n• Providing summaries and key takeaways\n• Generating practice questions\n• Clarifying difficult topics\n\nWhat would you like to know about this lesson?`,
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-bg-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">AI Learning Assistant</h3>
            <p className="text-xs text-[var(--color-text-secondary)]">Powered by Local AI Models</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          title="Clear chat"
        >
          <RefreshCw className="w-4 h-4 text-[var(--color-text-secondary)]" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.type === 'user'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-white/5 border border-[var(--color-border)]'
              }`}
            >
              {message.type === 'ai' && !message.isLoading && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
                  <span className="text-xs font-semibold text-[var(--color-primary)]">
                    AI Assistant
                  </span>
                </div>
              )}

              {message.isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-[var(--color-primary)] animate-spin" />
                  <span className="text-sm text-[var(--color-text-secondary)]">Thinking...</span>
                </div>
              ) : (
                <div className="text-sm whitespace-pre-line">
                  {message.content}
                </div>
              )}

              {message.timestamp && !message.isLoading && (
                <span className="text-xs text-[var(--color-text-muted)] mt-2 block opacity-70">
                  {message.timestamp}
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about the video..."
            className="w-full pl-4 pr-12 py-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:glow-purple-sm transition-all duration-200"
            disabled={isGenerating}
          />
          <button
            onClick={handleSend}
            disabled={isGenerating || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-glow)] text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="text-xs text-[var(--color-text-muted)] mt-2 text-center">
          Press Enter to send • Powered by Local AI Models
        </div>
      </div>
    </div>
  );
}
