import React from 'react';

const Card = ({ id, value, isFlipped, isMatched, onClick }) => {
  return (
    <div
      className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg shadow-lg flex items-center justify-center text-2xl font-bold cursor-pointer transform transition-all duration-300 ${
        isFlipped || isMatched
          ? 'bg-gradient-to-br from-white to-gray-100 rotate-y-180'
          : 'hover:scale-105'
      } ${isMatched ? 'border-2 border-green-400' : ''}`}
      onClick={() => !isFlipped && !isMatched && onClick(id)}
    >
      <div
        className={`transition-opacity duration-300 ${
          isFlipped || isMatched ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {isFlipped || isMatched ? value : '?'}
      </div>
    </div>
  );
};

export default Card;