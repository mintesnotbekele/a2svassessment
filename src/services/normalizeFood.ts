import { Food, FoodDisplay } from "@/types/food.types";

export function normalizeFood(raw: Food): FoodDisplay {
  return {
  id: raw.id,
  name: raw.food_name || raw.name || "Untitled Food",
  avatar: raw.food_image ||
    raw.image ||
    raw.avatar ||
    "https://images.pexels.com/photos/14393650/pexels-photo-14393650.png",

  rating: Number(raw.food_rating || raw.rating || 0),
  Price: Number(raw.Price || raw.price || 0),

  isOpen: raw.open !== undefined
    ? Boolean(raw.open)
    : raw.restaurant_status?.toLowerCase().includes("open") ?? false,

  restaurant: {
    name: raw.restaurant_name || raw.restaurant?.name || "Unknown Restaurant",
    logo: raw.restaurant_logo || raw.restaurant?.logo || "https://avatars.githubusercontent.com/u/39144284",
    status: raw.restaurant_status?.toLowerCase().includes("open")
      ? "Open Now"
      : raw.restaurant?.status?.toLowerCase().includes("open")
        ? "Open Now"
        : "Closed",
  },

  category: raw.category || raw.type || "",
  
};
}
