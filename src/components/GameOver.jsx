import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function GameOver({ winner, playerCategories, EMOJI_CATEGORIES, startNewGame, resetGame }) {
  const commonButtonClasses =
    "bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600 hover:brightness-110 text-white px-7 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-xl transition-all duration-300";

  return (
    <Card className="bg-gradient-to-br from-black via-gray-900 to-black border border-cyan-400/40 shadow-2xl rounded-2xl backdrop-blur-xl neon-card">
      <CardContent className="p-8 text-center space-y-6">
        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] animate-glow">
          ✨ Player {winner} Wins! ✨
        </h2>

        <p className="text-base text-gray-300">
          <span className="text-sm text-gray-400">Category:</span>{' '}
          <span className="text-cyan-300 font-medium">
            {EMOJI_CATEGORIES[playerCategories[winner]].name}
          </span>
        </p>

        <div className="flex justify-center gap-5 pt-4">
          <Button onClick={startNewGame} className={commonButtonClasses}>
            ⚡ Play Again
          </Button>

          <Button onClick={resetGame} className={commonButtonClasses}>
            🔄 New Categories
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}