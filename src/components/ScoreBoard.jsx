import { Trophy } from "lucide-react";

export default function ScoreBoard({ scores }) {
  return (
    <div className="flex items-center justify-center gap-8 text-gray-300 mb-4">
      <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-cyan-400/30 neon-border">
        <Trophy className="w-5 h-5 text-cyan-400 neon-icon" />
        <span className="text-cyan-300">Player 1: {scores[1]}</span>
      </div>
      <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-pink-400/30 neon-border">
        <Trophy className="w-5 h-5 text-pink-400 neon-icon" />
        <span className="text-pink-300">Player 2: {scores[2]}</span>
      </div>
    </div>
  );
}