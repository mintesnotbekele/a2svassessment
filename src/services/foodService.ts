import apiClient from "@/services/client";
import { Food, FoodFormData, FoodDisplay } from "@/types/food.types";
import { SearchParams } from "@/types/api.types";
import { normalizeFood } from "./normalizeFood";

class FoodService {
  private readonly endpoint = "Food";

  async getFeaturedFoods(params?: SearchParams): Promise<FoodDisplay[]> {
    const queryParams = new URLSearchParams();

    if (params?.name) queryParams.append("name", params.name);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const url = queryParams.toString()
      ? `${this.endpoint}?${queryParams.toString()}`
      : this.endpoint;

    const response = await apiClient.get<Food[]>(url);

    return response.map(normalizeFood);
  }

  async getFoodById(id: string): Promise<FoodDisplay> {
    const data = await apiClient.get<Food>(`${this.endpoint}/${id}`);
    return normalizeFood(data);
  }

  async createFood(data: FoodFormData): Promise<FoodDisplay> {
    const foodData = this.transformFormDataToFood(data);
    const created = await apiClient.post<Food>(this.endpoint, foodData);
    return normalizeFood(created);
  }

  async updateFood(id: string, data: FoodFormData): Promise<FoodDisplay> {
    const foodData = this.transformFormDataToFood(data);
    const updated = await apiClient.put<Food>(`${this.endpoint}/${id}`, foodData);
    return normalizeFood(updated);
  }

  async deleteFood(id: string): Promise<void> {
    return await apiClient.delete<void>(`${this.endpoint}/${id}`);
  }

  async searchFoods(searchTerm: string): Promise<FoodDisplay[]> {
    return this.getFeaturedFoods({ name: searchTerm });
  }

  private transformFormDataToFood(data: FoodFormData): Partial<Food> {
    return {
      name: data.food_name,
      rating: data.food_rating,
      image: data.food_image,
      // price: data?.food_price || "0",
      restaurant: {
        name: data.restaurant_name,
        logo: data.restaurant_logo,
        status: data.restaurant_status,
      },
    };
  }
}

export default new FoodService();
