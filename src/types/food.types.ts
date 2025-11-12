// src/types/food.types.ts
export interface Restaurant {
  name: string;
  logo: string;
  status: 'Open' | 'Closed';
}

export interface Food {
 id: string;
  createdAt: string;
  name: string;
  avatar: string;
  rating: string | number;
  open: boolean;
  logo: string;
  Price: string | number;
  
  // Optional food-related fields
  food_name?: string;
  food_rating?: string;
  food_image?: string;

  // Optional restaurant-related fields
  restaurant_name?: string;
  restaurant_logo?: string;
  restaurant_image?: string;
  restaurant_status?: string;

  // Optional image/status fields
  image?: string;
  status?: string;
  price?: string | number;
  type?: string;
  category?: string;

  // Optional nested object
  restaurant?: Restaurant;
}

export type FoodFormData = {
  // Mandatory meal fields
  food_name: string;
  food_rating: string; // keep as string to match input type
  food_image: string;

  // Optional restaurant fields
  restaurant_name?: string;
  restaurant_logo?: string;
  restaurant_status?: "Open" | "Closed";
};



export interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading?: boolean;
}

export interface FoodDisplay extends Omit<Food, 'rating' | 'open'> {
  rating: number;
  isOpen: boolean;
}