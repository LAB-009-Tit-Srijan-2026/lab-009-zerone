import { useState, useRef, useEffect } from 'react';
import { Send, ThumbsUp, ThumbsDown, Copy, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! I\'m your AI learning assistant. I can help you with questions about any topic you\'re studying. What would you like to learn about today?',
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (question: string): string => {
    const lower = question.toLowerCase();

    if (lower.includes('hello') || lower.includes('hi')) {
      return 'Hello! How can I assist you with your studies today? Feel free to ask me anything about computer science, algorithms, data structures, or any other topic you\'re learning.';
    }

    if (lower.includes('help')) {
      return 'I can help you with:\n\n• Explaining complex concepts\n• Solving problems step-by-step\n• Providing examples and analogies\n• Generating practice questions\n• Creating study notes\n\nWhat would you like help with?';
    }

    return `Great question! ${question.includes('?') ? 'Let me explain:' : 'Here\'s what I know about that:'}\n\nThis is a complex topic that involves understanding the fundamental principles. Would you like me to break it down into smaller parts or provide specific examples?`;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = generateResponse(inputValue);
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-73px)] flex flex-col bg-background">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-2xl">
            🤖
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI Assistant</h2>
            <p className="text-muted-foreground">Your personal learning companion</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex gap-3 max-w-[80%]">
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    🤖
                  </div>
                )}

                <div
                  className={`${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border'
                  } rounded-2xl px-4 py-3`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                  <div className="flex items-center justify-between mt-2 gap-3">
                    <span className="text-xs opacity-60">{message.timestamp}</span>
                    {message.sender === 'ai' && (
                      <div className="flex gap-2">
                        <button className="hover:bg-muted p-1 rounded transition-colors">
                          <ThumbsUp size={14} />
                        </button>
                        <button className="hover:bg-muted p-1 rounded transition-colors">
                          <ThumbsDown size={14} />
                        </button>
                        <button className="hover:bg-muted p-1 rounded transition-colors">
                          <Copy size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                    AK
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  🤖
                </div>
                <div className="bg-card border border-border rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">AI is thinking</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-6 border-t border-border bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-background border border-border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg transition-colors font-medium text-primary-foreground"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1 justify-center">
            <Sparkles size={12} className="text-primary" />
            Powered by advanced AI • Real-time responses
          </p>
        </div>
      </div>
    </div>
  );
}
