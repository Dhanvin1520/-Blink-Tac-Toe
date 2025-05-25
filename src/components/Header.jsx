import { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { Volume2, VolumeX, RotateCcw, HelpCircle } from "lucide-react";

export default function Header({ soundEnabled, setSoundEnabled, helpOpen, setHelpOpen, resetGame }) {
  const [dialogKey, setDialogKey] = useState(0);
  const popupRef = useRef(null);

  useEffect(() => {
    setHelpOpen(true);
    setDialogKey((prev) => prev + 1);

    const timer = setTimeout(() => {
      setHelpOpen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setHelpOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setHelpOpen(false);
      }
    }
    if (helpOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [helpOpen, setHelpOpen]);

  return (
    <div className="text-center mb-8 relative">
      <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent mb-4 animate-pulse neon-text">
        ⚡ Blink Tac Toe ⚡
      </h1>
      <div className="flex items-center justify-center gap-4 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="bg-black/60 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/20 hover:border-cyan-300 hover:text-white neon-border transition-all duration-300"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setHelpOpen(!helpOpen)}
          className="bg-black/60 border-pink-400/50 text-pink-300 hover:bg-pink-400/20 hover:border-pink-300 hover:text-white neon-border transition-all duration-300"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Rules
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetGame}
          className="bg-black/60 border-yellow-400/50 text-yellow-300 hover:bg-yellow-400/20 hover:border-yellow-300 hover:text-white neon-border transition-all duration-300"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
      {helpOpen && (
        <div
          ref={popupRef}
          key={dialogKey}
          className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-black via-[#0f172a] to-black border-2 border-cyan-500 text-white max-w-lg p-6 rounded-2xl shadow-[0_0_20px_#22d3ee] animate-slide-in z-[999]"
          style={{ backdropFilter: "none" }}
        >
          <button
            onClick={() => setHelpOpen(false)}
            className="absolute top-3 right-3 text-cyan-400 hover:text-white transition-colors"
            aria-label="Close rules"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="space-y-5 text-base text-gray-300 leading-relaxed px-1">
            <h3 className="text-3xl text-center text-cyan-300 font-bold tracking-wider mb-4 animate-pulse">
              🎮 Game Rules
            </h3>
            <div>
              <h4 className="font-semibold text-cyan-400 mb-2 text-xl underline decoration-cyan-500 underline-offset-4">
                How to Play
              </h4>
              <ul className="list-disc list-inside space-y-3 marker:text-cyan-400">
                <li>Each player picks a unique emoji category.</li>
                <li>On your turn, place a random emoji from your category onto the grid.</li>
                <li>Line up 3 emojis in a row to win the round and score!</li>
                <li>You may only have 3 emojis on the board — a 4th removes your oldest.</li>
                <li>You can't reuse the position of your removed emoji.</li>
                <li>Play rounds to build your score and outsmart your opponent! 🧠</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}