// src/hooks/useFood.ts
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState, AppDispatch } from '@/store/store';
import { 
  fetchFoods, 
  createFood, 
  updateFood, 
  deleteFood,
  setSelectedFood 
} from '@/store/slices/foodSlice';
import { Food, FoodFormData } from '@/types/food.types';

export function useFood() {
  const dispatch = useDispatch<AppDispatch>();
  const foodState = useSelector((state: RootState) => state.food);

  const loadFoods = useCallback((searchTerm?: string) => {
    return dispatch(fetchFoods(searchTerm));
  }, [dispatch]);

  const addFood = useCallback((data: FoodFormData) => {
    return dispatch(createFood(data));
  }, [dispatch]);

  const editFood = useCallback((id: string, data: FoodFormData) => {
    return dispatch(updateFood({ id, data }));
  }, [dispatch]);

  const removeFood = useCallback((id: string) => {
    return dispatch(deleteFood(id));
  }, [dispatch]);

  const selectFood = useCallback((food: Food | null) => {
    dispatch(setSelectedFood(food));
  }, [dispatch]);

  return {
    ...foodState,
    loadFoods,
    addFood,
    editFood,
    removeFood,
    selectFood,
  };
}