import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import NeuralNetwork from './ThreeScene/NeuralNetwork';
import CareerPrompt from './UI/CareerPrompt';
import ResponseDisplay from './UI/ResponseDisplay';
import { genAI, generateCareerPrompt } from '../utils/gemini';
import { useAuth } from '../contexts/AuthContext';
import Login from './Auth/Login';

export default function ChatInterface() {
  const { isAuthenticated } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const generateCareerPath = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
      const result = await model.generateContent(generateCareerPrompt(prompt));
      const response = await result.response;
      setResponse(response.text());
    } catch (error) {
      console.error('Error:', error);
      setResponse('Sorry, there was an error generating your career path. Please try again.');
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="h-[400px] md:h-[600px] rounded-xl overflow-hidden border border-purple-500/20">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <NeuralNetwork />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      <div className="space-y-6">
        <CareerPrompt
          prompt={prompt}
          setPrompt={setPrompt}
          onSubmit={generateCareerPath}
          loading={loading}
        />
        <ResponseDisplay response={response} />
      </div>
    </div>
  );
}