import { useState, useRef, useEffect } from 'react';
import { Send, ThumbsUp, ThumbsDown, Copy, X, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  thinking?: boolean;
}

interface Quiz {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface AIAssistantProps {
  video: {
    title: string;
    subtitle: string;
    transcript: Array<{
      time: string;
      text: string;
      content: string;
    }>;
  };
  currentTime?: number;
  onClose: () => void;
}

export default function AIAssistant({ video, currentTime = 0, onClose }: AIAssistantProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'quiz' | 'notes'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'What is a binary tree?',
      sender: 'user',
      timestamp: '12:45 PM'
    },
    {
      id: 2,
      text: 'A Binary Tree is a tree data structure in which each node has at most two children, referred to as the left child and the right child.\n\nKey points:\n• Each node has 0, 1, or 2 children.\n• Left child and right child are ordered.\n• It is a special type of tree.\n• Used in heaps, search trees, and more.',
      sender: 'ai',
      timestamp: '12:45 PM'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [quizzes] = useState<Quiz[]>([
    {
      id: 1,
      question: 'What is the maximum number of children a node can have in a binary tree?',
      options: ['1', '2', '3', 'Unlimited'],
      correctAnswer: 1,
      explanation: 'In a binary tree, each node can have at most 2 children - a left child and a right child.'
    },
    {
      id: 2,
      question: 'Which traversal method visits nodes in the order: left subtree, root, right subtree?',
      options: ['Preorder', 'Inorder', 'Postorder', 'Level-order'],
      correctAnswer: 1,
      explanation: 'Inorder traversal visits nodes in the order: left subtree → root → right subtree. This gives a sorted sequence for BSTs.'
    },
    {
      id: 3,
      question: 'What is a full binary tree?',
      options: [
        'A tree with all levels filled',
        'A tree where every node has 0 or 2 children',
        'A tree with only left children',
        'A tree with maximum height'
      ],
      correctAnswer: 1,
      explanation: 'A full binary tree is one where every node has either 0 children (leaf) or exactly 2 children.'
    }
  ]);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getCurrentTranscript = () => {
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const currentTimeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const currentSegment = video.transcript.find((seg, idx) => {
      const nextSeg = video.transcript[idx + 1];
      const segTime = seg.time.split(':').reduce((acc, val) => acc * 60 + parseInt(val), 0);
      const nextTime = nextSeg ? nextSeg.time.split(':').reduce((acc, val) => acc * 60 + parseInt(val), 0) : Infinity;
      return currentTime >= segTime && currentTime < nextTime;
    });

    return currentSegment || video.transcript[0];
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
      const currentSegment = getCurrentTranscript();
      const aiResponse = generateAIResponse(inputValue, currentSegment);
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (question: string, currentSegment: any): string => {
    const lowerQuestion = question.toLowerCase();
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (lowerQuestion.includes('current') || lowerQuestion.includes('now') || lowerQuestion.includes('this part')) {
      return `Based on what you're watching at ${currentSegment.time} (${currentSegment.text}):\n\n${currentSegment.content}\n\nThis section is specifically about "${currentSegment.text}". Would you like me to explain any particular aspect in more detail?`;
    }

    if (lowerQuestion.includes('type') && lowerQuestion.includes('binary tree')) {
      return `Great question about binary tree types! At timestamp ${currentSegment.time}, the lecture covers:\n\nThere are several types of binary trees:\n\n• Full Binary Tree: Every node has 0 or 2 children\n• Complete Binary Tree: All levels filled except possibly the last\n• Perfect Binary Tree: All internal nodes have 2 children and all leaves are at the same level\n• Balanced Binary Tree: Height difference between left and right subtrees ≤ 1\n• Degenerate Tree: Each parent has only one child\n\nThis relates to the current section "${currentSegment.text}" at ${currentSegment.time}.`;
    }

    if (lowerQuestion.includes('difference') && (lowerQuestion.includes('full') || lowerQuestion.includes('complete'))) {
      return `Perfect timing! Based on the lecture at ${currentSegment.time}:\n\n**Full Binary Tree:**\n• Every node has either 0 or 2 children\n• No node has exactly 1 child\n\n**Complete Binary Tree:**\n• All levels are completely filled except possibly the last\n• The last level is filled from left to right\n• Can have nodes with 1 child\n\nThink of it this way: All perfect binary trees are both full and complete, but not all full trees are complete and vice versa.\n\nThis is explained around ${currentSegment.time} in the current section.`;
    }

    if (lowerQuestion.includes('example')) {
      return `Sure! Based on the lecture content at ${currentSegment.time} (${currentSegment.text}):\n\n${currentSegment.content}\n\nIn the Binary Tree diagram shown in the video, you can see:\n\n\`\`\`\n      1\n     / \\\n    2   3\n   / \\   \\\n  4   5   6\n\`\`\`\n\nThis demonstrates:\n• Node 1 (root) has 2 children: 2 and 3\n• Node 2 has 2 children: 4 and 5\n• Node 3 has 1 child: 6\n• Nodes 4, 5, 6 are leaf nodes (no children)\n\nWould you like me to explain more about this section?`;
    }

    return `Based on "${currentSegment.text}" at timestamp ${currentSegment.time}:\n\n${currentSegment.content}\n\n${lowerQuestion.includes('what') ? 'The key concept here is understanding' : 'Your question relates to'} the material currently being covered in the video. The lecture explains this in detail around the ${currentSegment.time} mark.\n\nWould you like me to elaborate on any specific aspect?`;
  };

  const handleQuizAnswer = (quizId: number, answerIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [quizId]: answerIndex });
  };

  const handleCheckAnswer = (quizId: number) => {
    setShowResults({ ...showResults, [quizId]: true });
  };

  return (
    <div className="w-[450px] bg-[#0f1018] border-l border-border flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <h3 className="font-semibold">AI Assistant</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 bg-green-600/20 text-green-400 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            RAG Powered
          </span>
          <button onClick={onClose} className="hover:bg-accent p-1.5 rounded transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="flex border-b border-border">
        {(['chat', 'quiz', 'notes'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-3 capitalize transition-colors relative ${
              activeTab === tab ? 'text-white bg-accent/50' : 'text-muted-foreground hover:text-white'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'chat' && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-sm'
                        : 'bg-card border border-border text-foreground rounded-2xl rounded-tl-sm'
                    } px-4 py-3`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                    <div className="flex items-center justify-between mt-2 gap-3">
                      <span className="text-xs opacity-60">{message.timestamp}</span>
                      {message.sender === 'ai' && (
                        <div className="flex gap-2">
                          <button className="hover:bg-accent p-1 rounded transition-colors">
                            <ThumbsUp size={14} />
                          </button>
                          <button className="hover:bg-accent p-1 rounded transition-colors">
                            <ThumbsDown size={14} />
                          </button>
                          <button className="hover:bg-accent p-1 rounded transition-colors">
                            <Copy size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
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
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question about this lecture..."
                  className="flex-1 bg-card border border-border text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-lg transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                AI responses are generated in real-time based on video content
              </p>
            </div>
          </>
        )}

        {activeTab === 'quiz' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-yellow-400" size={20} />
              <h3 className="font-semibold">Interactive Quiz</h3>
            </div>

            {quizzes.map((quiz, index) => {
              const isAnswered = showResults[quiz.id];
              const selectedAnswer = selectedAnswers[quiz.id];
              const isCorrect = selectedAnswer === quiz.correctAnswer;

              return (
                <div key={quiz.id} className="bg-card/50 border border-border rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-sm font-medium">{quiz.question}</p>
                  </div>

                  <div className="space-y-2 ml-9">
                    {quiz.options.map((option, optionIndex) => {
                      const isSelected = selectedAnswer === optionIndex;
                      const isCorrectAnswer = optionIndex === quiz.correctAnswer;

                      return (
                        <button
                          key={optionIndex}
                          onClick={() => !isAnswered && handleQuizAnswer(quiz.id, optionIndex)}
                          disabled={isAnswered}
                          className={`w-full text-left px-4 py-2.5 rounded-lg border transition-colors ${
                            isAnswered
                              ? isCorrectAnswer
                                ? 'bg-green-600/20 border-green-600 text-green-400'
                                : isSelected
                                ? 'bg-red-600/20 border-red-600 text-red-400'
                                : 'bg-card border-border text-muted-foreground'
                              : isSelected
                              ? 'bg-primary/20 border-primary text-white'
                              : 'bg-card border-border hover:border-primary'
                          }`}
                        >
                          <span className="text-sm">{option}</span>
                          {isAnswered && isCorrectAnswer && (
                            <span className="ml-2">✓</span>
                          )}
                          {isAnswered && !isCorrectAnswer && isSelected && (
                            <span className="ml-2">✗</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {!isAnswered && selectedAnswer !== undefined && (
                    <button
                      onClick={() => handleCheckAnswer(quiz.id)}
                      className="ml-9 mt-3 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-sm transition-colors"
                    >
                      Check Answer
                    </button>
                  )}

                  {isAnswered && (
                    <div className={`ml-9 mt-3 p-3 rounded-lg text-sm ${
                      isCorrect ? 'bg-green-600/10 text-green-400' : 'bg-red-600/10 text-red-400'
                    }`}>
                      <p className="font-medium mb-1">
                        {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                      </p>
                      <p className="text-xs opacity-90">{quiz.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}

            <button className="w-full py-3 bg-primary hover:bg-primary/90 rounded-lg font-medium transition-colors">
              Generate More Questions
            </button>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4">
              <h3 className="font-semibold mb-2">AI-Generated Notes</h3>
              <p className="text-sm text-muted-foreground">Automatically generated from lecture content</p>
            </div>

            <div className="space-y-4">
              <div className="bg-card/50 border border-border rounded-lg p-4">
                <h4 className="font-medium mb-2 text-primary">Binary Trees - Overview</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Tree data structure with hierarchical organization</li>
                  <li>• Each node has at most 2 children (left and right)</li>
                  <li>• Root node at the top of the hierarchy</li>
                  <li>• Leaf nodes have no children</li>
                </ul>
              </div>

              <div className="bg-card/50 border border-border rounded-lg p-4">
                <h4 className="font-medium mb-2 text-primary">Properties</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Maximum nodes at level L = 2^L</li>
                  <li>• Maximum nodes in tree of height H = 2^(H+1) - 1</li>
                  <li>• Minimum height for N nodes = log₂(N+1) - 1</li>
                </ul>
              </div>

              <div className="bg-card/50 border border-border rounded-lg p-4">
                <h4 className="font-medium mb-2 text-primary">Types Covered</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Full Binary Tree: 0 or 2 children per node</li>
                  <li>• Complete Binary Tree: All levels filled except last</li>
                  <li>• Perfect Binary Tree: All leaves at same level</li>
                </ul>
              </div>

              <button className="w-full py-3 bg-primary hover:bg-primary/90 rounded-lg font-medium transition-colors">
                Export Notes as PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
