import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 fade-in">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-t-2 border-stone-300 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-t-2 border-primary rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      <p className="text-stone-500 font-serif italic animate-pulse">Preparing the path...</p>
    </div>
  );
};

export default LoadingScreen;