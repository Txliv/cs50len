
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const NAMES = [
  "Abigail", "Adam", "Becca", "Brian", "Brooke", "David", "Doug", "Eric", "Grace", "Jack", 
  "Jane", "John", "Julia", "Maria", "Max", "Owen", "Sam", "Sharon", "Tia", "Zoe"
];

export const AlgorithmVisualizer: React.FC = () => {
  const [target, setTarget] = useState("John");
  const [searchType, setSearchType] = useState<'linear' | 'binary'>('linear');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [range, setRange] = useState<[number, number]>([0, NAMES.length - 1]);
  const [steps, setSteps] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [found, setFound] = useState(false);

  const reset = () => {
    setCurrentIndex(-1);
    setRange([0, NAMES.length - 1]);
    setSteps(0);
    setIsRunning(false);
    setFound(false);
  };

  useEffect(() => {
    reset();
  }, [target, searchType]);

  const step = () => {
    if (found) return;
    
    setSteps(s => s + 1);

    if (searchType === 'linear') {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      if (NAMES[nextIdx] === target) {
        setFound(true);
        setIsRunning(false);
      } else if (nextIdx >= NAMES.length - 1) {
        setIsRunning(false);
      }
    } else {
      const [low, high] = range;
      const mid = Math.floor((low + high) / 2);
      setCurrentIndex(mid);

      if (NAMES[mid] === target) {
        setFound(true);
        setIsRunning(false);
      } else if (low > high) {
        setIsRunning(false);
      } else if (NAMES[mid] < target) {
        setRange([mid + 1, high]);
      } else {
        setRange([low, mid - 1]);
      }
    }
  };

  useEffect(() => {
    let timer: any;
    if (isRunning && !found) {
      timer = setTimeout(step, 800);
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentIndex, range, found]);

  const chartData = [
    { n: 1, linear: 1, binary: 1 },
    { n: 10, linear: 10, binary: 3.3 },
    { n: 100, linear: 100, binary: 6.6 },
    { n: 1000, linear: 1000, binary: 10 },
    { n: 10000, linear: 10000, binary: 13.3 },
  ];

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Searching the Phone Book</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Malan uses a phone book to demonstrate algorithm efficiency. 
          Linear search is slow ($O(n)$), while Binary search is incredibly fast ($O(\log n)$).
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Interactive Area */}
        <div className="flex-1 bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <div className="flex flex-wrap gap-4 mb-6">
            <select 
              value={target} 
              onChange={(e) => setTarget(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A51C30]"
            >
              {NAMES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <div className="flex bg-white rounded-lg border border-gray-300 p-1">
              <button 
                onClick={() => setSearchType('linear')}
                className={`px-4 py-1 rounded-md text-sm font-medium transition-all ${searchType === 'linear' ? 'bg-[#A51C30] text-white shadow' : 'text-gray-500'}`}
              >
                Linear
              </button>
              <button 
                onClick={() => setSearchType('binary')}
                className={`px-4 py-1 rounded-md text-sm font-medium transition-all ${searchType === 'binary' ? 'bg-[#A51C30] text-white shadow' : 'text-gray-500'}`}
              >
                Binary
              </button>
            </div>
            <button 
              onClick={() => {
                if (found || currentIndex >= NAMES.length -1) reset();
                setIsRunning(!isRunning);
              }}
              className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-black transition-all"
            >
              {isRunning ? 'Pause' : found ? 'Reset' : 'Start Search'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {NAMES.map((name, i) => {
              const isChecking = currentIndex === i;
              const isExcluded = searchType === 'binary' && (i < range[0] || i > range[1]) && !found;
              const isFound = found && currentIndex === i;

              return (
                <div 
                  key={name}
                  className={`p-3 rounded-lg border text-sm transition-all duration-300 flex flex-col items-center ${
                    isFound ? 'bg-green-500 text-white border-green-600 scale-105 z-10' :
                    isChecking ? 'bg-[#A51C30] text-white border-[#A51C30] animate-pulse' :
                    isExcluded ? 'bg-gray-200 text-gray-400 opacity-40 grayscale' :
                    'bg-white border-gray-200'
                  }`}
                >
                  <span className="text-[10px] opacity-60 font-mono mb-1">{i}</span>
                  <span className="font-semibold">{name}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
            <div className="flex gap-8">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">Steps Taken</span>
                <p className="text-2xl font-black text-gray-800">{steps}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">Complexity</span>
                <p className="text-2xl font-black text-[#A51C30] mono">{searchType === 'linear' ? 'O(n)' : 'O(log n)'}</p>
              </div>
            </div>
            {found && (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold animate-bounce">
                Found {target}!
              </div>
            )}
          </div>
        </div>

        {/* Chart Area */}
        <div className="lg:w-96 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
            <h3 className="text-lg font-bold mb-4">Growth of Time</h3>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="n" scale="log" domain={['auto', 'auto']} />
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                  <Line type="monotone" dataKey="linear" stroke="#ef4444" strokeWidth={2} name="O(n)" />
                  <Line type="monotone" dataKey="binary" stroke="#10b981" strokeWidth={2} name="O(log n)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-400 mt-4 italic">
              Binary search stays flat even as the problem size (n) doubles, triples, or grows to billions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
