import { useForm, useFieldArray } from "react-hook-form";
import Sidebar from "../navigation/Sidebar";
import axiosClient from "../../../axiosClient/axiosClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Ingredient = { amount: number; unit: string; name: string };
type FormValues = {
  title: string;
  short_description: string;
  prep_duration: string;
  cook_duration: string;
  servings: number;
  rating: number;
  category: string;
  kcal: number;
  difficulty: string;
  steps: { value: string }[];
  tags: { value: string }[];
  ingredients: Ingredient[];
  image: FileList;
};

export default function RecipeForm() {
  const { register, handleSubmit, watch, control } = useForm<FormValues>({
    defaultValues: {
      steps: [{ value: "" }],
      tags: [{ value: "" }],
      ingredients: [{ amount: 0, unit: "", name: "" }],
    },
  });

  const navigate = useNavigate();

  const { fields: stepFields, append: appendStep } = useFieldArray({
    control,
    name: "steps",
  });
  const { fields: tagFields, append: appendTag } = useFieldArray({
    control,
    name: "tags",
  });
  const { fields: ingredientFields, append: appendIngredient } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    for (const key of [
      "title",
      "short_description",
      "prep_duration",
      "cook_duration",
      "servings",
      "rating",
      "category",
      "kcal",
      "difficulty",
    ]) {
      formData.append(key, (data as any)[key]);
    }

    formData.append("steps", JSON.stringify(data.steps.map((s) => s.value)));
    formData.append("tags", JSON.stringify(data.tags.map((t) => t.value)));
    formData.append("ingredients", JSON.stringify(data.ingredients));

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    await axiosClient
      .post("/api//recipe/createNewRecipe", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        toast.success("Recipe created!");
        navigate("/");
      });
  };

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full max-h-[100vh] bg-slate-50 overflow-y-scroll">
        <div className="flex justify-center py-12">
          <div className="drop-shadow-2xl max-h-fit min-w-[850px] max-w-[850px] bg-white dark:bg-gray-700 p-4 rounded-xl">
            <h3 className="py-4 text-2xl text-center font-semibold text-gray-800 dark:text-white">
              Create a new recipe!
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    {...register("title")}
                    placeholder="Title"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    {...register("category")}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="dessert">Dessert</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Difficulty
                  </label>
                  <select
                    {...register("difficulty")}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  >
                    <option value="">Select Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="very hard">Very Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Short Description
                </label>
                <textarea
                  {...register("short_description")}
                  placeholder="Short Description"
                  rows={3}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Prep Duration (min)
                  </label>
                  <input
                    type="number"
                    min={1}
                    {...register("prep_duration")}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Cook Duration (min)
                  </label>
                  <input
                    type="number"
                    min={1}
                    {...register("cook_duration")}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Servings
                  </label>
                  <input
                    type="number"
                    min={1}
                    {...register("servings")}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Rating
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    min={0}
                    {...register("rating")}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    min={0}
                    {...register("kcal")}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Ingredients</h4>
                {ingredientFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 mb-2">
                    <input
                      type="number"
                      min={0}
                      {...register(`ingredients.${index}.amount`)}
                      placeholder="Amount"
                      className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                    <input
                      {...register(`ingredients.${index}.unit`)}
                      placeholder="Unit"
                      className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                    <input
                      {...register(`ingredients.${index}.name`)}
                      placeholder="Name"
                      className="border border-gray-300 rounded-md p-2 flex-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    appendIngredient({ amount: 0, unit: "", name: "" })
                  }
                  className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
                >
                  + Add Ingredient
                </button>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Steps</h4>
                {stepFields.map((field, index) => (
                  <textarea
                    key={field.id}
                    {...register(`steps.${index}.value`)}
                    placeholder={`Step ${index + 1}`}
                    rows={2}
                    className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => appendStep({ value: "" })}
                  className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
                >
                  + Add Step
                </button>
              </div>

              <div className="flex flex-col">
                <h4 className="font-medium text-gray-700 mb-2">Tags</h4>
                <div className="grid grid-cols-4">
                  {tagFields.map((field, index) => (
                    <input
                      key={field.id}
                      {...register(`tags.${index}.value`)}
                      placeholder={`Tag ${index + 1}`}
                      className="w-fit mr-2 border border-gray-300 rounded-md p-2 mb-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  ))}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => appendTag({ value: "" })}
                    className="w-fit px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
                  >
                    + Add Tag
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Recipe Image
                </label>

                <input
                  type="file"
                  {...register("image")}
                  id="image-upload"
                  className="hidden"
                />

                <label
                  htmlFor="image-upload"
                  className="inline-block w-full py-2 px-4 rounded-lg bg-green-500 text-white font-medium text-center cursor-pointer hover:bg-green-600 transition"
                >
                  Choose Image
                </label>

                {watch("image")?.[0]?.name && (
                  <p className="mt-2 text-sm text-gray-600">
                    {watch("image")[0].name}
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-fit py-2 px-4 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
                >
                  Create Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
