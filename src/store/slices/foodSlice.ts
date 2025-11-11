
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { Food, FoodFormData } from '@/types/food.types';
import foodService from '@/services/foodService';

interface FoodState {
  foods: Food[];
  selectedFood: Food | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

const initialState: FoodState = {
  foods: [],
  selectedFood: null,
  loading: false,
  error: null,
  searchTerm: '',
};

export const fetchFoods = createAsyncThunk(
  'food/fetchFoods',
  async (searchTerm?: string) => {
    const response = await foodService.getFeaturedFoods(
      searchTerm ? { name: searchTerm } : undefined
    );
    return response;
  }
);

export const createFood = createAsyncThunk(
  'food/createFood',
  async (data: FoodFormData) => {
    const response = await foodService.createFood(data);
    return response;
  }
);

export const updateFood = createAsyncThunk(
  'food/updateFood',
  async ({ id, data }: { id: string; data: FoodFormData }) => {
    const response = await foodService.updateFood(id, data);
    return response;
  }
);

export const deleteFood = createAsyncThunk(
  'food/deleteFood',
  async (id: string) => {
    await foodService.deleteFood(id);
    return id;
  }
);


const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setSelectedFood: (state, action: PayloadAction<Food | null>) => {
      state.selectedFood = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
  
    builder
      .addCase(fetchFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.loading = false;
        state.foods = action.payload;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch foods';
      });

    builder
      .addCase(createFood.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFood.fulfilled, (state, action) => {
        state.loading = false;
        state.foods.unshift(action.payload);
      })
      .addCase(createFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create food';
      });

    builder
      .addCase(updateFood.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFood.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.foods.findIndex(food => food.id === action.payload.id);
        if (index !== -1) {
          state.foods[index] = action.payload;
        }
      })
      .addCase(updateFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update food';
      });
    builder
      .addCase(deleteFood.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFood.fulfilled, (state, action) => {
        state.loading = false;
        state.foods = state.foods.filter(food => food.id !== action.payload);
      })
      .addCase(deleteFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete food';
      });
  },
});

export const { setSelectedFood, setSearchTerm, clearError } = foodSlice.actions;
export default foodSlice.reducer;