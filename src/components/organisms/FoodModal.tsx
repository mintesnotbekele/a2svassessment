"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { RawFood } from "@/types/food.types";

const foodSchema = z.object({
  food_name: z.string().min(1, "Food name is required"),
  food_rating: z
    .string()
    .min(1, "Food rating is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 5, {
      message: "Rating must be between 1 and 5",
    }),
  food_image: z.string().url("Food image must be a valid URL"),
  restaurant_name: z.string().min(1, "Restaurant name is required"),
  restaurant_logo: z.string().url("Restaurant logo must be a valid URL"),
  restaurant_status: z.enum(["Open", "Close"]).refine(
  val => val === "Open" || val === "Close",
  {
    message: "Please select restaurant status",
  }
)
});

export type FoodFormData = z.infer<typeof foodSchema>;


interface FoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FoodFormData) => Promise<void>;
  mode?: "add" | "edit";
  food?: RawFood | null;
}

export const FoodModal: React.FC<FoodModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode = "add",
  food,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FoodFormData>({
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
      console.log(food)
      setValue("food_name", food.name);
      setValue("food_rating", food.rating.toString());
      setValue("food_image", food.avatar);
       setValue("restaurant_name", food.restaurant.name);
       setValue("restaurant_logo", food.restaurant.logo);
      // setValue("restaurant_status", food.restaurant_status);
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
                  className="fixed inset-0 bg-gray-400/90 z-40 "

                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                  />

                  <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center "
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
                      onSubmit={handleSubmit(handleFormSubmit)}
                      className="space-y-6" >
                    
                      <div>
                        <Input
                          placeholder="Food name"
                          {...register("food_name")}
                          className="bg-gray-100 px-4 py-3 rounded-xl w-full shadow-none" 
                        />
                        {errors.food_name && (
                          <p className="text-red-500 rounded-xl text-sm mt-1">{errors.food_name.message}</p>
                        )}
                      </div>

                    
                      <div>
                        <Input
                          placeholder="Food rating"
                          {...register("food_rating")}
                          className="bg-gray-100 px-4 py-3 rounded-xl w-full"
                        />
                        {errors.food_rating && (
                          <p className="text-red-500 text-sm mt-1">{errors.food_rating.message}</p>
                        )}
                      </div>

                    
                      <div>
                        <Input
                          placeholder="Food image (link)"
                          {...register("food_image")}
                          className="bg-gray-100 px-4 py-3 rounded-xl w-full"
                        />
                        {errors.food_image && (
                          <p className="text-red-500 text-sm mt-1">{errors.food_image.message}</p>
                        )}
                      </div>

                    
                      <div>
                        <Input
                          placeholder="Restaurant name"
                          {...register("restaurant_name")}
                          className="bg-gray-100 px-4 py-3 rounded-xl w-full"
                        />
                        {errors.restaurant_name && (
                          <p className="text-red-500 text-sm mt-1">{errors.restaurant_name.message}</p>
                        )}
                      </div>

                    
                      <div>
                        <Input
                          placeholder="Restaurant logo (link)"
                          {...register("restaurant_logo")}
                          className="bg-gray-100 px-4 py-3 rounded-xl w-full"
                        />
                        {errors.restaurant_logo && (
                          <p className="text-red-500 text-sm mt-1">{errors.restaurant_logo.message}</p>
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
                          className="flex-1 food-btn-secondary  border-orange-300 text-gray-50"
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
