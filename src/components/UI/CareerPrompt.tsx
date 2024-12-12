import React from 'react';
import { Send, Brain, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { CAREER_SUGGESTIONS } from '../../constants/suggestions';

interface CareerPromptProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function CareerPrompt({ prompt, setPrompt, onSubmit, loading }: CareerPromptProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-purple-500/20 shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <Brain className="text-purple-400 h-6 w-6" />
        <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Your Tech Career Guide
        </h2>
        <Sparkles className="text-purple-400 h-5 w-5" />
      </div>
      
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Guide me to become a Full Stack Developer"
            className="w-full bg-gray-900/50 text-white px-4 py-3 rounded-lg border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent placeholder-gray-500"
            onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSubmit}
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-500 hover:bg-purple-600 p-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <Send size={20} />
            )}
          </motion.button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {CAREER_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setPrompt(suggestion)}
              className="text-sm px-3 py-1 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}