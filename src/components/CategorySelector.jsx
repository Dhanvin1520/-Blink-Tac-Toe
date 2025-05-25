import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Sparkles } from "lucide-react";

export default function CategorySelector({ playerCategories, selectCategory, EMOJI_CATEGORIES, resetCategories }) {
  return (
    <Card className="bg-black/80 backdrop-blur-xl border-2 border-cyan-400/50 text-white shadow-2xl shadow-cyan-500/20 neon-card">
      <CardHeader>
        <CardTitle className="text-center text-2xl bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent neon-text">
          Choose Your Emoji Categories
        </CardTitle>
        <p className="text-center text-gray-400">Each player must choose a different category</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {[1, 2].map((player) => (
            <div key={player} className="space-y-3">
              <h3 className="text-lg font-semibold text-center bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent">
                Player {player}{" "}
                {playerCategories[player] &&
                  `- ${EMOJI_CATEGORIES[playerCategories[player]].name}`}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(EMOJI_CATEGORIES).map(([key, category]) => (
                  <Button
                    key={key}
                    variant={playerCategories[player] === key ? "default" : "outline"}
                    className={`h-auto p-4 transition-all duration-300 ${
                      playerCategories[player] === key
                        ? "bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white shadow-md border-2 border-indigo-500"
                        : "bg-black/60 border-2 border-gray-600/50 text-gray-300 hover:bg-gradient-to-r hover:from-cyan-900/30 hover:to-pink-900/30 hover:border-cyan-400/50 hover:text-white neon-border-hover"
                    } ${
                      Object.values(playerCategories).includes(key) &&
                      playerCategories[player] !== key
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => selectCategory(player, key)}
                    disabled={
                      Object.values(playerCategories).includes(key) &&
                      playerCategories[player] !== key
                    }
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{category.emojis.slice(0, 4).join(" ")}</div>
                      <div className="text-sm font-medium">{category.name}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))}


          {playerCategories[1] && playerCategories[2] && playerCategories[1] !== playerCategories[2] && (
            <div className="text-center mt-6">
              <div className="text-cyan-400 font-semibold animate-bounce neon-text">
                <Sparkles className="w-5 h-5 inline mr-2 neon-icon" />
                Ready to play! Starting game...
                <Sparkles className="w-5 h-5 inline ml-2 neon-icon" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}