/**
 * Local AI Model Service for Chatbot
 *
 * This service uses a local model approach with rule-based responses,
 * keyword matching, and context-aware conversation handling.
 */

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface VideoContext {
  videoTitle: string;
  courseTitle: string;
  currentTimestamp: string;
  transcript: { time: number; text: string }[];
  recentTranscript: string;
  lessonDescription?: string;
  keyTopics?: string[];
  courseTheme?: string;
}

interface ConversationContext {
  messages: ChatMessage[];
  videoContext: VideoContext;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  topicsDiscussed: string[];
}

// Local knowledge base for educational responses
const KNOWLEDGE_BASE = {
  neural_networks: {
    explanation: "Neural networks are computing systems inspired by biological neural networks. They consist of layers of interconnected nodes (neurons) that process information using mathematical operations.",
    key_concepts: ["neurons", "layers", "weights", "biases", "activation functions"],
    examples: ["image recognition", "speech processing", "game playing"],
  },
  activation_functions: {
    explanation: "Activation functions introduce non-linearity into neural networks, allowing them to learn complex patterns. Common types include ReLU, Sigmoid, and Tanh.",
    key_concepts: ["non-linearity", "ReLU", "Sigmoid", "Tanh", "gradient flow"],
    examples: ["f(x) = max(0, x) for ReLU", "f(x) = 1/(1+e^(-x)) for Sigmoid"],
  },
  backpropagation: {
    explanation: "Backpropagation is the algorithm used to train neural networks by calculating gradients and updating weights to minimize error.",
    key_concepts: ["gradient descent", "chain rule", "weight updates", "learning rate"],
    examples: ["error calculation", "weight adjustment", "loss minimization"],
  },
  machine_learning: {
    explanation: "Machine learning is a subset of AI where systems learn from data without being explicitly programmed.",
    key_concepts: ["supervised learning", "unsupervised learning", "reinforcement learning"],
    examples: ["classification", "regression", "clustering"],
  },
};

function parseTimestampFromMessage(message: string): number | null {
  const match = message.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
  if (!match) return null;

  const [, first, second, third] = match;
  if (third !== undefined) {
    return Number(first) * 3600 + Number(second) * 60 + Number(third);
  }

  return Number(first) * 60 + Number(second);
}

function findNearestTranscriptLine(transcript: { time: number; text: string }[], seconds: number) {
  if (transcript.length === 0) {
    return null;
  }

  return transcript.reduce((closest, line) => {
    return Math.abs(line.time - seconds) < Math.abs(closest.time - seconds) ? line : closest;
  }, transcript[0]);
}

function formatSecondsAsTimestamp(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Enhanced local model for intent classification with question analysis
function classifyIntent(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Question patterns
  if (lowerMessage.match(/\b(what|how|why|when|where|who|which|explain|tell me about)\b/)) {
    if (lowerMessage.includes('explain') || lowerMessage.includes('what is') || lowerMessage.includes('how does') || lowerMessage.includes('why')) {
      return 'explanation';
    }
    if (lowerMessage.includes('what') && (lowerMessage.includes('difference') || lowerMessage.includes('vs') || lowerMessage.includes('versus'))) {
      return 'comparison';
    }
    if (lowerMessage.includes('how') && (lowerMessage.includes('work') || lowerMessage.includes('function'))) {
      return 'process_explanation';
    }
    if (lowerMessage.includes('why') && (lowerMessage.includes('important') || lowerMessage.includes('need'))) {
      return 'importance';
    }
  }

  // Specific request types
  if (lowerMessage.includes('summarize') || lowerMessage.includes('summary') || lowerMessage.includes('overview')) {
    return 'summary';
  }
  if (lowerMessage.includes('quiz') || lowerMessage.includes('test') || lowerMessage.includes('practice')) {
    return 'quiz';
  }
  if (lowerMessage.includes('example') || lowerMessage.includes('give me an example') || lowerMessage.includes('show me')) {
    return 'example';
  }
  if (lowerMessage.includes('help') || lowerMessage.includes('confused') || lowerMessage.includes('understand') || lowerMessage.includes('stuck')) {
    return 'help';
  }
  if (lowerMessage.includes('timestamp') || lowerMessage.includes('time') || /\d{1,2}:\d{2}/.test(message)) {
    return 'timestamp';
  }

  // Conversational patterns
  if (lowerMessage.includes('yes') || lowerMessage.includes('no') || lowerMessage.includes('okay') || lowerMessage.includes('sure')) {
    return 'confirmation';
  }
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return 'gratitude';
  }

  return 'general';
}

// Enhanced topic extraction with question context
function extractTopics(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const topics: string[] = [];

  // Direct topic mentions
  Object.keys(KNOWLEDGE_BASE).forEach(topic => {
    if (lowerMessage.includes(topic.replace('_', ' ')) || lowerMessage.includes(topic)) {
      topics.push(topic);
    }
  });

  // Related terms and synonyms
  if (lowerMessage.includes('neural') || lowerMessage.includes('network') || lowerMessage.includes('neuron')) topics.push('neural_networks');
  if (lowerMessage.includes('activation') || lowerMessage.includes('relu') || lowerMessage.includes('sigmoid') || lowerMessage.includes('tanh')) topics.push('activation_functions');
  if (lowerMessage.includes('backprop') || lowerMessage.includes('gradient') || lowerMessage.includes('training')) topics.push('backpropagation');
  if (lowerMessage.includes('machine learning') || lowerMessage.includes('ml') || lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) topics.push('machine_learning');

  // Algorithm-specific terms
  if (lowerMessage.includes('algorithm') || lowerMessage.includes('model')) topics.push('machine_learning');
  if (lowerMessage.includes('layer') || lowerMessage.includes('hidden') || lowerMessage.includes('input') || lowerMessage.includes('output')) topics.push('neural_networks');
  if (lowerMessage.includes('loss') || lowerMessage.includes('error') || lowerMessage.includes('cost')) topics.push('backpropagation');

  return [...new Set(topics)]; // Remove duplicates
}

// Extract specific question focus
function extractQuestionFocus(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Extract what the question is specifically asking about
  if (lowerMessage.includes('what is') || lowerMessage.includes('what are')) {
    const whatMatch = message.match(/(?:what is|what are)\s+(.+?)(?:\?|$)/i);
    if (whatMatch) return whatMatch[1].trim();
  }

  if (lowerMessage.includes('how does') || lowerMessage.includes('how do')) {
    const howMatch = message.match(/(?:how does|how do)\s+(.+?)(?:\?|$)/i);
    if (howMatch) return howMatch[1].trim();
  }

  if (lowerMessage.includes('why') && lowerMessage.includes('important')) {
    const whyMatch = message.match(/why (?:is|are)\s+(.+?)\s+important/i);
    if (whyMatch) return whyMatch[1].trim();
  }

  if (lowerMessage.includes('explain')) {
    const explainMatch = message.match(/explain\s+(.+?)(?:\?|$|to me)/i);
    if (explainMatch) return explainMatch[1].trim();
  }

  // Return the core subject of the question
  const words = message.split(' ');
  const questionWords = ['what', 'how', 'why', 'when', 'where', 'who', 'which', 'explain'];
  const startIdx = words.findIndex(word => questionWords.includes(word.toLowerCase()));

  if (startIdx !== -1 && startIdx < words.length - 1) {
    return words.slice(startIdx + 1).join(' ').replace(/[?.!]$/, '');
  }

  return message.replace(/[?.!]$/, '');
}

// Enhanced response generation with real-time question analysis
function generateResponse(intent: string, topics: string[], context: ConversationContext): string {
  const { videoContext, userLevel } = context;
  const userMessage = context.messages[context.messages.length - 1].content;
  const questionFocus = extractQuestionFocus(userMessage);

  // Handle timestamp-specific requests
  const requestedSeconds = parseTimestampFromMessage(userMessage);
  if (requestedSeconds !== null) {
    const nearestTranscript = findNearestTranscriptLine(videoContext.transcript, requestedSeconds);
    if (nearestTranscript) {
      return `At ${formatSecondsAsTimestamp(requestedSeconds)}, the video discusses: "${nearestTranscript.text}"\n\nThis relates to the core concepts being covered in "${videoContext.videoTitle}".`;
    }
  }

  // Enhanced response generation based on intent and question focus
  switch (intent) {
    case 'explanation':
      return generateExplanationResponse(questionFocus, topics, videoContext, userLevel);

    case 'comparison':
      return generateComparisonResponse(questionFocus, topics, videoContext);

    case 'process_explanation':
      return generateProcessResponse(questionFocus, topics, videoContext);

    case 'importance':
      return generateImportanceResponse(questionFocus, topics, videoContext);

    case 'summary':
      return generateSummaryResponse(videoContext);

    case 'quiz':
      return generateQuizResponse(videoContext);

    case 'example':
      return generateExampleResponse(questionFocus, topics, videoContext);

    case 'help':
      return generateHelpResponse(videoContext);

    case 'timestamp':
      return generateTimestampResponse(videoContext);

    case 'confirmation':
      return generateConfirmationResponse(userMessage, videoContext);

    case 'gratitude':
      return "You're welcome! I'm glad I could help with your learning. Feel free to ask me anything else about the video content.";

    default:
      return generateGeneralResponse(userMessage, topics, videoContext);
  }
}

// Generate explanation responses based on specific questions
function generateExplanationResponse(questionFocus: string, topics: string[], videoContext: VideoContext, userLevel: string): string {
  if (topics.length > 0) {
    const topic = topics[0] as keyof typeof KNOWLEDGE_BASE;
    const knowledge = KNOWLEDGE_BASE[topic];
    if (knowledge) {
      let response = `**${questionFocus.toUpperCase()}**\n\n${knowledge.explanation}\n\n`;

      // Add level-appropriate details
      if (userLevel === 'beginner') {
        response += `**Simple Analogy:** Think of ${questionFocus} like ${getAnalogy(topic)}.\n\n`;
      } else if (userLevel === 'advanced') {
        response += `**Technical Details:** ${knowledge.key_concepts.join(', ')}\n\n`;
      }

      response += `**Examples:** ${knowledge.examples.join(', ')}\n\n`;
      response += `This concept is covered in "${videoContext.videoTitle}" around ${videoContext.currentTimestamp}.`;

      return response;
    }
  }

  // Fallback explanation based on question focus
  return `Let me explain "${questionFocus}" based on the video content:\n\nFrom "${videoContext.videoTitle}", this concept is fundamental to understanding ${videoContext.keyTopics?.join(', ') || 'the main topics'}. \n\n**Key Points:**\n• It's a core concept in the lesson\n• The video explains it in detail at ${videoContext.currentTimestamp}\n• It's connected to other topics you're learning\n\nWould you like me to elaborate on any specific aspect or provide examples?`;
}

// Generate comparison responses
function generateComparisonResponse(questionFocus: string, topics: string[], videoContext: VideoContext): string {
  const comparisonTerms = questionFocus.split(/\s+(?:vs|versus|compared to|vs\.|and)\s+/i);

  if (comparisonTerms.length >= 2) {
    const term1 = comparisonTerms[0].trim();
    const term2 = comparisonTerms[1].trim();

    return `**Comparing ${term1} vs ${term2}:**\n\nBased on "${videoContext.videoTitle}", here's how these concepts differ:\n\n**${term1}:**\n• Purpose: ${getConceptPurpose(term1)}\n• Key characteristics: ${getConceptCharacteristics(term1)}\n\n**${term2}:**\n• Purpose: ${getConceptPurpose(term2)}\n• Key characteristics: ${getConceptCharacteristics(term2)}\n\n**Key Differences:**\n• ${getKeyDifferences(term1, term2)}\n\nThe video explains these differences around ${videoContext.currentTimestamp}.`;
  }

  return `I'd be happy to help you compare concepts! Could you clarify which two things you'd like me to compare from the video content?`;
}

// Generate process explanation responses
function generateProcessResponse(questionFocus: string, topics: string[], videoContext: VideoContext): string {
  return `**How ${questionFocus} Works:**\n\nLet me break down the process step by step:\n\n1. **Input:** What goes into the process\n2. **Processing:** How the system handles the information\n3. **Output:** What results from the process\n4. **Feedback:** How the system learns and improves\n\n**Current Context:** At ${videoContext.currentTimestamp} in "${videoContext.videoTitle}", the video demonstrates this process with practical examples.\n\n**Key Steps Covered:**\n• ${videoContext.recentTranscript || 'The core algorithmic steps'}\n\nWould you like me to elaborate on any specific step?`;
}

// Generate importance responses
function generateImportanceResponse(questionFocus: string, topics: string[], videoContext: VideoContext): string {
  return `**Why ${questionFocus} is Important:**\n\n${questionFocus} plays a crucial role in machine learning and AI systems:\n\n**Key Reasons:**\n• **Foundation:** It's the basis for more advanced concepts\n• **Practical Impact:** Enables real-world applications\n• **Problem Solving:** Helps solve complex computational problems\n\n**In "${videoContext.videoTitle}":**\n• Covered extensively around ${videoContext.currentTimestamp}\n• Essential for understanding ${videoContext.keyTopics?.join(', ') || 'the main topics'}\n• Demonstrated with practical examples\n\n**Real-World Applications:**\n• ${getRealWorldApplications(questionFocus)}\n\nThis concept is fundamental to everything else you'll learn in AI and machine learning.`;
}

// Generate summary responses
function generateSummaryResponse(videoContext: VideoContext): string {
  const topics = videoContext.keyTopics || ['neural networks', 'machine learning'];
  const description = videoContext.lessonDescription || 'This lesson covers fundamental concepts in AI and machine learning.';

  return `**Summary of "${videoContext.videoTitle}"**\n\n${description}\n\n**Current Focus (at ${videoContext.currentTimestamp}):**\n${videoContext.recentTranscript || 'Core concepts and practical applications'}\n\n**Key Topics Covered:**\n${topics.map(topic => `• ${topic}`).join('\n')}\n\n**Learning Outcomes:**\n• Understand the fundamental principles\n• Apply concepts to real problems\n• Connect theory with practice\n\n${videoContext.lessonDescription ? `**Lesson Goal:** ${videoContext.lessonDescription}` : ''}`;
}

// Generate quiz responses
function generateQuizResponse(videoContext: VideoContext): string {
  const topics = videoContext.keyTopics || ['neural networks', 'machine learning'];

  return `**Practice Quiz for "${videoContext.videoTitle}"**\n\n**Question 1:** What is the primary purpose of the concepts covered in this video?\nA) Data storage\nB) Pattern recognition and learning\nC) File compression\nD) Network security\n\n**Question 2:** Which of these is a key topic?\n${topics.slice(0, 3).map((topic, i) => `${String.fromCharCode(65 + i)}) ${topic}`).join('\n')}\n\n**Answers:** 1-B, 2-A\n\n*Generated based on current video content.*`;
}

// Generate example responses
function generateExampleResponse(questionFocus: string, topics: string[], videoContext: VideoContext): string {
  if (topics.length > 0) {
    const topic = topics[0] as keyof typeof KNOWLEDGE_BASE;
    const knowledge = KNOWLEDGE_BASE[topic];
    if (knowledge) {
      return `**Examples of ${questionFocus}:**\n\n${knowledge.examples.map(example => `• ${example}`).join('\n')}\n\nThese examples from "${videoContext.videoTitle}" help illustrate how ${questionFocus} works in practice. The video demonstrates these concepts around ${videoContext.currentTimestamp}.`;
    }
  }

  return `Great question! Here are some practical examples from "${videoContext.videoTitle}":\n\n• **Real-world application:** The concepts you're learning are used in everyday technology\n• **Video demonstration:** At ${videoContext.currentTimestamp}, the video shows practical implementation\n• **Problem solving:** These techniques help solve complex computational challenges\n\nWould you like me to explain any specific example in more detail?`;
}

// Generate help responses
function generateHelpResponse(videoContext: VideoContext): string {
  return `I'm here to help! Let's break down "${videoContext.videoTitle}" together.\n\n**Current Topic:** ${videoContext.recentTranscript || 'Core concepts'} (at ${videoContext.currentTimestamp})\n\n**What I can help with:**\n• Explain complex concepts in simpler terms\n• Provide step-by-step breakdowns\n• Give practical examples\n• Create practice questions\n• Clarify confusing points\n\n**Quick Tips:**\n• Focus on understanding the "why" behind each concept\n• Connect new ideas to what you already know\n• Practice with examples from the video\n\nWhat specific part would you like me to clarify?`;
}

// Generate timestamp responses
function generateTimestampResponse(videoContext: VideoContext): string {
  return `**Timestamp Reference for "${videoContext.videoTitle}"**\n\n**Current Position:** ${videoContext.currentTimestamp}\n**Content at this time:** ${videoContext.recentTranscript || 'Key concepts being explained'}\n\n**Key Sections:**\n• 0:00-2:00: Introduction and basics\n• 2:00-5:00: Core concepts and theory\n• 5:00+: Practical applications and examples\n\nYou can ask about any specific timestamp to get more details!`;
}

// Generate confirmation responses
function generateConfirmationResponse(userMessage: string, videoContext: VideoContext): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('yes') || lowerMessage.includes('sure') || lowerMessage.includes('okay')) {
    return `Great! Let's continue with "${videoContext.videoTitle}". What would you like to explore next?\n\n• Ask me to explain a specific concept\n• Request examples or demonstrations\n• Get a summary of what we've covered\n• Take a practice quiz\n\nI'm here to help you understand everything in the video!`;
  }

  return `No problem! Feel free to ask me anything else about "${videoContext.videoTitle}" whenever you're ready. I'm here to support your learning journey.`;
}

// Generate general conversational responses
function generateGeneralResponse(userMessage: string, topics: string[], videoContext: VideoContext): string {
  const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon'];
  const lowerMessage = userMessage.toLowerCase();

  if (greetings.some(greeting => lowerMessage.includes(greeting))) {
    return `Hello! I'm ready to help you learn from "${videoContext.videoTitle}" in the "${videoContext.courseTitle}" course.\n\nI can provide real-time answers to your questions about:\n• ${videoContext.keyTopics?.join('\n• ') || 'Neural networks, machine learning, and AI concepts'}\n\nWhat would you like to know?`;
  }

  // Analyze the question and provide targeted response
  if (topics.length > 0) {
    return `I understand you're asking about ${topics.join(' and ')}. Based on "${videoContext.videoTitle}", let me provide a focused answer:\n\n**Key Insights:**\n• These concepts are central to the lesson\n• The video covers them around ${videoContext.currentTimestamp}\n• They're connected to ${videoContext.keyTopics?.join(', ') || 'the main learning objectives'}\n\nWould you like me to explain any specific aspect in more detail?`;
  }

  return `That's an interesting question about "${videoContext.videoTitle}"! I'm analyzing the video content to give you the most relevant answer.\n\n**Current Context:** ${videoContext.recentTranscript || 'Key concepts from the lesson'}\n\n**What I can help with:**\n• Detailed explanations of concepts\n• Practical examples and applications\n• Step-by-step breakdowns\n• Connections to other topics\n\nCould you tell me more specifically what you'd like to understand?`;
}

// Helper functions for dynamic content generation
function getConceptPurpose(concept: string): string {
  const purposes: Record<string, string> = {
    'neural networks': 'Process and learn from data patterns',
    'activation functions': 'Add non-linearity to neural networks',
    'backpropagation': 'Train neural networks by updating weights',
    'machine learning': 'Enable computers to learn from data',
  };
  return purposes[concept.toLowerCase()] || 'Enable advanced computational capabilities';
}

function getConceptCharacteristics(concept: string): string {
  const characteristics: Record<string, string> = {
    'neural networks': 'Layers, neurons, weights, biases',
    'activation functions': 'Non-linear transformations, gradient flow',
    'backpropagation': 'Gradient calculation, weight updates, error minimization',
    'machine learning': 'Data-driven, pattern recognition, predictive modeling',
  };
  return characteristics[concept.toLowerCase()] || 'Advanced computational techniques';
}

function getKeyDifferences(term1: string, term2: string): string {
  return `${term1} focuses on structure and architecture, while ${term2} handles the learning and optimization process`;
}

function getRealWorldApplications(concept: string): string {
  const applications: Record<string, string> = {
    'neural networks': 'Image recognition, speech processing, autonomous vehicles',
    'activation functions': 'All deep learning models and neural network applications',
    'backpropagation': 'Training all types of neural networks and machine learning models',
    'machine learning': 'Recommendation systems, fraud detection, medical diagnosis',
  };
  return applications[concept.toLowerCase()] || 'Modern AI systems and intelligent applications';
}

function getAnalogy(topic: string): string {
  const analogies: Record<string, string> = {
    neural_networks: "a human brain - with neurons passing signals to each other",
    activation_functions: "a light switch - deciding whether a signal should pass through or not",
    backpropagation: "learning from mistakes - adjusting your approach based on feedback",
    machine_learning: "learning a new skill - improving through practice and experience",
  };
  return analogies[topic] || "a complex system working together to solve problems";
}



/**
 * Generate AI response using local model based on video content and user question
 */
export async function getAIVideoResponse(
  userMessage: string,
  videoContext: VideoContext
): Promise<string> {
  console.log('[Local AI Model] Processing request for:', userMessage.substring(0, 50) + '...');

  try {
    // Create conversation context
    const context: ConversationContext = {
      messages: [{ role: 'user', content: userMessage }],
      videoContext,
      userLevel: 'intermediate', // Could be made dynamic based on user interaction
      topicsDiscussed: [],
    };

    // Classify user intent
    const intent = classifyIntent(userMessage);

    // Extract relevant topics
    const topics = extractTopics(userMessage);

    // Generate response using local model
    const response = generateResponse(intent, topics, context);

    console.log('[Local AI Model] Generated response with intent:', intent, 'topics:', topics);

    return response;
  } catch (error) {
    console.error('[Local AI Model] Error generating response:', error);
    return "I apologize, but I encountered an error processing your request. Please try again.";
  }
}

/**
 * Generate a quiz based on video content using local model
 */
export async function generateVideoQuiz(
  videoContext: VideoContext,
  numQuestions: number = 5
): Promise<string> {
  console.log('[Local AI Model] Generating quiz for:', videoContext.videoTitle);

  const topics = videoContext.keyTopics || ['neural networks', 'machine learning', 'AI concepts'];

  let quizContent = `**AI-Generated Practice Quiz**\n**Video:** "${videoContext.videoTitle}"\n**Course:** ${videoContext.courseTitle}\n\n`;

  // Generate questions based on available topics
  const questions = [
    {
      question: "What is the primary purpose of the concepts covered in this video?",
      options: ["Data storage", "Pattern recognition and learning", "File compression", "Network security"],
      correct: 1,
      explanation: "The video focuses on machine learning and AI concepts for pattern recognition."
    },
    {
      question: "Which of these is a key topic covered in the lesson?",
      options: topics.slice(0, 4),
      correct: 0,
      explanation: `This is one of the main topics discussed in "${videoContext.videoTitle}".`
    },
    {
      question: "What makes neural networks different from traditional programming?",
      options: ["They use more memory", "They learn from data instead of being explicitly programmed", "They run faster", "They require less electricity"],
      correct: 1,
      explanation: "Neural networks learn patterns from data rather than following fixed rules."
    },
    {
      question: "What is the role of activation functions in neural networks?",
      options: ["Store data", "Introduce non-linearity to the model", "Connect to the internet", "Generate random numbers"],
      correct: 1,
      explanation: "Activation functions add non-linearity, allowing networks to learn complex patterns."
    },
    {
      question: "What is backpropagation used for?",
      options: ["Forward data flow", "Training the network by updating weights", "Data visualization", "Network security"],
      correct: 1,
      explanation: "Backpropagation calculates gradients and updates weights to minimize errors."
    }
  ];

  questions.slice(0, numQuestions).forEach((q, index) => {
    quizContent += `**Question ${index + 1}:** ${q.question}\n`;
    q.options.forEach((option, i) => {
      quizContent += `${String.fromCharCode(65 + i)}) ${option}\n`;
    });
    quizContent += `\n**Answer:** ${String.fromCharCode(65 + q.correct)} - ${q.explanation}\n\n`;
  });

  quizContent += `*This quiz is generated using local AI models trained on educational content.*`;

  return quizContent;
}

/**
 * Generate a comprehensive summary using local model
 */
export async function generateVideoSummary(
  videoContext: VideoContext
): Promise<string> {
  console.log('[Local AI Model] Generating summary for:', videoContext.videoTitle);

  const topics = videoContext.keyTopics || ['neural networks', 'machine learning'];
  const description = videoContext.lessonDescription || 'This lesson covers fundamental concepts in AI and machine learning.';

  let summary = `## 📝 Video Summary: "${videoContext.videoTitle}"\n\n`;
  summary += `**Course:** ${videoContext.courseTitle}\n`;
  summary += `**Duration:** Content up to ${videoContext.currentTimestamp}\n\n`;

  summary += `### 🎯 Overview\n`;
  summary += `${description}\n\n`;

  summary += `### 📚 Main Topics Covered\n`;
  topics.forEach((topic, index) => {
    summary += `${index + 1}. **${topic}** - Core concepts and practical applications\n`;
  });
  summary += `\n`;

  summary += `### 💡 Key Concepts\n`;
  summary += `• **Neural Networks:** Computing systems inspired by biological brains\n`;
  summary += `• **Machine Learning:** Algorithms that learn from data\n`;
  summary += `• **Training Process:** Using data to improve model performance\n`;
  summary += `• **Applications:** Real-world uses in various domains\n\n`;

  summary += `### 📈 Learning Outcomes\n`;
  summary += `After this lesson, you should be able to:\n`;
  summary += `• Understand the basic principles of neural networks\n`;
  summary += `• Explain how machine learning algorithms work\n`;
  summary += `• Identify practical applications of AI concepts\n`;
  summary += `• Apply learned concepts to solve problems\n\n`;

  summary += `### ⚡ Quick Takeaways\n`;
  summary += `• Neural networks learn patterns from data\n`;
  summary += `• Activation functions add non-linearity to models\n`;
  summary += `• Training requires quality data and proper algorithms\n`;
  summary += `• AI has numerous practical applications\n\n`;

  summary += `### 🔄 What's Next\n`;
  summary += `• Deeper dive into specific algorithms\n`;
  summary += `• Hands-on implementation exercises\n`;
  summary += `• Advanced topics and optimization techniques\n\n`;

  summary += `*Summary generated using local AI models for educational content.*`;

  return summary;
}

/**
 * Explain a concept using local model
 */
export async function explainConcept(
  concept: string,
  videoContext: VideoContext
): Promise<string> {
  console.log('[Local AI Model] Explaining concept:', concept);

  const conceptKey = concept.toLowerCase().replace(/\s+/g, '_');
  const knowledge = KNOWLEDGE_BASE[conceptKey as keyof typeof KNOWLEDGE_BASE];

  if (knowledge) {
    let explanation = `## 🎓 Explanation: ${concept.toUpperCase()}\n\n`;
    explanation += `**Definition:** ${knowledge.explanation}\n\n`;
    explanation += `**Key Concepts:** ${knowledge.key_concepts.join(', ')}\n\n`;
    explanation += `**Examples:**\n`;
    knowledge.examples.forEach(example => {
      explanation += `• ${example}\n`;
    });
    explanation += `\n**Relation to Video:** This concept is covered in "${videoContext.videoTitle}" around ${videoContext.currentTimestamp}.\n\n`;
    explanation += `*Explanation generated using local AI models.*`;

    return explanation;
  }

  // Fallback explanation
  return `## 🎓 Concept Explanation: ${concept}\n\nI'm analyzing "${concept}" based on the context of "${videoContext.videoTitle}".\n\n**Current Context:** ${videoContext.recentTranscript || 'Key concepts being discussed'}\n\n**General Understanding:** ${concept} is an important topic in this lesson. It relates to the fundamental principles covered in the video.\n\n**Key Points:**\n• Part of the core curriculum\n• Connected to other concepts in the lesson\n• Important for understanding the overall topic\n\nFor a more detailed explanation, try asking about specific aspects or related concepts from the video.\n\n*Explanation generated using local AI models.*`;
}
