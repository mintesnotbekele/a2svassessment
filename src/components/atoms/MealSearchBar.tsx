import { Button } from "@/components/atoms/Button";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";

export default function MealSearchBar() {
  return (
    <motion.div
      className="rounded-xl flex justify-center items-center w-full mx-auto "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-white rounded-2xl w-full flex flex-col ">
        <div className="flex items-center justify-start gap-3 rounded-xl p-5">
          <Button className="food-btn-delivery flex items-center gap-2" >
            <Image
              src="/DeliveryIcon.svg"
              alt="Delivery"
              width={20}
              height={20}
            />
            Delivery
          </Button>

          <Button  className=" food-btn-pickup flex items-center gap-2">
            <Image
              src="/PickupIcon.svg"
              alt="Pickup"
              width={15}
              height={15}
            />
            Pickup
          </Button>
        </div>
        <div
          className="my-2 border-t-2 border-gray-100"
        />
        <div className="flex flex-col sm:flex-row items-center w-full gap-6 p-5 mb-5">       
          <div className="flex items-center w-full bg-gray-100 rounded-xl px-3 py-3 flex-1">
            <Search className="text-[#F17228] w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="What do you like to eat today?"
              className="bg-transparent outline-none flex-1 text-gray-600 placeholder-gray-400"
            />
          </div>
          <Button size="lg" variant="gradient" className="flex items-center  gap-2" style={{ borderRadius: '5px' }}>
            <Search className="w-4 h-4" />
            Find Meal
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
