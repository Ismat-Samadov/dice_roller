'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';

interface DiceRollerProps {
  onRoll: (value: number, diceType: number) => void;
}

export default function DiceRoller({ onRoll }: DiceRollerProps) {
  const [currentValue, setCurrentValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState(false);
  const [selectedDice, setSelectedDice] = useState<number>(6);
  const [numberOfDice, setNumberOfDice] = useState<number>(1);

  const diceTypes = [4, 6, 8, 10, 12, 20, 100];

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);

    // Animate the rolling effect
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * selectedDice) + 1;
      setCurrentValue(randomValue);
      rollCount++;

      if (rollCount > 10) {
        clearInterval(rollInterval);
        // Final roll
        let total = 0;
        for (let i = 0; i < numberOfDice; i++) {
          total += Math.floor(Math.random() * selectedDice) + 1;
        }
        setCurrentValue(total);
        onRoll(total, selectedDice);
        setIsRolling(false);
      }
    }, 50);
  };

  const getDiceFace = (value: number) => {
    if (selectedDice === 6 && numberOfDice === 1) {
      const dots: { [key: number]: ReactElement } = {
        1: (
          <div className="flex items-center justify-center h-full">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        ),
        2: (
          <div className="flex justify-between p-4">
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full self-end"></div>
          </div>
        ),
        3: (
          <div className="flex flex-col justify-between p-4">
            <div className="w-4 h-4 bg-white rounded-full self-start"></div>
            <div className="w-4 h-4 bg-white rounded-full self-center"></div>
            <div className="w-4 h-4 bg-white rounded-full self-end"></div>
          </div>
        ),
        4: (
          <div className="grid grid-cols-2 gap-8 p-4">
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        ),
        5: (
          <div className="relative p-4">
            <div className="grid grid-cols-2 gap-8">
              <div className="w-4 h-4 bg-white rounded-full"></div>
              <div className="w-4 h-4 bg-white rounded-full"></div>
              <div className="w-4 h-4 bg-white rounded-full"></div>
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
          </div>
        ),
        6: (
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        ),
      };
      return dots[value] || null;
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
      {/* Dice Type Selector */}
      <div className="w-full">
        <label className="block text-sm font-medium mb-3 text-white/90">
          Select Dice Type
        </label>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
          {diceTypes.map((dice) => (
            <button
              key={dice}
              onClick={() => setSelectedDice(dice)}
              disabled={isRolling}
              className={`px-4 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                selectedDice === dice
                  ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/50'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              d{dice}
            </button>
          ))}
        </div>
      </div>

      {/* Number of Dice */}
      <div className="w-full">
        <label className="block text-sm font-medium mb-3 text-white/90">
          Number of Dice: {numberOfDice}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={numberOfDice}
          onChange={(e) => setNumberOfDice(parseInt(e.target.value))}
          disabled={isRolling}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
      </div>

      {/* Dice Display */}
      <div className="relative">
        <div
          className={`w-40 h-40 md:w-48 md:h-48 rounded-3xl bg-gradient-to-br from-red-500 to-pink-600 shadow-2xl shadow-red-500/50 flex items-center justify-center transition-all duration-300 ${
            isRolling ? 'animate-roll' : 'animate-bounce-in'
          }`}
        >
          {selectedDice === 6 && numberOfDice === 1 ? (
            getDiceFace(currentValue)
          ) : (
            <span className="text-6xl md:text-7xl font-bold text-white drop-shadow-lg">
              {currentValue}
            </span>
          )}
        </div>
      </div>

      {/* Roll Info */}
      <div className="text-center">
        <p className="text-white/70 text-sm">
          Rolling {numberOfDice}d{selectedDice} (Range: {numberOfDice} - {numberOfDice * selectedDice})
        </p>
      </div>

      {/* Roll Button */}
      <button
        onClick={rollDice}
        disabled={isRolling}
        className="px-12 py-4 text-xl font-bold rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white shadow-2xl shadow-green-500/50 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isRolling ? '🎲 Rolling...' : '🎲 Roll Dice'}
      </button>
    </div>
  );
}
