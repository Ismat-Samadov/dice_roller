'use client';

import { useState, useEffect } from 'react';
import DiceRoller from '@/components/DiceRoller';
import Statistics from '@/components/Statistics';

interface Roll {
  value: number;
  diceType: number;
  timestamp: Date;
}

export default function Home() {
  const [rolls, setRolls] = useState<Roll[]>([]);

  // Load rolls from localStorage on mount
  useEffect(() => {
    const savedRolls = localStorage.getItem('diceRolls');
    if (savedRolls) {
      try {
        const parsed = JSON.parse(savedRolls);
        setRolls(parsed.map((r: any) => ({ ...r, timestamp: new Date(r.timestamp) })));
      } catch (e) {
        console.error('Failed to load saved rolls:', e);
      }
    }
  }, []);

  // Save rolls to localStorage whenever they change
  useEffect(() => {
    if (rolls.length > 0) {
      localStorage.setItem('diceRolls', JSON.stringify(rolls));
    }
  }, [rolls]);

  const handleRoll = (value: number, diceType: number) => {
    const newRoll: Roll = {
      value,
      diceType,
      timestamp: new Date(),
    };
    setRolls([...rolls, newRoll]);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all roll history?')) {
      setRolls([]);
      localStorage.removeItem('diceRolls');
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 pb-20">
      {/* Header */}
      <header className="text-center mb-12 pt-8">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          🎲 Dice Roller
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
          Roll virtual dice and track your statistics. Perfect for board games, RPGs, and probability experiments!
        </p>
      </header>

      {/* Dice Roller Section */}
      <section className="mb-16">
        <DiceRoller onRoll={handleRoll} />
      </section>

      {/* Statistics Section */}
      <section>
        <Statistics rolls={rolls} onClear={handleClear} />
      </section>

      {/* Footer */}
      <footer className="text-center mt-16 text-white/50 text-sm">
        <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
      </footer>
    </main>
  );
}
