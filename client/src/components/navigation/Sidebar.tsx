import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function Sidebar() {
  const authContext = useContext(AuthContext);

  return (
    <div className="hidden md:flex flex-col gap-2 items-center w-[320px] max-w-[320px] min-h-[100vh] border-r shadow-xl">
      <div>
        <img src={logo} width={140} alt="logo" />
      </div>
      <div className="pl-6 w-[220px]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-4 group font-medium tracking-wide ${
              isActive ? "text-slate-700" : "text-slate-500"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <svg
                className={`rounded-full p-2 transition-colors duration-300 
            ${
              isActive
                ? "bg-[#689F1F] text-white"
                : "bg-slate-200 text-slate-700"
            } 
            group-hover:bg-[#1c7dd8] group-hover:text-white`}
                xmlns="http://www.w3.org/2000/svg"
                width={38}
                height={38}
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3c0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8c24.9-25 24.9-65.5-.1-90.5"
                />
              </svg>
              <span className="transition-colors duration-300 group-hover:text-slate-900">
                Home
              </span>
            </>
          )}
        </NavLink>
      </div>

      <div className="pl-6 w-[220px]">
        <NavLink
          to="/recipes"
          className={({ isActive }) =>
            `flex items-center gap-4 group font-medium tracking-wide ${
              isActive ? "text-slate-700" : "text-slate-500"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <svg
                className={`rounded-full p-1 transition-colors duration-300 
            ${
              isActive
                ? "bg-[#689F1F] text-white"
                : "bg-slate-200 text-slate-700"
            } 
            group-hover:bg-[#1c7dd8] group-hover:text-white`}
                xmlns="http://www.w3.org/2000/svg"
                width={38}
                height={38}
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M41.84 23.79c-4.42-.12-9.53 1.11-13.24 4.82s-4.94 8.82-4.82 13.24c.13 4.42 1.34 8.64 3.19 12.95c3.7 8.62 10.1 17.64 18.6 26.14c3.72 3.72 7.53 7.01 11.37 9.87l12.91-12.94c-3.75-2.59-7.72-5.83-11.55-9.66c-7.13-7.12-12.34-14.78-14.78-20.5c-1.1-2.56-1.54-4.58-1.66-5.84c1.25.12 3.28.56 5.84 1.66c5.71 2.45 13.37 7.66 20.49 14.78c3.83 3.82 7.08 7.79 9.67 11.54l12.91-12.93c-2.86-3.83-6.14-7.63-9.85-11.34c-8.5-8.5-17.51-14.9-26.13-18.6c-4.31-1.84-8.53-3.07-12.95-3.19m60.96 46.54L70.31 102.9L216 248.5l32.5-32.5zM263.9 226l-16.7 16.7c24.2 20.8 54.6 49.2 86.9 81.5c35.8 35.8 66.9 69.4 88.1 94.7q8.1 9.6 14.1 17.4c-5.2-4-11-8.7-17.4-14c-25.3-21.3-58.9-52.4-94.7-88.2c-32.3-32.3-60.7-62.7-81.5-86.9L226 263.9c23.9 36.3 39.5 77.1 55.3 114c17 39.9 34.3 75.9 65.8 94.7l.3.2l.3.2c47.4 23.6 91.4 18.5 117.3-6.9c.2-.1.4-.3.6-.5s.4-.4.5-.6c25.4-25.9 30.5-69.9 6.9-117.2c-13.8-27.5-49.5-43.8-90.7-62.2c-38.2-17.1-81.7-35.3-118.4-59.6"
                ></path>
              </svg>
              <span className="transition-colors duration-300 group-hover:text-slate-900">
                Recipes
              </span>
            </>
          )}
        </NavLink>
      </div>

      <div className="pl-6 w-[220px]">
        <NavLink
          to="/inspiration"
          className={({ isActive }) =>
            `flex items-center gap-4 group font-medium tracking-wide ${
              isActive ? "text-slate-700" : "text-slate-500"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <svg
                className={`rounded-full p-1.5 transition-colors duration-300 
            ${
              isActive
                ? "bg-[#689F1F] text-white"
                : "bg-slate-200 text-slate-700"
            } 
            group-hover:bg-[#1c7dd8] group-hover:text-white`}
                xmlns="http://www.w3.org/2000/svg"
                width={38}
                height={38}
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M18 13a4 4 0 1 0-2.225-7.325M6 13a4 4 0 1 1 2.225-7.325m7.55 0a4.002 4.002 0 0 0-7.55 0m7.55 0A4 4 0 0 1 15.874 8m-6.41-1a4 4 0 0 0-1.24-1.325M6 17.5c1.599-.622 3.7-1 6-1s4.401.378 6 1M5 21c1.866-.622 4.316-1 7-1s5.134.378 7 1m-1-9v8M6 12v8"
                ></path>
              </svg>
              <span className="transition-colors duration-300 group-hover:text-slate-900">
                Get inspired
              </span>
            </>
          )}
        </NavLink>
      </div>

      <div className="pl-6 w-[220px]">
        <NavLink
          to="/plan"
          className={({ isActive }) =>
            `flex items-center gap-4 group font-medium tracking-wide ${
              isActive ? "text-slate-700" : "text-slate-500"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <svg
                className={`rounded-full p-1.5 transition-colors duration-300 
            ${
              isActive
                ? "bg-[#689F1F] text-white"
                : "bg-slate-200 text-slate-700"
            } 
            group-hover:bg-[#1c7dd8] group-hover:text-white`}
                xmlns="http://www.w3.org/2000/svg"
                width={38}
                height={38}
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.7}
                  d="M2 12h20m-2 0v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8m0-4l16-4M8.86 6.78l-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"
                ></path>
              </svg>
              <span className="transition-colors duration-300 group-hover:text-slate-900">
                My Weekly Plan
              </span>
            </>
          )}
        </NavLink>
      </div>

      <div className="pl-6 w-[220px]">
        {!authContext?.isLoading && (
          <>
            {!authContext?.user ? (
              <>
                <NavLink
                  to="/auth/login"
                  className={({ isActive }) =>
                    `flex items-center gap-4 group font-medium tracking-wide ${
                      isActive ? "text-slate-700" : "text-slate-500"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <svg
                        className={`rounded-full p-2 transition-colors duration-300 
            ${
              isActive
                ? "bg-[#689F1F] text-white"
                : "bg-slate-200 text-slate-700"
            } 
            group-hover:bg-[#1c7dd8] group-hover:text-white`}
                        xmlns="http://www.w3.org/2000/svg"
                        width={38}
                        height={38}
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M7.5 9V6.5a4.5 4.5 0 0 1 9 0V9H19a1 1 0 0 1 1 .999V21a.997.997 0 0 1-1 1H5a1 1 0 0 1-1-.999V10a.997.997 0 0 1 1-1zM9 9h6V6.5a3 3 0 0 0-6 0zm2.4 6.875V18h1.2v-2.125a1.5 1.5 0 1 0-1.2 0"
                        ></path>
                      </svg>
                      <span className="transition-colors duration-300 group-hover:text-slate-900">
                        Admin
                      </span>
                    </>
                  )}
                </NavLink>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <NavLink
                  to="/approveIngredients"
                  className={({ isActive }) =>
                    `flex items-center gap-4 group font-medium tracking-wide ${
                      isActive ? "text-slate-700" : "text-slate-500"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <svg
                        className={`rounded-full p-2 transition-colors duration-300 
            ${
              isActive
                ? "bg-[#689F1F] text-white"
                : "bg-slate-200 text-slate-700"
            } 
            group-hover:bg-[#1c7dd8] group-hover:text-white`}
                        xmlns="http://www.w3.org/2000/svg"
                        width={38}
                        height={38}
                      >
                        <path
                          fill="currentColor"
                          d="m16.88 4l2.15 2.1l-5.53 4.4l-1-1L16.87 4zm0-2a2 2 0 0 0-1.55.72L9.8 9.65l3.54 3.54l6.94-5.52c.9-.76.97-2.13.13-2.97L18.3 2.59c-.4-.4-.91-.59-1.42-.59M9.1 10.36l-.71.71a1.02 1.02 0 0 0 0 1.43l2.11 2.1c.21.2.46.29.72.29s.51-.09.71-.29l.7-.7zM6 15c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1m3 1c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1m-5 2c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1m3 1c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1"
                        />
                      </svg>

                      <span className="transition-colors duration-300 group-hover:text-slate-900">
                        Ingredients
                      </span>
                    </>
                  )}
                </NavLink>
                <NavLink
                  to="/createNewRecipe"
                  className={({ isActive }) =>
                    `flex items-center gap-4 group font-medium tracking-wide ${
                      isActive ? "text-slate-700" : "text-slate-500"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <svg
                        className={`rounded-full p-2 transition-colors duration-300 
            ${
              isActive
                ? "bg-[#689F1F] text-white"
                : "bg-slate-200 text-slate-700"
            } 
            group-hover:bg-[#1c7dd8] group-hover:text-white`}
                        xmlns="http://www.w3.org/2000/svg"
                        width={38}
                        height={38}
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        >
                          <path d="M21 16.929V10c0-3.771 0-5.657-1.172-6.828S16.771 2 13 2h-1C8.229 2 6.343 2 5.172 3.172S4 6.229 4 10v9.5" />
                          <path d="M21 17H6.5a2.5 2.5 0 0 0 0 5H21" />
                          <path d="M21 22a2.5 2.5 0 0 1 0-5M14.388 6.85a1.97 1.97 0 0 1 1.112-.341c1.105 0 2 .903 2 2.017c0 1.097-.904 2.014-2 2.014v.96c0 .943 0 1.414-.293 1.707s-.764.293-1.707.293h-2c-.943 0-1.414 0-1.707-.293S9.5 12.443 9.5 11.5v-.835c-1.168 0-2-.87-2-2.139c0-1.114.895-2.017 2-2.017c.412 0 .794.125 1.112.34A2 2 0 0 1 12.5 5.5c.872 0 1.614.563 1.888 1.35m0 0q.11.314.112.668" />
                        </g>
                      </svg>
                      <span className="transition-colors duration-300 group-hover:text-slate-900">
                        New recipe
                      </span>
                    </>
                  )}
                </NavLink>

                <button
                  onClick={() => authContext.logout()}
                  className="flex items-center gap-4 group font-medium tracking-wide text-slate-500 hover:text-slate-700"
                >
                  <svg
                    className="rounded-full p-2 transition-colors duration-300 
      bg-slate-200 text-slate-700 
      group-hover:bg-[#1c7dd8] group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width={38}
                    height={38}
                    viewBox="0 0 26 24"
                  >
                    <path
                      fill="currentColor"
                      d="M14.945 1.25c-1.367 0-2.47 0-3.337.117c-.9.12-1.658.38-2.26.981c-.524.525-.79 1.17-.929 1.928c-.135.737-.161 1.638-.167 2.72a.75.75 0 0 0 1.5.008c.006-1.093.034-1.868.142-2.457c.105-.566.272-.895.515-1.138c.277-.277.666-.457 1.4-.556c.755-.101 1.756-.103 3.191-.103h1c1.436 0 2.437.002 3.192.103c.734.099 1.122.28 1.4.556c.276.277.456.665.555 1.4c.102.754.103 1.756.103 3.191v8c0 1.435-.001 2.436-.103 3.192c-.099.734-.279 1.122-.556 1.399s-.665.457-1.399.556c-.755.101-1.756.103-3.192.103h-1c-1.435 0-2.436-.002-3.192-.103c-.733-.099-1.122-.28-1.399-.556c-.243-.244-.41-.572-.515-1.138c-.108-.589-.136-1.364-.142-2.457a.75.75 0 1 0-1.5.008c.006 1.082.032 1.983.167 2.72c.14.758.405 1.403.93 1.928c.601.602 1.36.86 2.26.982c.866.116 1.969.116 3.336.116h1.11c1.368 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982s.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337v-8.11c0-1.367 0-2.47-.116-3.337c-.121-.9-.38-1.658-.982-2.26s-1.36-.86-2.26-.981c-.867-.117-1.97-.117-3.337-.117z"
                    />
                    <path
                      fill="currentColor"
                      d="M15 11.25a.75.75 0 0 1 0 1.5H4.027l1.961 1.68a.75.75 0 1 1-.976 1.14l-3.5-3a.75.75 0 0 1 0-1.14l3.5-3a.75.75 0 1 1 .976 1.14l-1.96 1.68z"
                    />
                  </svg>
                  <span className="transition-colors duration-300 group-hover:text-slate-900">
                    Logout
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
