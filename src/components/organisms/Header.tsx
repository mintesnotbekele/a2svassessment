"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from "@/hooks/useModal";
import { useFood } from "@/hooks/useFood";
import { FoodFormData } from "@/types/food.types";
import { FoodModal } from "./FoodModal";
import { Button } from "../atoms/Button";


interface HeaderProps {
  onAddFood?: () => void;
}

export const Header: React.FC<HeaderProps> = ({onAddFood }) => {
    
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const addModal = useModal();
    const { addFood } = useFood();
    useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


      const handleAddFood = async (data: FoodFormData) => {
        console.log(data)
    try {
      await addFood(data);
      addModal.close();
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

   const handleAddMealClick = () => {
    if (onAddFood) {
      onAddFood();
    } else {
      addModal.open();
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  
  return (
    <>
      <header className={`sticky top-0 z-50 bg-white transition-all duration-300  ${
        isScrolled ? 'shadow-lg' : 'shadow-md'
      }`}>
        <div className="relative">
          
          <div className="hidden lg:block">
            <div className="pl-20 xl:pl-40 2xl:pl-60 pr-24 2xl:pr-32 flex items-center justify-between h-18"> 
              <Link href="/" className="flex items-center gap-2 relative w-40 h-12 md:w-45 md:h-16">
                <Image
                    src="/logo.svg"
                    alt="Foodie Logo"
                    fill
                    className="object-contain"
                    priority
                />
                </Link>
              <Button     
              onClick={handleAddMealClick}          
                className="food-btn-primary food-btn "
                data-testid="header-add-meal-btn"
              >
                Add Meal
              </Button>
            </div>
          </div>
          <div className="hidden md:block lg:hidden">
            <div className="px-6 flex items-center justify-between h-16">        
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.svg"
                  alt="Foodie Logo"
                  width={160}
                  height={40}
                  className="object-contain"
                  priority
                />
              </Link>     
              <Button
               onClick={handleAddMealClick}
                className="food-btn-primary food-btn w-full"
              >
                Add Meal
              </Button>
            </div>
          </div>  
          <div className="block md:hidden">
            <div className="px-4 flex items-center justify-between h-14">
              
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt="Foodie Logo"
                  width={120}
                  height={30}
                  className="object-contain"
                  priority
                />
              </Link>

              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
                // aria-expanded={isMenuOpen}
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

        
          <AnimatePresence>
            {isMenuOpen && (
              <>
               
                <motion.div
                  className="md:hidden fixed inset-0 bg-black/50 z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                />

              
                <motion.div
                  className="md:hidden fixed right-0 top-14 left-0 bg-white z-50 shadow-xl"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-4 py-6 space-y-4">
                   
                    <nav className="space-y-3">
                      <Link 
                        href="/" 
                        className="block py-2 text-gray-700 hover:text-orange-500 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Home
                      </Link>
                      <Link 
                        href="#featured" 
                        className="block py-2 text-gray-700 hover:text-orange-500 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Featured Meals
                      </Link>
                    
                      <Link 
                        href="#contact" 
                        className="block py-2 text-gray-700 hover:text-orange-500 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Contact
                      </Link>
                    </nav>
                    <div className="border-t pt-4">
                      <Button
                        onClick={handleAddMealClick}
                        className="food-btn-primary food-btn w-full"
                      >
                        Add Meal
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>
      {!onAddFood && (
        <FoodModal
          isOpen={true}
          onClose={addModal.close}
          onSubmit={handleAddFood}
          mode="add"
        />
      )}
     </>
  );
};