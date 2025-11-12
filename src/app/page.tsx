"use client";
import { Header } from "@/components/organisms/Header";
import { HeroSection } from "@/components/organisms/HeroSection";
import { Footer } from "@/components/organisms/Footer";
import { FeaturedMeals } from "@/components/organisms/FeaturedMeals";
import { Food } from "@/types/food.types";
import { useCallback, useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { FoodFormData, FoodModal } from "@/components/organisms/FoodModal";
import { useFood } from "@/hooks/useFood";

export default function Home() {
const { addFood, editFood, removeFood, loading, error } = useFood();
  const addModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();
   const [selectedFood, setSelectedFood] = useState<Food | null>(null);
   const openEditModal = useCallback((food: Food) => {
    setSelectedFood(food);
    editModal.open();
  }, [editModal]);

    const openDeleteModal = useCallback((food: Food) => {
    setSelectedFood(food);
    deleteModal.open();
  }, [deleteModal]);
  
   const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  }, []);

  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleCloseAddModal = useCallback(() => {
    addModal.close();
  }, [addModal]);

  const handleCloseEditModal = useCallback(() => {
    editModal.close();
    setSelectedFood(null);
  }, [editModal]);

  const handleCloseDeleteModal = useCallback(() => {
    deleteModal.close();
    setSelectedFood(null);
  }, [deleteModal]);

    const handleAddFood = async (data: FoodFormData) => {
    setIsProcessing(true);
    try {
      await addFood(data);
      showToast('Food item added successfully!', 'success');
      addModal.close();
    } catch (error) {
      showToast('Failed to add food item. Please try again.', 'error');
      console.error('Error adding food:', error);
    } finally {
      setIsProcessing(false);
    }
  };

    const handleEditFood = async (data: FoodFormData) => {
    if (!selectedFood) return;
    
    setIsProcessing(true);
    try {
      await editFood(selectedFood.id, data);
      showToast('Food item updated successfully!', 'success');
      editModal.close();
      setSelectedFood(null);
    } catch (error) {
      showToast('Failed to update food item. Please try again.', 'error');
      console.error('Error updating food:', error);
    } finally {
      setIsProcessing(false);
    }
  };


   const handleDeleteFood = async () => {
    if (!selectedFood) return;
    
    setIsProcessing(true);
    try {
      await removeFood(selectedFood.id);
      showToast('Food item deleted successfully!', 'success');
      deleteModal.close();
      setSelectedFood(null);
    } catch (error) {
      showToast('Failed to delete food item. Please try again.', 'error');
      console.error('Error deleting food:', error);
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div>
      <Header onAddFood={addModal.open}/>
      <HeroSection />
      <FeaturedMeals
          onAddFood={addModal.open}
          onEditFood={openEditModal}
          onDeleteFood={handleDeleteFood}
      />
      <Footer/>

      <FoodModal
        isOpen={addModal.isOpen}
        onClose={handleCloseAddModal}
        onSubmit={handleAddFood}
        mode="add"
      />
      <FoodModal
        isOpen={editModal.isOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleEditFood}
        food={selectedFood}
        mode="edit"
      />
    </div>
  );
}
