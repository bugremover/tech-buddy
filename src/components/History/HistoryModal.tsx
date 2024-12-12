import React from 'react';
import { motion } from 'framer-motion';
import { X, Clock, Search } from 'lucide-react';

interface HistoryModalProps {
  onClose: () => void;
}

export default function HistoryModal({ onClose }: HistoryModalProps) {
  // Mock history data
  const history = [
    { id: 1, query: 'How to become a Frontend Developer', timestamp: new Date().toISOString() },
    { id: 2, query: 'Data Science career path', timestamp: new Date().toISOString() },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800/90 rounded-xl p-6 max-w-md w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Search History</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 transition-colors cursor-pointer"
            >
              <Search size={18} className="text-purple-400 mt-1" />
              <div>
                <p className="text-white">{item.query}</p>
                <p className="text-sm text-gray-400">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}