import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { FileText, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CareerPath3D from '../ThreeScene/CareerPath3D';

interface ResponseDisplayProps {
  response: string;
}

export default function ResponseDisplay({ response }: ResponseDisplayProps) {
  const [pathSteps, setPathSteps] = useState<string[]>([]);

  useEffect(() => {
    if (response) {
      const steps = response
        .split('\n')
        .filter(line => line.match(/^#+\s/))
        .map(line => line.replace(/^#+\s/, ''))
        .filter(Boolean);
      setPathSteps(steps);
    }
  }, [response]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {pathSteps.length > 0 && (
        <div className="h-[400px] rounded-xl overflow-hidden border border-purple-500/20 bg-gray-800/50 relative">
          <Canvas camera={{ position: [0, 0, 8] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <CareerPath3D path={pathSteps} />
            <OrbitControls enableZoom={false} />
          </Canvas>
          <div className="absolute bottom-4 right-4 text-sm text-purple-300 bg-gray-900/80 px-3 py-1 rounded-full">
            Rotate to explore
          </div>
        </div>
      )}

      <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-purple-500/20 shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="text-purple-400" />
          <h3 className="text-lg font-semibold">Your Career Roadmap</h3>
        </div>
        
        <div className="prose prose-invert max-w-none prose-headings:text-purple-400 prose-a:text-purple-400 prose-strong:text-purple-300 prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-purple-500/20">
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 no-underline hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{props.children}</span>
                  <ExternalLink size={14} className="inline-block" />
                </a>
              ),
              h1: ({ node, ...props }) => (
                <h1 {...props} className="text-2xl font-bold mt-8 mb-4 text-purple-400 flex items-center gap-2">
                  {props.children}
                </h1>
              ),
              h2: ({ node, ...props }) => (
                <h2 {...props} className="text-xl font-semibold mt-6 mb-3 text-purple-300">
                  {props.children}
                </h2>
              ),
              ul: ({ node, ...props }) => (
                <ul {...props} className="space-y-2 list-disc list-inside marker:text-purple-400">
                  {props.children}
                </ul>
              ),
              code: ({ node, ...props }) => (
                <code {...props} className="bg-gray-900/50 px-1.5 py-0.5 rounded text-purple-300">
                  {props.children}
                </code>
              ),
            }}
          >
            {response || "Ask me about any tech career path, and I'll guide you with detailed steps and resources..."}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}