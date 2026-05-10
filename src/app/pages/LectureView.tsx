import { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import AIAssistant from '../components/AIAssistant';
import SessionMemory from '../components/SessionMemory';

export default function LectureView() {
  const [showAIAssistant, setShowAIAssistant] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const [currentVideo] = useState({
    id: 1,
    title: 'Data Structures and Algorithms',
    subtitle: 'Lecture 12: Trees in Data Structures',
    url: 'https://www.youtube.com/embed/oSWTXtMglKE',
    transcript: [
      { time: '00:00', text: 'Introduction to Trees', content: 'Welcome to this lecture on trees in data structures. Trees are hierarchical data structures that are fundamental to computer science.' },
      { time: '03:15', text: 'What is a Tree?', content: 'A tree is a hierarchical data structure consisting of nodes connected by edges. Each tree has a root node and zero or more child nodes.' },
      { time: '06:40', text: 'Types of Trees', content: 'There are various types of trees including binary trees, binary search trees, AVL trees, and more. Each has specific properties and use cases.' },
      { time: '12:10', text: 'Binary Trees', content: 'A binary tree is a tree data structure in which each node has at most two children, referred to as the left child and the right child.' },
      { time: '18:30', text: 'Full Binary Trees', content: 'A full binary tree is a binary tree in which every node has either 0 or 2 children. No node has exactly one child.' },
      { time: '24:50', text: 'Complete Binary Trees', content: 'A complete binary tree is a binary tree in which all levels are completely filled except possibly the last level.' },
      { time: '31:20', text: 'Tree Traversals', content: 'Tree traversal refers to the process of visiting each node in the tree. Common methods include inorder, preorder, and postorder traversal.' },
      { time: '38:10', text: 'Inorder Traversal Example', content: 'Let\'s look at an example of inorder traversal. We visit the left subtree, then the root, then the right subtree.' },
      { time: '43:00', text: 'Summary', content: 'In this lecture, we covered binary trees, their properties, types, and traversal methods. Practice these concepts for mastery.' }
    ]
  });

  const [sessionTopics] = useState([
    { id: 1, title: 'Trees Overview', active: false },
    { id: 2, title: 'Binary Trees', active: true },
    { id: 3, title: 'Types of Trees', active: false },
    { id: 4, title: 'Tree Traversals', active: false }
  ]);

  return (
    <div className="h-[calc(100vh-73px)] flex overflow-hidden bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <VideoPlayer video={currentVideo} onTimeUpdate={setCurrentTime} />
      </div>
      {showAIAssistant && (
        <AIAssistant
          video={currentVideo}
          currentTime={currentTime}
          onClose={() => setShowAIAssistant(false)}
        />
      )}
      <SessionMemory topics={sessionTopics} />
    </div>
  );
}
