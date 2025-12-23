
import React, { useState } from 'react';

export const ColorExplorer: React.FC = () => {
  const [r, setR] = useState(165);
  const [g, setG] = useState(28);
  const [b, setB] = useState(48);

  const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Pixels & RGB</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Malan explains that a pixel is just three bytes: one for Red, one for Green, and one for Blue.
          Every digital image is just a grid of these three-number combinations.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
        {/* Sliders */}
        <div className="w-full max-w-sm space-y-8">
          <ColorSlider label="Red" value={r} onChange={setR} color="bg-red-500" />
          <ColorSlider label="Green" value={g} onChange={setG} color="bg-green-500" />
          <ColorSlider label="Blue" value={b} onChange={setB} color="bg-blue-500" />
          
          <div className="pt-8 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-4">Color Codes</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <span className="text-[10px] block text-gray-400 mb-1">HEX</span>
                <span className="font-bold mono">{hex}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <span className="text-[10px] block text-gray-400 mb-1">RGB</span>
                <span className="font-bold mono">{r}, {g}, {b}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative group">
            <div 
              className="w-64 h-64 rounded-3xl shadow-2xl border-8 border-white transition-all duration-300 transform group-hover:scale-105"
              style={{ backgroundColor: hex }}
            />
            <div className="absolute -bottom-4 -right-4 bg-gray-900 text-white text-[10px] px-3 py-1 rounded-full font-bold mono">
              1 PIXEL
            </div>
          </div>
          <p className="text-sm text-gray-400 text-center max-w-xs italic">
            "A photograph is just millions of bytes corresponding to pixels on the screen."
          </p>
        </div>
      </div>

      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 max-w-4xl mx-auto">
        <div className="flex gap-4">
          <span className="text-3xl">💡</span>
          <div>
            <h4 className="font-bold text-amber-900 mb-1">The CS50 Connection</h4>
            <p className="text-sm text-amber-800 leading-relaxed">
              David mentions the color "yellow" using the ASCII numbers for "HI!" (72, 73, 33). 
              If you set Red to 72, Green to 73, and Blue to 33, you'll see exactly the dark olive/yellow he demonstrates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ColorSlider: React.FC<{ label: string; value: number; onChange: (v: number) => void; color: string }> = ({ label, value, onChange, color }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <span className="font-bold text-gray-700">{label}</span>
      <span className="mono font-bold bg-gray-100 px-2 py-0.5 rounded text-sm">{value}</span>
    </div>
    <div className="flex items-center gap-4">
      <input 
        type="range" 
        min="0" 
        max="255" 
        value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-[#A51C30] bg-gray-200`}
      />
      <div className={`w-4 h-4 rounded-full ${color} shadow-sm border border-white/20`} />
    </div>
    <div className="flex justify-between text-[10px] text-gray-400 font-mono">
      <span>00000000</span>
      <span>11111111</span>
    </div>
  </div>
);
