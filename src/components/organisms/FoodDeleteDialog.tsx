import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2 } from "lucide-react";

interface DeleteModalProps {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  show,
  onCancel,
  onConfirm,
  title = "Delete Meal",
  message = "Are you sure you want to delete this meal? Actions cannot be reversed.",
}) => {
  return (
    <AnimatePresence>
      {show && (
        <> 
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onCancel}
          />
          <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="fixed top-[20vh] left-1/3 -translate-x-1/2 z-50 bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-xl"
        >     
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

           
            <h3 className="text-2xl font-bold text-[] text-center mb-3">
              {title}
            </h3>
            <p className="text-gray-600 text-center mb-6 px-4">{message}</p>

          
            <div className="flex gap-4">
             
              <button
                onClick={onConfirm}
                className="flex-1 px-5 py-3 food-btn-primary hover:bg-red-600 text-white font-medium rounded-xl transition-colors duration-200"
                data-testid="food-delete-confirm"
              >
                Yes
              </button>
               <button
                onClick={onCancel}
                className="flex-1 px-5 py-3 food-btn-secondary hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
