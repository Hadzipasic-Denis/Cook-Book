import { NavLink } from "react-router-dom";
import Sidebar from "../navigation/Sidebar";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function Login() {
  const authContext = useContext(AuthContext);

  type Inputs = {
    email: string;
    password: string;
  };

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    authContext?.login(data);
  };

  return (
    <div className="flex w-full">
      <Sidebar />
            <div className="w-full bg-slate-50">

      <div className="mx-auto flex justify-center px-6 py-12">
        <div className="drop-shadow-2xl max-h-fit min-w-[450px] bg-white dark:bg-gray-700 p-4 rounded-xl">
          <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
            Login to Your Account!
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col px-2 pt-4 pb-4 mb-4 bg-white dark:bg-gray-800 rounded lg:px-8"
          >
            <div className="flex justify-center gap-2">
              <div className="w-[90%]">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                  htmlFor="email"
                >
                  E-Mail
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border border-gray-300 rounded shadow appearance-none focus:outline-none focus:border-blue-500 focus:border-blue-500 focus:shadow-outline-blue-blue"
                  id="email"
                  type="email"
                  placeholder="E-Mail"
                  {...register("email", { required: true })}
                />
              </div>
            </div>

            <div className="flex justify-center gap-2">
              <div className="w-[90%]">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                  id="password"
                  type="password"
                  placeholder="******************"
                  {...register("password", { required: true })}
                />
              </div>
            </div>

            <div className="my-6 text-center">
              <button
                className={`w-6/12 px-4 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:shadow-outlinew bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900 font-medium text-white tracking-wider`}
                type="submit"
              >
                Login
              </button>
            </div>

            <hr className="mb-6 border-t" />
            <div className="text-center">
              <NavLink
                className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                to={"/resetAccountPassword"}
              >
                Forgot password?
              </NavLink>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}
