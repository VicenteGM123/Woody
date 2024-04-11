import React from "react";
import { Puzzle, moveTryStatus } from "../../types";
import blackKnight from "../../assets/black-knight.svg";
import whiteKnight from "../../assets/white-knight.svg";

function renderStatusIcon(moveTry: moveTryStatus, puzzles: any[]) {
  switch (moveTry) {
    case moveTryStatus.Initial:
      return puzzles[0].turn === "white" ? (
        <img
          src={whiteKnight}
          alt=""
          className="w-24 h-auto self-center lg:w-28"
        />
      ) : (
        <img
          src={blackKnight}
          alt=""
          className="w-24 h-auto self-center lg:w-28"
        />
      );
    case moveTryStatus.Correct:
      return (
        <svg
          className="aspect-square w-24 h-auto fill-green-600 bg-green-600 rounded-full mt-3 self-center lg:w-24"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            className="fill-green-600 bg-green-200 text-white"
          />
        </svg>
      );
    case moveTryStatus.Incorrect:
      return (
        <svg
          className="aspect-square w-24 h-auto fill-red-600 bg-red-600 rounded-full mt-3 self-center lg:w-24"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="fill-red-600 bg-red-200 text-white"
            d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      );
    case moveTryStatus.Alternative:
      return (
        <svg
          className="aspect-square w-24 h-auto fill-yellow-600 bg-yellow-600 rounded-full mt-3 self-center lg:w-24"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            className="fill-yellow-600 bg-yellow-200 text-white"
          />
        </svg>
      );
    default:
      return null;
  }
}

function PuzzleStatus({
  moveTry,
  puzzles,
}: {
  moveTry: moveTryStatus;
  puzzles: Puzzle[];
}) {
  let message = "";
  switch (moveTry) {
    case moveTryStatus.Initial:
      message = `Juegan ${puzzles[0].turn === "white" ? "blancas" : "negras"}`;
      break;
    case moveTryStatus.Correct:
      message = "Movimiento correcto, continúa";
      break;
    case moveTryStatus.Incorrect:
      message = "Movimiento incorrecto";
      break;
    case moveTryStatus.Alternative:
      message = "Alternativa, hay una jugada mejor";
      break;
    default:
      break;
  }

  return (
    <div className="flex flex-col justify-between bg-slate-50 rounded shadow-md mr-1 p-5 w-auto mb-2 row-span-2 col-start-1 col-end-3 lg:mb-4 lg:w-64">
      <h3>{message}</h3>
      {renderStatusIcon(moveTry, puzzles)}
    </div>
  );
}

export default PuzzleStatus;
