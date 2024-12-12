import React from 'react';
import { motion } from 'framer-motion';
import { Brain, User, History, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  onProfileClick: () => void;
  onHistoryClick: () => void;
}

export default function Navbar({ onProfileClick, onHistoryClick }: NavbarProps) {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800/50 backdrop-blur-lg border-b border-purple-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Brain className="text-purple-400 h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              TechBro Advisor
            </span>
          </div>

          {user && (
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onHistoryClick}
                className="p-2 rounded-lg hover:bg-purple-500/20"
              >
                <History className="text-purple-400 h-5 w-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onProfileClick}
                className="p-2 rounded-lg hover:bg-purple-500/20"
              >
                <User className="text-purple-400 h-5 w-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="p-2 rounded-lg hover:bg-purple-500/20"
              >
                <LogOut className="text-purple-400 h-5 w-5" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}