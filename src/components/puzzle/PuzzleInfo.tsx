import { Puzzle } from "../../types";
import Timer from "../Timer";

function PuzzleInfo({
  updateTimeFunction,
  puzzleData,
}: {
  updateTimeFunction: any;
  puzzleData: Puzzle;
}) {
  return (
    <>
      <div className="bg-slate-50 rounded shadow-md mb-2 mr-1 p-5 w-auto row-span-1 col-start-1 col-end-1 lg:w-64 lg:mb-4 ">
        <h3>Puzzle número {puzzleData.id}</h3>
        <h4>Dificultad: {puzzleData.difficulty}</h4>
        <a
          href={`https://lichess.org/analysis/standard/${puzzleData.fen}`}
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          {puzzleData.played_by != "" ? puzzleData.played_by : "Ver en lichess"}
        </a>
      </div>
      <div className="bg-slate-50 rounded shadow-md mb-2 mr-1 p-5 w-auto row-span-1 col-start-2 col-end-2 lg:w-64 lg:mb-4">
        <h3>Tiempo</h3>
        <h4>
          <Timer updateTimeFunction={updateTimeFunction}></Timer>
        </h4>
      </div>
    </>
  );
}

export default PuzzleInfo;
