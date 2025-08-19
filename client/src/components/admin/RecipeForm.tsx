import Sidebar from "../navigation/Sidebar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import type { Ingredient } from "../../../types/types";

export default function RecipeForm() {
  const authContext = useContext(AuthContext);

  const [tags, setTags] = useState<string[]>([""]);
  const [steps, setSteps] = useState<string[]>([""]);

  const { register, control, setValue, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      title: "",
      ingredients: [{ name: "", unit: "", ammount: 0 }],
      tags: [""],
      steps: [""],
    },
  });

  useEffect(() => {
    setValue("tags", tags);
    setValue("steps", steps);
  }, [tags, steps, setValue]);

  type Inputs = {
    id: number;
    title: string;
    category: string;
    ingredients: Ingredient[];
    cook_duration: number;
    prep_duration: number;
    servings: number;
    tags: string[];
    steps: string[];
    image: File | null;
    short_description: string;
    kcal: number;
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const addTag = (value = "") => setTags((prev) => [...prev, value]);
  const removeTag = (index: number) =>
    setTags((prev) => prev.filter((_, i) => i !== index));
  const updateTag = (index: number, value: string) =>
    setTags((prev) => prev.map((tag, i) => (i === index ? value : tag)));

  const addStep = (value = "") => setSteps((prev) => [...prev, value]);
  const removeStep = (index: number) =>
    setSteps((prev) => prev.filter((_, i) => i !== index));
  const updateStep = (index: number, value: string) =>
    setSteps((prev) => prev.map((step, i) => (i === index ? value : step)));

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    authContext?.createRecipe(data);
  };

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full bg-slate-50">
        <div className="mx-auto flex justify-center px-6 py-12">
          <div className="drop-shadow-2xl max-h-fit min-w-[850px] max-w-[850px] bg-white dark:bg-gray-700 p-4 rounded-xl">
            <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
              Create a new recipe!
            </h3>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col px-2 pt-4 pb-4 mb-4 bg-white dark:bg-gray-800 rounded lg:px-8"
            >
              <div className="flex justify-between">
                <div className="w-[40%] mb-6">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border border-gray-300 rounded shadow appearance-none focus:outline-none focus:border-blue-500 focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Enter a title"
                    {...register("title", { required: true })}
                  />
                </div>
                <div className="w-[40%] mb-6">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border border-gray-300 rounded shadow appearance-none focus:outline-none focus:border-blue-500 focus:shadow-outline"
                    id="category"
                    type="text"
                    placeholder="Enter a category"
                    {...register("category", { required: true })}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-full mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="short_description"
                  >
                    Short description of a meal
                  </label>
                  <textarea
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border border-gray-300 rounded shadow appearance-none focus:outline-none focus:border-blue-500 focus:shadow-outline"
                    id="short_description"
                    placeholder="Enter a short description..."
                    {...register("short_description", { required: true })}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-[15%] mb-6">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="prep_duration"
                  >
                    Prep duration
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border border-gray-300 rounded shadow appearance-none focus:outline-none focus:border-blue-500 focus:shadow-outline"
                    id="prep_duration"
                    type="number"
                    placeholder="In minutes"
                    {...register("prep_duration", { required: true })}
                  />
                </div>
                <div className="w-[15%] mb-6">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="cook_duration"
                  >
                    Cook duration
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border border-gray-300 rounded shadow appearance-none focus:outline-none focus:border-blue-500 focus:shadow-outline"
                    id="cook_duration"
                    type="number"
                    placeholder="In minutes"
                    {...register("cook_duration", { required: true })}
                  />
                </div>
                <div className="w-[15%] mb-6">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="kcal"
                  >
                    Calories
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border border-gray-300 rounded shadow appearance-none focus:outline-none focus:border-blue-500 focus:shadow-outline"
                    id="kcal"
                    type="number"
                    placeholder="0"
                    {...register("kcal", { required: true })}
                  />
                </div>
                <div className="w-[15%] mb-6">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="servings"
                  >
                    Servings
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border border-gray-300 rounded shadow appearance-none focus:outline-none focus:border-blue-500 focus:shadow-outline"
                    id="servings"
                    type="number"
                    placeholder="0"
                    {...register("servings", { required: true })}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
                  Tags{" "}
                  <span className="text-xs font-bold text-gray-700">
                    (Add by pressing Enter):
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 border rounded bg-gray-100"
                    >
                      <input
                        className="bg-transparent outline-none text-sm w-auto max-w-[120px]"
                        placeholder={`Tag ${index + 1}`}
                        value={tag}
                        onChange={(e) => updateTag(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag("");
                            setTimeout(() => {
                              const next =
                                document.querySelectorAll<HTMLInputElement>(
                                  "input[name^='tag-input']"
                                )[index + 1];
                              next?.focus();
                            }, 0);
                          }
                        }}
                        name={`tag-input-${index}`}
                      />
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeTag(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-4 text-sm font-bold text-gray-700 dark:text-white">
                  Ingredients
                </label>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 items-center mb-2">
                    <input
                      className="w-1/3 px-3 py-2 text-sm border border-gray-300 rounded"
                      placeholder="Name"
                      {...register(`ingredients.${index}.name`, {
                        required: true,
                      })}
                    />
                    <input
                      className="w-1/3 px-3 py-2 text-sm border border-gray-300 rounded"
                      placeholder="Unit (e.g. g, ml)"
                      {...register(`ingredients.${index}.unit`, {
                        required: true,
                      })}
                    />
                    <input
                      type="number"
                      className="w-1/4 px-3 py-2 text-sm border border-gray-300 rounded"
                      placeholder="Amount"
                      {...register(`ingredients.${index}.ammount`, {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                    <button
                      type="button"
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => remove(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 mb-6 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => append({ name: "", unit: "", ammount: 0 })}
                >
                  + Add Ingredient
                </button>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
                    Steps{" "}
                    <span className="text-xs font-bold text-gray-700">
                      (Add by pressing Enter):
                    </span>
                  </label>
                  <div className="flex flex-col gap-2">
                    {steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <textarea
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded"
                          placeholder={`Step ${index + 1}`}
                          value={step}
                          onChange={(e) => updateStep(index, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              addStep("");
                              setTimeout(() => {
                                const next =
                                  document.querySelectorAll<HTMLTextAreaElement>(
                                    "textarea[name^='step-input']"
                                  )[index + 1];
                                next?.focus();
                              }, 0);
                            }
                          }}
                          name={`step-input-${index}`}
                        />
                        <button
                          type="button"
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 h-fit"
                          onClick={() => removeStep(index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full mb-6">
                  <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setValue("image", e.target.files?.[0] || null)
                    }
                  />
                </div>
              </div>
              <div className="my-6 text-center">
                <button
                  className="w-6/12 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900 font-medium text-white tracking-wider"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
