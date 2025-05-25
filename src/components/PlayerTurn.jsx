import { Card, CardContent } from "../components/ui/card";

export default function PlayerTurn({ currentPlayer, playerCategories, playerMoves, EMOJI_CATEGORIES }) {
  return (
    <Card className="bg-black/80 backdrop-blur-xl border-2 border-pink-400/50 text-white shadow-lg shadow-pink-500/20 neon-card">
      <CardContent className="p-4">
        <div className="text-center">
          <div className="text-lg font-semibold mb-2 bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent neon-text">
            Player {currentPlayer}'s Turn
          </div>
          <div className="text-sm text-gray-400">
            Category: {EMOJI_CATEGORIES[playerCategories[currentPlayer]].name}
          </div>
          <div className="text-2xl mt-2">
            {EMOJI_CATEGORIES[playerCategories[currentPlayer]].emojis
              .slice(0, 4)
              .join(" ")}
          </div>
          <div className="text-xs text-cyan-400 mt-2 neon-text">
            Emojis on board: {playerMoves[currentPlayer].length}/3
          </div>
        </div>
      </CardContent>
    </Card>
  );
}