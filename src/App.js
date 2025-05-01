import React from 'react';
import GameBoard from './GameBoard';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-6">Memory Card Game</h1>
      <GameBoard />
    </div>
  );
};

export default App;