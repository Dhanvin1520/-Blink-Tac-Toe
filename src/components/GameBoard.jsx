import { Card, CardContent } from "../components/ui/card";

export default function GameBoard({ board, gameState, handleCellClick, animatingCells, winningCells }) {
  return (
    <Card className="bg-black/80 backdrop-blur-xl border-2 border-purple-400/50 shadow-2xl shadow-purple-500/20 neon-card">
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto relative">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              className={`
                aspect-square bg-black/60 rounded-lg border-2 border-gray-600/50 
                flex items-center justify-center text-4xl font-bold
                transition-all duration-300 hover:bg-gradient-to-br hover:from-cyan-900/30 hover:to-pink-900/30 hover:scale-105 hover:border-cyan-400/70 neon-cell
                ${animatingCells.has(index) ? "animate-pulse bg-red-500/50 border-red-400 neon-glow-red" : ""}
                ${
                  winningCells.includes(index) ? `
                    bg-gradient-to-br from-green-500/70 to-cyan-500/70 
                    animate-bounce border-green-400 neon-glow-green
                    scale-110
                    shadow-[0_0_15px_3px_rgba(34,197,94,0.8)]
                    relative
                  ` : ""
                }
                ${cell ? "cursor-default" : "cursor-pointer"}
              `}
              disabled={gameState !== "playing" || !!cell}
            >
              {cell && (
                <span
                  className={`
                    relative flex items-center justify-center text-4xl transition-all duration-300
                    ${animatingCells.has(index) ? "scale-0 opacity-0" : "scale-100 opacity-100"}
                    ${winningCells.includes(index) ? "text-white drop-shadow-[0_0_10px_rgba(34,197,94,0.9)]" : "text-white drop-shadow-[0_0_3px_#000]"}
                  `}
                >
                  <span className="relative z-10">
                    {cell.emoji}
                  </span>
                </span>
              )}

   
              {winningCells.includes(index) && (
                <span className="absolute inset-0 pointer-events-none rounded-lg bg-gradient-radial from-green-400 to-transparent animate-sparkle"></span>
              )}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}