import { useNavigate } from "react-router-dom";
import Sidebar from "../navigation/Sidebar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay, Pagination } from "swiper/modules";
import car1 from "../../assets/car1.png";
import car2 from "../../assets/car2.png";
import car3 from "../../assets/car3.png";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import RecentRecipeCard from "./RecentRecipeCard";

export default function Home() {
  const authContext = useContext(AuthContext)
  
  const navigate = useNavigate();


  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full bg-slate-50">
        <div className="w-full max-w-6xl mx-auto mt-10">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            loop={true}
            spaceBetween={30}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="rounded-2xl shadow-lg overflow-hidden"
          >
            <SwiperSlide>
              <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gradient-to-r from-blue-50 via-white to-sky-50 h-[450px]">
                <div className="max-w-md">
                  <h1 className="text-4xl font-bold mb-4">
                    Welcome to Cook-Book
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    Discover a world of delicious recipes crafted for every
                    taste. Whether you’re a beginner or a seasoned chef, our
                    collection will inspire you to cook something new every day.
                  </p>
                  <button
                    onClick={() => navigate("/recipes")}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                  >
                    View All Recipes
                  </button>
                </div>

                <img
                  src={car1}
                  alt="CookBook Recipes"
                  className="w-80 mr-24 hidden md:block"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gradient-to-r from-green-50 via-white to-lime-50 h-[450px]">
                <div className="max-w-md">
                  <h1 className="text-4xl font-bold mb-4">
                    Not sure what to cook?
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    Simply tell us the ingredients you have at home and we’ll
                    suggest the perfect recipes. No more wasted food — just
                    delicious meals from what’s already in your kitchen.
                  </p>
                  <button
                    onClick={() => navigate("/inspiration")}
                    className="px-6 py-3 bg-lime-700 text-white rounded-xl hover:bg-lime-600 transition"
                  >
                    Help Me Decide
                  </button>
                </div>

                <img
                  src={car2}
                  alt="Cooking Inspiration"
                  className="w-[40%] mr-16 md:block"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gradient-to-r from-orange-50 via-white to-amber-100 h-[450px]">
                <div className="max-w-md">
                  <h1 className="text-4xl font-bold mb-4">Plan Your Week</h1>
                  <p className="text-lg text-gray-600 mb-6">
                    Stay organized and stress-free by planning your meals for
                    the week. Our Weekly Planner helps you balance nutrition,
                    save time, and make cooking easier.
                  </p>
                  <button
                    onClick={() => navigate("/weekly-plan")}
                    className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition"
                  >
                    Create Weekly Plan
                  </button>
                </div>

                <img
                  src={car3}
                  alt="Weekly Meal Plan"
                  className="w-80 mr-24 md:block"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Our recent recipes
          </h2>
          <hr
            className="h-[2.5px] border-none my-8 rounded-full w-[80%] mx-auto 
                 bg-gradient-to-r from-blue-200 via-green-300 to-orange-200"
          />
        </div>

        <div className="px-8 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">

        {authContext?.recipesWithouthFilter?.slice(-3).map((recipe) => {
          return(
            < RecentRecipeCard key={recipe.id} recipe={recipe} />
          )
        })}
      </div>
      </div>
    </div>
  );
}
