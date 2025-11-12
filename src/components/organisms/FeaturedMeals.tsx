import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FoodCard } from '@/components/molecules/FoodCard';
import { Button } from '@/components/atoms/Button';
import { Spinner } from '@/components/atoms/Spinner';
import { RootState, AppDispatch } from '@/store/store';
import { fetchFoods, setSearchTerm } from '@/store/slices/foodSlice';

import { ChevronRight } from 'lucide-react';


interface FeaturedMealsProps {
  onAddFood: () => void;
  onEditFood: (food: any) => void;
  onDeleteFood: (food: any) => void;
}

export const FeaturedMeals: React.FC<FeaturedMealsProps> = ({
  onAddFood,
  onEditFood,
  onDeleteFood,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { foods, loading, error, searchTerm } = useSelector(
    (state: RootState) => state.food
  );

  useEffect(() => {
    dispatch(fetchFoods(undefined));
  }, []);





  return (
    <section id="featured" className="food-featured-meals py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Featured Meals
          </motion.h2>
   
        </div>

    
        {loading && (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && foods.length === 0 && (
          <div className="empty-state-message text-center py-12">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items available</h3>
            <p className="text-gray-500">Start by adding your first food item</p>
          </div>
        )}

        <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {foods.map((food, idx) => (
          <FoodCard
            key={idx}
            food={food}
            onEdit={onEditFood}
            onDelete={onDeleteFood}
          />
        ))}
        
      </motion.div>
        <Button
     
      className="
        flex items-center justify-center gap-2 mx-auto 
        px-6  rounded-xl font-semibold
      "
      style={{paddingTop: "20px", paddingBottom: "20px"}}
    >
      Learn more
      <ChevronRight size={20} />
    </Button>
      </div>
    </section>
  );
};