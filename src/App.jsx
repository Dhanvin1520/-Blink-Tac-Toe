import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import Header from "./components/Header";
import ScoreBoard from "./components/ScoreBoard";
import CategorySelector from "./components/CategorySelector";
import PlayerTurn from "./components/PlayerTurn";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";

const EMOJI_CATEGORIES = {
  animals: { name: "Animals", emojis: ["🐶", "🐱", "🐵", "🐰", "🦊", "🐻", "🐼", "🐨"] },
  food: { name: "Food", emojis: ["🍕", "🍟", "🍔", "🍩", "🌮", "🍰", "🍪", "🧁"] },
  sports: { name: "Sports", emojis: ["⚽", "🏀", "🏈", "🎾", "🏐", "🏓", "🥎", "🏑"] },
  nature: { name: "Nature", emojis: ["🌸", "🌺", "🌻", "🌷", "🌹", "🌼", "🌿", "🍀"] },
  space: { name: "Space", emojis: ["🌟", "⭐", "🌙", "☀️", "🪐", "🌍", "🚀", "👽"] },
  magic: { name: "Magic", emojis: ["✨", "🔮", "🎭", "🎪", "🎨", "🎯", "🎲", "🃏"] },
};

const Player = { 1: 1, 2: 2 };
const GameState = {
  categorySelection: "category-selection",
  playing: "playing",
  gameOver: "game-over",
};

function AnimatedBackground() {
  return (
    <Stars radius={100} depth={50} count={2000} factor={8} saturation={0} fade speed={3} />
  );
}

const playSound = (type, volume = 0.3) => {
  if (typeof window === "undefined") return;

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

  switch (type) {
    case "place":
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      break;
    case "vanish":
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
      break;
    case "win":
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
      break;
    case "select":
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      break;
  }

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
};

export default function BlinkTacToe() {
  const [gameState, setGameState] = useState(GameState.categorySelection);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(Player[1]);
  const [playerCategories, setPlayerCategories] = useState({ 1: "", 2: "" });
  const [playerMoves, setPlayerMoves] = useState({ 1: [], 2: [] });
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animatingCells, setAnimatingCells] = useState(new Set());
  const [winningCells, setWinningCells] = useState([]);
  const [helpOpen, setHelpOpen] = useState(false);

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (
        board[a] &&
        board[b] &&
        board[c] &&
        board[a].player === board[b].player &&
        board[a].player === board[c].player
      ) {
        return { winner: board[a].player, winningCells: [a, b, c] };
      }
    }

    return { winner: null, winningCells: [] };
  };

  const getRandomEmoji = (player) => {
    const category = playerCategories[player];
    const emojis = EMOJI_CATEGORIES[category].emojis;
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const handleCellClick = (index) => {
    if (gameState !== GameState.playing || board[index] || winner) return;

    const newBoard = [...board];
    const playerMovesCopy = { ...playerMoves };
    const emoji = getRandomEmoji(currentPlayer);

    if (playerMovesCopy[currentPlayer].length >= 3) {
      const oldestMoveIndex = playerMovesCopy[currentPlayer][0];

      if (index === oldestMoveIndex) {
        if (soundEnabled) playSound("select");
        return;
      }

      setAnimatingCells((prev) => new Set([...prev, oldestMoveIndex]));
      if (soundEnabled) playSound("vanish");

      setTimeout(() => {
        newBoard[oldestMoveIndex] = null;
        setAnimatingCells((prev) => {
          const newSet = new Set(prev);
          newSet.delete(oldestMoveIndex);
          return newSet;
        });
      }, 300);

      playerMovesCopy[currentPlayer] = playerMovesCopy[currentPlayer].slice(1);
    }

    newBoard[index] = { emoji, player: currentPlayer, timestamp: Date.now() };
    playerMovesCopy[currentPlayer].push(index);

    setBoard(newBoard);
    setPlayerMoves(playerMovesCopy);

    if (soundEnabled) playSound("place");

    const { winner: gameWinner, winningCells } = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setWinningCells(winningCells);
      setScores((prev) => ({ ...prev, [gameWinner]: prev[gameWinner] + 1 }));
      setGameState(GameState.gameOver);
      if (soundEnabled) playSound("win");
    } else {
      setCurrentPlayer(currentPlayer === Player[1] ? Player[2] : Player[1]);
    }
  };

  const startNewGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(Player[1]);
    setPlayerMoves({ 1: [], 2: [] });
    setWinner(null);
    setWinningCells([]);
    setAnimatingCells(new Set());
    setGameState(GameState.playing);
  };

  const resetGame = () => {
    setGameState(GameState.categorySelection);
    setBoard(Array(9).fill(null));
    setCurrentPlayer(Player[1]);
    setPlayerCategories({ 1: "", 2: "" });
    setPlayerMoves({ 1: [], 2: [] });
    setWinner(null);
    setWinningCells([]);
    setScores({ 1: 0, 2: 0 });
    setAnimatingCells(new Set());
  };

  const selectCategory = (player, category) => {
    const newCategories = { ...playerCategories, [player]: category };
    setPlayerCategories(newCategories);
    if (soundEnabled) playSound("select");

    if (newCategories[1] && newCategories[2] && newCategories[1] !== newCategories[2]) {
      setTimeout(() => setGameState(GameState.playing), 500);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-purple-950 to-black">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
          <AnimatedBackground />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <Header
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            helpOpen={helpOpen}
            setHelpOpen={setHelpOpen}
            resetGame={resetGame}
          />
          {gameState === GameState.playing && (
            <ScoreBoard scores={scores} />
          )}
          {gameState === GameState.categorySelection && (
            <CategorySelector
              playerCategories={playerCategories}
              selectCategory={selectCategory}
              EMOJI_CATEGORIES={EMOJI_CATEGORIES}
            />
          )}
          {(gameState === GameState.playing || gameState === GameState.gameOver) && (
            <div className="space-y-6">
              {gameState === GameState.playing && (
                <PlayerTurn
                  currentPlayer={currentPlayer}
                  playerCategories={playerCategories}
                  playerMoves={playerMoves}
                  EMOJI_CATEGORIES={EMOJI_CATEGORIES}
                />
              )}
              <GameBoard
                board={board}
                gameState={gameState}
                handleCellClick={handleCellClick}
                animatingCells={animatingCells}
                winningCells={winningCells}
              />
              {gameState === GameState.gameOver && winner && (
                <GameOver
                  winner={winner}
                  playerCategories={playerCategories}
                  EMOJI_CATEGORIES={EMOJI_CATEGORIES}
                  startNewGame={startNewGame}
                  resetGame={resetGame}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}