"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, Star, Tag, Edit2, Trash2 } from "lucide-react";
import { StatusBadge } from "@/components/atoms/StatusBadge";
import SafeImage from "@/components/atoms/SafeImage";
import { DeleteModal } from "../organisms/FoodDeleteDialog";

interface FoodCardProps {
  food: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    Price: number;
    isOpen: boolean;
    category?: string;
    restaurant: {
      name: string;
      logo: string;
      status: "Open Now" | "Closed";
    };
  };
  onEdit?: (food: FoodCardProps["food"]) => void;
  onDelete?: (food: FoodCardProps["food"]) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, onEdit, onDelete }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = () => {
    setIsDropdownOpen(false);
    onEdit?.(food);
  };

  const handleDeleteClick = () => {
    setIsDropdownOpen(false);
    setShowDeleteConfirm(true);
  };

    const handleDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    onDelete?.(food);
  };

  

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl  transition-all duration-300 overflow-hidden w-full"
      >
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
          <SafeImage
            src={food.avatar}
            alt={food.name}
            className="object-cover w-full h-full rounded-2xl"
          />

          <div className="absolute top-2 left-2 bg-orange-500 text-white text-sm font-semibold px-2 py-1 rounded-md flex items-center gap-1 shadow-md">
            <Tag size={14} /> ${food.Price.toFixed(2)}
          </div>
        </div>
        <div className="py-4 flex flex-col gap-3">
          <div className="flex justify-between items-start mb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                <SafeImage
                  src={food.restaurant.logo}
                  alt={food.restaurant.name}
                  className="object-contain w-full h-full"
                />
              </div>

              <div className="flex flex-col">
                <p className="truncate max-w-[140px] font-semibold text-lg text-gray-800">
                  {food.name}
                </p>
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-400 fill-yellow-400 w-6 h-6" />
                  <span className="text-sm font-medium">{food.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
            {(onEdit || onDelete) && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md p-1 transition-colors"
                >
                  <MoreVertical size={22} />
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -8 }}
                      transition={{ duration: 0.1 }}
                       className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 py-3 z-50 flex flex-col text-left">
                      {onEdit && (
                        <button
                          onClick={handleEdit}
                          className="text-gray-700 hover:text-gray-900 px-10 text-start  font-medium transition-colors"
                        >
                          Edit
                        </button>
                      )}

                      {onDelete && (
                        <>
                          <div className="h-[1px] bg-gray-200 my-1 w-full" />
                          <button
                            onClick={handleDeleteClick}
                            className="text-red-500 hover:text-red-600 px-10 text-start font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
          <StatusBadge isOpen={food.isOpen} />
        </div>
      </motion.div>
        <DeleteModal
                show={showDeleteConfirm}
                onCancel={() => setShowDeleteConfirm(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Meal"
                message="Are you sure you want to delete this meal?"
              />
    </>
  );
};
