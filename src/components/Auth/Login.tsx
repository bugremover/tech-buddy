import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl border border-purple-500/20 shadow-lg"
      >
        <div className="flex flex-col items-center mb-8">
          <Brain className="text-purple-400 h-12 w-12 mb-4" />
          <h2 className="text-2xl font-bold text-white">Welcome to TechBro</h2>
          <p className="text-gray-400">Your personal tech career advisor</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-900/50 text-white pl-10 pr-4 py-3 rounded-lg border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900/50 text-white pl-10 pr-4 py-3 rounded-lg border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}