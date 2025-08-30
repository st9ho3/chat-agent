import { Plus } from 'lucide-react';

type AddIngredientButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const AddIngredientButton = ({ onClick }: AddIngredientButtonProps) => (
  <div className="flex justify-center mt-4">
    <button
      type='button'
      onClick={onClick}
      className='flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors w-full sm:w-auto flex-shrink-0'
    >
      <Plus size={20} /> Add
    </button>
  </div>
);

export default AddIngredientButton