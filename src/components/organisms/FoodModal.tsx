"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { FoodFormData, Food } from "@/types/food.types";


const foodSchema = z.object({
  food_name: z.string().min(1, "Food name is required"),
  food_rating: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 5, {
      message: "Rating must be between 1 and 5",
    }),
  food_image: z.string().url("Food image must be a valid URL"),
  restaurant_name: z.string().min(1, "Restaurant name is required"),
  restaurant_logo: z.string().url("Restaurant logo must be a valid URL"),
  restaurant_status: z.enum(["Open", "closed"]),
});


interface FoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FoodFormData) => Promise<void>;
  mode?: "add" | "edit";
  food?: Food | null;
}

export const FoodModal: React.FC<FoodModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode = "add",
  food,
}) => {
  type FoodFormSchema = z.infer<typeof foodSchema>;

const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setValue } = useForm<FoodFormSchema>({
  resolver: zodResolver(foodSchema),
  defaultValues: {
    food_name: "",
    food_rating: "",
    food_image: "",
    restaurant_name: "",
    restaurant_logo: "",
    restaurant_status: "Open",
  },
});

  useEffect(() => {
    if (food && mode === "edit") {
      setValue("food_name", food.name);
      setValue("food_rating", food.rating.toString());
      setValue("food_image", food.avatar);
      setValue("restaurant_name", food.restaurant.name);
      setValue("restaurant_logo", food.restaurant.logo);
      setValue(
            "restaurant_status",
            food.restaurant_status === "Open" ? "Open" : "closed"
          );

    } else {
      reset();
    }
  }, [food, mode, reset, setValue]);

  const handleFormSubmit = async (data: FoodFormData) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-gray-400/90 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="relative bg-white rounded-3xl px-10 sm:px-16 py-12 shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

              <div className="text-center mb-3 mt-12">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">
                  {mode === "add" ? "Add a meal" : "Edit meal"}
                </h2>
              </div>

            <form
            onSubmit={handleSubmit(handleFormSubmit as any)}
            className="space-y-6"
          >

                <div>
                  <Input
                    placeholder="Food name"
                    {...register("food_name")}
                    name="food_name"
                    className="bg-gray-100 px-4 py-3 rounded-xl w-full shadow-none"
                  />
                  {errors.food_name && (
                    <p id="food_name-error" className="text-red-500 text-sm mt-1">
                      {errors.food_name.message}
                    </p>
                  )}
                </div>

             
                <div>
                  <Input
                    placeholder="Food rating (1–5)"
                    type="number"
                    {...register("food_rating")}
                    name="food_rating"
                    className="bg-gray-100 px-4 py-3 rounded-xl w-full"
                  />
                  {errors.food_rating && (
                    <p id="restaurant_rating-error" className="text-red-500 text-sm mt-1">
                      {errors.food_rating.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="Food image URL"
                    {...register("food_image")}
                    name="food_image"
                    className="bg-gray-100 px-4 py-3 rounded-xl w-full"
                  />
                  {errors.food_image && (
                    <p id="restaurant_image-error" className="text-red-500 text-sm mt-1">
                      {errors.food_image.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Restaurant name"
                    {...register("restaurant_name")}
                    name="restaurant_name"
                    className="bg-gray-100 px-4 py-3 rounded-xl w-full"
                  />
                  {errors.restaurant_name && (
                    <p id="restaurant_name-error" className="text-red-500 text-sm mt-1">
                      {errors.restaurant_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="Restaurant logo URL"
                    {...register("restaurant_logo")}
                    name="restaurant_logo"
                    className="bg-gray-100 px-4 py-3 rounded-xl w-full"
                  />
                  {errors.restaurant_logo && (
                    <p id="restaurant_logo-error" className="text-red-500 text-sm mt-1">
                      {errors.restaurant_logo.message}
                    </p>
                  )}
                </div>
                <div>
                  <select
                    {...register("restaurant_status")}
                    name="restaurant_status"
                    className="bg-gray-100 px-4 py-3 rounded-xl w-full border"
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>

                  {errors.restaurant_status && (
                    <p id="restaurant_status-error" className="text-red-500 text-sm mt-1">
                      {errors.restaurant_status.message}
                    </p>
                  )}
                </div>
                <div className="flex gap-4 pt-6 mb-6">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-md shadow-md hover:opacity-90 transition-all"
                    disabled={isSubmitting}
                  >
                    {mode === "add" ? "Add" : "Save"}
                  </Button>

                  <Button
                    type="button"
                    onClick={onClose}
                    className="flex-1 food-btn-secondary border-orange-300 text-gray-50"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
