"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import HeroFood from '@/assets/heroFood.png'; 
import MealSearchBar from '../atoms/MealSearchBar';

export const HeroSection: React.FC = () => {
  return (
    <section className="p-20 food-hero-bg relative bg-food-accent py-10 overflow-hidden">
      <div className="container mx-auto px-5 flex flex-col lg:flex-row items-center gap-12 relative z-10">
        <div className="lg:flex-[0.6] flex-1 text-white z-10">
          <motion.h1
            style={{
              boxShadow: '0px 27px 82px 0px #FFAE0047, 0px 14px 15px 0px #FFAE0003',
             
              fontWeight: 700,
              fontSize: '88px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'left',
            }}
            className="text-4xl md:text-5xl font-bold mb-3 font-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Are you starving?
          </motion.h1>
          <motion.p
            className="text-lg text-primary-400 mb-6 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Within a few clicks, find meals that are accessible near you
          </motion.p>
          <MealSearchBar />
        </div>
        <div className="lg:flex-[0.4] flex-1 relative w-full h-96 lg:h-[500px] hidden lg:block">
            <Image
              src={HeroFood}
              alt="Delicious food"
              className="rounded-xl absolute bottom-0 right-0 object-contain z-20"
              style={{
                width: '500px',
                height: '500px',
                transform: 'translate(0%, 19%)', 
              }}
            />
          </div>

      </div>    
    </section>
  );
};
