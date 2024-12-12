import React from 'react';
import { motion } from 'framer-motion';
import { X, User, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileModalProps {
  onClose: () => void;
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const { user } = useAuth();

  if (!user) return null;

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
          <h2 className="text-xl font-semibold text-white">Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-purple-500/50 mb-4"
          />
          <h3 className="text-lg font-medium text-white">{user.name}</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-gray-300">
            <Mail size={18} />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <Calendar size={18} />
            <span>Member since {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}