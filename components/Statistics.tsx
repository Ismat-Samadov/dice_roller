'use client';

interface Roll {
  value: number;
  diceType: number;
  timestamp: Date;
}

interface StatisticsProps {
  rolls: Roll[];
  onClear: () => void;
}

export default function Statistics({ rolls, onClear }: StatisticsProps) {
  if (rolls.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
        <h2 className="text-2xl font-bold mb-4 text-white">Statistics</h2>
        <p className="text-white/60 text-center py-8">
          No rolls yet. Start rolling to see your statistics!
        </p>
      </div>
    );
  }

  const totalRolls = rolls.length;
  const sum = rolls.reduce((acc, roll) => acc + roll.value, 0);
  const average = (sum / totalRolls).toFixed(2);
  const min = Math.min(...rolls.map((r) => r.value));
  const max = Math.max(...rolls.map((r) => r.value));

  // Calculate frequency for each value
  const frequency: { [key: number]: number } = {};
  rolls.forEach((roll) => {
    frequency[roll.value] = (frequency[roll.value] || 0) + 1;
  });

  const mostCommon = Object.entries(frequency).reduce(
    (a, b) => (b[1] > a[1] ? b : a),
    ['0', 0]
  );

  // Get frequency by dice type
  const diceTypeFrequency: { [key: number]: number } = {};
  rolls.forEach((roll) => {
    diceTypeFrequency[roll.diceType] = (diceTypeFrequency[roll.diceType] || 0) + 1;
  });

  // Calculate max frequency for scaling bars
  const maxFreq = Math.max(...Object.values(frequency));

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-md p-6 rounded-2xl border border-blue-400/30">
          <p className="text-blue-200 text-sm mb-1">Total Rolls</p>
          <p className="text-3xl font-bold text-white">{totalRolls}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-md p-6 rounded-2xl border border-green-400/30">
          <p className="text-green-200 text-sm mb-1">Average</p>
          <p className="text-3xl font-bold text-white">{average}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-md p-6 rounded-2xl border border-purple-400/30">
          <p className="text-purple-200 text-sm mb-1">Min / Max</p>
          <p className="text-3xl font-bold text-white">
            {min} / {max}
          </p>
        </div>
        <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-md p-6 rounded-2xl border border-amber-400/30">
          <p className="text-amber-200 text-sm mb-1">Most Common</p>
          <p className="text-3xl font-bold text-white">
            {mostCommon[0]} ({mostCommon[1]}×)
          </p>
        </div>
      </div>

      {/* Frequency Distribution */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Value Distribution</h3>
          <button
            onClick={onClear}
            className="px-4 py-2 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg border border-red-400/30 transition-colors"
          >
            Clear History
          </button>
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {Object.entries(frequency)
            .sort(([a], [b]) => parseInt(a) - parseInt(b))
            .map(([value, count]) => (
              <div key={value} className="flex items-center gap-3">
                <span className="text-white/80 font-mono w-12">{value}:</span>
                <div className="flex-1 bg-white/10 rounded-full h-8 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full flex items-center justify-end px-3 transition-all duration-300"
                    style={{ width: `${(count / maxFreq) * 100}%` }}
                  >
                    <span className="text-white text-sm font-semibold">
                      {count}
                    </span>
                  </div>
                </div>
                <span className="text-white/60 text-sm w-16 text-right">
                  {((count / totalRolls) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Dice Type Usage */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4">Dice Type Usage</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(diceTypeFrequency)
            .sort(([a], [b]) => parseInt(a) - parseInt(b))
            .map(([diceType, count]) => (
              <div
                key={diceType}
                className="bg-white/5 p-4 rounded-lg border border-white/10"
              >
                <p className="text-white/60 text-sm">d{diceType}</p>
                <p className="text-2xl font-bold text-white">{count}</p>
                <p className="text-white/40 text-xs">
                  {((count / totalRolls) * 100).toFixed(1)}%
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Recent Rolls */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4">Recent Rolls</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 max-h-32 overflow-y-auto">
          {rolls
            .slice()
            .reverse()
            .slice(0, 20)
            .map((roll, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-500/30 to-purple-500/30 p-3 rounded-lg border border-indigo-400/30 text-center"
              >
                <p className="text-xl font-bold text-white">{roll.value}</p>
                <p className="text-xs text-white/50">d{roll.diceType}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
