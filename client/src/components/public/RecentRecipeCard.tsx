import { NavLink } from "react-router-dom";
import type { Recipe } from "../../../types/types";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecentRecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      <div className="relative overflow-hidden h-80">
        {recipe.image && (
          <img
            src={
              typeof recipe.image === "string"
                ? recipe.image
                : URL.createObjectURL(recipe.image)
            }
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <NavLink
            to={`/recipes/${recipe.id}`}
            className="mx-auto w-[85px] bg-[#1c7dd8] text-white py-1 rounded-md font-medium hover:bg-[#689F1F] transition-colors duration-300 flex items-center justify-center gap-2"
          >
            View
          </NavLink>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{recipe.title}</h3>
            <p className="text-gray-500 text-sm pr-6">
              {recipe.short_description}
            </p>
          </div>
          <div className="text-center flex flex-col gap-2 min-w-[100px]">
            <p
              className={`rounded-md py-1 text-sm font-semibold ring-1 ring-inset tracking-wide
    ${
      recipe.category.toLowerCase() === "breakfast"
        ? "bg-green-50 text-[#689F1F] ring-[#689F1F]"
        : recipe.category.toLowerCase() === "lunch"
        ? "bg-blue-50 text-[#1F6D9F] ring-[#1F6D9F]"
        : recipe.category.toLowerCase() === "dinner"
        ? "bg-red-50 text-[#9F1F1F] ring-[#9F1F1F]"
        : recipe.category.toLowerCase() === "dessert"
        ? "bg-pink-50 text-[#9F1F6D] ring-[#9F1F6D]"
        : "bg-gray-50 text-gray-600 ring-gray-400"
    }`}
            >
              {recipe.category.charAt(0).toUpperCase() +
                recipe.category.slice(1)}
            </p>
            <p className="text-sm text-gray-600 flex gap-1 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 2048 2048"
              >
                <path
                  fill="currentColor"
                  d="M1280 64q0 179 66 330t190 278t190 278t66 330q0 106-27 204t-78 183t-120 156t-155 120t-184 77t-204 28t-204-27t-183-78t-156-120t-120-155t-77-184t-28-204q0-84 18-165t52-155t84-141t113-121q7 38 19 78t28 80t38 76t46 67q20 25 52 25q27 0 45-19t19-46q0-11-3-20t-10-18q-28-41-49-81t-37-82t-23-87t-8-95q0-119 45-224t124-183T992 46t224-46h64zm-256 1856q133 0 249-50t204-137t137-203t50-250q0-151-56-281t-162-236q-130-131-204-289t-88-342q-83 11-153 50t-123 99t-81 135t-29 160q0 78 23 141t68 126q19 26 29 54t11 62q0 40-15 75t-42 61t-61 42t-75 15q-46 0-81-17t-62-46t-48-65t-40-72q-46 73-68 157t-23 171q0 133 50 249t137 204t203 137t250 50"
                ></path>
              </svg>{" "}
              {recipe.kcal} kcal
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => {
              const full = i + 1 <= Math.floor(recipe.rating);
              const half = !full && i < recipe.rating;
              return (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  className="text-yellow-400"
                >
                  <defs>
                    <linearGradient
                      id={`half-grad-${i}`}
                      x1="0"
                      x2="100%"
                      y1="0"
                      y2="0"
                    >
                      <stop offset="50%" stopColor="gold" />
                      <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                  </defs>

                  <polygon
                    points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17.8 5.5 21 7 14 2 9.3 9 8.5 12 2"
                    fill={
                      full ? "gold" : half ? `url(#half-grad-${i})` : "none"
                    }
                    stroke="gold"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              );
            })}
          </div>

          <span className="text-gray-500 text-xs ml-2">({recipe.rating})</span>
        </div>
        <div className="flex mt-4 gap-2">
          {recipe.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="rounded-md bg-sky-50 px-1.5 py-1 text-sm font-medium text-sky-700 ring-1 ring-inset ring-sky-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-sm text-gray-600 mt-3 space-y-1">
          <p className="flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="M511.984 36.128C230.016 36.128.639 265.536.639 547.504c0 177.152 89.68 339.185 239.903 433.408c14.944 9.472 34.688 4.88 44.097-10.096s4.88-34.72-10.096-44.095c-54.096-33.952-99.04-78.048-133.424-128.88l33.552-19.376c15.311-8.848 20.56-28.4 11.712-43.711c-8.88-15.344-28.464-20.56-43.712-11.712l-33.6 19.391c-24.4-50.511-39.297-105.792-43.281-163.424h35.616c17.68 0 32-14.32 32-32s-14.32-32-32-32H65.95c4.24-58.687 19.776-114.304 44.56-164.592l32.16 18.56a31.75 31.75 0 0 0 15.97 4.288c11.055 0 21.807-5.744 27.743-16c8.847-15.312 3.6-34.88-11.712-43.713l-31.84-18.368c32.112-46.832 72.864-87.296 119.984-119.023l18.016 31.2c5.935 10.288 16.687 16 27.743 16a31.75 31.75 0 0 0 15.969-4.288c15.311-8.848 20.56-28.4 11.712-43.712l-17.953-31.072c49.329-23.792 103.68-38.656 160.976-42.816v39.872c0 17.68 14.32 32 32 32s32-14.32 32-32v-40c58.592 4.08 114.128 19.391 164.384 43.95l-17.36 30.049c-8.848 15.311-3.6 34.88 11.712 43.712a31.75 31.75 0 0 0 15.969 4.288c11.055 0 21.807-5.712 27.743-16l17.28-29.936a451.2 451.2 0 0 1 118.88 118.816l-29.968 17.312c-15.311 8.847-20.56 28.4-11.711 43.71c5.935 10.289 16.687 16 27.743 16c5.44 0 10.944-1.375 15.969-4.287l30.127-17.392C938.638 401.839 954 457.39 958.094 516H922.96c-17.68 0-32 14.32-32 32s14.32 32 32 32h35.12c-4.048 56.88-18.592 111.439-42.496 161.312l-31.68-18.288c-15.28-8.848-34.912-3.568-43.712 11.713c-8.848 15.311-3.6 34.88 11.712 43.712L883.68 796.8c-35.103 52.24-81.44 97.393-137.359 131.824c-15.055 9.28-19.712 29.008-10.464 44.032c6.065 9.808 16.529 15.216 27.28 15.216a31.9 31.9 0 0 0 16.753-4.752c152.464-93.904 243.472-256.784 243.472-435.632c0-281.952-229.408-511.36-511.376-511.36zm236.127 411.6c15.296-8.848 20.544-28.398 11.712-43.71c-8.832-15.296-28.416-20.544-43.712-11.696L542.287 492.674c-9.28-5.248-19.856-8.496-31.28-8.496c-35.28 0-63.84 28.591-63.84 63.807c0 35.248 28.576 63.84 63.84 63.84c35.28 0 63.84-28.592 63.84-63.84c0-.064-.016-.144-.016-.209z"
              ></path>
            </svg>
            Prep Time: {recipe.prep_duration} min | Cook Time:{" "}
            {recipe.cook_duration} min
          </p>

          <p className="flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M6 10.5V22M6 2v5.5M2.5 2v5a3.5 3.5 0 0 0 7 0V2M22 22c-5.523 0-10-4.477-10-10S16.477 2 22 2"></path>
                <path d="M22 17a5 5 0 0 1 0-10"></path>
              </g>
            </svg>{" "}
            Servings: {recipe.servings} |{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 48 48"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2.5}
              >
                <path
                  strokeLinejoin="round"
                  d="M31.568 7.127A9 9 0 0 0 24 3a9 9 0 0 0-7.568 4.127A8 8 0 1 0 8.72 20.67a479 479 0 0 0 2.18 21.55c.17 1.36 1.251 2.4 2.62 2.488C15.606 44.842 19.1 45 24 45s8.394-.158 10.48-.293c1.369-.088 2.45-1.128 2.62-2.488a479 479 0 0 0 2.18-21.549a8 8 0 1 0-7.712-13.543"
                ></path>
                <path
                  strokeLinejoin="round"
                  d="M37.753 37.363c-2.557-.133-6.836-.265-13.753-.265s-11.197.132-13.753.265"
                ></path>
                <path d="m19 21l1 8m9-8l-1 8"></path>
              </g>
            </svg>{" "}
            Difficulty:{" "}
            {recipe.difficulty.charAt(0).toUpperCase() +
              recipe.difficulty.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );
}
