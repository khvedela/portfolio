import { useState, useEffect, useCallback, useRef } from "react";

interface Position {
  x: number;
  y: number;
}

interface SnakeGameProps {
  onGameOver: (score: number) => void;
  onQuit: () => void;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const TerminalSnake = ({ onGameOver, onQuit }: SnakeGameProps) => {
  const GRID_SIZE = 15;
  const CELL_SIZE = 20;
  const GAME_SPEED = 120; // Faster update for better responsiveness

  const [snake, setSnake] = useState<Position[]>([{ x: 7, y: 7 }]);
  const [food, setFood] = useState<Position>({ x: 3, y: 3 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Use refs to prevent stale closure issues
  const directionRef = useRef<Direction>("RIGHT");
  const directionQueueRef = useRef<Direction[]>([]);
  const lastDirectionRef = useRef<Direction>("RIGHT");

  const generateFood = useCallback(
    (currentSnake: Position[]): Position => {
      let newFood: Position;
      do {
        newFood = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        };
      } while (
        currentSnake.some(
          (segment) => segment.x === newFood.x && segment.y === newFood.y
        )
      );
      return newFood;
    },
    [GRID_SIZE]
  );

  const checkCollision = useCallback(
    (head: Position, snakeBody: Position[]): boolean => {
      // Wall collision
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        return true;
      }
      // Self collision
      return snakeBody.some(
        (segment) => segment.x === head.x && segment.y === head.y
      );
    },
    [GRID_SIZE]
  );

  const getOppositeDirection = (dir: Direction): Direction => {
    const opposites: Record<Direction, Direction> = {
      UP: "DOWN",
      DOWN: "UP",
      LEFT: "RIGHT",
      RIGHT: "LEFT",
    };
    return opposites[dir];
  };

  const queueDirection = useCallback((newDirection: Direction) => {
    // Get the last direction (either from queue or current direction)
    const lastDir =
      directionQueueRef.current.length > 0
        ? directionQueueRef.current[directionQueueRef.current.length - 1]
        : lastDirectionRef.current;

    // Only queue if it's not opposite to the last direction
    if (newDirection !== getOppositeDirection(lastDir)) {
      // Limit queue size to 2 to prevent weird behavior
      if (directionQueueRef.current.length < 2) {
        directionQueueRef.current.push(newDirection);
      }
    }
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    // Get next direction from queue if available
    if (directionQueueRef.current.length > 0) {
      directionRef.current = directionQueueRef.current.shift()!;
    }

    lastDirectionRef.current = directionRef.current;

    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };

      switch (directionRef.current) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }

      if (checkCollision(head, prevSnake)) {
        setGameOver(true);
        setHighScore((prev) => Math.max(prev, score));
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check if snake ate food
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameOver, isPaused, food, score, generateFood, checkCollision]);

  const restartGame = () => {
    setSnake([{ x: 7, y: 7 }]);
    setFood({ x: 3, y: 3 });
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    directionRef.current = "RIGHT";
    directionQueueRef.current = [];
    lastDirectionRef.current = "RIGHT";
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onQuit();
        return;
      }

      if (e.key === " ") {
        e.preventDefault();
        if (gameOver) {
          restartGame();
        } else {
          setIsPaused((prev) => !prev);
        }
        return;
      }

      if (e.key.toLowerCase() === "r" && gameOver) {
        e.preventDefault();
        restartGame();
        return;
      }

      if (isPaused || gameOver) return;

      // Immediate direction queuing for responsive controls
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          queueDirection("UP");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          queueDirection("DOWN");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          queueDirection("LEFT");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          queueDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPaused, gameOver, onQuit, queueDirection]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameLoop);
  }, [moveSnake, GAME_SPEED]);

  return (
    <div className="my-4 font-mono">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-primary font-bold">🐍 SNAKE GAME</span>
        <div className="flex gap-4">
          {highScore > 0 && (
            <span className="text-accent">High Score: {highScore}</span>
          )}
          <span className="text-foreground">Score: {score}</span>
        </div>
      </div>

      <div
        className="border-3 border-foreground bg-background relative mx-auto"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {/* Background grid pattern */}
        <div
          className="absolute grid"
          style={{
            top: 0,
            left: 0,
            width: GRID_SIZE * CELL_SIZE,
            height: GRID_SIZE * CELL_SIZE,
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
            <div
              key={i}
              className="bg-foreground/[0.02]"
              style={{
                boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.05)",
              }}
            />
          ))}
        </div>

        {/* Snake segments */}
        {snake.map((segment, index) => (
          <div
            key={`snake-${index}`}
            className={`absolute ${
              index === 0 ? "bg-primary" : "bg-primary/70"
            }`}
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute bg-accent animate-pulse"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        />

        {/* Game Over overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-background/95 flex flex-col items-center justify-center border-4 border-destructive">
            <div className="text-destructive text-2xl font-bold mb-3">
              GAME OVER!
            </div>
            <div className="text-foreground text-lg mb-2">
              Final Score: {score}
            </div>
            {highScore > 0 && score < highScore && (
              <div className="text-muted-foreground text-sm mb-4">
                High Score: {highScore}
              </div>
            )}
            {score === highScore && score > 0 && (
              <div className="text-accent text-sm mb-4 font-bold">
                🏆 NEW HIGH SCORE! 🏆
              </div>
            )}
            <div className="flex gap-4 mt-4">
              <button
                onClick={restartGame}
                className="px-4 py-2 bg-primary text-primary-foreground border-3 border-foreground hover:bg-primary/80 transition-colors font-bold"
              >
                RESTART (R)
              </button>
              <button
                onClick={onQuit}
                className="px-4 py-2 bg-background text-foreground border-3 border-foreground hover:bg-foreground/10 transition-colors font-bold"
              >
                QUIT (ESC)
              </button>
            </div>
          </div>
        )}

        {/* Pause overlay */}
        {isPaused && !gameOver && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <div className="text-primary text-lg font-bold">PAUSED</div>
          </div>
        )}
      </div>

      <div className="mt-2 space-y-1 text-xs text-muted-foreground">
        <div>Controls: ↑↓←→ or WASD to move</div>
        <div>SPACE to pause/restart | R to restart | ESC to quit</div>
      </div>
    </div>
  );
};

export default TerminalSnake;
