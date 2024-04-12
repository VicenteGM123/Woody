import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { Square } from "react-chessboard/dist/chessboard/types";
import { moveTryStatus } from "../../types";
import { GameProps } from "../../types";

function Game({
  puzzles,
  nextPuzzle,
  setMoveTry,
  puzzleDoneSender,
}: GameProps): JSX.Element {
  const chess = useMemo(() => new Chess(puzzles[0].fen), []);
  const [fen, setFen] = useState(chess.fen());
  const [solutions, setSolutions] = useState<string[]>(puzzles[0].solution);
  const [alternatives, setAlternatives] = useState<string[][]>(
    puzzles[0].alternatives
  );
  const [pieceDraggable, setPieceDraggable] = useState(true);

  useEffect(() => {
    chess.load(puzzles[0].fen);
    setFen(puzzles[0].fen);
    setSolutions(puzzles[0].solution);
    setAlternatives(puzzles[0].alternatives);
    setPieceDraggable(true);
  }, [puzzles[0]]);

  function onIncorrectMove() {
    setTimeout(function () {
      nextPuzzle();
      setMoveTry(moveTryStatus.Initial);
    }, 2000);
  }

  function onDrop(
    sourceSquare: Square,
    targetSquare: Square,
    piece: string
  ): boolean {
    const moveData = {
      from: sourceSquare,
      to: targetSquare,
      color: chess.turn(),
      piece: piece,
      promotion: piece[1].toLowerCase() ?? "q",
    };
    if (piece[0] != chess.turn()) return false;
    if (sourceSquare === targetSquare) return false;
    const chessCopy = new Chess(chess.fen());
    const result = makeAMove(chessCopy, moveData);
    if (result === null) {
      return false;
    }

    const pieceMoved = chess.get(sourceSquare);
    const uciMove =
      `${sourceSquare}${targetSquare}` +
      (pieceMoved && pieceMoved.type === "p" && piece[1]?.toLowerCase() !== "p"
        ? piece[1].toLowerCase()
        : "");
    if (alternatives[0].includes(uciMove)) {
      setMoveTry(moveTryStatus.Alternative);
      return false;
    }
    if (uciMove != solutions[0]) {
      setMoveTry(moveTryStatus.Incorrect);
      puzzleDoneSender(false);
      setPieceDraggable(false);
      onIncorrectMove();
      return false;
    }
    const moved = makeAMove(chess, moveData);
    setFen(chess.fen());
    if (moved) {
      setMoveTry(moveTryStatus.Correct);
      if (solutions.length <= 2) {
        nextPuzzle();
        setMoveTry(moveTryStatus.Initial);
        puzzleDoneSender(true);
        return true;
      }
      solutions.shift();
      alternatives.shift();
      chess.move(solutions[0]);
      solutions.shift();
      alternatives.shift();
      setFen(chess.fen());
      return true;
    } else {
      return false;
    }
  }

  const makeAMove = useCallback(
    (chessInstance: Chess, moveData: any) => {
      try {
        const result = chessInstance.move(moveData);
        return result;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    [chess]
  );

  return (
    <div className="board w-full h-full">
      <Chessboard
        position={fen}
        onPieceDrop={onDrop}
        boardOrientation={puzzles[0].turn as "white" | "black"}
        animationDuration={100}
        arePiecesDraggable={pieceDraggable}
      />
    </div>
  );
}

export default Game;
