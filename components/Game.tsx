import { useState } from "react";
import styles from "../styles/Game.module.css";
import { calculateWinner } from "../utils/game";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const nextPlayer = xIsNext ? "X" : "O";

  function handleClick(i: number) {
    const currentHistory = history.slice(0, stepNumber + 1);
    if (winner || current.squares[i]) {
      return;
    }
    const newSquares = [...current.squares];
    newSquares[i] = nextPlayer;
    setHistory([...currentHistory, { squares: newSquares }]);
    setXIsNext(!xIsNext);
    setStepNumber(currentHistory.length);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const status = winner ? `winner: ${winner}` : `Next player: ${nextPlayer}`;

  const moves = history.map((step, move) => {
    const description = move ? `GO to move # + ${move}` : "Go to move start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className={styles.game}>
      <div className={styles.gameBoard}>
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className={styles.gameInfo}>
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
