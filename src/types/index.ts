export enum moveTryStatus {
  Initial = "INITIAL",
  Correct = "CORRECT",
  Incorrect = "INCORRECT",
  Alternative = "ALTERNATIVE",
}

export interface Puzzle {
  id: number;
  fen: string;
  solution: string[];
  alternatives: string[][];
  played_by: string;
  turn: string;
  difficulty: string;
}

export interface GameProps {
  puzzles: Puzzle[];
  nextPuzzle: () => void;
  setMoveTry: (status: moveTryStatus) => void;
  puzzleDoneSender: (correct: boolean) => void;
}
