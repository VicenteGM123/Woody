import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";
import AccountInfoCard from "../components/home/AccountInfoCard";

const Home = () => {
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
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto w-full flex justify-center">
        <div className="bg-slate-50 min-h-[70vh]  mx-2 shadow-md flex flex-col justify-center p-5 mt-5 mb-5 lg:max-w-[1400px] lg:min-h-full lg:mt-10 grow">
          <svg
            className="w-32 h-32 text-gray-800 self-center"
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
              d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <h3 className="font-inter text-4xl font-semibold text-center mt-5">
            Inicia sesión para ver tus datos
          </h3>
        </div>
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
    <div className="container max-w-[900px] mx-auto flex flex-col-reverse w-full lg:grid lg:grid-cols-5 lg:grid-rows-3 justify-start mt-5 mb-5 flex-wrap lg:max-w-[1400px] lg:mt-10 ">
      <AccountInfoCard
        title="Última semana"
        data={{
          solved: data.solvedLW,
          mistake: data.mistakeLW,
          time: data.timeLW,
        }}
        rowStart={1}
        rowEnd={2}
      />
      <AccountInfoCard
        title="Ciclo actual"
        data={{
          solved: data.solvedC,
          mistake: data.mistakeC,
          time: data.timeC,
        }}
        rowStart={2}
        rowEnd={3}
      />
      <AccountInfoCard
        title="General"
        data={{
          solved: data.solvedG,
          mistake: data.mistakeG,
          time: data.timeG,
        }}
        rowStart={3}
        rowEnd={4}
      />
      <div className="mx-2 sm:mx-2 col-start-5 col-end-6 row-start-1 row-end-4 font-inter">
        <div className="bg-slate-50 rounded shadow-md mb-3 p-5 lg:mb-2 lg:w-full">
          <h4 className="text-3xl font-semibold">
            {1128 - data.solvedC + data.mistakeC}
          </h4>
          <h3 className="text-lg">Problemas restantes ciclo actual</h3>
        </div>
        <div className="bg-slate-50 rounded shadow-md mb-3 p-5 lg:mb-2 lg:w-full">
          <h4 className="text-3xl font-semibold">
            {((100 * data.solvedG) / (data.mistakeG + data.solvedG)).toFixed(2)}
          </h4>
          <h3 className="text-lg">Precisión</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
