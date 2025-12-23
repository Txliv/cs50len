
import React, { useState, useMemo } from 'react';

export const BinaryExplorer: React.FC = () => {
  const [bits, setBits] = useState<number[]>(new Array(8).fill(0));

  const toggleBit = (index: number) => {
    const newBits = [...bits];
    newBits[index] = newBits[index] === 0 ? 1 : 0;
    setBits(newBits);
  };

  const decimalValue = useMemo(() => {
    return bits.reduce((acc, bit, idx) => acc + bit * Math.pow(2, bits.length - 1 - idx), 0);
  }, [bits]);

  const asciiChar = useMemo(() => {
    if (decimalValue >= 32 && decimalValue <= 126) {
      return String.fromCharCode(decimalValue);
    }
    if (decimalValue === 33) return '!';
    return null;
  }, [decimalValue]);

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">How Computers Represent Data</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Computers only understand zeros and ones (bits). By toggling these 8 switches (a byte), 
          you can represent any number from 0 to 255.
        </p>
      </div>

      <div className="flex flex-col items-center gap-8">
        {/* The Byte */}
        <div className="flex flex-wrap justify-center gap-3">
          {bits.map((bit, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <span className="text-xs text-gray-400 font-mono">2<sup>{7 - idx}</sup></span>
              <button
                onClick={() => toggleBit(idx)}
                className={`w-16 h-24 rounded-xl flex items-center justify-center text-2xl font-bold mono border-2 transition-all shadow-inner ${
                  bit === 1 
                    ? 'bg-[#A51C30] text-white border-[#A51C30] scale-105 shadow-lg' 
                    : 'bg-gray-100 text-gray-400 border-gray-200'
                }`}
              >
                {bit}
              </button>
              <span className="text-sm font-semibold text-gray-500">{bit === 1 ? Math.pow(2, 7 - idx) : 0}</span>
            </div>
          ))}
        </div>

        {/* The Result Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <Card label="Decimal Value" value={decimalValue.toString()} sub="Base 10" />
          <Card label="ASCII Character" value={asciiChar || 'N/A'} sub={asciiChar ? 'Mapped' : 'Unprintable'} />
          <Card label="Hexadecimal" value={'0x' + decimalValue.toString(16).toUpperCase().padStart(2, '0')} sub="Base 16" />
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 max-w-2xl">
          <h3 className="text-blue-800 font-bold mb-2 flex items-center gap-2">
            <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">i</span>
            Did you know?
          </h3>
          <p className="text-blue-700 text-sm leading-relaxed">
            In the lecture, David Malan explains that uppercase 'A' is 65 (binary 01000001). 
            'B' is 66, and 'C' is 67. Try to toggle the bits to create 65!
          </p>
        </div>
      </div>
    </div>
  );
};

const Card: React.FC<{ label: string; value: string; sub: string }> = ({ label, value, sub }) => (
  <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 text-center flex flex-col items-center justify-center hover:border-[#A51C30]/20 transition-all">
    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{label}</span>
    <span className="text-6xl font-black text-gray-800 mono mb-2">{value}</span>
    <span className="text-sm text-gray-500 font-medium">{sub}</span>
  </div>
);
