import React, { useEffect, useState } from "react";
import Game from "../components/puzzle/Game";
import puzzlesRaw from "../assets/puzzles.json";
import { Puzzle, moveTryStatus } from "../types";
import { useAuth0 } from "@auth0/auth0-react";
import { GridLoader } from "react-spinners";
import axios from "axios";
import PuzzleStatus from "../components/puzzle/PuzzleStatus";
import PuzzleInfo from "../components/puzzle/PuzzleInfo";

function Train() {
  const [puzzles, setPuzzles] = useState<Puzzle[]>(puzzlesRaw as Puzzle[]);
  const [moveTry, setMoveTry] = useState(moveTryStatus.Initial);
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [data, setData] = useState({
    solvedLW: 0,
    mistakeLW: 0,
    timeLW: 0,
    solvedC: 0,
    mistakeC: 0,
    timeC: 0,
    solvedG: 0,
    mistakeG: 0,
    timeG: 0,
    getted: false,
  });

  const nextPuzzle = () => {
    const newPuzzles = [...puzzles];
    newPuzzles.shift();
    setPuzzles(newPuzzles);
  };

  const updateTimeFunction = async (seconds: number) => {
    const url = `https://script.google.com/macros/s/AKfycbyLnK0WdIetELe_eYgijjjAQG4t9Ng-gEq0Afm_qr9zO3M3tFFGrgOki0MZ0nOC6Ti5/exec?username=${
      user?.sub ?? ""
    }`;
    const data = { type: "time", value: seconds / 60 / 60 };

    try {
      await axios.post(url, data, {
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      });
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  const puzzleDoneSender = async (correct: boolean) => {
    const url = `https://script.google.com/macros/s/AKfycbyLnK0WdIetELe_eYgijjjAQG4t9Ng-gEq0Afm_qr9zO3M3tFFGrgOki0MZ0nOC6Ti5/exec?username=${
      user?.sub ?? ""
    }`;
    const data = { type: correct ? "correct" : "incorrect" };

    try {
      await axios.post(url, data, {
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      });
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://script.google.com/macros/s/AKfycbyLnK0WdIetELe_eYgijjjAQG4t9Ng-gEq0Afm_qr9zO3M3tFFGrgOki0MZ0nOC6Ti5/exec?username=${
            user?.sub ?? ""
          }`
        );
        if (response.ok) {
          const responseData = await response.json();
          setData({ ...responseData, getted: true });
          const completedPuzzles = responseData.solvedC + responseData.mistakeC;
          setPuzzles(puzzlesRaw.slice(completedPuzzles) as Puzzle[]);
        } else {
          // Manejar el caso de error si es necesario
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    if (isAuthenticated && user) {
      fetchData();
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <GridLoader color="#36d7b7" />
      </div>
    );
  }

  if (!data.getted) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <GridLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-wrap justify-center mt-5 font-inter mb-8 flex-col-reverse lg:mt-10 lg:flex-row">
      <div className="grid grid-cols-2 justify-start items-start w-[min(95vmin,100%)] mt-6 self-center mr-0 lg:mt-0 lg:mr-3 lg:self-auto lg:w-auto lg:flex lg:flex-col">
        <PuzzleStatus moveTry={moveTry} puzzles={puzzles} />
        <PuzzleInfo
          updateTimeFunction={updateTimeFunction}
          puzzleData={puzzles[0]}
        />
      </div>
      <div className="h-[min(95vmin,100%)] w-[min(95vmin,100%)] self-center lg:self-auto lg:h-[80vmin] lg:w-[80vmin]">
        <Game
          puzzles={puzzles}
          nextPuzzle={nextPuzzle}
          setMoveTry={setMoveTry}
          puzzleDoneSender={puzzleDoneSender}
        ></Game>
      </div>
    </div>
  );
}

export default Train;
