import React from "react";

function AccountInfoCard({ data, title, rowStart, rowEnd }: any) {
  return (
    <div
      className={`flex flex-col col-start-1 row-start-${rowStart} row-end-${rowEnd} col-end-5 bg-slate-50 rounded grow shadow-md mb-3 mx-2 p-5 lg:p-8 lg:mb-4`}
    >
      <h3 className="font-epilogue text-3xl font-bold mb-6 lg:text-5xl">
        {title}
      </h3>
      <div className="flex flex-col font-inter lg:flex-row">
        <div className="rounded-xl w-full mb-2 bg-green-100 px-3 py-4 mr-3 flex items-center justify-between lg:w-[50%]">
          <div className="flex items-center">
            <svg
              className="w-8 h-8 fill-green-600 bg-green-600 rounded-full p-1"
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
            <span className="text-md ml-2 font-medium text-green-600">
              Problemas resueltos
            </span>
          </div>
          <span className="text-2xl font-bold text-green-700">
            {data.solved}
          </span>
        </div>
        <div className="rounded-xl w-full mb-2 bg-blue-100 px-3 py-4 mr-3 flex items-center justify-between lg:w-[50%]">
          <div className="flex items-center">
            <svg
              className="w-8 h-8 fill-blue-600 bg-blue-600 rounded-full p-1"
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
                d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                className="fill-blue-600 bg-blue-200 text-white"
              />
            </svg>

            <span className="text-md ml-2 font-medium text-blue-600">
              Horas entrenadas
            </span>
          </div>
          <span className="text-2xl font-bold text-blue-700">
            {data.time.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="flex flex-col font-inter lg:flex-row">
        <div className="rounded-xl w-full mb-2 bg-red-100 px-3 py-4 mr-3 flex items-center justify-between lg:w-[50%]">
          <div className="flex items-center">
            <svg
              className="w-8 h-8 fill-red-600 bg-red-600 rounded-full p-1"
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
            <span className="text-md ml-2 font-medium text-red-600">
              Problemas errados
            </span>
          </div>
          <span className="text-2xl font-bold text-red-700">
            {data.mistake}
          </span>
        </div>
        <div className="rounded-xl w-full mb-2 bg-cyan-100 px-3 py-4 mr-3 flex items-center justify-between lg:w-[50%]">
          <div className="flex items-center">
            <svg
              className="w-8 h-8 fill-cyan-600 bg-cyan-600 rounded-full p-1"
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
                className="fill-cyan-600 bg-cyan-200 text-white"
                d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
              />
            </svg>

            <span className="text-md ml-2 font-medium text-cyan-600">
              Precisión
            </span>
          </div>
          <span className="text-2xl font-bold text-cyan-700">
            {((1000 * data.solved) / data.mistake).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AccountInfoCard;
