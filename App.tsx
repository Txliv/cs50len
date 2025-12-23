
import React, { useState } from 'react';
import { BinaryExplorer } from './components/BinaryExplorer';
import { AlgorithmVisualizer } from './components/AlgorithmVisualizer';
import { DuckChat } from './components/DuckChat';
import { ColorExplorer } from './components/ColorExplorer';
import { Icons, COLORS } from './constants';

type Tab = 'binary' | 'algorithm' | 'color' | 'duck';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('binary');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#A51C30] text-white py-6 px-8 shadow-md sticky top-0 z-50 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">CS50.EXPLORER</h1>
          <p className="text-sm opacity-80">This is CS50, Week 0: Scratch</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => window.open('https://cs50.harvard.edu/', '_blank')}
            className="text-xs border border-white/30 rounded px-3 py-1 hover:bg-white/10 transition-colors"
          >
            Course Site
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-gray-100 p-1 rounded-xl">
          <TabButton 
            active={activeTab === 'binary'} 
            onClick={() => setActiveTab('binary')} 
            icon={<Icons.Binary />} 
            label="Binary & Bits" 
          />
          <TabButton 
            active={activeTab === 'algorithm'} 
            onClick={() => setActiveTab('algorithm')} 
            icon={<Icons.Search />} 
            label="Algorithms" 
          />
          <TabButton 
            active={activeTab === 'color'} 
            onClick={() => setActiveTab('color')} 
            icon={<Icons.Color />} 
            label="Color (RGB)" 
          />
          <TabButton 
            active={activeTab === 'duck'} 
            onClick={() => setActiveTab('duck')} 
            icon={<Icons.Duck />} 
            label="Rubber Duck AI" 
          />
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10 min-h-[600px]">
          {activeTab === 'binary' && <BinaryExplorer />}
          {activeTab === 'algorithm' && <AlgorithmVisualizer />}
          {activeTab === 'color' && <ColorExplorer />}
          {activeTab === 'duck' && <DuckChat />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 px-8 text-center text-gray-400 text-sm">
        <p>&copy; 2024 Interactive Learning Labs. Inspired by CS50 David J. Malan.</p>
      </footer>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
      active 
        ? 'bg-white text-[#A51C30] shadow-sm' 
        : 'text-gray-500 hover:text-gray-800 hover:bg-white/50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default App;
