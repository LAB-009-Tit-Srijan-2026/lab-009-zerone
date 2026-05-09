export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
  description?: string;
  keyTopics?: string[];
  quiz?: QuizQuestion[];
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  theme: string;
  lessons: number;
  duration: string;
  icon: string;
  gradient: string;
  instructor: string;
  rating: number;
  students: number;
  modules: Module[];
  skills: string[];
  learningObjectives?: string[];
}

export const coursesData: Course[] = [
  {
    id: '1',
    title: 'Advanced Machine Learning',
    description: 'Master deep learning, neural networks, and AI algorithms with hands-on projects',
    category: 'AI & ML',
    theme: 'Artificial Intelligence & Deep Learning',
    lessons: 10,
    duration: '8 weeks',
    icon: '🤖',
    gradient: 'from-purple-600 to-blue-600',
    instructor: 'Grant Sanderson (3Blue1Brown)',
    rating: 4.9,
    students: 12450,
    skills: ['Deep Learning', 'Neural Networks', 'Python', 'TensorFlow', 'PyTorch', 'Computer Vision'],
    learningObjectives: [
      'Understand the mathematics behind neural networks',
      'Build and train deep learning models',
      'Apply CNNs for image recognition',
      'Implement RNNs for sequence prediction',
      'Master attention mechanisms and transformers'
    ],
    modules: [
      {
        title: 'Introduction to Neural Networks',
        lessons: [
          {
            id: 1,
            title: 'But what is a neural network?',
            duration: '19:13',
            videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk',
            completed: true,
            description: 'In this foundational video, Grant Sanderson from 3Blue1Brown introduces neural networks through the practical example of handwritten digit recognition (MNIST dataset). You\'ll learn how neurons are organized into layers, how weights and biases control signal flow, and how activation functions introduce non-linearity. The video uses beautiful visualizations to explain how a network with multiple hidden layers can learn to recognize patterns and classify images. By the end, you\'ll understand the basic architecture of neural networks and the role of each component.',
            keyTopics: ['Neurons', 'Layers', 'Weights', 'Biases', 'Pattern Recognition', 'MNIST', 'Activation Functions', 'Hidden Layers', 'Neural Network Architecture'],
            quiz: [
              {
                id: 1,
                question: 'What is the primary purpose of weights in a neural network?',
                options: [
                  'To slow down computation',
                  'To control the strength of connections between neurons',
                  'To store input data',
                  'To display the network structure'
                ],
                correctAnswer: 1,
                explanation: 'Weights determine how strongly each input affects the output of a neuron. They are adjusted during training to help the network learn patterns.'
              },
              {
                id: 2,
                question: 'What role do activation functions play in neural networks?',
                options: [
                  'They initialize the network',
                  'They introduce non-linearity, allowing networks to learn complex patterns',
                  'They only work with the input layer',
                  'They replace weights in the network'
                ],
                correctAnswer: 1,
                explanation: 'Activation functions like ReLU and sigmoid add non-linearity to neural networks, enabling them to learn and represent complex, non-linear relationships in data.'
              },
              {
                id: 3,
                question: 'What is MNIST in the context of this video?',
                options: [
                  'A type of activation function',
                  'A dataset of handwritten digits used for training and testing',
                  'A layer type in neural networks',
                  'The formula for calculating gradients'
                ],
                correctAnswer: 1,
                explanation: 'MNIST is a classic dataset containing 70,000 images of handwritten digits (0-9), widely used to teach and benchmark neural networks.'
              },
              {
                id: 4,
                question: 'How many input neurons are typically needed for MNIST digit recognition?',
                options: [
                  '28',
                  '256',
                  '784 (28x28 pixels)',
                  '10 (one for each digit)'
                ],
                correctAnswer: 2,
                explanation: 'MNIST images are 28x28 pixels, so 28 × 28 = 784 input neurons are needed (one for each pixel).'
              }
            ]
          },
          {
            id: 2,
            title: 'Gradient descent, how neural networks learn',
            duration: '21:01',
            videoUrl: 'https://www.youtube.com/watch?v=IHZwWFHWa-w',
            completed: true,
            description: 'This video explains gradient descent, the fundamental optimization algorithm that enables neural networks to learn. You\'ll discover how to measure network performance using a cost function, understand the mathematical concept of gradients, and learn how networks take small steps in the direction that reduces cost. Grant Sanderson visualizes the cost landscape as a multi-dimensional surface, showing how gradient descent navigates this terrain. You\'ll also learn about critical concepts like learning rate, which controls step size, and understand why choosing the right learning rate is crucial for efficient training.',
            keyTopics: ['Cost Function', 'Gradient', 'Learning Rate', 'Optimization', 'Convergence', 'Minima', 'Loss Function', 'Descent Direction'],
            quiz: [
              {
                id: 1,
                question: 'What is a cost function in neural networks?',
                options: [
                  'The amount of money spent on training',
                  'A function that measures the difference between predicted and actual outputs',
                  'The number of neurons in the network',
                  'The time taken to train the model'
                ],
                correctAnswer: 1,
                explanation: 'A cost function (also called loss function) quantifies how wrong the network\'s predictions are. Common examples include Mean Squared Error (MSE) and Cross-Entropy Loss.'
              },
              {
                id: 2,
                question: 'What does the gradient tell us in gradient descent?',
                options: [
                  'The exact minimum of the cost function',
                  'The direction of steepest increase of the cost function',
                  'How many parameters the network has',
                  'Whether the network has converged'
                ],
                correctAnswer: 1,
                explanation: 'The gradient is a vector pointing in the direction of steepest increase. We move in the opposite direction to decrease the cost function.'
              },
              {
                id: 3,
                question: 'What is the learning rate?',
                options: [
                  'How fast you learn the course material',
                  'The step size used when updating weights in gradient descent',
                  'The percentage of data used for training',
                  'How many epochs to train for'
                ],
                correctAnswer: 1,
                explanation: 'The learning rate controls how large each weight update step is. Too small, and training is slow; too large, and the algorithm may miss the minimum.'
              },
              {
                id: 4,
                question: 'What happens if the learning rate is too high?',
                options: [
                  'The network trains faster and better',
                  'The algorithm may overshoot the minimum and diverge',
                  'It has no effect on training',
                  'The cost function becomes linear'
                ],
                correctAnswer: 1,
                explanation: 'A high learning rate can cause the algorithm to overshoot the minimum, potentially diverging or oscillating around it rather than converging.'
              }
            ]
          },
          {
            id: 3,
            title: 'What is backpropagation really doing?',
            duration: '13:54',
            videoUrl: 'https://www.youtube.com/watch?v=Ilg3gGewQ5U',
            completed: true,
            description: 'Backpropagation is the algorithm that makes neural networks practical and efficient. This video demystifies backpropagation by showing how it efficiently computes the gradient of the cost function using the chain rule from calculus. You\'ll learn how errors are propagated backwards through the network, from output to input layer, calculating how sensitive each weight is to changes. The visualization clearly shows how each weight\'s contribution to the final error is computed through a chain of partial derivatives. This deep understanding helps you appreciate why backpropagation is one of the most important algorithms in machine learning.',
            keyTopics: ['Chain Rule', 'Error Propagation', 'Weight Updates', 'Calculus', 'Gradients', 'Partial Derivatives', 'Backpropagation Algorithm'],
            quiz: [
              {
                id: 1,
                question: 'What mathematical principle underlies backpropagation?',
                options: [
                  'Linear algebra',
                  'The chain rule from calculus',
                  'Probability theory',
                  'Graph theory'
                ],
                correctAnswer: 1,
                explanation: 'Backpropagation fundamentally relies on the chain rule, which allows us to compute derivatives of composite functions by multiplying partial derivatives.'
              },
              {
                id: 2,
                question: 'Why is backpropagation more efficient than computing gradients numerically?',
                options: [
                  'It requires less computer memory',
                  'It computes all gradients in a single forward-backward pass',
                  'It only updates weights once per epoch',
                  'It uses simpler mathematical operations'
                ],
                correctAnswer: 1,
                explanation: 'Backpropagation computes all gradients efficiently in one backward pass, whereas numerical differentiation would require separate forward passes for each parameter.'
              },
              {
                id: 3,
                question: 'In backpropagation, errors flow in which direction?',
                options: [
                  'From input to output layer',
                  'From output to input layer',
                  'Randomly through the network',
                  'Only through the widest layer'
                ],
                correctAnswer: 1,
                explanation: 'Backpropagation propagates errors backward from the output layer to the input layer, computing how each weight contributes to the total error.'
              },
              {
                id: 4,
                question: 'What does a partial derivative in backpropagation represent?',
                options: [
                  'How much a neuron\'s activation changes',
                  'How sensitive the cost is to a specific weight',
                  'The total error of the network',
                  'The activation function value'
                ],
                correctAnswer: 1,
                explanation: 'Each partial derivative tells us how much the cost function changes when we slightly adjust a specific weight, guiding us on how to improve.'
              }
            ]
          },
        ],
      },
      {
        title: 'Deep Learning Fundamentals',
        lessons: [
          {
            id: 4,
            title: 'Deep Learning Basics',
            duration: '7:43',
            videoUrl: 'https://www.youtube.com/watch?v=njKP3FqW3Sk',
            completed: true,
            description: 'An essential overview of deep learning concepts and architectures. This lesson covers the fundamental principles that distinguish deep learning from traditional machine learning, including automatic feature learning, hierarchical representations, and why deeper networks can solve more complex problems. You\'ll learn about different network architectures like CNNs and RNNs, and understand the advantages of depth in neural networks.',
            keyTopics: ['Deep Networks', 'Feature Learning', 'Representation Learning', 'Applications', 'Architectures', 'Convolutional Networks', 'Recurrent Networks'],
            quiz: [
              {
                id: 1,
                question: 'What is a key advantage of deep learning over traditional machine learning?',
                options: [
                  'It always requires less data',
                  'It automatically learns hierarchical features from raw data',
                  'It is always faster to train',
                  'It doesn\'t need labeled data'
                ],
                correctAnswer: 1,
                explanation: 'Deep learning\'s major advantage is automatic feature learning. Instead of manually engineering features, deep networks learn increasingly abstract representations.'
              },
              {
                id: 2,
                question: 'What does "deep" refer to in deep learning?',
                options: [
                  'The complexity of the model',
                  'The amount of training data required',
                  'The number of layers in the network',
                  'How difficult it is to understand'
                ],
                correctAnswer: 2,
                explanation: '"Deep" refers to having many layers in the neural network, allowing it to learn hierarchical representations with increasing levels of abstraction.'
              },
              {
                id: 3,
                question: 'Which of these is NOT a common deep learning architecture?',
                options: [
                  'Convolutional Neural Networks (CNN)',
                  'Recurrent Neural Networks (RNN)',
                  'Linear Regression',
                  'Transformer Networks'
                ],
                correctAnswer: 2,
                explanation: 'Linear Regression is a classical machine learning method, not a deep learning architecture. CNNs, RNNs, and Transformers are all deep learning architectures.'
              }
            ]
          },
          {
            id: 5,
            title: 'Neural Networks Deep Dive',
            duration: '10:45',
            videoUrl: 'https://www.youtube.com/watch?v=IN2XmBhILt4',
            completed: false,
            description: 'This comprehensive deep dive explores how data flows through neural networks via forward propagation. You\'ll understand matrix operations that compute layer activations, how inputs are transformed through weight multiplication and bias addition, and how compositions of layers create powerful function approximators. The lesson emphasizes the mathematical foundations and shows why matrix operations are essential for efficient computation in neural networks.',
            keyTopics: ['Forward Pass', 'Matrix Operations', 'Layer Composition', 'Input Processing', 'Outputs', 'Tensor Operations', 'Activation Propagation'],
            quiz: [
              {
                id: 1,
                question: 'What is forward propagation?',
                options: [
                  'Adjusting weights based on errors',
                  'Computing outputs by passing inputs through the network',
                  'Finding the minimum of the cost function',
                  'Calculating gradients for learning'
                ],
                correctAnswer: 1,
                explanation: 'Forward propagation is the process of computing network outputs by passing input data through each layer sequentially using current weights and biases.'
              },
              {
                id: 2,
                question: 'Why are matrix operations important in neural networks?',
                options: [
                  'They make the code shorter',
                  'They allow efficient parallel computation on GPUs',
                  'They make the network more accurate',
                  'They reduce memory requirements'
                ],
                correctAnswer: 1,
                explanation: 'Matrix operations enable efficient computation on GPUs and specialized hardware, making training of large networks feasible and practical.'
              }
            ]
          },
          {
            id: 6,
            title: 'Activation Functions Explained',
            duration: '8:32',
            videoUrl: 'https://www.youtube.com/watch?v=-7scQpJT7uo',
            completed: false,
            description: 'Comprehensive guide to activation functions and why they matter',
            keyTopics: ['ReLU', 'Sigmoid', 'Tanh', 'Softmax', 'Non-linearity', 'Dying ReLU']
          },
        ],
      },
      {
        title: 'Convolutional Neural Networks',
        lessons: [
          {
            id: 7,
            title: 'CNNs for Image Recognition',
            duration: '16:30',
            videoUrl: 'https://www.youtube.com/watch?v=FmpDIaiMIeA',
            completed: false,
            description: 'Introduction to CNNs and how they process images',
            keyTopics: ['Convolution', 'Pooling', 'Feature Maps', 'Image Recognition', 'Filters', 'Kernels']
          },
          {
            id: 8,
            title: 'Building CNNs from Scratch',
            duration: '25:15',
            videoUrl: 'https://www.youtube.com/watch?v=HGwBXDKFk9I',
            completed: false,
            description: 'Hands-on CNN implementation and training',
            keyTopics: ['Architecture Design', 'Training', 'Data Augmentation', 'Transfer Learning', 'PyTorch']
          },
        ],
      },
      {
        title: 'Advanced Topics',
        lessons: [
          {
            id: 9,
            title: 'Recurrent Neural Networks',
            duration: '10:24',
            videoUrl: 'https://www.youtube.com/watch?v=LHXXI4-IEns',
            completed: false,
            description: 'Understanding RNNs for sequential data',
            keyTopics: ['Sequences', 'Time Series', 'LSTM', 'GRU', 'Memory', 'Vanishing Gradients']
          },
          {
            id: 10,
            title: 'Attention and Transformers',
            duration: '17:50',
            videoUrl: 'https://www.youtube.com/watch?v=4Bdc55j80l8',
            completed: false,
            description: 'Modern attention mechanisms powering GPT and BERT',
            keyTopics: ['Attention', 'Self-Attention', 'Transformers', 'BERT', 'GPT', 'Language Models']
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Full Stack Web Development',
    description: 'Build modern web applications with React, Node.js, and cloud deployment',
    category: 'Development',
    theme: 'Web Development & Programming',
    lessons: 6,
    duration: '12 weeks',
    icon: '💻',
    gradient: 'from-cyan-600 to-teal-600',
    instructor: 'Fireship & freeCodeCamp',
    rating: 4.7,
    students: 18920,
    skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'REST APIs'],
    learningObjectives: [
      'Build interactive UIs with React',
      'Create RESTful APIs with Node.js',
      'Manage state in complex applications',
      'Work with databases and authentication',
      'Deploy full-stack applications'
    ],
    modules: [
      {
        title: 'Frontend Development',
        lessons: [
          {
            id: 1,
            title: 'React in 100 Seconds',
            duration: '2:28',
            videoUrl: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
            completed: false,
            description: 'Lightning-fast introduction to React core concepts',
            keyTopics: ['Components', 'JSX', 'Props', 'State', 'Virtual DOM', 'Rendering']
          },
          {
            id: 2,
            title: 'React Hooks Tutorial',
            duration: '9:15',
            videoUrl: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
            completed: false,
            description: 'Master React Hooks including useState, useEffect, and custom hooks',
            keyTopics: ['useState', 'useEffect', 'useContext', 'Custom Hooks', 'Lifecycle', 'Side Effects']
          },
          {
            id: 3,
            title: 'React State Management',
            duration: '12:47',
            videoUrl: 'https://www.youtube.com/watch?v=poQXNp9ItL4',
            completed: false,
            description: 'Managing application state with Context API and Redux',
            keyTopics: ['Context API', 'Redux', 'State Lifting', 'Global State', 'Patterns', 'Best Practices']
          },
        ],
      },
      {
        title: 'Backend Development',
        lessons: [
          {
            id: 4,
            title: 'Node.js Tutorial',
            duration: '1:02:16',
            videoUrl: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
            completed: false,
            description: 'Complete introduction to Node.js server-side JavaScript',
            keyTopics: ['Event Loop', 'Modules', 'NPM', 'Async Programming', 'File System', 'HTTP Server']
          },
          {
            id: 5,
            title: 'Express.js Full Course',
            duration: '35:25',
            videoUrl: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
            completed: false,
            description: 'Building REST APIs with Express framework',
            keyTopics: ['Routing', 'Middleware', 'Request/Response', 'REST APIs', 'Error Handling', 'Validation']
          },
          {
            id: 6,
            title: 'MongoDB in 100 Seconds',
            duration: '2:38',
            videoUrl: 'https://www.youtube.com/watch?v=-56x56UppqQ',
            completed: false,
            description: 'Quick introduction to MongoDB NoSQL database',
            keyTopics: ['NoSQL', 'Documents', 'Collections', 'Queries', 'CRUD Operations', 'Mongoose']
          },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Data Science Fundamentals',
    description: 'Learn Python, statistics, data visualization, and predictive modeling',
    category: 'Data Science',
    theme: 'Data Science & Analytics',
    lessons: 5,
    duration: '10 weeks',
    icon: '📊',
    gradient: 'from-orange-600 to-red-600',
    instructor: 'freeCodeCamp',
    rating: 4.9,
    students: 15670,
    skills: ['Python', 'Pandas', 'NumPy', 'Data Visualization', 'Machine Learning', 'Statistics'],
    learningObjectives: [
      'Master Python for data analysis',
      'Perform statistical analysis',
      'Create insightful visualizations',
      'Build predictive models',
      'Clean and prepare real-world data'
    ],
    modules: [
      {
        title: 'Python Foundations',
        lessons: [
          {
            id: 1,
            title: 'Python for Beginners',
            duration: '4:26:52',
            videoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
            completed: false,
            description: 'Complete Python programming course from basics to advanced',
            keyTopics: ['Variables', 'Functions', 'Loops', 'Data Structures', 'OOP', 'File I/O']
          },
          {
            id: 2,
            title: 'NumPy Full Course',
            duration: '58:19',
            videoUrl: 'https://www.youtube.com/watch?v=QUT1VHiLmmI',
            completed: false,
            description: 'Comprehensive NumPy tutorial for numerical computing',
            keyTopics: ['Arrays', 'Broadcasting', 'Linear Algebra', 'Statistics', 'Performance', 'Indexing']
          },
          {
            id: 3,
            title: 'Pandas Complete Guide',
            duration: '1:00:27',
            videoUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg',
            completed: false,
            description: 'Data manipulation and analysis with Pandas',
            keyTopics: ['DataFrames', 'Series', 'Filtering', 'Grouping', 'Merging', 'Time Series']
          },
        ],
      },
      {
        title: 'Data Visualization',
        lessons: [
          {
            id: 4,
            title: 'Matplotlib Crash Course',
            duration: '42:15',
            videoUrl: 'https://www.youtube.com/watch?v=3Xc3CA655Y4',
            completed: false,
            description: 'Creating professional visualizations with Matplotlib',
            keyTopics: ['Line Plots', 'Bar Charts', 'Scatter Plots', 'Histograms', 'Customization', 'Subplots']
          },
          {
            id: 5,
            title: 'Seaborn Tutorial',
            duration: '35:30',
            videoUrl: 'https://www.youtube.com/watch?v=6GUZXDef2U0',
            completed: false,
            description: 'Statistical data visualization made easy',
            keyTopics: ['Statistical Plots', 'Heatmaps', 'Distributions', 'Regression', 'Categorical Data']
          },
        ],
      },
    ],
  },
];

export const getCourseById = (id: string): Course | undefined => {
  return coursesData.find(course => course.id === id);
};

export const getLessonById = (courseId: string, lessonId: number): Lesson | undefined => {
  const course = getCourseById(courseId);
  if (!course) return undefined;

  for (const module of course.modules) {
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
};

export const getCoursesByTheme = (theme: string): Course[] => {
  return coursesData.filter(course => course.theme === theme);
};

export const getAllThemes = (): string[] => {
  return Array.from(new Set(coursesData.map(course => course.theme)));
};
